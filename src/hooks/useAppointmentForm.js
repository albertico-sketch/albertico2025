import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { appointmentSchema } from '@/schemas/appointmentSchema'
import { usePets } from '@/hooks/usePets'
import { useServices } from '@/hooks/useServices'
import { useAppointments } from '@/hooks/useAppointments'
import { getCurrentDateInCDMX } from '@/lib/utils'

export function useAppointmentForm() {
  const { pets, loading: petsLoading, initializePets } = usePets()
  const { services, loading: servicesLoading, initializeServices } = useServices()
  const { addAppointment, getBlockedSlots, loadingSlots, formState } = useAppointments()
  const navigate = useNavigate()

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const [blockedSlots, setBlockedSlots] = useState([])
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [validatedData, setValidatedData] = useState(null)

  const form = useForm({
    resolver: zodResolver(appointmentSchema),
    mode: 'onChange',
    defaultValues: {
      mascota_id: '',
      servicio_id: '',
      status: 'Programada',
      fecha: getCurrentDateInCDMX(),
      hora_inicio: '',
      motivo_consulta: ''
    }
  })

  const { handleSubmit, control, trigger, getValues, setValue, watch, reset, formState: { errors, isSubmitting } } = form

  // Resetear el formulario cuando se cierra PERO mantener servicio preseleccionado cuando se abre
  useEffect(() => {
    if (!formState.isOpen) {
      reset({
        mascota_id: '',
        servicio_id: '',
        status: 'Programada',
        fecha: getCurrentDateInCDMX(),
        hora_inicio: '',
        motivo_consulta: ''
      })
      setCurrentStep(1)
      setBlockedSlots([])
      setShowConfirmDialog(false)
      setValidatedData(null)
    } else if (formState.isOpen && formState.preselectedServiceId && services.length > 0) {
      const serviceIdString = String(formState.preselectedServiceId)

      reset({
        mascota_id: '',
        servicio_id: serviceIdString,
        status: 'Programada',
        fecha: getCurrentDateInCDMX(),
        hora_inicio: '',
        motivo_consulta: ''
      })
    }
  }, [formState.isOpen, formState.preselectedServiceId, services.length, reset])

  const fetchBlockedSlots = useCallback(async () => {
    const currentDate = getValues('fecha')
    const currentServiceId = getValues('servicio_id')

    if (currentDate && currentServiceId) {
      try {
        const { blocked_slots } = await getBlockedSlots(Number(currentServiceId), currentDate)
        setBlockedSlots(blocked_slots || [])
      } catch (error) {
        console.error('Error fetching blocked slots:', error)
        setBlockedSlots([])
      }
    } else {
      setBlockedSlots([])
    }
  }, [getBlockedSlots, getValues])

  // Effects
  useEffect(() => {
    initializePets()
    initializeServices()
  }, [initializePets, initializeServices])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'fecha' || name === 'servicio_id') {
        fetchBlockedSlots()
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, fetchBlockedSlots])

  useEffect(() => {
    const fecha = getValues('fecha')
    const servicioId = getValues('servicio_id')
    if (fecha && servicioId) {
      fetchBlockedSlots()
    }
  }, [getValues, fetchBlockedSlots])

  useEffect(() => {
    const currentTime = getValues('hora_inicio')
    if (currentTime && blockedSlots.includes(currentTime)) {
      setValue('hora_inicio', '')
    }
  }, [blockedSlots, getValues, setValue])

  // Navigation functions
  const nextStep = async (event) => {
    event?.preventDefault()
    let fieldsToValidate = []

    if (currentStep === 1) {
      fieldsToValidate = ['mascota_id', 'servicio_id']
    } else if (currentStep === 2) {
      fieldsToValidate = ['fecha']
    } else if (currentStep === 3) {
      fieldsToValidate = ['hora_inicio']
    }

    const isStepValid = await trigger(fieldsToValidate)

    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
    }
  }

  const prevStep = (event) => {
    event?.preventDefault()
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  // Submit functions
  const handleFormSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        servicio_id: Number(data.servicio_id)
      }
      setValidatedData(formData)
      setShowConfirmDialog(true)
    } catch (error) {
      console.error('Error al validar los datos:', error)
    }
  }

  const handleConfirmAppointment = async () => {
    try {
      await addAppointment(validatedData)
      setShowConfirmDialog(false)
      navigate('/citas')
    } catch (error) {
      console.error('Error al procesar la cita:', error)
    }
  }

  return {
    // Form state
    control,
    errors,
    isSubmitting,
    getValues,
    handleSubmit,

    // Step management
    currentStep,
    totalSteps,
    nextStep,
    prevStep,

    // Data
    pets,
    services,
    blockedSlots,

    // Loading states
    petsLoading,
    servicesLoading,
    loadingSlots,

    // Confirmation dialog
    showConfirmDialog,
    setShowConfirmDialog,
    validatedData,

    // Handlers
    handleFormSubmit,
    handleConfirmAppointment
  }
}
