interface PageHeaderProps {
  title: string
  description?: string
  className?: string
  children?: React.ReactNode
  icon?: unknown
}

export const PageHeader = ({
  title,
  description,
  className = "",
  children,
}: PageHeaderProps) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${className}`}>
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        {description && (
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            {description}
          </p>
        )}
      </div>
      
      {children && <div className="flex items-center gap-2.5">{children}</div>}
    </div>
  )
}
