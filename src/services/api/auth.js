import { authService } from '../local/auth.js'

export const login = async ({ input }) => {
  return await authService.login(input)
}

export const register = async ({ input }) => {
  return await authService.register(input)
}

export const logout = async ({ refreshToken }) => {
  return await authService.logout(refreshToken)
}

export const refreshToken = async ({ refreshToken }) => {
  return await authService.refreshToken(refreshToken)
}