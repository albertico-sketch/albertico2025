import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import Cookies from 'js-cookie'
import { verifyToken } from './auth.js'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function getCurrentUserId() {
  try {
    const token = Cookies.get('accessToken')
    if (!token) return null
    
    const decoded = verifyToken(token)
    return decoded.id
  } catch (error) {
    console.error('Error getting current user ID:', error)
    return null
  }
}

export function getCurrentDateInCDMX() {
  const now = new Date()
  const cdmxOffset = -6 * 60 // UTC-6 en minutos
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000)
  const cdmxTime = new Date(utc + (cdmxOffset * 60000))
  
  const year = cdmxTime.getFullYear()
  const month = String(cdmxTime.getMonth() + 1).padStart(2, '0')
  const day = String(cdmxTime.getDate()).padStart(2, '0')
  
  return `${year}-${month}-${day}`
}

export function generateTimeSlots(date, duration = 30) {
  const slots = []
  const startHour = 8 // 8:00 AM
  const endHour = 18 // 6:00 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += duration) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      slots.push(timeString)
    }
  }
  
  return slots
}

export function sortServicesByCategory(services) {
  return services.sort((a, b) => {
    // Primero por categoría (Veterinaria = 1, Estética = 2)
    if (a.categoria_id !== b.categoria_id) {
      return a.categoria_id - b.categoria_id
    }
    // Luego por nombre alfabéticamente
    return a.nombre.localeCompare(b.nombre)
  })
}

export function getLoginErrorMessage(error) {
  if (error?.response?.status === 401) {
    return 'Credenciales incorrectas. Verifica tu email y contraseña.'
  }
  if (error?.response?.status === 429) {
    return 'Demasiados intentos de inicio de sesión. Intenta de nuevo más tarde.'
  }
  if (error?.response?.status >= 500) {
    return 'Error del servidor. Intenta de nuevo más tarde.'
  }
  if (error?.message) {
    return error.message
  }
  return 'Error al iniciar sesión. Intenta de nuevo.'
}

export function getRegisterErrorMessage(error) {
  if (error?.response?.status === 409) {
    return 'Este correo electrónico ya está registrado.'
  }
  if (error?.response?.status === 422) {
    return 'Los datos proporcionados no son válidos. Verifica la información.'
  }
  if (error?.response?.status >= 500) {
    return 'Error del servidor. Intenta de nuevo más tarde.'
  }
  if (error?.message) {
    return error.message
  }
  return 'Error al registrar usuario. Intenta de nuevo.'
}

export function isEmailDuplicateError(error) {
  return error?.response?.status === 409 && 
         error?.response?.data?.message?.includes('email')
}