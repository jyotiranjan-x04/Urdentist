/* ============================================================
   INPUT — Form field with label, error, and icon support
   Source: Implementation Plan §3.3 (#2)
   
   Usage with React Hook Form:
   <Input
     label="Your Name"
     {...register("name")}
     error={errors.name?.message}
   />
   ============================================================ */

import { forwardRef } from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, icon, className, id, ...props },
  ref
) {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {/* Label */}
      <label
        htmlFor={inputId}
        className="font-body text-sm font-medium text-espresso"
      >
        {label}
      </label>

      {/* Field wrapper */}
      <div className="relative">
        {/* Icon */}
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-4 h-4">
            {icon}
          </span>
        )}

        {/* Input */}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            "w-full rounded-xl border bg-pearl px-4 py-3 font-body text-sm text-espresso placeholder:text-muted/50 transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold",
            error
              ? "border-red-400 focus:ring-red-400/40 focus:border-red-400"
              : "border-sand hover:border-gold/40",
            icon && "pl-10",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
      </div>

      {/* Error message */}
      {error && (
        <p
          id={`${inputId}-error`}
          className="font-body text-xs text-red-500 mt-0.5"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
