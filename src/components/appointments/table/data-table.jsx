import { useState, Fragment, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMediaQuery } from '@/hooks/use-media-query'
import { useAppointments } from '@/hooks/useAppointments'
import { CancelDialog } from '@/components/appointments/CancelDialog'
import {
  getFilteredRowModel,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  useReactTable
} from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Search,
  CalendarPlus,
  CalendarX,
  Clock,
  Stethoscope,
  User,
  NotepadText
} from 'lucide-react'

export function DataTable({ columns, data, cancelAppointment }) {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [expanded, setExpanded] = useState({})
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 6 })
  const { openForm } = useAppointments()
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    if (isMobile) {
      setColumnVisibility({
        hora_inicio: false,
        nombre_servicio: false,
        nombre_profesional: false,
        acciones: false
      })
    } else {
      setColumnVisibility({})
    }
  }, [isMobile])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      expanded,
      pagination
    }
  })

  return (
    <div className="flex flex-col gap-5">
      <div className={`flex ${isMobile ? 'flex-col gap-4' : 'items-center'}`}>
        {isMobile && (
          <div className="mb-1">
            <Button onClick={() => openForm()} className="flex items-center gap-2 w-full">
              Agendar Cita
              <CalendarPlus className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="flex items-center gap-2 w-full">
          <div className={`relative ${isMobile ? 'flex-1' : 'w-sm'}`}>
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5" />
            <Input
              placeholder="Filtrar mascotas..."
              value={table.getColumn('nombre_mascota')?.getFilterValue() ?? ''}
              onChange={(event) => table.getColumn('nombre_mascota')?.setFilterValue(event.target.value)}
              className="pr-10 text-sm text-"
            />
          </div>
          {!isMobile && (
            <div className="ml-auto">
              <Button onClick={() => openForm()} className="flex items-center gap-2">
                Agendar Cita
                <CalendarPlus className="h-4 w-4" />
              </Button>
            </div>
          )}
          {!isMobile && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <SlidersHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    const columnLabels = {
                      fecha: 'Fecha',
                      hora_inicio: 'Hora',
                      nombre_mascota: 'Mascota',
                      nombre_profesional: 'Profesional',
                      nombre_servicio: 'Servicio',
                      status: 'Estado'
                    }

                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {columnLabels[column.id] || column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table className="text-sm bg-card/50">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`${header.column.id === 'acciones' ? 'w-12' : ''} px-2 sm:px-3`}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && 'selected'}
                    className={isMobile ? 'cursor-pointer hover:bg-muted/50' : ''}
                    onClick={() => isMobile && row.toggleExpanded()}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={`py-3 px-1.5 sm:px-3 ${cell.column.id === 'acciones' ? 'w-12' : ''}`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && isMobile && (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="p-0">
                        <div>
                          <div className="p-4 space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                              {/* Hora */}
                              <div className="flex items-center gap-3 p-3 rounded-md bg-card border border-border/30">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                                  <Clock className="w-5 h-5 text-blue-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                    Hora
                                  </p>
                                  <p className="font-semibold text-foreground">
                                    {(() => {
                                      const hora_inicio = row.original.hora_inicio
                                      const [hours, minutes] = hora_inicio.split(':').map(Number)
                                      const date = new Date()
                                      date.setHours(hours, minutes, 0, 0)
                                      return date.toLocaleTimeString('es-ES', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                      })
                                    })()}
                                  </p>
                                </div>
                              </div>
                              {/* Servicio */}
                              <div className="flex items-center gap-3 p-3 rounded-md bg-card border border-border/30">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                                  <Stethoscope className="w-5 h-5 text-green-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                    Servicio
                                  </p>
                                  <p className="font-semibold text-foreground">{row.original.nombre_servicio}</p>
                                </div>
                              </div>
                              {/* Profesional */}
                              <div className="flex items-center gap-3 p-3 rounded-md bg-card border border-border/30">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                                  <User className="w-5 h-5 text-purple-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                    Profesional
                                  </p>
                                  <p className="font-semibold text-foreground">{row.original.nombre_profesional}</p>
                                </div>
                              </div>
                              {/* Notas */}
                              {row.original.motivo_consulta && (
                                <div className="flex items-center gap-3 p-3 rounded-md bg-card border border-border/30">
                                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center">
                                    <NotepadText className="w-5 h-5 text-yellow-500" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                      Notas
                                    </p>
                                    <p className="font-semibold text-foreground">{row.original.motivo_consulta}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                            {['Programada', 'Reprogramada'].includes(row.original.status) && (
                              <div className="pt-4 border-t border-border/50">
                                <CancelDialog onConfirm={() => cancelAppointment(row.original.id)}>
                                  <Button
                                    variant="outline"
                                    className="w-full bg-background/50 text-red-600 dark:text-red-500"
                                  >
                                    <CalendarX className="h-4 w-4 mr-1" />
                                    Cancelar
                                  </Button>
                                </CancelDialog>
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {data.length > 6 && (
        <div className={`flex ${isMobile ? 'justify-center' : 'justify-end'} items-center gap-2`}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: table.getPageCount() }, (_, index) => {
              const pageNumber = index + 1
              const currentPage = table.getState().pagination.pageIndex + 1
              const isCurrentPage = pageNumber === currentPage

              const maxVisiblePages = isMobile ? 1 : 2
              const shouldShow =
                pageNumber === 1 ||
                pageNumber === table.getPageCount() ||
                Math.abs(pageNumber - currentPage) <= maxVisiblePages

              if (!shouldShow) {
                const ellipsisDistance = isMobile ? 2 : 3
                if (pageNumber === currentPage - ellipsisDistance || pageNumber === currentPage + ellipsisDistance) {
                  return (
                    <span key={pageNumber} className="px-2 text-muted-foreground">
                      ...
                    </span>
                  )
                }
                return null
              }

              return (
                <Button
                  key={pageNumber}
                  variant={isCurrentPage ? 'default' : 'outline'}
                  size="sm"
                  className={`w-8 h-8 p-0 ${isCurrentPage ? 'pointer-events-none' : ''}`}
                  onClick={() => table.setPageIndex(index)}
                >
                  {pageNumber}
                </Button>
              )
            })}
          </div>

          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <ChevronRight />
          </Button>
        </div>
      )}
      <span className="text-sm text-muted-foreground/70 text-center md:hidden mt-2">
        <strong className="font-semibold">Nota: </strong>Puedes ver más detalles de la cita haciendo clic en la fila
        correspondiente.
      </span>
    </div>
  )
}
