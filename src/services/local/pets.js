// Servicio de mascotas local
import { localDB } from '@/lib/database.js'
import { fileStorage } from '@/lib/fileStorage.js'

export const petsService = {
  // Obtener mascotas del usuario actual
  async getPets(userId) {
    try {
      const pets = await localDB.getByIndex('pets', 'cliente_id', userId)
      const species = await localDB.getAll('species')
      const breeds = await localDB.getAll('breeds')
      const users = await localDB.getAll('users')
      
      // Enriquecer mascotas con información relacionada
      const enrichedPets = await Promise.all(pets.map(async pet => {
        const especie = species.find(s => s.id === pet.especie_id)
        const raza = breeds.find(b => b.id === pet.raza_id)
        const cliente = users.find(u => u.id === pet.cliente_id)
        
        // Obtener imagen de la mascota
        const files = await fileStorage.getFilesByEntity('pet', pet.id)
        const imageFile = files.find(f => f.mime_type?.startsWith('image/'))
        let img_url = `https://api.dicebear.com/9.x/adventurer/svg?seed=${pet.nombre}`
        
        if (imageFile) {
          img_url = await fileStorage.getFileUrl(imageFile.id)
        }
        
        return {
          ...pet,
          nombre_especie: especie?.nombre || 'Desconocida',
          nombre_raza: raza?.nombre || 'Desconocida',
          nombre_cliente: cliente ? `${cliente.nombre} ${cliente.apellido}` : 'Desconocido',
          img_url
        }
      }))
      
      return { data: enrichedPets }
    } catch (error) {
      console.error('Error getting pets:', error)
      throw error
    }
  },

  // Crear nueva mascota
  async createPet(petData, userId) {
    try {
      const newPet = {
        ...petData,
        cliente_id: userId,
        fecha_registro: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      
      const pet = await localDB.create('pets', newPet)
      return { data: { data: [pet] } }
    } catch (error) {
      console.error('Error creating pet:', error)
      throw error
    }
  },

  // Actualizar mascota
  async updatePet(petId, petData, userId) {
    try {
      const existingPet = await localDB.getById('pets', parseInt(petId))
      if (!existingPet || existingPet.cliente_id !== userId) {
        throw new Error('Mascota no encontrada')
      }
      
      const updatedPet = {
        ...existingPet,
        ...petData,
        updated_at: new Date().toISOString()
      }
      
      const pet = await localDB.update('pets', updatedPet)
      return { data: pet }
    } catch (error) {
      console.error('Error updating pet:', error)
      throw error
    }
  },

  // Eliminar mascota
  async deletePet(petId, userId) {
    try {
      const existingPet = await localDB.getById('pets', parseInt(petId))
      if (!existingPet || existingPet.cliente_id !== userId) {
        throw new Error('Mascota no encontrada')
      }
      
      // Eliminar archivos asociados
      await fileStorage.deleteFilesByEntity('pet', parseInt(petId))
      
      // Eliminar mascota
      const success = await localDB.delete('pets', parseInt(petId))
      return { data: { success } }
    } catch (error) {
      console.error('Error deleting pet:', error)
      throw error
    }
  },

  // Subir imagen de mascota
  async uploadPetImage(petId, imageFile, userId) {
    try {
      const pet = await localDB.getById('pets', parseInt(petId))
      if (!pet || pet.cliente_id !== userId) {
        throw new Error('Mascota no encontrada')
      }
      
      // Eliminar imagen anterior si existe
      const existingFiles = await fileStorage.getFilesByEntity('pet', parseInt(petId))
      const existingImage = existingFiles.find(f => f.mime_type?.startsWith('image/'))
      if (existingImage) {
        await fileStorage.deleteFile(existingImage.id)
      }
      
      // Guardar nueva imagen
      const file = await fileStorage.saveFile(imageFile, 'pet', parseInt(petId))
      return { data: file }
    } catch (error) {
      console.error('Error uploading pet image:', error)
      throw error
    }
  }
}