import * as React from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"

export interface AppPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange?: (page: number) => void
  getPageHref?: (page: number) => string
  className?: string
  showEdges?: boolean
}

export function AppPagination({
  currentPage,
  totalPages,
  onPageChange,
  getPageHref,
  className,
  showEdges = true,
}: AppPaginationProps) {
  if (totalPages <= 0) return null

  const handlePageClick = (e: React.MouseEvent, page: number) => {
    if (onPageChange) {
      e.preventDefault()
      onPageChange(page)
    }
  }

  // Generate page numbers with ellipses
  const getPageNumbers = () => {
    const pages: (number | "ellipsis-start" | "ellipsis-end")[] = []

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i)
        }
        pages.push("ellipsis-end")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 3) {
        pages.push(1)
        pages.push("ellipsis-start")
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push("ellipsis-start")
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push("ellipsis-end")
        pages.push(totalPages)
      }
    }

    return pages
  }

  const pages = getPageNumbers()

  return (
    <Pagination className={cn("mx-0 w-auto justify-end", className)}>
      <PaginationContent className="gap-1">
        {/* Previous Button */}
        {showEdges && (
          <PaginationItem>
            <PaginationPrevious
              href={getPageHref ? getPageHref(Math.max(1, currentPage - 1)) : "#"}
              onClick={(e) => handlePageClick(e, Math.max(1, currentPage - 1))}
              className={cn(
                "h-8 px-2.5 text-xs font-medium cursor-pointer rounded-lg border border-border bg-card hover:bg-muted transition-all shadow-2xs",
                currentPage <= 1 &&
                  "pointer-events-none opacity-40 cursor-not-allowed hover:bg-card"
              )}
            />
          </PaginationItem>
        )}

        {/* Page Numbers */}
        {pages.map((page, idx) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <PaginationItem key={`ellipsis-${idx}`}>
                <PaginationEllipsis className="size-8" />
              </PaginationItem>
            )
          }

          const isActive = currentPage === page

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={getPageHref ? getPageHref(page) : "#"}
                onClick={(e) => handlePageClick(e, page)}
                isActive={isActive}
                className={cn(
                  "size-8 text-xs font-semibold cursor-pointer rounded-lg transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:text-primary-foreground shadow-xs font-bold"
                    : "border border-border bg-card hover:bg-muted text-foreground shadow-2xs"
                )}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        {/* Next Button */}
        {showEdges && (
          <PaginationItem>
            <PaginationNext
              href={
                getPageHref
                  ? getPageHref(Math.min(totalPages, currentPage + 1))
                  : "#"
              }
              onClick={(e) =>
                handlePageClick(e, Math.min(totalPages, currentPage + 1))
              }
              className={cn(
                "h-8 px-2.5 text-xs font-medium cursor-pointer rounded-lg border border-border bg-card hover:bg-muted transition-all shadow-2xs",
                currentPage >= totalPages &&
                  "pointer-events-none opacity-40 cursor-not-allowed hover:bg-card"
              )}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}

export default AppPagination
