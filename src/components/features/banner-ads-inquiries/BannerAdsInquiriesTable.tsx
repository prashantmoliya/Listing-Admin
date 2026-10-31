import { useState, useMemo } from "react"
import {
  MoreVertical,
  Eye,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  Ruler,
} from "lucide-react"
import DataTable, { type ColumnDef } from "@/components/common/DataTable"
import PopoverMenu from "@/components/common/PopoverMenu"
import { PopoverClose } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import AlertModal from "@/components/common/AlertModal"
import { UserAvatar } from "@/components/common"
import { type BannerAdInquiryItem } from "@/data/dummyData"
import BannerAdInquiryDetailsModal from "./BannerAdInquiryDetailsModal"
import { cn } from "@/lib/utils"

interface BannerAdsInquiriesTableProps {
  inquiries: BannerAdInquiryItem[]
  onInquiriesChange: (inquiries: BannerAdInquiryItem[]) => void
}

const statusTabs = [
  { label: "All", value: "All" },
  { label: "New", value: "New" },
  { label: "Confirmed", value: "Confirmed" },
  { label: "Rejected", value: "Rejected" },
]

const getPlacementBadgeClass = (type: string) => {
  switch (type) {
    case "Header Banner":
      return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20"
    case "Side Banner":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
    case "Blog Page Banner":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
    case "Footer Banner":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
    case "All in One":
      return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
    default:
      return "bg-muted text-muted-foreground border-border"
  }
}

const BannerAdsInquiriesTable = ({
  inquiries,
  onInquiriesChange,
}: BannerAdsInquiriesTableProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedInquiry, setSelectedInquiry] = useState<BannerAdInquiryItem | null>(null)
  const [deleteModalInquiry, setDeleteModalInquiry] = useState<BannerAdInquiryItem | null>(null)

  // Status Change Handler
  const handleStatusChange = (id: string, newStatus: BannerAdInquiryItem["status"]) => {
    const updated = inquiries.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    )
    onInquiriesChange(updated)
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus })
    }
  }

  // Delete Handler
  const handleConfirmDelete = () => {
    if (!deleteModalInquiry) return
    const updated = inquiries.filter((item) => item.id !== deleteModalInquiry.id)
    onInquiriesChange(updated)
    setDeleteModalInquiry(null)
  }

  // Filter inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        query === "" ||
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.mobile.toLowerCase().includes(query) ||
        item.bannerType.toLowerCase().includes(query) ||
        (item.notes && item.notes.toLowerCase().includes(query))

      const matchesStatus =
        selectedStatus === "All" || item.status === selectedStatus

      return matchesSearch && matchesStatus
    })
  }, [inquiries, searchQuery, selectedStatus])

  const columns = useMemo<ColumnDef<BannerAdInquiryItem>[]>(
    () => [
      {
        id: "advertiser",
        header: "Advertiser Contact",
        cell: ({ row }) => {
          const item = row.original
          return (
            <div className="flex items-center gap-3 py-1 min-w-[220px]">
              <UserAvatar name={item.name} />
              <div className="min-w-0 flex-1">
                <span className="text-sm font-bold text-foreground block truncate">
                  {item.name}
                </span>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                  <span className="truncate">{item.email}</span>
                </div>
              </div>
            </div>
          )
        },
      },
      {
        id: "phone",
        header: "Phone",
        cell: ({ row }) => {
          const item = row.original
          return (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground min-w-[120px]">
              <Phone className="size-3 text-muted-foreground" />
              <span>{item.mobile}</span>
            </div>
          )
        },
      },
      {
        id: "placement",
        header: "Placement & Size",
        cell: ({ row }) => {
          const item = row.original
          return (
            <div className="min-w-[170px] space-y-1">
              <Badge
                className={cn(
                  "font-bold text-[11px] px-2 py-0.5 border shadow-2xs",
                  getPlacementBadgeClass(item.bannerType)
                )}
              >
                {item.bannerType}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Ruler className="size-3" />
                <span>
                  {item.width} × {item.height}
                </span>
              </div>
            </div>
          )
        },
      },
      {
        id: "createdAt",
        header: "Submitted Date",
        cell: ({ row }) => {
          return (
            <div className="text-xs text-muted-foreground font-medium min-w-[100px]">
              {row.original.createdAt}
            </div>
          )
        },
      },
      {
        id: "status",
        header: "Status",
        cell: ({ row }) => {
          const item = row.original
          const isConfirmed = item.status === "Confirmed"
          const isRejected = item.status === "Rejected"
          const isNew = item.status === "New"

          return (
            <div className="min-w-[110px]">
              <Badge
                variant="secondary"
                className={cn(
                  "gap-1 font-semibold text-xs px-2.5 py-0.5 rounded-full whitespace-nowrap",
                  isNew &&
                  "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
                  isConfirmed &&
                  "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
                  isRejected &&
                  "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                )}
              >
                {isConfirmed && <CheckCircle2 className="size-3" />}
                {isRejected && <XCircle className="size-3" />}
                {isNew && <Clock className="size-3" />}
                <span>{item.status}</span>
              </Badge>
            </div>
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
              <PopoverMenu
                align="end"
                contentClass="w-36"
                trigger={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                  >
                    <MoreVertical className="size-4" />
                  </Button>
                }
              >
                <div className="flex flex-col gap-0.5">
                  <PopoverClose asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedInquiry(item)}
                      className="w-full justify-start gap-2 h-8 px-2.5 text-xs font-semibold hover:bg-primary/10 hover:text-primary text-foreground cursor-pointer rounded-lg transition-colors group"
                    >
                      <Eye className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span>View Details</span>
                    </Button>
                  </PopoverClose>

                  {item.status !== "Confirmed" && (
                    <PopoverClose asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStatusChange(item.id, "Confirmed")}
                        className="w-full justify-start gap-2 h-8 px-2.5 text-xs font-semibold hover:bg-emerald-500/10 hover:text-emerald-600 text-foreground cursor-pointer rounded-lg transition-colors group"
                      >
                        <CheckCircle2 className="size-3.5 text-muted-foreground group-hover:text-emerald-600 transition-colors" />
                        <span>Confirm</span>
                      </Button>
                    </PopoverClose>
                  )}

                  {item.status !== "Rejected" && (
                    <PopoverClose asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStatusChange(item.id, "Rejected")}
                        className="w-full justify-start gap-2 h-8 px-2.5 text-xs font-semibold hover:bg-rose-500/10 hover:text-rose-600 text-foreground cursor-pointer rounded-lg transition-colors group"
                      >
                        <XCircle className="size-3.5 text-muted-foreground group-hover:text-rose-600 transition-colors" />
                        <span>Reject</span>
                      </Button>
                    </PopoverClose>
                  )}

                  {item.status !== "New" && (
                    <PopoverClose asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStatusChange(item.id, "New")}
                        className="w-full justify-start gap-2 h-8 px-2.5 text-xs font-semibold hover:bg-amber-500/10 hover:text-amber-600 text-foreground cursor-pointer rounded-lg transition-colors group"
                      >
                        <Clock className="size-3.5 text-muted-foreground group-hover:text-amber-600 transition-colors" />
                        <span>Reset to New</span>
                      </Button>
                    </PopoverClose>
                  )}

                  <PopoverClose asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteModalInquiry(item)}
                      className="w-full justify-start gap-2 h-8 px-2.5 text-xs font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer rounded-lg transition-colors group"
                    >
                      <Trash2 className="size-3.5 text-destructive transition-colors" />
                      <span>Delete</span>
                    </Button>
                  </PopoverClose>
                </div>
              </PopoverMenu>
            </div>
          )
        },
      },
    ],
    [inquiries]
  )

  return (
    <>
      <DataTable
        columns={columns}
        data={filteredInquiries}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search by name, email, phone, placement..."
        toolbarActions={
          <Tabs
            value={selectedStatus}
            onValueChange={setSelectedStatus}
            className="w-auto"
          >
            <TabsList className="h-9 p-1 bg-muted/60 border border-border">
              {statusTabs.map((tab) => {
                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="text-xs px-3 py-1 font-semibold gap-1.5 cursor-pointer data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs"
                  >
                    {tab.label}
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </Tabs>
        }
      />

      {/* View Details Modal */}
      <BannerAdInquiryDetailsModal
        open={Boolean(selectedInquiry)}
        onOpenChange={(open) => !open && setSelectedInquiry(null)}
        inquiry={selectedInquiry}
        onStatusChange={handleStatusChange}
      />

      {/* Delete Confirmation Alert Modal */}
      <AlertModal
        open={Boolean(deleteModalInquiry)}
        onOpenChange={(open) => !open && setDeleteModalInquiry(null)}
        title="Delete Banner Ad Inquiry"
        description={
          <span>
            Are you sure you want to delete the inquiry from{" "}
            <strong>{deleteModalInquiry?.name}</strong>? This action cannot be
            undone.
          </span>
        }
        confirmLabel="Delete Inquiry"
        cancelLabel="Cancel"
        confirmVariant="destructive"
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}

export default BannerAdsInquiriesTable

