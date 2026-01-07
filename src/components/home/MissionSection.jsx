import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, Shield, Clock, Users, Target, Award } from 'lucide-react'

export function MissionSection() {
  const values = [
    {
      icon: Heart,
      title: 'Cuidado Integral',
      description:
        'Nos comprometemos a brindar herramientas que mejoren la calidad de vida de las mascotas y tranquilidad de sus dueños.',
      color: 'text-red-600'
    },
    {
      icon: Shield,
      title: 'Privacidad Garantizada',
      description:
        'Protegemos los datos médicos con encriptación de grado militar y cumplimos con todas las normativas de privacidad.',
      color: 'text-blue-600'
    },
    {
      icon: Clock,
      title: 'Disponibilidad Total',
      description:
        'Nuestra plataforma está disponible 24/7 con soporte técnico inmediato para emergencias veterinarias.',
      color: 'text-green-600'
    },
    {
      icon: Users,
      title: 'Comunidad Unida',
      description:
        'Conectamos a dueños, veterinarios y clínicas en una red colaborativa centrada en el bienestar animal.',
      color: 'text-purple-600'
    }
  ]

  const commitments = [
    {
      icon: Target,
      text: 'Reducir tiempo de espera en consultas veterinarias'
    },
    {
      icon: Award,
      text: 'Mejorar la comunicación entre veterinarios y dueños'
    },
    {
      icon: Heart,
      text: 'Facilitar el seguimiento médico preventivo'
    },
    {
      icon: Shield,
      text: 'Garantizar la seguridad de los datos médicos'
    }
  ]

  return (
    <section className="w-full pt-12 md:pt-20 pb-12 px-4 sm:px-10 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-sm bg-primary/15">
            Nuestro Compromiso
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground/85 mb-6">
            Nuestra misión es revolucionar
            <span className="text-primary block">el cuidado veterinario</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            En Vet Sync creemos que cada mascota merece el mejor cuidado médico. Por eso desarrollamos tecnología que
            conecta, simplifica y mejora la experiencia veterinaria para todos los involucrados en el bienestar animal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 md:gap-8 gap-6 mb-16">
          {values.map((value, index) => {
            const IconComponent = value.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-muted hover:border-primary/20 bg-background/80 backdrop-blur-sm gap-4"
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
                      <IconComponent className={`w-6 h-6 ${value.color} group-hover:scale-110 transition-transform`} />
                    </div>
                    <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {value.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="bg-muted/50 rounded-2xl p-8 md:p-10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-foreground/85 mb-3">Nuestros Compromisos</h3>
            <p className="text-muted-foreground">
              Trabajamos cada día para cumplir estas promesas con nuestra comunidad
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {commitments.map((commitment, index) => {
              const IconComponent = commitment.icon
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg bg-background/60 hover:bg-background/80 transition-all duration-200 border border-transparent hover:border-primary/20"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-foreground/80 font-medium">{commitment.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
