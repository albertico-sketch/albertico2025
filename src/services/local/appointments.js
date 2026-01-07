// Servicio de citas local
import { localDB } from '@/lib/database.js'

export const appointmentsService = {
  // Obtener citas del usuario
  async getAppointments(userId) {
    try {
      const appointments = await localDB.getByIndex('appointments', 'cliente_id', userId)
      const pets = await localDB.getAll('pets')
      const services = await localDB.getAll('services')
      const users = await localDB.getAll('users')
      
      // Enriquecer citas con información relacionada
      const enrichedAppointments = appointments.map(appointment => {
        const pet = pets.find(p => p.id === appointment.mascota_id)
        const service = services.find(s => s.id === appointment.servicio_id)
        const professional = users.find(u => u.id === appointment.profesional_id)
        
        return {
          ...appointment,
          nombre_mascota: pet?.nombre || 'Desconocida',
          img_url: `https://api.dicebear.com/9.x/adventurer/svg?seed=${pet?.nombre || 'default'}`,
          nombre_servicio: service?.nombre || 'Desconocido',
          nombre_profesional: professional ? `Dr. ${professional.nombre} ${professional.apellido}` : 'Dr. Veterinario'
        }
      })
      
      // Ordenar por fecha descendente
      enrichedAppointments.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      
      return { data: enrichedAppointments }
    } catch (error) {
      console.error('Error getting appointments:', error)
      throw error
    }
  },

  // Crear nueva cita
  async createAppointment(appointmentData, userId) {
    try {
      const newAppointment = {
        ...appointmentData,
        cliente_id: userId,
        profesional_id: 1, // ID del veterinario por defecto
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      const appointment = await localDB.create('appointments', newAppointment)
      return { data: appointment }
    } catch (error) {
      console.error('Error creating appointment:', error)
      throw error
    }
  },

  // Cancelar cita
  async cancelAppointment(appointmentId, userId) {
    try {
      const appointment = await localDB.getById('appointments', parseInt(appointmentId))
      if (!appointment || appointment.cliente_id !== userId) {
        throw new Error('Cita no encontrada')
      }
      
      const updatedAppointment = {
        ...appointment,
        status: 'Cancelada',
        updated_at: new Date().toISOString()
      }
      
      const result = await localDB.update('appointments', updatedAppointment)
      return { data: result }
    } catch (error) {
      console.error('Error canceling appointment:', error)
      throw error
    }
  },

  // Obtener horarios bloqueados
  async getBlockedSlots(serviceId, date) {
    try {
      const appointments = await localDB.getAll('appointments')
      
      // Filtrar citas del mismo servicio y fecha que no estén canceladas
      const blockedAppointments = appointments.filter(apt => 
        apt.servicio_id === parseInt(serviceId) && 
        apt.fecha === date && 
        apt.status !== 'Cancelada'
      )
      
      const blockedSlots = blockedAppointments.map(apt => apt.hora_inicio)
      
      return { data: { blocked_slots: blockedSlots } }
    } catch (error) {
      console.error('Error getting blocked slots:', error)
      throw error
    }
  }
}