// Servicio de autenticación local
import { localDB } from '@/lib/database.js'
import { generateToken, verifyToken, hashPassword, verifyPassword } from '@/lib/auth.js'

export const authService = {
  // Registro de usuario
  async register(userData) {
    try {
      // Verificar si el email ya existe
      const existingUsers = await localDB.getByIndex('users', 'email', userData.email)
      if (existingUsers.length > 0) {
        throw new Error('El correo electrónico ya está registrado')
      }

      // Hash de la contraseña
      const hashedPassword = await hashPassword(userData.password)

      // Crear usuario
      const newUser = {
        nombre: userData.nombre,
        apellido: userData.apellido,
        email: userData.email,
        telefono: userData.telefono || null,
        direccion: userData.direccion || null,
        password: hashedPassword,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      const user = await localDB.create('users', newUser)
      
      // Generar tokens
      const accessToken = generateToken({ 
        id: user.id, 
        email: user.email, 
        nombre: user.nombre, 
        apellido: user.apellido 
      })
      const refreshToken = generateToken({ id: user.id }, '7d')

      // Guardar sesión
      await localDB.create('sessions', {
        user_id: user.id,
        token: refreshToken,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString()
      })

      return {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email
        }
      }
    } catch (error) {
      console.error('Error in register:', error)
      throw error
    }
  },

  // Inicio de sesión
  async login(credentials) {
    try {
      const users = await localDB.getByIndex('users', 'email', credentials.email)
      if (users.length === 0) {
        throw new Error('Credenciales inválidas')
      }

      const user = users[0]
      const isValidPassword = await verifyPassword(credentials.password, user.password)
      
      if (!isValidPassword) {
        throw new Error('Credenciales inválidas')
      }

      // Generar tokens
      const accessToken = generateToken({ 
        id: user.id, 
        email: user.email, 
        nombre: user.nombre, 
        apellido: user.apellido 
      })
      const refreshToken = generateToken({ id: user.id }, '7d')

      // Guardar sesión
      await localDB.create('sessions', {
        user_id: user.id,
        token: refreshToken,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString()
      })

      return {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email
        }
      }
    } catch (error) {
      console.error('Error in login:', error)
      throw error
    }
  },

  // Renovar token
  async refreshToken(refreshToken) {
    try {
      const decoded = verifyToken(refreshToken)
      const sessions = await localDB.getByIndex('sessions', 'token', refreshToken)
      
      if (sessions.length === 0) {
        throw new Error('Token inválido')
      }

      const session = sessions[0]
      if (new Date(session.expires_at) < new Date()) {
        await localDB.delete('sessions', session.id)
        throw new Error('Token expirado')
      }

      const user = await localDB.getById('users', decoded.id)
      if (!user) {
        throw new Error('Usuario no encontrado')
      }

      // Generar nuevos tokens
      const newAccessToken = generateToken({ 
        id: user.id, 
        email: user.email, 
        nombre: user.nombre, 
        apellido: user.apellido 
      })
      const newRefreshToken = generateToken({ id: user.id }, '7d')

      // Actualizar sesión
      await localDB.update('sessions', {
        ...session,
        token: newRefreshToken,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date().toISOString()
      })

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      }
    } catch (error) {
      console.error('Error in refreshToken:', error)
      throw error
    }
  },

  // Cerrar sesión
  async logout(refreshToken) {
    try {
      const sessions = await localDB.getByIndex('sessions', 'token', refreshToken)
      if (sessions.length > 0) {
        await localDB.delete('sessions', sessions[0].id)
      }
      return { success: true }
    } catch (error) {
      console.error('Error in logout:', error)
      throw error
    }
  }
}