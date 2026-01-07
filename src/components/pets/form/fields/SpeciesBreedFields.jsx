import { useState, useEffect } from 'react'
import { Controller, useWatch } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useBreedSpecies } from '@/hooks/useBreedSpecies'
import { cn } from '@/lib/utils'

export function SpeciesBreedFields({ control, errors, initialValues = {} }) {
  const [breedComboOpen, setBreedComboOpen] = useState(false)
  const [selectedBreed, setSelectedBreed] = useState(null)
  const { breeds, species, loading } = useBreedSpecies()

  const findSpeciesIdByName = (name) => {
    if (!name) return null
    const found = species.find((s) => s.nombre === name)
    return found ? found.id : null
  }

  const watchedEspecieId = useWatch({
    control,
    name: 'especie_id'
  })

  const initialEspecieId = initialValues.especie_id || findSpeciesIdByName(initialValues.nombre_especie)
  const selectedSpeciesId = watchedEspecieId || initialEspecieId

  // Filtrar razas según la especie seleccionada
  const filteredBreeds = selectedSpeciesId
    ? breeds.filter((breed) => breed.especie_id === Number(selectedSpeciesId))
    : []

  // Resetear raza cuando se cambia la especie
  useEffect(() => {
    if (selectedSpeciesId && selectedBreed?.especie_id !== Number(selectedSpeciesId)) {
      setSelectedBreed(null)
    }
  }, [selectedSpeciesId, selectedBreed])

  // Set initial breed when component mounts or when data is loaded
  useEffect(() => {
    if (breeds.length === 0 || species.length === 0) return

    if (initialValues.raza_id) {
      const initialBreed = breeds.find((breed) => breed.id === initialValues.raza_id)
      if (initialBreed) {
        setSelectedBreed(initialBreed)
      }
    } else if (initialValues.nombre_raza) {
      const breed = breeds.find((b) => b.nombre === initialValues.nombre_raza)
      if (breed) {
        setSelectedBreed(breed)
      }
    }
  }, [initialValues.raza_id, initialValues.nombre_raza, breeds, species])

  const handleBreedSelect = (breedId, onChange) => {
    const breed = breeds.find((b) => b.id === breedId)
    setSelectedBreed(breed)
    onChange(breedId)
    setBreedComboOpen(false)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {/* Especie */}
      <div className="grid gap-2 w-full">
        <Label htmlFor="especie_id">Especie</Label>
        <Controller
          name="especie_id"
          control={control}
          defaultValue={initialEspecieId}
          render={({ field: { onChange, value } }) => (
            <Select
              value={value?.toString() || ''}
              onValueChange={(val) => {
                onChange(Number(val))
                setSelectedBreed(null)
              }}
              disabled={loading}
            >
              <SelectTrigger className={`w-full ${errors.especie_id ? 'border-red-500' : ''}`}>
                <SelectValue placeholder={loading ? 'Cargando...' : 'Selecciona una especie'} />
              </SelectTrigger>
              <SelectContent>
                {species.map((especie) => (
                  <SelectItem key={especie.id} value={especie.id.toString()}>
                    {especie.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.especie_id && <p className="text-sm text-red-500">{errors.especie_id.message}</p>}
      </div>

      {/* Raza */}
      <div className="grid gap-2 w-full">
        <Label htmlFor="raza_id">Raza</Label>
        <Controller
          name="raza_id"
          control={control}
          render={({ field: { onChange } }) => (
            <Popover open={breedComboOpen} onOpenChange={setBreedComboOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={breedComboOpen}
                  className={cn(
                    'w-full justify-between text-left font-normal h-10 px-3 overflow-hidden',
                    errors.raza_id && 'border-red-500'
                  )}
                  disabled={loading || !selectedSpeciesId || filteredBreeds.length === 0}
                >
                  <span className="truncate flex-1 min-w-0">
                    {selectedBreed ? selectedBreed.nombre : loading ? 'Cargando...' : 'Buscar raza...'}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 flex-shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0 overflow-hidden">
                <Command className="max-h-[200px] lg:max-h-[280px] max-w-[280px]">
                  <CommandInput placeholder="Buscar raza..." className="h-9" />
                  <CommandList className="overflow-y-auto">
                    <CommandEmpty>No se encontraron razas.</CommandEmpty>
                    <CommandGroup>
                      {filteredBreeds.map((breed) => (
                        <CommandItem
                          key={breed.id}
                          value={breed.nombre}
                          onSelect={() => handleBreedSelect(breed.id, onChange)}
                          className="flex items-center justify-between px-2 py-1.5"
                        >
                          <span className="truncate flex-1 min-w-0 pr-2">{breed.nombre}</span>
                          <Check
                            className={cn(
                              'h-4 w-4 flex-shrink-0',
                              selectedBreed?.id === breed.id ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          )}
        />
        {errors.raza_id && <p className="text-sm text-red-500">{errors.raza_id.message}</p>}
      </div>
    </div>
  )
}
