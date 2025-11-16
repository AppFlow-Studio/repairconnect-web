"use client"

import * as React from "react"
import { MinusIcon, PlusIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionContextValue {
    value: string | null
    onValueChange: (value: string | null) => void
    collapsible?: boolean
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined)

interface AccordionProps {
    children: React.ReactNode
    defaultValue?: string
    value?: string
    onValueChange?: (value: string | null) => void
    collapsible?: boolean
    type?: "single"
    className?: string
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
    ({ children, defaultValue, value: controlledValue, onValueChange, collapsible = true, type = "single", className, ...props }, ref) => {
        const [internalValue, setInternalValue] = React.useState<string | null>(defaultValue || null)
        const value = controlledValue !== undefined ? controlledValue : internalValue

        const handleValueChange = React.useCallback((newValue: string | null) => {
            if (controlledValue === undefined) {
                setInternalValue(newValue)
            }
            onValueChange?.(newValue)
        }, [controlledValue, onValueChange])

        const contextValue = React.useMemo<AccordionContextValue>(() => ({
            value,
            onValueChange: handleValueChange,
            collapsible,
        }), [value, handleValueChange, collapsible])

        return (
            <AccordionContext.Provider value={contextValue}>
                <div ref={ref} className={cn("", className)} {...props}>
                    {children}
                </div>
            </AccordionContext.Provider>
        )
    }
)
Accordion.displayName = "Accordion"

interface AccordionItemContextValue {
    value: string
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | undefined>(undefined)

interface AccordionItemProps {
    children: React.ReactNode
    value: string
    className?: string
}

interface AccordionTriggerProps {
    children: React.ReactNode
    className?: string
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
    ({ children, className, ...props }, ref) => {
        const context = React.useContext(AccordionContext)
        if (!context) throw new Error("AccordionTrigger must be used within AccordionItem")

        const itemContext = React.useContext(AccordionItemContext)
        if (!itemContext) throw new Error("AccordionTrigger must be used within AccordionItem")

        const isOpen = context.value === itemContext.value

        const handleClick = () => {
            if (isOpen && context.collapsible) {
                context.onValueChange(null)
            } else {
                context.onValueChange(itemContext.value)
            }
        }

        return (
            <button
                ref={ref}
                type="button"
                onClick={handleClick}
                className={cn(
                    "flex flex-1 items-center justify-between flex-row w-full py-4 font-medium transition-all",
                    className
                )}
                data-state={isOpen ? "open" : "closed"}
                {...props}
            >
                {children}
                <div className="relative size-4 shrink-0 ">
                    <PlusIcon className={cn(
                        "absolute inset-0 size-4 text-muted-foreground transition-opacity duration-200",
                        isOpen && "opacity-0"
                    )} />
                    <MinusIcon className={cn(
                        "absolute inset-0 size-4 text-muted-foreground opacity-0 transition-opacity duration-200",
                        isOpen && "opacity-100"
                    )} />
                </div>
            </button>
        )
    }
)
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
    ({ children, value, className, ...props }, ref) => {
        const context = React.useContext(AccordionContext)
        if (!context) throw new Error("AccordionItem must be used within Accordion")

        const isOpen = context.value === value

        return (
            <AccordionItemContext.Provider value={{ value }}>
                <div
                    ref={ref}
                    className={cn("overflow-hidden border bg-background px-4 first:rounded-t-lg last:rounded-b-lg last:border-b", className)}
                    data-state={isOpen ? "open" : "closed"}
                    {...props}
                >
                    {children}
                </div>
            </AccordionItemContext.Provider>
        )
    }
)
AccordionItem.displayName = "AccordionItem"

interface AccordionContentProps {
    children: React.ReactNode
    className?: string
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
    ({ children, className, ...props }, ref) => {
        const context = React.useContext(AccordionContext)
        if (!context) throw new Error("AccordionContent must be used within AccordionItem")

        const itemContext = React.useContext(AccordionItemContext)
        if (!itemContext) throw new Error("AccordionContent must be used within AccordionItem")

        const isOpen = context.value === itemContext.value

        return (
            <div
                ref={ref}
                className={cn(
                    "overflow-hidden text-sm transition-all",
                    isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0",
                    className
                )}
                style={{
                    transition: "max-height 0.2s ease-out, opacity 0.2s ease-out",
                }}
                data-state={isOpen ? "open" : "closed"}
                {...props}
            >
                <div className={cn("pb-4 pt-0", className)}>{children}</div>
            </div>
        )
    }
)
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

