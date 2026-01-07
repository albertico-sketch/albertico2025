import { AlertTriangle } from 'lucide-react'

export const ErrorCard = ({
  title = '¡Ups! Algo salió mal',
  message,
  className = '',
  variant = 'default'
}) => {
  const variants = {
    default: 'bg-destructive/10 border-destructive/30 text-destructive',
    warning: 'bg-amber-500/10 border-amber-500/30 text-amber-600',
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-600'
  }

  const variantClasses = variants[variant] || variants.default
  const iconSize = 20

  return (
    <div
      className={`rounded-lg border p-4 ${variantClasses} ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <AlertTriangle size={iconSize} className="mt-0.5" />
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          {message && (
            <p className="text-sm mt-1">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
