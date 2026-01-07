export const LoadingSpinner = ({ message = 'Cargando...', className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <div className="relative w-12 h-12">
        {/* Círculo estático de fondo */}
        <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
        {/* Círculo animado */}
        <div
          className="absolute inset-0 border-4 border-transparent rounded-full"
          style={{
            borderTopColor: 'hsl(var(--primary))',
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: 'transparent',
            animation: 'spin 1s linear infinite',
            WebkitAnimation: 'spin 1s linear infinite'
          }}
        ></div>
      </div>
      {message && (
        <p className="text-md font-medium text-foreground/80">{message}</p>
      )}
    </div>
  )
}

// Agregar los keyframes al documento
if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg) }
      to { transform: rotate(360deg) }
    }
    @-webkit-keyframes spin {
      from { -webkit-transform: rotate(0deg) }
      to { -webkit-transform: rotate(360deg) }
    }
  `
  document.head.appendChild(style)
}
