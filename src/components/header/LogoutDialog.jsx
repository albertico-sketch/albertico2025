import { useState } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger
} from '@/components/ui/drawer'
import { TriangleAlert, LogOut } from 'lucide-react'

export function LogoutDialog({ children, onConfirm, open: controlledOpen, onOpenChange }) {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const setOpen = onOpenChange || setInternalOpen
  const isDesktop = useMediaQuery('(min-width: 64rem)')

  const handleConfirm = () => {
    if (onConfirm) onConfirm()
    setOpen(false)
  }

  if (isDesktop) {
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent className="sm:max-w-[425px] z-[200] flex flex-col gap-3">
          <AlertDialogHeader>
            <div className="flex justify-center mb-2">
              <TriangleAlert className="w-20 h-20 text-red-500/80" />
            </div>
            <AlertDialogTitle className="font-semibold text-xl">
              ¿Estás seguro que deseas cerrar sesión?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="text-md">
            Perderás acceso a tus datos. Inicia sesión de nuevo para acceder a ellos.
          </AlertDialogDescription>
          <AlertDialogFooter className="pt-4 gap-3">
            <Button variant="secondary" className="text-md" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button className="text-md" onClick={handleConfirm}>
              Cerrar sesión
              <LogOut className="w-4 h-4" />
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="z-[200] w-full flex flex-col gap-3">
        <div className="mx-auto w-full max-w-[600px] px-4">
          <DrawerHeader className="px-0 text-center">
            <div className="flex justify-center mb-2">
              <TriangleAlert className="w-20 h-20 text-red-500/80" />
            </div>
            <DrawerTitle className="text-lg font-semibold text-center">
              ¿Estás seguro que deseas cerrar sesión?
            </DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className="text-md text-center">
            Perderás acceso a tus datos. Inicia sesión de nuevo para acceder a ellos.
          </DrawerDescription>
          <DrawerFooter className="px-0 pt-6 gap-3">
            <Button variant="secondary" className="text-md" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button className="text-md py-5" onClick={handleConfirm}>
              Cerrar sesión
              <LogOut className="w-4 h-4" />
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
