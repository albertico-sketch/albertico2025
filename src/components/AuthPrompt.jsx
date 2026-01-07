import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

export function AuthPrompt({ icon, message }) {
  const navigate = useNavigate()

  return (
    <Card className="w-full items-center text-center p-8 gap-6">
      <div className="text-5xl" role="img" aria-label="icon">
        {icon}
      </div>
      <CardContent className="flex flex-col items-center gap-4 p-0">
        <h3 className="text-xl font-semibold">Inicia Sesión</h3>
        <p className="text-muted-foreground mb-2">{message}</p>
        <div className="flex gap-4">
          <Button onClick={() => navigate('/login')}>Iniciar sesión</Button>
          <Button variant="outline" onClick={() => navigate('/register')}>
            Registrarse
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
