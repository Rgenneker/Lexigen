import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useFrenchText } from "@/lib/use-french-text"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  const f = useFrenchText()
  return (
    <Loader2Icon
      role="status"
      aria-label={f("Loading", "Chargement")}
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
