import { Controller } from 'react-hook-form'

export function ConsultationReason({ control, errors }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Describe el motivo de la consulta</h3>

      <Controller
        name="motivo_consulta"
        control={control}
        render={({ field: { onChange, value } }) => (
          <textarea
            value={value}
            onChange={onChange}
            placeholder="Motivo de la consulta..."
            className={`flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none ${
              errors.motivo_consulta ? 'border-red-500' : ''
            }`}
            rows={5}
          />
        )}
      />
      {errors.motivo_consulta && <p className="text-sm text-red-500">{errors.motivo_consulta.message}</p>}

      <div className="text-sm text-muted-foreground">
        <p>Este campo es opcional. Si no tienes un motivo específico, puedes dejarlo vacío y continuar.</p>
      </div>
    </div>
  )
}
