import { Controller } from 'react-hook-form'
import { Calendar } from '@/components/ui/calendar'
import { getCurrentDateInCDMX } from '@/lib/utils'

export function DateSelection({ control, errors }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Selecciona la fecha de tu cita</h3>

      <div className="flex justify-center">
        <Controller
          name="fecha"
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className="md:w-9/10">
              <Calendar
                mode="single"
                selected={value ? new Date(value + 'T00:00:00') : undefined}
                captionLayout="dropdown"
                fromDate={new Date(getCurrentDateInCDMX() + 'T00:00:00')}
                fromYear={new Date().getFullYear()}
                toYear={new Date().getFullYear() + 1}
                onSelect={(date) => {
                  if (date) {
                    const year = date.getFullYear()
                    const month = String(date.getMonth() + 1).padStart(2, '0')
                    const day = String(date.getDate()).padStart(2, '0')
                    const formattedDate = `${year}-${month}-${day}`
                    onChange(formattedDate)
                  }
                }}
                disabled={(date) => {
                  const today = new Date(getCurrentDateInCDMX() + 'T00:00:00')
                  return date < today
                }}
                className="rounded-md border w-full"
                classNames={{
                  today:
                    'bg-accent/50 text-accent-foreground rounded-full data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground data-[selected=true]:rounded-full'
                }}
              />
            </div>
          )}
        />
      </div>
      {errors.fecha && <p className="text-sm text-red-500 text-center">{errors.fecha.message}</p>}
    </div>
  )
}
