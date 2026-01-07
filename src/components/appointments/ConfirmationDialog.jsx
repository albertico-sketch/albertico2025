import { useState } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription
} from '@/components/ui/drawer'
import { CircleCheck, Calendar, LoaderCircle, Clock } from 'lucide-react'

export function ConfirmationDialog({ open, onOpenChange, onConfirm, appointmentData }) {
  const [loading, setLoading] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 64rem)')

  const handleConfirm = async () => {
    try {
      setLoading(true)
      await onConfirm()
    } catch (error) {
      console.error('Error al agendar la cita:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString + 'T00:00:00')
    return date.toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const AppointmentDetails = () => (
    <div className="space-y-3">
      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
        <Calendar size={20} className="text-primary" />
        <div>
          <p className="text-sm text-muted-foreground">Fecha</p>
          <p className="font-medium">{formatDate(appointmentData?.fecha)}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
        <Clock size={20} className="text-primary" />
        <div>
          <p className="text-sm text-muted-foreground">Hora</p>
          <p className="font-medium">{appointmentData?.hora_inicio}</p>
        </div>
      </div>
    </div>
  )

  if (isDesktop) {
    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent className="sm:max-w-[400px] z-[200]">
          <AlertDialogHeader>
            <div className="flex justify-center mb-2">
              <CircleCheck className="w-16 h-16 text-green-500/80" />
            </div>
            <AlertDialogTitle className="font-semibold text-xl text-center">
              ¿Estás seguro de que deseas agendar esta cita?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className="my-2">
            <AppointmentDetails />
          </div>
          <AlertDialogDescription className="text-center text-muted-foreground">
            Revisa que todos los datos sean correctos antes de confirmar. Estos no podrán ser modificados
          </AlertDialogDescription>
          <AlertDialogFooter className="gap-2 grid grid-cols-1 sm:grid-cols-2">
            <Button className="w-full" variant="secondary" onClick={() => onOpenChange(false)} disabled={loading}>
              Revisar
            </Button>
            <Button onClick={handleConfirm} disabled={loading} className="w-full">
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Confirmar
                  <Calendar className="w-4 h-4" />
                </span>
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="z-[200] w-full">
        <div className="mx-auto w-full max-w-[600px] px-4">
          <DrawerHeader className="px-0 text-center">
            <div className="flex justify-center mb-2">
              <CircleCheck className="w-16 h-16 text-green-500/80" />
            </div>
            <DrawerTitle className="text-lg font-semibold text-center">
              ¿Estás seguro de que deseas agendar esta cita?
            </DrawerTitle>
          </DrawerHeader>
          <div className="my-2">
            <AppointmentDetails />
          </div>
          <DrawerDescription className="text-center text-muted-foreground my-4 px-0">
            Revisa que todos los datos sean correctos antes de confirmar. Estos no podrán ser modificados
          </DrawerDescription>
          <DrawerFooter className="px-0 pt-2 gap-3">
            <Button className="w-full" variant="secondary" onClick={() => onOpenChange(false)} disabled={loading}>
              Revisar
            </Button>
            <Button onClick={handleConfirm} disabled={loading} className="w-full">
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Confirmar
                  <Calendar className="w-4 h-4" />
                </span>
              )}
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
