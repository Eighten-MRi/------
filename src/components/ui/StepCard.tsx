import React from "react"
import { cn } from "../../lib/utils"

interface StepCardProps {
    title: string
    icon: React.ReactNode
    children: React.ReactNode
    className?: string
}

export function StepCard({ title, icon, children, className }: StepCardProps) {
    return (
        <div className={cn("space-y-6", className)}>
            <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-light/15 text-primary shrink-0">
                    {icon}
                </div>
                <h2 className="text-2xl font-bold text-primary-dark">{title}</h2>
            </div>
            {children}
        </div>
    )
}

interface FieldProps {
    label: string
    required?: boolean
    hint?: string
    children: React.ReactNode
}

export function Field({ label, required, hint, children }: FieldProps) {
    return (
        <div className="space-y-2">
            <label className="block text-lg font-semibold text-text">
                {label}
                {required && <span className="ml-2 text-accent text-base">※必須</span>}
            </label>
            {hint && <p className="text-sm text-text-muted">{hint}</p>}
            {children}
        </div>
    )
}
