@@ .. @@
-import { api } from './config'
+import { servicesService } from '../local/services.js'

-export const getServices = async () => {
-  const response = await api.get('/services')
-  return response.data
-}
+export const getServices = async () => {
+  return await servicesService.getServices()
+}