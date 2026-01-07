import { useState, useEffect } from 'react'
import { getBreeds, getSpecies } from '@/services/api/breeds'

// Variables globales para cache - solo se cargan una vez
let breedsData = null
let speciesData = null
let isInitialized = false
let initPromise = null

async function initializeData() {
  // Si ya tenemos datos válidos, devolverlos inmediatamente
  if (isInitialized && breedsData && speciesData) {
    return { breeds: breedsData, species: speciesData }
  }

  // Si ya hay una petición en curso, esperar a que termine
  if (initPromise) {
    return initPromise
  }

  // Crear nueva promesa para cargar los datos (solo la primera vez)
  initPromise = Promise.all([
    getBreeds(),
    getSpecies()
  ]).then(([breedsResponse, speciesResponse]) => {
    // Validar que las respuestas tengan datos
    if (!breedsResponse?.data || !speciesResponse?.data) {
      throw new Error('Respuesta inválida del servidor')
    }

    breedsData = breedsResponse.data
    speciesData = speciesResponse.data
    isInitialized = true

    return { breeds: breedsData, species: speciesData }
  }).catch((error) => {
    // En caso de error, resetear para permitir reintentos
    initPromise = null
    console.error('Error al cargar breeds/species:', error)
    throw error
  })

  return initPromise
}

export function useBreeds() {
  // Inicializar con datos de caché si están disponibles, sino arrays vacíos
  const [breeds, setBreeds] = useState(() => breedsData || [])
  const [species, setSpecies] = useState(() => speciesData || [])
  const [loading, setLoading] = useState(() => !isInitialized)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Si ya tenemos datos inicializados, actualizar estado y salir
    if (isInitialized && breedsData && speciesData) {
      setBreeds(breedsData)
      setSpecies(speciesData)
      setLoading(false)
      return
    }

    // Solo cargar datos si no están inicializados
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)

        const { breeds: loadedBreeds, species: loadedSpecies } = await initializeData()

        // Validar que los datos sean arrays válidos
        if (Array.isArray(loadedBreeds) && Array.isArray(loadedSpecies)) {
          setBreeds(loadedBreeds)
          setSpecies(loadedSpecies)
        } else {
          throw new Error('Los datos recibidos no son arrays válidos')
        }
      } catch (err) {
        console.error('Error loading breeds/species:', err)
        setError(err)
        // Mantener arrays vacíos en caso de error
        setBreeds([])
        setSpecies([])
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return {
    breeds,
    species,
    loading,
    error
  }
}
