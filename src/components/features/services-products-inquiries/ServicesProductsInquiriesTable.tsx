import { UserAvatar } from "@/components/common"
import DataTable, { type ColumnDef } from "@/components/common/DataTable"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type ServiceProductInquiryItem } from "@/data/dummyData"
import { cn } from "@/lib/utils"
import {
  CheckCircle2,
  Clock,
  Eye,
  XCircle
} from "lucide-react"
import { useMemo, useState } from "react"
import ServiceProductInquiryDetailsModal from "./ServiceProductInquiryDetailsModal"

interface ServicesProductsInquiriesTableProps {
  inquiries: ServiceProductInquiryItem[]
}

const statusTabs = [
  { label: "All", value: "All" },
  { label: "Pending", value: "Pending" },
  { label: "Resolved", value: "Resolved" },
  { label: "Rejected", value: "Rejected" },
]

const ServicesProductsInquiriesTable = ({
  inquiries,
}: ServicesProductsInquiriesTableProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedInquiry, setSelectedInquiry] = useState<ServiceProductInquiryItem | null>(null)

  // Filter inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        query === "" ||
        item.fullName.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.phone.toLowerCase().includes(query) ||
        item.service.toLowerCase().includes(query) ||
        item.listingName.toLowerCase().includes(query) ||
        item.businessOwnerName.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.city.toLowerCase().includes(query)

      const matchesStatus =
        selectedStatus === "All" || item.status === selectedStatus

      return matchesSearch && matchesStatus
    })
  }, [inquiries, searchQuery, selectedStatus])

  const columns = useMemo<ColumnDef<ServiceProductInquiryItem>[]>(
    () => [
      {
        id: "customer",
        header: "Customer",
        cell: ({ row }) => {
          const item = row.original
          return (
            <div className="flex items-center gap-3 py-1 min-w-[210px]">
              <UserAvatar name={item.fullName} />
              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-semibold text-foreground truncate">
                  {item.fullName}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5 truncate">
                  {item.email}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5 truncate flex items-center gap-1">
                  <span>{item.phone}</span>
                </div>
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
              <div className="text-xs sm:text-sm font-semibold text-foreground truncate">
                {item.listingName}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {item.category} • {item.city}
              </div>
            </div>
          )
        },
      },
      {
        id: "service",
        header: "Service Requested",
        cell: ({ row }) => {
          const item = row.original
          return (
            <div className="min-w-[170px] max-w-[230px]">
              <span className="text-xs sm:text-sm font-semibold text-foreground truncate block">
                {item.service}
              </span>
            </div>
          )
        },
      },
      {
        id: "preferredContact",
        header: "Preferred Contact",
        cell: ({ row }) => {
          const item = row.original
          return (
            <Badge
              variant="outline"
              className={cn(
                "text-xs font-semibold rounded-lg px-2.5 py-0.5 whitespace-nowrap",
                item.preferredContact === "WhatsApp"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-900/60 dark:text-emerald-300"
                  : "border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:border-blue-900/60 dark:text-blue-300"
              )}
            >
              {item.preferredContact}
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
        id: "status",
        header: "Status",
        cell: ({ row }) => {
          const item = row.original
          return (
            <Badge
              variant="secondary"
              className={cn(
                "rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap gap-1",
                item.status === "Pending" &&
                  "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
                item.status === "Resolved" &&
                  "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
                item.status === "Rejected" &&
                  "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
              )}
            >
              {item.status === "Resolved" && <CheckCircle2 className="size-3" />}
              {item.status === "Pending" && <Clock className="size-3" />}
              {item.status === "Rejected" && <XCircle className="size-3" />}
              <span>{item.status}</span>
            </Badge>
          )
        },
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
                variant="outline"
                size="icon"
                onClick={() => setSelectedInquiry(item)}
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
        data={filteredInquiries}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search by customer, service, listing, or phone..."
        toolbarActions={
          <Tabs
            value={selectedStatus}
            onValueChange={setSelectedStatus}
            className="w-auto"
          >
            <TabsList className="h-9 p-1 bg-muted/60 border border-border">
              {statusTabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="text-xs px-3 py-1 font-semibold gap-1.5 cursor-pointer data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        }
        emptyMessage="No customer inquiries found matching your criteria."
      />

      {/* View Details Modal (Read-Only) */}
      <ServiceProductInquiryDetailsModal
        open={Boolean(selectedInquiry)}
        onOpenChange={(open) => !open && setSelectedInquiry(null)}
        inquiry={selectedInquiry}
      />
    </>
  )
}

export default ServicesProductsInquiriesTable
