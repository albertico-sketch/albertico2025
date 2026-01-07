@@ .. @@
-import { api } from './config'
+import { breedsService } from '../local/breeds.js'

-export const getBreeds = async () => {
-  const response = await api.get('/breeds')
-  return response.data
-}
+export const getBreeds = async () => {
+  return await breedsService.getBreeds()
+}

-export const getSpecies = async () => {
-  const response = await api.get('/species')
-  return response.data
-}
+export const getSpecies = async () => {
+  return await breedsService.getSpecies()
+}