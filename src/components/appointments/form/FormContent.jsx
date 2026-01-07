import { Button } from '@/components/ui/button'
import { LoaderCircle, CalendarPlus, ArrowRight, ArrowLeft } from 'lucide-react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { ConfirmationDialog } from '../ConfirmationDialog'
import { useAppointmentForm } from '@/hooks/useAppointmentForm'
import { StepIndicator } from './fields/StepIndicator'
import { PetServiceSelection } from './fields/PetServiceSelection'
import { DateSelection } from './fields/DateSelection'
import { TimeSelection } from './fields/TimeSelection'
import { ConsultationReason } from './fields/ConsultationReason'

export function FormContent() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const {
    // Form state
    control,
    errors,
    isSubmitting,
    getValues,
    handleSubmit,

    // Step management
    currentStep,
    totalSteps,
    nextStep,
    prevStep,

    // Data
    pets,
    services,
    blockedSlots,

    // Loading states
    petsLoading,
    servicesLoading,
    loadingSlots,

    // Confirmation dialog
    showConfirmDialog,
    setShowConfirmDialog,
    validatedData,

    // Handlers
    handleFormSubmit,
    handleConfirmAppointment
  } = useAppointmentForm()

  const renderStepContent = () => {
    switch (currentStep) {
    case 1:
      return (
        <PetServiceSelection
          control={control}
          errors={errors}
          pets={pets}
          services={services}
          petsLoading={petsLoading}
          servicesLoading={servicesLoading}
        />
      )
    case 2:
      return <DateSelection control={control} errors={errors} />
    case 3:
      return (
        <TimeSelection
          control={control}
          errors={errors}
          getValues={getValues}
          services={services}
          blockedSlots={blockedSlots}
          loadingSlots={loadingSlots}
        />
      )
    case 4:
      return <ConsultationReason control={control} errors={errors} />
    default:
      return (
        <PetServiceSelection
          control={control}
          errors={errors}
          pets={pets}
          services={services}
          petsLoading={petsLoading}
          servicesLoading={servicesLoading}
        />
      )
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

        <div>{renderStepContent()}</div>

        {errors.root && (
          <div className="rounded-md bg-red-400/20 p-4 text-red-600 border border-red-600">{errors.root.message}</div>
        )}

        <div className={`flex ${isMobile ? 'flex-col' : 'justify-between'} gap-2.5`}>
          <div className="flex">
            {currentStep > 1 && (
              <Button
                className="w-full md:w-auto"
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={isSubmitting}
              >
                <ArrowLeft className='w-4 h-4  hidden md:block' />
                Anterior
              </Button>
            )}
          </div>

          {currentStep < totalSteps ? (
            <Button type="button" onClick={nextStep} disabled={isSubmitting || petsLoading || servicesLoading}>
              Siguiente
              <ArrowRight className='w-4 h-4' />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting || petsLoading || servicesLoading}>
              {isSubmitting ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Agendar
                  <CalendarPlus className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </form>

      {/* Dialog de Confirmación */}
      <ConfirmationDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onConfirm={handleConfirmAppointment}
        appointmentData={validatedData}
      />
    </>
  )
}
