import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'ghost' | 'accent'
    size?: 'default' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', size = 'default', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-lg font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-light disabled:pointer-events-none disabled:opacity-50",
                    {
                        'bg-primary text-white hover:bg-primary-dark': variant === 'default',
                        'bg-accent text-white hover:bg-accent-hover': variant === 'accent',
                        'border-2 border-primary text-primary hover:bg-primary-light/10': variant === 'outline',
                        'hover:bg-primary-light/10 text-text': variant === 'ghost',
                        'h-12 px-6 py-2': size === 'default',
                        'h-16 rounded-2xl px-8 py-3 text-xl': size === 'lg',
                        'h-12 w-12': size === 'icon',
                    },
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
