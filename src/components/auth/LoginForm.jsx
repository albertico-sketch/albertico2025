import { Link, useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/schemas/loginSchema.js'
import { Eye, EyeOff, LoaderCircle } from 'lucide-react'
import { login as loginRequest } from '@/services/api/auth.js'
import { useAuth } from '@/hooks/useAuth'
import { getLoginErrorMessage } from '@/lib/utils'

export function LoginForm() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors
  } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data) => {
    try {
      clearErrors('root.serverError')

      const responseData = await loginRequest({ input: data })
      login(responseData)
      navigate('/')
    } catch (err) {
      console.error('Login error:', err)

      const errorMessage = getLoginErrorMessage(err)

      setError('root.serverError', {
        type: 'manual',
        message: errorMessage
      })
    }
  }

  const handleInputChange = (fieldName) => {
    return (e) => {
      if (errors.root?.serverError) {
        clearErrors('root.serverError')
      }
      return register(fieldName).onChange(e)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="correo@ejemplo.com"
              {...register('email')}
              onChange={handleInputChange('email')}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Contraseña</Label>
              {/* <Link to="/forgot-password" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    ¿Olvidaste tu contraseña?
                  </Link> */}
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className={`pr-10 font-mono ${errors.password ? 'border-red-500' : ''}`}
                {...register('password')}
                onChange={handleInputChange('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500 hover:cursor-pointer" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500 hover:cursor-pointer" />
                )}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          {/* Error del servidor */}
          {errors.root?.serverError && (
            <p className="text-sm text-red-500 text-center bg-red-50 dark:bg-red-950/10 p-3 rounded-md border border-red-200 dark:border-red-800">
              {errors.root.serverError.message}
            </p>
          )}
        </div>

        <div className="mt-4 flex-col gap-2 p-0">
          <Button type="submit" className="w-full hover:cursor-pointer" disabled={isSubmitting}>
            {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : 'Iniciar Sesión'}
          </Button>
        </div>
      </form>

      <Link to="/register" className="text-center text-sm">
        ¿No tienes una cuenta? <span className="underline">Regístrate</span>
      </Link>
    </>
  )
}
