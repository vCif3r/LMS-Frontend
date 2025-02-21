import { Bell, Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

export function NotifficationToggle() {
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Bell className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:text-white" />
        </Button>
      </DropdownMenuTrigger>
     
    </DropdownMenu>
  )
}
