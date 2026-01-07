export function StepIndicator({ currentStep, totalSteps }) {
  return (
    <div className="mb-6">
      <div className="flex gap-1">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              index < currentStep ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
