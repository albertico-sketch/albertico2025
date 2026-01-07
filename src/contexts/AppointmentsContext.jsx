import { createContext, useCallback, useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'
import {
  getAppointments as getAppointmentsApi,
  createAppointment as addAppointmentApi,
  cancelAppointment as cancelAppointmentApi,
  getBlockedSlots as getBlockedSlotsApi
} from '@/services/api/appointments'

const AppointmentsContext = createContext()

export function AppointmentsProvider({ children }) {
  const { isAuthenticated } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [noAppointments, setNoAppointments] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [error, setError] = useState(null)
  const [initialized, setInitialized] = useState(false)

  const [formState, setFormState] = useState({
    isOpen: false,
    preselectedServiceId: null
  })

  useEffect(() => {
    if (!isAuthenticated) {
      setAppointments([])
      setNoAppointments(false)
      setLoadingSlots(false)
      setError(null)
      setInitialized(false)
      setFormState({ isOpen: false, preselectedServiceId: null })
    }
  }, [isAuthenticated])

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await getAppointmentsApi()
      setAppointments(data)
      setNoAppointments(data.length === 0)
      setInitialized(true)
      return data
    } catch (error) {
      console.error('Error fetching appointments:', error)
      setError(error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  const addAppointment = useCallback(
    async (data) => {
      try {
        setLoading(true)
        const response = await addAppointmentApi(data)
        const updatedAppointments = await fetchAppointments()
        setAppointments(updatedAppointments)
        setNoAppointments(updatedAppointments.length === 0)
        setFormState({ isOpen: false, preselectedServiceId: null })
        toast.success('Cita agendada exitosamente')
        return response.data
      } catch (error) {
        console.error('Error adding appointment:', error)
        setError(error)
        toast.error('Error al agendar la cita')
        throw error
      } finally {
        setLoading(false)
      }
    },
    [fetchAppointments]
  )

  const initializeAppointments = useCallback(() => {
    if (!initialized && !loading && isAuthenticated) {
      fetchAppointments()
    }
  }, [initialized, loading, isAuthenticated, fetchAppointments])

  const cancelAppointment = async (id) => {
    try {
      const { data } = await cancelAppointmentApi(id)
      toast.success('Cita cancelada exitosamente')
      return data
    } catch (error) {
      console.error('Error canceling appointment:', error)
      setError(error)
      toast.error('Error cancelando la cita')
      throw error
    } finally {
      await fetchAppointments()
    }
  }

  const openForm = useCallback((serviceId = null) => {
    setFormState({
      isOpen: true,
      preselectedServiceId: serviceId
    })
  }, [])

  const closeForm = useCallback(() => {
    setFormState({
      isOpen: false,
      preselectedServiceId: null
    })
  }, [])

  const getBlockedSlots = useCallback(async (service_id, date) => {
    try {
      setLoadingSlots(true)
      const { data } = await getBlockedSlotsApi(service_id, date)
      return data
    } catch (error) {
      console.error('Error getting blocked slots:', error)
      setError(error)
      throw error
    } finally {
      setLoadingSlots(false)
    }
  }, [])

  const value = {
    appointments,
    noAppointments,
    loading,
    loadingSlots,
    error,
    initialized,
    addAppointment,
    fetchAppointments,
    cancelAppointment,
    initializeAppointments,
    getBlockedSlots,
    formState,
    openForm,
    closeForm
  }

  return <AppointmentsContext.Provider value={value}>{children}</AppointmentsContext.Provider>
}

export { AppointmentsContext }
