import { breedsService } from '../local/breeds.js'

export const getBreeds = async () => {
  return await breedsService.getBreeds()
}

export const getSpecies = async () => {
  return await breedsService.getSpecies()
}