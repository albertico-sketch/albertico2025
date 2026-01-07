import { Controller } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { sortServicesByCategory } from '@/lib/utils'
import { Stethoscope, Bubbles, LoaderCircle, Zap } from 'lucide-react'
import { Image } from '@unpic/react'

export function PetServiceSelection({ control, errors, pets, services, petsLoading, servicesLoading }) {
  const sortedServices = sortServicesByCategory(services)

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Selecciona tu mascota y servicio</h3>

      <div className="grid gap-6">
        {/* Selección de Mascota */}
        <div className="grid gap-2 w-full">
          <Label htmlFor="mascota_id">Mascota</Label>
          <Controller
            name="mascota_id"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select value={value} onValueChange={onChange} disabled={petsLoading || pets.length === 0}>
                <SelectTrigger
                  className={`${errors.mascota_id ? 'border-red-500' : ''} w-full overflow-hidden min-h-12`}
                >
                  <SelectValue
                    placeholder={
                      petsLoading
                        ? 'Cargando mascotas...'
                        : pets.length === 0
                          ? 'No tienes mascotas registradas'
                          : 'Selecciona una mascota'
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {pets.map((pet) => (
                    <SelectItem key={pet.id} value={pet.id}>
                      <div className="flex items-center gap-3">
                        <Image
                          src={pet.img_url}
                          alt={pet.nombre}
                          width={100}
                          aspectRatio={1}
                          loading="lazy"
                          className="rounded-full w-9 h-9"
                        />
                        <span>{pet.nombre}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.mascota_id && <p className="text-sm text-red-500">{errors.mascota_id.message}</p>}
        </div>

        {/* Selección de Servicio */}
        <div className="grid gap-2 w-full">
          <Label htmlFor="servicio_id">Servicio</Label>
          <Controller
            name="servicio_id"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="border rounded-md h-[340px] md:h-[250px] overflow-hidden">
                {servicesLoading ? (
                  <div className="flex items-center justify-center h-[340px] md:h-[250px] p-6">
                    <LoaderCircle className="h-6 w-6 animate-spin text-muted-foreground" />
                    <span className="ml-2 text-sm text-muted-foreground">Cargando servicios...</span>
                  </div>
                ) : services.length === 0 ? (
                  <div className="flex items-center flex-col justify-center h-[340px] md:h-[250px] p-6 gap-4">
                    <Zap className="w-10 h-10 text-muted-foreground" />
                    <span className="text-sm text-center text-muted-foreground">No hay servicios disponibles</span>
                  </div>
                ) : (
                  <ScrollArea className="w-full h-full">
                    <div>
                      {sortedServices.map((service) => (
                        <Button
                          key={service.id}
                          type="button"
                          variant={value?.toString() === service.id.toString() ? 'default' : 'outline'}
                          className="w-full h-auto border-none rounded-none py-4"
                          onClick={() => onChange(service.id.toString())}
                        >
                          <div className="grid grid-cols-1 w-full">
                            {/* Información del servicio */}
                            <div className="flex flex-col w-full">
                              <div className="flex justify-between mb-1 gap-2">
                                <h4 className="font-semibold text-sm leading-tight line-clamp-2">{service.nombre}</h4>
                                <div>
                                  {service.categoria_id === 1 && <Stethoscope size={20} />}
                                  {service.categoria_id === 2 && <Bubbles size={20} />}
                                </div>
                              </div>
                              {service.descripcion && (
                                <p
                                  className={`text-xs ${
                                    value?.toString() === service.id.toString() ? 'foreground' : 'text-muted-foreground'
                                  } leading-relaxed text-left mb-2 line-clamp-2 whitespace-normal mr-2`}
                                >
                                  {service.descripcion}
                                </p>
                              )}
                              <div className="flex gap-2">
                                {service.duracion_estimada && (
                                  <span
                                    className={`text-xs bg-secondary ${
                                      value?.toString() === service.id.toString()
                                        ? 'dark:bg-white/30 dark:text-white'
                                        : 'bg-secondary'
                                    } px-2 py-0.5 rounded text-muted-foreground w-fit`}
                                  >
                                    {service.duracion_estimada} min
                                  </span>
                                )}
                                {service.precio && (
                                  <span
                                    className={`text-xs bg-secondary ${
                                      value?.toString() === service.id.toString()
                                        ? 'dark:bg-white/30 dark:text-white'
                                        : 'bg-secondary'
                                    } px-2 py-0.5 rounded text-muted-foreground w-fit`}
                                  >
                                    ${service.precio}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </div>
            )}
          />
          {errors.servicio_id && <p className="text-sm text-red-500">{errors.servicio_id.message}</p>}
        </div>
      </div>
    </div>
  )
}
