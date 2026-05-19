<<<<<<< HEAD
import * as React from "react"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props} />
  );
}

export { Label }
=======
export function Label({ children }) {
  return (
    <label className="text-sm font-medium">
      {children}
    </label>
  );
}
>>>>>>> 433fb6fa1e9f9055837c0c0f5d2122461eaa1101
