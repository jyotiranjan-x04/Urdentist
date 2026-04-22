/* ============================================================
   SELECT — Form select field with label and error
   Source: Implementation Plan — needed by AppointmentForm
   
   Usage with React Hook Form:
   <Select
     label="Type of Appointment"
     options={[{ value: "checkup", label: "Dental Checkup" }]}
     {...register("service")}
     error={errors.service?.message}
   />
   ============================================================ */

import { forwardRef } from "react";
import clsx from "clsx";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, error, placeholder = "Select...", className, id, ...props },
  ref
) {
  const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {/* Label */}
      <label
        htmlFor={selectId}
        className="font-body text-sm font-medium text-espresso"
      >
        {label}
      </label>

      {/* Select */}
      <select
        ref={ref}
        id={selectId}
        className={clsx(
          "w-full rounded-xl border bg-pearl px-4 py-3 font-body text-sm text-espresso transition-colors duration-200 appearance-none cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold",
          "bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns%3d%22http%3a%2f%2fwww.w3.org%2f2000%2fsvg%22%20width%3d%2212%22%20height%3d%2212%22%20viewBox%3d%220%200%2012%2012%22%3e%3cpath%20fill%3d%22%238A7F72%22%20d%3d%22M1.5%204L6%208.5L10.5%204%22%20stroke%3d%22%238A7F72%22%20stroke-width%3d%221.5%22%20fill%3d%22none%22%2f%3e%3c%2fsvg%3e')] bg-no-repeat bg-[right_12px_center]",
          error
            ? "border-red-400 focus:ring-red-400/40 focus:border-red-400"
            : "border-sand hover:border-gold/40",
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${selectId}-error` : undefined}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Error message */}
      {error && (
        <p
          id={`${selectId}-error`}
          className="font-body text-xs text-red-500 mt-0.5"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Select;
