// Servicio de especies y razas local
import { localDB } from '@/lib/database.js'

export const breedsService = {
  // Obtener todas las especies
  async getSpecies() {
    try {
      const species = await localDB.getAll('species')
      return { data: species }
    } catch (error) {
      console.error('Error getting species:', error)
      throw error
    }
  },

  // Obtener todas las razas
  async getBreeds() {
    try {
      const breeds = await localDB.getAll('breeds')
      return { data: breeds }
    } catch (error) {
      console.error('Error getting breeds:', error)
      throw error
    }
  },

  // Obtener razas por especie
  async getBreedsBySpecies(speciesId) {
    try {
      const breeds = await localDB.getByIndex('breeds', 'especie_id', parseInt(speciesId))
      return { data: breeds }
    } catch (error) {
      console.error('Error getting breeds by species:', error)
      throw error
    }
  }
}