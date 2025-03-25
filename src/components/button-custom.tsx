
import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white hover:bg-primary-600 active:bg-primary-700 focus:ring-primary-500/50 shadow-sm",
        secondary:
          "bg-white text-primary-700 border border-gray-200 hover:bg-secondary hover:text-primary-800 active:bg-secondary/70 focus:ring-primary-500/30 shadow-sm",
        outline:
          "border border-gray-200 text-primary-700 bg-transparent hover:bg-secondary hover:text-primary-800 active:bg-secondary/70 focus:ring-primary-500/30",
        ghost:
          "text-primary-600 bg-transparent hover:bg-secondary hover:text-primary-700 active:bg-secondary/70 focus:ring-primary-500/30",
        link: "text-primary-600 underline-offset-4 hover:underline focus:ring-primary-500/30",
        danger: 
          "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/40",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6",
        icon: "h-10 w-10 rounded-full p-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const ButtonCustom = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading = false, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);

ButtonCustom.displayName = "ButtonCustom";

export { ButtonCustom, buttonVariants };
