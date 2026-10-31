import DataTable, { type ColumnDef } from "@/components/common/DataTable"
import { SelectWithLabel } from "@/components/common/SelectWithLabel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type ServiceProductItem } from "@/data/dummyData"
import { cn } from "@/lib/utils"
import { CheckCircle2, Eye, Package, Sparkles, XCircle } from "lucide-react"
import { useMemo, useState } from "react"
import ServiceProductDetailsModal from "./ServiceProductDetailsModal"

interface ServicesProductsTableProps {
  items: ServiceProductItem[]
}

const statusTabs = [
  { label: "All", value: "All" },
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
]

const ServicesProductsTable = ({ items }: ServicesProductsTableProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedListing, setSelectedListing] = useState("ALL")
  const [selectedItem, setSelectedItem] = useState<ServiceProductItem | null>(null)

  // Generate unique listing filter options dynamically
  const listingOptions = useMemo(() => {
    const unique = Array.from(new Set(items.map((i) => i.listingName))).sort()
    return [
      { value: "ALL", label: "All Listings" },
      ...unique.map((name) => ({ value: name, label: name })),
    ]
  }, [items])

  // Filter items by search query, status, and listing
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Status filter
      if (selectedStatus !== "All" && item.status !== selectedStatus) {
        return false
      }

      // Listing filter
      if (selectedListing !== "ALL" && item.listingName !== selectedListing) {
        return false
      }

      // Search query filter
      const query = searchQuery.toLowerCase().trim()
      if (!query) return true

      return (
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.listingName.toLowerCase().includes(query) ||
        item.listingCategory.toLowerCase().includes(query) ||
        item.businessOwnerName.toLowerCase().includes(query) ||
        item.city.toLowerCase().includes(query) ||
        item.price.toString().includes(query) ||
        item.status.toLowerCase().includes(query)
      )
    })
  }, [items, searchQuery, selectedListing, selectedStatus])

  const columns = useMemo<ColumnDef<ServiceProductItem>[]>(
    () => [
      {
        id: "product",
        header: "Service / Product",
        cell: ({ row }) => {
          const item = row.original
          return (
            <div className="flex items-center gap-3 py-1 min-w-[240px]">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="size-10 rounded-lg object-cover border border-border shrink-0"
                />
              ) : (
                <div className="size-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground border border-border shrink-0">
                  <Package className="size-5" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <span className="text-xs sm:text-sm font-semibold text-foreground truncate block">
                  {item.name}
                </span>
                <span className="text-xs text-muted-foreground truncate block mt-0.5">
                  {item.category}
                </span>
              </div>
            </div>
          )
        },
      },
      {
        id: "owner",
        header: "Owner",
        cell: ({ row }) => {
          const item = row.original
          return (
            <div className="min-w-[130px]">
              <span className="text-xs sm:text-sm font-semibold text-foreground truncate block">
                {item.businessOwnerName}
              </span>
            </div>
          )
        },
      },
      {
        id: "targetListing",
        header: "Target Listing",
        cell: ({ row }) => {
          const item = row.original
          return (
            <div className="min-w-[170px] space-y-0.5">
              <span className="text-xs sm:text-sm font-semibold text-foreground truncate block">
                {item.listingName}
              </span>
              <span className="text-xs text-muted-foreground truncate block">
                {item.listingCategory} • {item.city}
              </span>
            </div>
          )
        },
      },
      {
        id: "price",
        header: "Price",
        cell: ({ row }) => {
          const item = row.original
          return (
            <div className="min-w-[100px]">
              <span className="text-xs sm:text-sm font-bold text-foreground">
                ₹{item.price.toLocaleString("en-IN")}
              </span>
            </div>
          )
        },
      },
      {
        id: "popular",
        header: "Offering Tag",
        cell: ({ row }) => {
          const item = row.original
          return (
            <div className="min-w-[100px]">
              {item.popular ? (
                <Badge
                  className={cn(
                    "text-xs font-semibold px-2 py-0.5 gap-1 rounded-full",
                    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                  )}
                >
                  <Sparkles className="size-3" />
                  <span>Popular</span>
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="text-xs font-medium text-muted-foreground px-2 py-0.5 rounded-full"
                >
                  Standard
                </Badge>
              )}
            </div>
          )
        },
      },
      {
        id: "status",
        header: "Status",
        cell: ({ row }) => {
          const item = row.original
          return (
            <Badge
              variant={item.status === "Active" ? "success" : "danger"}
              className="rounded-full"
            >
              {item.status === "Active" ? (
                <CheckCircle2 className="size-3" />
              ) : (
                <XCircle className="size-3" />
              )}
              {item.status}
            </Badge>
          )
        },
      },
      {
        id: "createdAt",
        header: "Created Date",
        cell: ({ row }) => (
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {row.original.createdAt}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const item = row.original
          return (
            <div className="flex items-center justify-end">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setSelectedItem(item)}
                className="size-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 cursor-pointer transition-colors"
                title="View Full Details"
              >
                <Eye className="size-4" />
              </Button>
            </div>
          )
        },
      },
    ],
    []
  )

  return (
    <>
      <DataTable
        columns={columns}
        data={filteredItems}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search by service, product, listing, or owner..."
        // toolbarClassName="md:flex-row! md:items-center!"
        toolbarActions={
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="w-full sm:w-50">
              <SelectWithLabel
                value={selectedListing}
                onValueChange={setSelectedListing}
                options={listingOptions}
                placeholder="Filter by Listing"
                containerClassName="m-0 p-0"
                triggerClassName="h-9! text-xs font-semibold rounded-lg bg-muted/40 border-border hover:bg-muted/60 transition-colors"
              />
            </div>

             <Tabs
              value={selectedStatus}
              onValueChange={setSelectedStatus}
              className="self-start sm:self-auto"
            >
              <TabsList className="h-9 p-1 bg-muted/40 border border-border rounded-lg gap-1">
                {statusTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="h-7 px-3 text-xs font-semibold rounded-md"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        }
        emptyMessage="No services or products found matching your search or filters."
      />

      {/* View Details Modal (Read-Only) */}
      <ServiceProductDetailsModal
        open={Boolean(selectedItem)}
        onOpenChange={(open) => !open && setSelectedItem(null)}
        item={selectedItem}
      />
    </>
  )
}

export default ServicesProductsTable

