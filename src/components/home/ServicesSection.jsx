import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Stethoscope, CheckCircle, Sparkles, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const veterinaryServices = [
  'Consulta Médica General',
  'Vacunación Completa',
  'Desparasitación',
  'Esterilización',
  'Análisis de Sangre'
]

const groomingServices = [
  'Baño Básico',
  'Corte de Pelo',
  'Limpieza de Oídos',
  'Cepillado de Dientes',
  'Tratamiento Antpulgas'
]

export function ServicesSection() {
  return (
    <section className="py-12 md:py-20 px-4 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Servicios Veterinarios</h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Cuidado integral para todas las necesidades de tus mascotas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 md:gap-8 gap-6">
          <Card className="relative group transition-shadow duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">Veterinaria</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-4">
                {veterinaryServices.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm md:text-base text-muted-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <Stethoscope className="absolute top-6 right-6 w-10 h-10 text-primary/20 group-hover:text-primary/50 transition-colors duration-300" />
          </Card>

          <Card className="relative group transition-shadow duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">Estética</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-4">
                {groomingServices.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm md:text-base text-muted-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <Sparkles className="absolute top-6 right-6 w-10 h-10 text-primary/20 group-hover:text-primary/50 transition-colors duration-300" />
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="text-base">
            <Link to="/servicios">
              Ver Todos los Servicios
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
