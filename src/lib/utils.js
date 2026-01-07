@@ .. @@
 import { clsx } from 'clsx'
 import { twMerge } from 'tailwind-merge'
+import Cookies from 'js-cookie'
+import { verifyToken } from './auth.js'

 export function cn(...inputs) {
   return twMerge(clsx(inputs))
 }

+export function getCurrentUserId() {
+  try {
+    const token = Cookies.get('accessToken')
+    if (!token) return null
+    
+    const decoded = verifyToken(token)
+    return decoded.id
+  } catch (error) {
+    console.error('Error getting current user ID:', error)
+    return null
+  }
+}
+
 export function getCurrentDateInCDMX() {
   const now = new Date()
   const cdmxOffset = -6 * 60 // UTC-6 en minutos