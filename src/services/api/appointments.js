@@ .. @@
-import { api } from './config'
+import { appointmentsService } from '../local/appointments.js'
+import { getCurrentUserId } from '@/lib/utils'

-export const getAppointments = async () => {
-  const response = await api.get('/appointments')
-  return response.data
-}
+export const getAppointments = async () => {
+  const userId = getCurrentUserId()
+  return await appointmentsService.getAppointments(userId)
+}

-export const createAppointment = async (appointmentData) => {
-  const response = await api.post('/appointments', appointmentData)
-  return response.data
-}
+export const createAppointment = async (appointmentData) => {
+  const userId = getCurrentUserId()
+  return await appointmentsService.createAppointment(appointmentData, userId)
+}

-export const cancelAppointment = async (appointmentId) => {
-  const response = await api.put(`/appointments/${appointmentId}/cancel`)
-  return response.data
-}
+export const cancelAppointment = async (appointmentId) => {
+  const userId = getCurrentUserId()
+  return await appointmentsService.cancelAppointment(appointmentId, userId)
+}

-export const getBlockedSlots = async (serviceId, date) => {
-  const response = await api.get(`/appointments/blocked-slots?service_id=${serviceId}&date=${date}`)
-  return response.data
-}
+export const getBlockedSlots = async (serviceId, date) => {
+  return await appointmentsService.getBlockedSlots(serviceId, date)
+}