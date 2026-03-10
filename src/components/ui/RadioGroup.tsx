import * as React from "react"
import { cn } from "../../lib/utils"

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string
    options: { label: string; value: string }[]
    value?: string
    onChangeValue?: (value: string) => void
    disabled?: boolean
    className?: string
}

export function RadioGroup({ name, options, value, onChangeValue, disabled, className, ...props }: RadioGroupProps) {
    return (
        <div className={cn("grid gap-4", className)} role="radiogroup" {...props}>
            {options.map((option) => {
                const checked = value === option.value
                return (
                    <label
                        key={option.value}
                        className={cn(
                            "relative flex cursor-pointer select-none items-center rounded-xl border-2 p-5 text-lg transition-all md:text-xl",
                            checked
                                ? "border-primary bg-primary-light/10 font-bold text-primary-dark"
                                : "border-primary-light/30 bg-white hover:bg-primary-light/5 text-text",
                            disabled && "cursor-not-allowed opacity-50"
                        )}
                        tabIndex={disabled ? -1 : 0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                onChangeValue?.(option.value)
                            }
                        }}
                    >
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={checked}
                            onChange={(e) => onChangeValue?.(e.target.value)}
                            disabled={disabled}
                            className="sr-only"
                        />
                        {/* Custom checkmark circle */}
                        <div className={cn(
                            "mr-4 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors",
                            checked ? "border-primary bg-primary" : "border-primary-light/50"
                        )}>
                            {checked && <div className="h-3 w-3 rounded-full bg-white" />}
                        </div>
                        {option.label}
                    </label>
                )
            })}
        </div>
    )
}
