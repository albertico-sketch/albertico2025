import { appointmentsService } from '../local/appointments.js'
import { getCurrentUserId } from '@/lib/utils'

export const getAppointments = async () => {
  const userId = getCurrentUserId()
  return await appointmentsService.getAppointments(userId)
}

export const createAppointment = async (appointmentData) => {
  const userId = getCurrentUserId()
  return await appointmentsService.createAppointment(appointmentData, userId)
}

export const cancelAppointment = async (appointmentId) => {
  const userId = getCurrentUserId()
  return await appointmentsService.cancelAppointment(appointmentId, userId)
}

export const getBlockedSlots = async (serviceId, date) => {
  return await appointmentsService.getBlockedSlots(serviceId, date)
}