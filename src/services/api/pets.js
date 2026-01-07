import { petsService } from '../local/pets.js'
import { getCurrentUserId } from '@/lib/utils'

export const getPets = async () => {
  const userId = getCurrentUserId()
  return await petsService.getPets(userId)
}

export const addPet = async (petData) => {
  const userId = getCurrentUserId()
  return await petsService.createPet(petData, userId)
}

export const updatePet = async (petId, petData) => {
  const userId = getCurrentUserId()
  return await petsService.updatePet(petId, petData, userId)
}

export const deletePet = async (petId) => {
  const userId = getCurrentUserId()
  return await petsService.deletePet(petId, userId)
}

export const uploadPetImage = async (petId, imageFile) => {
  const userId = getCurrentUserId()
  return await petsService.uploadPetImage(petId, imageFile, userId)
}