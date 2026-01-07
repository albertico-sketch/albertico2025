import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Stethoscope, Users, Clock, Shield, Star, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const features = [
  {
    icon: Users,
    title: 'Gestión de Mascotas',
    description: 'Registra y administra toda la información de tus mascotas en un perfil completo.',
    link: '/mascotas',
    linkText: 'Ver Mascotas',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10'
  },
  {
    icon: Calendar,
    title: 'Citas Inteligentes',
    description: 'Agenda citas veterinarias en tiempo real y consulta horarios disponibles al instante.',
    link: '/citas',
    linkText: 'Agendar Cita',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  {
    icon: Stethoscope,
    title: 'Servicios Completos',
    description: 'Accede a una amplia gama de servicios veterinarios especializados.',
    link: '/servicios',
    linkText: 'Ver Servicios',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10'
  },
  {
    icon: Clock,
    title: 'Historial Médico',
    description: 'Mantén un registro completo del historial médico y tratamientos.',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10'
  },
  {
    icon: Shield,
    title: 'Datos Seguros',
    description: 'Tu información y la de tus mascotas está protegida con los más altos estándares.',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10'
  },
  {
    icon: Star,
    title: 'Profesionales Certificados',
    description: 'Conecta con veterinarios certificados y especialistas de confianza.',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10'
  }
]

export function FeaturesSection() {
  return (
    <section className="py-12 md:py-20 px-4 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Todo lo que necesitas para cuidar a tus mascotas
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Una plataforma completa que simplifica la gestión veterinaria para dueños y profesionales.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-muted hover:border-primary/20 bg-background/80 backdrop-blur-sm"
            >
              <CardHeader>
                <div
                  className={`w-12 h-12 ${feature.bgColor} group-hover:bg-primary/15 rounded-lg flex items-center justify-center mb-4 transition-colors`}
                >
                  <feature.icon className={`w-6 h-6 ${feature.color} group-hover:text-primary transition-colors`} />
                </div>
                <CardTitle className="text-lg md:text-xl group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-sm md:text-base">{feature.description}</CardDescription>
              </CardHeader>
              {feature.link && (
                <CardContent>
                  <Button asChild variant="ghost" className="p-0 h-auto">
                    <Link to={feature.link} className="flex items-center text-primary hover:underline py-2">
                      {feature.linkText} <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
