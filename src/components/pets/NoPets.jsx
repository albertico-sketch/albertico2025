import { Card, CardContent } from '@/components/ui/card'

export function NoPets() {
  return (
    <Card className="text-center items-center p-8 gap-6">
      <div className="text-5xl" role="img" aria-label="paw">
        🐾
      </div>
      <CardContent className="flex flex-col items-center gap-4 p-0">
        <h3 className="text-xl font-semibold">No tienes mascotas registradas</h3>
        <p className="text-muted-foreground mb-2">Comienza agregando información sobre tus queridas mascotas</p>
      </CardContent>
    </Card>
  )
}
