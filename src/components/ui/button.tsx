import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-xl hover:shadow-2xl hover:from-pink-600 hover:to-orange-600 border-2 border-pink-500 hover:border-pink-600",
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-xl border-2 border-red-500 hover:border-red-600",
        outline: "border-2 border-pink-500 bg-white text-pink-600 hover:bg-pink-500 hover:text-white shadow-lg hover:shadow-xl",
        secondary: "bg-orange-500 text-white hover:bg-orange-600 shadow-xl border-2 border-orange-500 hover:border-orange-600",
        ghost: "hover:bg-pink-100 hover:text-pink-700 text-pink-600",
        link: "text-pink-600 underline-offset-4 hover:underline",
        anime: "bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400 text-white shadow-xl hover:shadow-2xl animate-pulse-glow border-2 border-pink-400 hover:border-pink-500",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-full px-4",
        lg: "h-14 rounded-full px-8 text-lg",
        icon: "h-12 w-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
