import { createContext, useState, useCallback, useEffect } from 'react'
import {
  getPets,
  addPet as addPetApi,
  updatePet as updatePetApi,
  uploadPetImage,
  deletePet as deletePetApi
} from '@/services/api/pets'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'

const PetsContext = createContext()

export function PetsProvider({ children }) {
  const { isAuthenticated } = useAuth()
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [noPets, setNoPets] = useState(false)
  const [initialized, setInitialized] = useState(false)

  // Estado para el formulario
  const [formState, setFormState] = useState({
    isOpen: false,
    mode: 'add', // 'add' | 'edit'
    selectedPetId: null,
    selectedPet: null
  })

  useEffect(() => {
    if (!isAuthenticated) {
      setPets([])
      setNoPets(false)
      setError(null)
      setInitialized(false)
      setFormState({
        isOpen: false,
        mode: 'add',
        selectedPetId: null,
        selectedPet: null
      })
    }
  }, [isAuthenticated])

  const fetchPets = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await getPets()
      setPets(data)
      setNoPets(data.length === 0)
      setInitialized(true)
      return data
    } catch (error) {
      console.error('Error fetching pets:', error)
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const initializePets = useCallback(() => {
    if (!initialized && !loading && isAuthenticated) {
      fetchPets()
    }
  }, [initialized, loading, isAuthenticated, fetchPets])

  // Funciones para manejar el formulario
  const openAddForm = useCallback(() => {
    setFormState({
      isOpen: true,
      mode: 'add',
      selectedPetId: null,
      selectedPet: null
    })
  }, [])

  const openEditForm = useCallback(
    (petId) => {
      const pet = pets.find((p) => p.id === petId)
      setFormState({
        isOpen: true,
        mode: 'edit',
        selectedPetId: petId,
        selectedPet: pet
      })
    },
    [pets]
  )

  const closeForm = useCallback(() => {
    setFormState({
      isOpen: false,
      mode: 'add',
      selectedPetId: null,
      selectedPet: null
    })
  }, [])

  const addPet = useCallback(
    async (petData, imageFile = null) => {
      try {
        setLoading(true)

        const response = await addPetApi(petData)

        if (imageFile && response.data?.data?.[0]?.id) {
          try {
            const petId = response.data.data[0].id
            await uploadPetImage(petId, imageFile)
            toast.success(`${petData.nombre} ha sido registrado(a) exitosamente.`)
          } catch (imageError) {
            console.error('Error uploading image:', imageError)
            toast.warning(`${petData.nombre} fue registrado(a) pero no se pudo subir la imagen.`)
          }
        } else {
          toast.success(`${petData.nombre} ha sido registrado(a) exitosamente.`)
        }

        const updatedPets = await fetchPets()
        setPets(updatedPets)
        setNoPets(false)
        closeForm()

        return response
      } catch (error) {
        console.error('Error adding pet:', error)
        setError(error)
        toast.error('No se pudo registrar la mascota. Por favor, inténtalo de nuevo.')
        throw error
      } finally {
        setLoading(false)
      }
    },
    [fetchPets, closeForm]
  )

  const updatePet = useCallback(
    async (petId, petData, imageFile = null) => {
      try {
        setLoading(true)

        const response = await updatePetApi(petId, petData)

        if (imageFile) {
          try {
            await uploadPetImage(petId, imageFile)
            toast.success(`${petData.nombre} ha sido actualizado(a) exitosamente.`)
          } catch (imageError) {
            console.error('Error uploading image:', imageError)
            toast.warning(`${petData.nombre} fue actualizado(a) pero no se pudo subir la imagen.`)
          }
        } else {
          toast.success(`${petData.nombre} ha sido actualizado(a) exitosamente.`)
        }

        const updatedPets = await fetchPets()
        setPets(updatedPets)
        closeForm()

        return response
      } catch (error) {
        console.error('Error updating pet:', error)
        setError(error)
        toast.error('No se pudo actualizar la mascota. Por favor, inténtalo de nuevo.')
        throw error
      } finally {
        setLoading(false)
      }
    },
    [fetchPets, closeForm]
  )

  const deletePet = useCallback(
    async (petId) => {
      try {
        setLoading(true)
        const petToDelete = pets.find((pet) => pet.id === petId)

        await deletePetApi(petId)
        setPets((prevPets) => {
          const updatedPets = prevPets.filter((pet) => pet.id !== petId)
          setNoPets(updatedPets.length === 0)
          return updatedPets
        })

        if (petToDelete) {
          toast.success('Mascota eliminada correctamente')
        }
      } catch (error) {
        console.error('Error deleting pet:', error)
        setError(error)
        toast.error('No se pudo eliminar la mascota. Por favor, inténtalo de nuevo.')
        throw error
      } finally {
        setLoading(false)
      }
    },
    [pets]
  )

  const submitForm = useCallback(
    async (petData, imageFile = null) => {
      if (formState.mode === 'add') {
        return await addPet(petData, imageFile)
      } else {
        return await updatePet(formState.selectedPetId, petData, imageFile)
      }
    },
    [formState.mode, formState.selectedPetId, addPet, updatePet]
  )

  const value = {
    // Estado de mascotas
    pets,
    loading,
    error,
    noPets,
    initialized,

    // Acciones de mascotas
    fetchPets,
    initializePets,
    deletePet,

    // Estado del formulario
    formState,

    // Acciones del formulario
    openAddForm,
    openEditForm,
    closeForm,
    submitForm
  }

  return <PetsContext.Provider value={value}>{children}</PetsContext.Provider>
}

export { PetsContext }
