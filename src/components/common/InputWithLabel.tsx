import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { FieldWrapper } from "./FieldWrapper";

interface InputWithLabelProps
  extends React.ComponentProps<typeof Input> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
  required?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export function InputWithLabel({
  id: propId,
  label,
  description,
  error,
  required,
  className,
  containerClassName,
  labelClassName,
  leftElement,
  rightElement,
  ...props
}: InputWithLabelProps) {
  const generatedId = React.useId();
  const id = propId || generatedId;

  return (
    <FieldWrapper
      id={id}
      label={label}
      description={description}
      error={error}
      required={required}
      className={containerClassName}
      labelClassName={labelClassName}
    >
      <div className="relative w-full">
        {leftElement && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none text-muted-foreground">
            {leftElement}
          </div>
        )}
        <Input
          id={id}
          required={required}
          aria-invalid={!!error}
          className={cn(
            "w-full h-11 px-4 rounded-[10px] border border-slate-200 dark:border-border bg-white dark:bg-card text-slate-900 dark:text-foreground placeholder:text-slate-400 dark:placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary text-sm font-medium transition-all",
            leftElement && "pl-8",
            rightElement && "pr-11",
            error && "border-destructive dark:border-destructive focus-visible:ring-destructive/20",
            className
          )}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>
    </FieldWrapper>
  );
}
