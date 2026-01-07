import { lazy, Suspense } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { PawPrint } from 'lucide-react'
import { BreedSpeciesProvider } from '@/contexts/BreedSpeciesContext'
import { LoadingSpinner } from '@/components/loaders/LoadingSpinner.jsx'
import { usePets } from '@/hooks/usePets'

const LazyFormContent = lazy(() => import('./FormContent'))

export function PetsForm() {
  const { formState, closeForm } = usePets()
  const { isOpen, mode } = formState
  const isMobile = useMediaQuery('(max-width: 48rem)')

  const isEditMode = mode === 'edit'
  const title = isEditMode ? 'Editar Mascota' : 'Agregar Mascota'

  const formContent = (
    <Suspense
      fallback={
        <div className="flex justify-center p-8">
          <LoadingSpinner />
        </div>
      }
    >
      <LazyFormContent />
    </Suspense>
  )

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={closeForm}>
        {isOpen && (
          <BreedSpeciesProvider>
            <SheetContent className="p-4 overflow-y-auto">
              <SheetHeader>
                <div className="flex items-center gap-4">
                  <PawPrint className="w-6 h-6" />
                  <SheetTitle>{title}</SheetTitle>
                </div>
                <SheetDescription className="hidden"></SheetDescription>
              </SheetHeader>
              {formContent}
            </SheetContent>
          </BreedSpeciesProvider>
        )}
      </Sheet>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeForm}>
      {isOpen && (
        <BreedSpeciesProvider>
          <DialogContent className="sm:max-w-[500px] gap-8 max-h-[98vh] overflow-y-auto">
            <DialogHeader className="gap-3">
              <div className="flex items-center gap-3">
                <PawPrint className="w-6 h-6" />
                <DialogTitle>{title}</DialogTitle>
              </div>
            </DialogHeader>
            <DialogDescription className="hidden"></DialogDescription>
            {formContent}
          </DialogContent>
        </BreedSpeciesProvider>
      )}
    </Dialog>
  )
}
