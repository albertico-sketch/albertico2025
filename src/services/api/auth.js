@@ .. @@
-import { api } from './config'
+import { authService } from '../local/auth.js'

-export const login = async ({ input }) => {
-  const response = await api.post('/auth/login', input)
-  return response.data
-}
+export const login = async ({ input }) => {
+  return await authService.login(input)
+}

-export const register = async ({ input }) => {
-  const response = await api.post('/auth/register', input)
-  return response.data
-}
+export const register = async ({ input }) => {
+  return await authService.register(input)
+}

-export const logout = async ({ refreshToken }) => {
-  const response = await api.post('/auth/logout', { refreshToken })
-  return response.data
-}
+export const logout = async ({ refreshToken }) => {
+  return await authService.logout(refreshToken)
+}

-export const refreshToken = async ({ refreshToken }) => {
-  const response = await api.post('/auth/refresh', { refreshToken })
-  return response.data
-}
+export const refreshToken = async ({ refreshToken }) => {
+  return await authService.refreshToken(refreshToken)
+}