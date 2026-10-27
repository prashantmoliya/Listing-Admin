import * as React from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export type PopoverMenuProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
  contentClass?: string
  trigger: React.ReactElement
  children: React.ReactNode
}

export function PopoverMenu({
  open,
  onOpenChange,
  align = "end",
  side = "bottom",
  sideOffset = 4,
  contentClass,
  trigger,
  children,
}: PopoverMenuProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={cn("w-40 p-1 rounded-lg shadow-lg border border-border bg-popover", contentClass)}
      >
        {children}
      </PopoverContent>
    </Popover>
  )
}

export default PopoverMenu
