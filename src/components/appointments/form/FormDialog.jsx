import { Suspense } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { useAppointments } from '@/hooks/useAppointments'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { NotebookPen } from 'lucide-react'
import { LoadingSpinner } from '@/components/loaders/LoadingSpinner.jsx'
import { FormContent } from './FormContent'

export function AppointmentsForm() {
  const isMobile = useMediaQuery('(max-width: 48rem)')
  const { formState, closeForm } = useAppointments()

  const formContent = (
    <Suspense
      fallback={
        <div className="flex justify-center p-8">
          <LoadingSpinner />
        </div>
      }
    >
      <FormContent />
    </Suspense>
  )

  if (isMobile) {
    return (
      <Sheet open={formState.isOpen} onOpenChange={closeForm}>
        <SheetContent className="p-4 overflow-y-auto">
          <SheetHeader>
            <div className="flex items-center gap-4">
              <NotebookPen className="w-6 h-6" />
              <SheetTitle>Agendar cita</SheetTitle>
            </div>
            <SheetDescription className="hidden">
              Completa los pasos para agendar tu cita veterinaria
            </SheetDescription>
          </SheetHeader>
          {formContent}
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Dialog open={formState.isOpen} onOpenChange={closeForm}>
      <DialogContent className="sm:max-w-[400px] gap-4 max-h-[98vh] overflow-y-auto">
        <DialogHeader className="gap-3">
          <div className="flex items-center gap-2">
            <NotebookPen className="w-5 h-5" />
            <DialogTitle>Agendar cita</DialogTitle>
          </div>
          <DialogDescription className="hidden">
            Completa los pasos para agendar tu cita veterinaria
          </DialogDescription>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  )
}
