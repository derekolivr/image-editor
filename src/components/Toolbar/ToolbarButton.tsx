import React from "react";

interface ToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  label: string;
  as?: React.ElementType;
}

export const ToolbarButton = React.forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ children, label, as: Comp = "button", ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        className="p-2 rounded-md hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={label}
        title={label}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

ToolbarButton.displayName = "ToolbarButton";
