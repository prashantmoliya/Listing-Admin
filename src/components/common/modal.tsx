import { type ReactNode, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

interface ModalProps {
  trigger?: ReactNode;
  title?: ReactNode;
  headTitle?: string;
  description?: ReactNode;
  headDescription?: string;
  headerIcon?: ReactNode;
  headerClassName?: string;
  children: ReactNode;
  footer?: ReactNode;
  footChildren?: ReactNode;
  footerClassName?: string;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  asForm?: boolean;
  onSubmit?: (e: FormEvent) => void;
  maxWidth?: string;
  showCloseButton?: boolean;
  onPointerDownOutside?: (event: any) => void;
  onEscapeKeyDown?: (event: any) => void;
  noPadding?: boolean;
}

export function Modal({
  trigger,
  title,
  headTitle,
  description,
  headDescription,
  headerIcon,
  headerClassName,
  children,
  footer,
  footChildren,
  footerClassName,
  className,
  open,
  onOpenChange,
  onClose,
  asForm = false,
  onSubmit,
  maxWidth = "sm:max-w-md",
  showCloseButton = true,
  onPointerDownOutside,
  onEscapeKeyDown,
  noPadding = false,
}: ModalProps) {
  const displayTitle = title || headTitle;
  const displayDescription = description || headDescription;
  const displayFooter = footer || footChildren;

  const handleOpenChange = (isOpen: boolean) => {
    onOpenChange?.(isOpen);
    if (!isOpen) {
      onClose?.();
    }
  };

  const ContentWrapper = asForm || onSubmit ? "form" : "div";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent
        className={cn(
          "w-[calc(100%-1rem)] max-w-[calc(100%-1rem)] sm:w-full",
          maxWidth,
          "p-0 overflow-hidden border-none shadow-menu rounded-md outline-none",
          className
        )}
        showCloseButton={showCloseButton}
        onPointerDownOutside={onPointerDownOutside}
        onEscapeKeyDown={onEscapeKeyDown}
      >
        <ContentWrapper
          onSubmit={asForm || onSubmit ? onSubmit : undefined}
          className="flex flex-col max-h-[92vh] sm:max-h-[85vh] min-w-0"
        >
          {!displayTitle && (
            <DialogTitle className="sr-only">Modal Content</DialogTitle>
          )}

          {(displayTitle || displayDescription || headerIcon) && (
            <DialogHeader
              className={cn(
                "p-3.5 sm:p-6 pb-2.5 sm:pb-4 pr-10 sm:pr-14 flex flex-row items-center gap-2.5 sm:gap-4 text-left border-b bg-muted/10 min-w-0",
                headerClassName
              )}
            >
              {headerIcon && (
                <div className="p-1.5 sm:p-3 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0 border border-primary/5">
                  {headerIcon}
                </div>
              )}
              <div className="flex flex-col gap-0.5 sm:gap-1 flex-1 min-w-0">
                {displayTitle && (
                  <DialogTitle className="text-sm sm:text-xl font-bold tracking-normal text-foreground leading-tight">
                    {displayTitle}
                  </DialogTitle>
                )}
                {displayDescription && (
                  <DialogDescription className="text-xs sm:text-sm font-medium text-muted-foreground/80 leading-snug line-clamp-2 sm:line-clamp-none">
                    {displayDescription}
                  </DialogDescription>
                )}
              </div>
            </DialogHeader>
          )}

          <div
            className={cn(
              "overflow-y-auto custom-scrollbar min-w-0",
              !noPadding && "p-3 sm:p-6"
            )}
          >
            {children}
          </div>

          {displayFooter && (
            <DialogFooter
              className={cn(
                "p-3 sm:p-5 pt-2.5 border-t bg-muted/5 gap-2 sm:gap-0",
                footerClassName
              )}
            >
              {displayFooter}
            </DialogFooter>
          )}
        </ContentWrapper>
      </DialogContent>
    </Dialog>
  );
}
