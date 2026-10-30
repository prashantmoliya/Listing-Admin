import { useState, useMemo } from "react"
import {
  MoreVertical,
  Pencil,
  Trash2,
  Sparkles,
  Layers,
  Package,
} from "lucide-react"
import DataTable, { type ColumnDef } from "@/components/common/DataTable"
import PopoverMenu from "@/components/common/PopoverMenu"
import { PopoverClose } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import AlertModal from "@/components/common/AlertModal"
import { type SubscriptionPlanItem } from "@/data/dummyData"
import { cn } from "@/lib/utils"

interface SubscriptionPlansTableProps {
  plans: SubscriptionPlanItem[]
  onPlansChange: (plans: SubscriptionPlanItem[]) => void
  onEditPlan: (plan: SubscriptionPlanItem) => void
}

const statusTabs = [
  { label: "All", value: "All" },
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
]

export const SubscriptionPlansTable = ({
  plans,
  onPlansChange,
  onEditPlan,
}: SubscriptionPlansTableProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [deleteModalPlan, setDeleteModalPlan] = useState<SubscriptionPlanItem | null>(null)

  // Toggle plan active status
  const handleToggleStatus = (id: string, checked?: boolean) => {
    const updated = plans.map((p) =>
      p.id === id
        ? {
            ...p,
            status: (checked !== undefined
              ? checked
                ? "Active"
                : "Inactive"
              : p.status === "Active"
              ? "Inactive"
              : "Active") as SubscriptionPlanItem["status"],
          }
        : p
    )
    onPlansChange(updated)
  }

  // Confirm delete plan
  const handleConfirmDelete = () => {
    if (!deleteModalPlan) return
    const updated = plans.filter((p) => p.id !== deleteModalPlan.id)
    onPlansChange(updated)
    setDeleteModalPlan(null)
  }

  // Filter logic
  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        query === "" ||
        plan.name.toLowerCase().includes(query) ||
        plan.tag.toLowerCase().includes(query) ||
        plan.headline.toLowerCase().includes(query) ||
        plan.price.toString().toLowerCase().includes(query)

      const matchesStatus =
        selectedStatus === "All" || plan.status === selectedStatus

      return matchesSearch && matchesStatus
    })
  }, [plans, searchQuery, selectedStatus])

  const columns = useMemo<ColumnDef<SubscriptionPlanItem>[]>(
    () => [
      {
        id: "plan",
        header: "Package / Plan",
        cell: ({ row }) => {
          const plan = row.original
          return (
            <div className="flex items-center gap-3.5 py-1 min-w-[240px]">
              <div className="size-11 rounded-lg border border-border bg-muted/40 flex items-center justify-center text-2xl shrink-0 shadow-2xs">
                <span>{plan.icon}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-extrabold tracking-wider uppercase text-muted-foreground">
                    {plan.tag}
                  </span>
                  {plan.popular && (
                    <Badge
                      variant="secondary"
                      className="text-[10px] font-bold px-2 py-0.25 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 gap-1"
                    >
                      <Sparkles className="size-2.5" />
                      <span>Popular</span>
                    </Badge>
                  )}
                </div>
                <span className="text-sm font-bold text-foreground block mt-0.5 truncate">
                  {plan.name}
                </span>
              </div>
            </div>
          )
        },
      },
      {
        id: "pricing",
        header: "Pricing & Cycle",
        cell: ({ row }) => {
          const plan = row.original
          const displayPrice =
            typeof plan.price === "number" ? `₹${plan.price}` : plan.price
          return (
            <div className="min-w-[120px]">
              <div className="flex items-baseline gap-1">
                <span className="text-base font-extrabold text-foreground tracking-tight">
                  {displayPrice}
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  {plan.period}
                </span>
              </div>
            </div>
          )
        },
      },
      {
        id: "servicesLimit",
        header: "Services & Products",
        cell: ({ row }) => {
          const limit = row.original.servicesLimit
          return (
            <div className="flex items-center gap-1.5 min-w-[140px]">
              <Package className="size-3.5 text-muted-foreground" />
              <span className="text-xs font-semibold text-foreground">
                {limit > 0 ? `Up to ${limit} items` : "Not included"}
              </span>
            </div>
          )
        },
      },
      {
        id: "features",
        header: "Included Features",
        cell: ({ row }) => {
          const count = row.original.includedFeatures.length
          return (
            <div className="flex items-center gap-1.5 min-w-[140px]">
              <Layers className="size-3.5 text-primary" />
              <Badge
                variant="outline"
                className="text-xs font-semibold rounded-lg px-2.5 py-0.5 bg-primary/5 text-primary border-primary/20"
              >
                {count} {count === 1 ? "Feature" : "Features"}
              </Badge>
            </div>
          )
        },
      },
      {
        id: "status",
        header: "Status",
        cell: ({ row }) => {
          const plan = row.original
          const isActive = plan.status === "Active"

          return (
            <div className="flex items-center gap-2.5 min-w-[120px]">
              <Switch
                checked={isActive}
                onCheckedChange={(checked) => handleToggleStatus(plan.id, checked)}
                className="data-[checked]:bg-emerald-600 data-[checked]:hover:bg-emerald-700 cursor-pointer"
              />
              <span
                className={cn(
                  "text-xs font-semibold select-none",
                  isActive
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-muted-foreground"
                )}
              >
                {isActive ? "Active" : "Inactive"}
              </span>
            </div>
          )
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const plan = row.original
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
                      onClick={() => onEditPlan(plan)}
                      className="w-full justify-start gap-2 h-8 px-2.5 text-xs font-semibold hover:bg-primary/10 hover:text-primary text-foreground cursor-pointer rounded-lg transition-colors group"
                    >
                      <Pencil className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span>Edit Plan</span>
                    </Button>
                  </PopoverClose>

                  <PopoverClose asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteModalPlan(plan)}
                      className="w-full justify-start gap-2 h-8 px-2.5 text-xs font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer rounded-lg transition-colors group"
                    >
                      <Trash2 className="size-3.5 text-destructive transition-colors" />
                      <span>Delete Plan</span>
                    </Button>
                  </PopoverClose>
                </div>
              </PopoverMenu>
            </div>
          )
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [plans]
  )

  return (
    <>
      <DataTable
        columns={columns}
        data={filteredPlans}
        searchPlaceholder="Search plans by name, tag, or pricing..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        toolbarActions={
          <div className="flex flex-wrap items-center gap-2">
            <Tabs
              value={selectedStatus}
              onValueChange={(val) => setSelectedStatus(val)}
              className="self-start sm:self-auto"
            >
              <TabsList className="h-9 p-1 bg-muted/40 border border-border rounded-lg gap-1">
                {statusTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="h-7 px-3 text-xs font-semibold rounded-lg"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        }
        emptyMessage="No subscription plans found matching your search."
      />

      {/* Delete Confirmation Alert Modal */}
      <AlertModal
        open={!!deleteModalPlan}
        onOpenChange={(open) => !open && setDeleteModalPlan(null)}
        title="Delete Subscription Plan?"
        description={
          deleteModalPlan
            ? `Are you sure you want to permanently delete "${deleteModalPlan.name}"? This package will no longer be visible or available for business listings.`
            : "Are you sure you want to delete this subscription plan?"
        }
        confirmLabel="Delete Plan"
        confirmVariant="destructive"
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}

export default SubscriptionPlansTable

