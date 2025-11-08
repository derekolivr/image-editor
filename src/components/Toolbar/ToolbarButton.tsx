import React from "react";

interface ToolbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  label: string;
  as?: React.ElementType;
  active?: boolean;
  showLabel?: boolean;
}

export const ToolbarButton = React.forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ children, label, as: Comp = "button", active = false, showLabel = false, className = "", ...props }, ref) => {
    const baseClasses =
      "flex flex-col items-center gap-0.5 p-1.5 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
    const activeClasses = active
      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg ring-2 ring-blue-400"
      : "hover:bg-gray-600 text-gray-200 hover:shadow-md";

    return (
      <Comp
        ref={ref}
        className={`${baseClasses} ${activeClasses} ${className}`}
        aria-label={label}
        title={label}
        aria-pressed={active}
        {...props}
      >
        <div className="flex items-center justify-center">{children}</div>
        {showLabel && <span className="text-[9px] text-center whitespace-nowrap font-medium">{label}</span>}
      </Comp>
    );
  }
);

ToolbarButton.displayName = "ToolbarButton";
