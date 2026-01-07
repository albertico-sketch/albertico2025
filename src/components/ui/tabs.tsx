import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const [activeTabRect, setActiveTabRect] = React.useState<DOMRect | null>(null)
  const [isInitialized, setIsInitialized] = React.useState(false)
  const listRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const updateActiveTabPosition = () => {
      if (!listRef.current) return

      const activeTab = listRef.current.querySelector('[data-state="active"]') as HTMLElement
      if (activeTab) {
        const listRect = listRef.current.getBoundingClientRect()
        const activeRect = activeTab.getBoundingClientRect()

        setActiveTabRect({
          left: activeRect.left - listRect.left,
          width: activeRect.width,
          height: activeRect.height,
          top: activeRect.top - listRect.top
        } as DOMRect)

        if (!isInitialized) {
          setIsInitialized(true)
        }
      }
    }

    // Actualizar posición inicial
    updateActiveTabPosition()

    // Observer para detectar cambios en la tab activa
    const observer = new MutationObserver(updateActiveTabPosition)

    if (listRef.current) {
      observer.observe(listRef.current, {
        attributes: true,
        subtree: true,
        attributeFilter: ['data-state']
      })
    }

    // Actualizar en resize
    window.addEventListener('resize', updateActiveTabPosition)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateActiveTabPosition)
    }
  }, [isInitialized])

  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot="tabs-list"
      className={cn(
        'bg-muted dark:bg-muted/50 text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px] relative',
        className
      )}
      {...props}
    >
      {/* Indicador deslizante */}
      {activeTabRect && (
        <div
          className={cn(
            'absolute bg-background dark:bg-input/30 rounded-md shadow-sm border border-transparent dark:border-input transition-all duration-200 ease-out',
            isInitialized ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            left: activeTabRect.left,
            width: activeTabRect.width,
            height: activeTabRect.height,
            top: activeTabRect.top
          }}
        />
      )}
      {props.children}
    </TabsPrimitive.List>
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        // Removemos los estilos de background activo ya que ahora los maneja el slider
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-muted-foreground data-[state=active]:text-foreground dark:text-muted-foreground dark:data-[state=active]:text-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,font-weight] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 relative z-10 data-[state=active]:font-semibold [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4',
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
