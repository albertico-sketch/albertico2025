@@ .. @@
-import { api } from './config'
+import { petsService } from '../local/pets.js'
+import { getCurrentUserId } from '@/lib/utils'

-export const getPets = async () => {
-  const response = await api.get('/pets')
-  return response.data
-}
+export const getPets = async () => {
+  const userId = getCurrentUserId()
+  return await petsService.getPets(userId)
+}

-export const addPet = async (petData) => {
-  const response = await api.post('/pets', petData)
-  return response.data
-}
+export const addPet = async (petData) => {
+  const userId = getCurrentUserId()
+  return await petsService.createPet(petData, userId)
+}

-export const updatePet = async (petId, petData) => {
-  const response = await api.put(`/pets/${petId}`, petData)
-  return response.data
-}
+export const updatePet = async (petId, petData) => {
+  const userId = getCurrentUserId()
+  return await petsService.updatePet(petId, petData, userId)
+}

-export const deletePet = async (petId) => {
-  const response = await api.delete(`/pets/${petId}`)
-  return response.data
-}
+export const deletePet = async (petId) => {
+  const userId = getCurrentUserId()
+  return await petsService.deletePet(petId, userId)
+}

-export const uploadPetImage = async (petId, imageFile) => {
-  const formData = new FormData()
-  formData.append('image', imageFile)
-  const response = await api.post(`/pets/${petId}/image`, formData, {
-    headers: {
-      'Content-Type': 'multipart/form-data'
-    }
-  })
-  return response.data
-}
+export const uploadPetImage = async (petId, imageFile) => {
+  const userId = getCurrentUserId()
+  return await petsService.uploadPetImage(petId, imageFile, userId)
+}