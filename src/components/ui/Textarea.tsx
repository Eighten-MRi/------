import * as React from "react"
import { cn } from "../../lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> { }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    "flex min-h-[120px] w-full rounded-xl border-2 border-primary-light/30 bg-white px-4 py-3 text-lg lg:text-xl ring-offset-background placeholder:text-text-muted/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-light focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all resize-none",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Textarea.displayName = "Textarea"

export { Textarea }
