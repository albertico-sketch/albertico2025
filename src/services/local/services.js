// Servicio de servicios veterinarios local
import { localDB } from '@/lib/database.js'

export const servicesService = {
  // Obtener todos los servicios
  async getServices() {
    try {
      const services = await localDB.getAll('services')
      const categories = await localDB.getAll('categories')
      
      // Enriquecer servicios con información de categoría
      const enrichedServices = services.map(service => {
        const category = categories.find(cat => cat.id === service.categoria_id)
        return {
          ...service,
          categoria_nombre: category?.nombre || 'Sin categoría'
        }
      })
      
      return { data: enrichedServices }
    } catch (error) {
      console.error('Error getting services:', error)
      throw error
    }
  },

  // Obtener servicio por ID
  async getServiceById(id) {
    try {
      const service = await localDB.getById('services', parseInt(id))
      if (!service) {
        throw new Error('Servicio no encontrado')
      }
      
      const categories = await localDB.getAll('categories')
      const category = categories.find(cat => cat.id === service.categoria_id)
      
      return {
        data: {
          ...service,
          categoria_nombre: category?.nombre || 'Sin categoría'
        }
      }
    } catch (error) {
      console.error('Error getting service by ID:', error)
      throw error
    }
  },

  // Crear nuevo servicio
  async createService(serviceData) {
    try {
      const newService = {
        ...serviceData,
        disponible: serviceData.disponible ?? true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      const service = await localDB.create('services', newService)
      return { data: service }
    } catch (error) {
      console.error('Error creating service:', error)
      throw error
    }
  },

  // Actualizar servicio
  async updateService(id, serviceData) {
    try {
      const existingService = await localDB.getById('services', parseInt(id))
      if (!existingService) {
        throw new Error('Servicio no encontrado')
      }
      
      const updatedService = {
        ...existingService,
        ...serviceData,
        updated_at: new Date().toISOString()
      }
      
      const service = await localDB.update('services', updatedService)
      return { data: service }
    } catch (error) {
      console.error('Error updating service:', error)
      throw error
    }
  },

  // Eliminar servicio
  async deleteService(id) {
    try {
      const success = await localDB.delete('services', parseInt(id))
      return { data: { success } }
    } catch (error) {
      console.error('Error deleting service:', error)
      throw error
    }
  },

  // Obtener categorías
  async getCategories() {
    try {
      const categories = await localDB.getAll('categories')
      return { data: categories }
    } catch (error) {
      console.error('Error getting categories:', error)
      throw error
    }
  }
}