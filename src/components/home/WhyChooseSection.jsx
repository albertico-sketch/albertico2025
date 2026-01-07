import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Shield, Calendar, FileText, CheckCircle2, HeadphonesIcon, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export function WhyChooseSection() {
  const { isAuthenticated } = useAuth()

  const reasons = [
    {
      icon: Clock,
      title: 'Ahorro de Tiempo',
      description: 'Agenda citas en segundos y evita largas esperas telefónicas. Gestión rápida y eficiente.',
      benefit: '80% menos tiempo'
    },
    {
      icon: FileText,
      title: 'Historial Centralizado',
      description: 'Todo el historial médico de tus mascotas en un solo lugar, accesible desde cualquier dispositivo.',
      benefit: '100% organizado'
    },
    {
      icon: CheckCircle2,
      title: 'Gestión Simplificada',
      description: 'Administra la información de tus mascotas y citas desde una sola plataforma.',
      benefit: 'Todo integrado'
    },
    {
      icon: Shield,
      title: 'Máxima Seguridad',
      description: 'Datos encriptados y respaldados con los más altos estándares de seguridad médica.',
      benefit: 'Certificado SSL'
    },
    {
      icon: Calendar,
      title: 'Disponibilidad 24/7',
      description: 'Accede a la plataforma y gestiona citas en cualquier momento, desde cualquier lugar.',
      benefit: 'Siempre activo'
    },
    {
      icon: HeadphonesIcon,
      title: 'Soporte Especializado',
      description: 'Equipo de soporte capacitado en veterinaria para resolver cualquier duda o inconveniente.',
      benefit: 'Respuesta < 2h'
    }
  ]

  return (
    <section className="w-full py-16 md:py-20 px-4 sm:px-10 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 text-sm bg-primary/15">
            ¿Por qué Vet Sync?
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground/85 mb-4">
            La mejor decisión para el cuidado
            <span className="text-primary block">de tus mascotas</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre las ventajas que hacen de Vet Sync la plataforma preferida por miles de dueños de mascotas y
            clínicas veterinarias.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-6 mb-10">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-muted hover:border-primary/20 bg-background/80 backdrop-blur-sm gap-4"
              >
                <CardHeader className="gap-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs font-medium bg-green-50 dark:bg-green-700 text-green-700 dark:text-green-50 border-green-200 dark:border-green-500"
                    >
                      {reason.benefit}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {reason.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm leading-relaxed">{reason.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          {!isAuthenticated ? (
            <Button asChild size="lg" className="text-base">
              <Link to="/register">
                Comenzar Ahora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          ) : (
            <Button asChild size="lg" className="text-base">
              <Link to="/citas">
                Agendar Primera Cita
                <Calendar className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
