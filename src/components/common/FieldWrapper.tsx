import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";

interface FieldWrapperProps {
  id?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
  children: React.ReactNode;
}

export function FieldWrapper({
  id,
  label,
  description,
  error,
  required,
  className,
  labelClassName,
  descriptionClassName,
  errorClassName,
  children,
}: FieldWrapperProps) {
  return (
    <Field
      data-invalid={!!error}
      className={cn("w-full gap-2", className)}
    >
      {label && (
        <FieldLabel
          htmlFor={id} 
          className={cn(
            "text-xs sm:text-sm font-bold text-slate-700 dark:text-foreground select-none",
            labelClassName
          )}
        >
          {label}
          {required && (
            <span className="text-red-500 font-bold ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </FieldLabel>
      )}

      {children}

      {description && (
        <FieldDescription
          className={cn("text-xs text-slate-500", descriptionClassName)}
        >
          {description}
        </FieldDescription>
      )}

      {error && (
        <FieldError className={errorClassName}>{error}</FieldError>
      )}
    </Field>
  );
}
