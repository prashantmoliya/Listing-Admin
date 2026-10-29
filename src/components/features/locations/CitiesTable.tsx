import { useState, useMemo, useEffect } from "react"
import {
  MapPin,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react"
import { type CityItem } from "@/data/locationsData"
import DataTable, { type ColumnDef } from "@/components/common/DataTable"
import PopoverMenu from "@/components/common/PopoverMenu"
import { PopoverClose } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import AlertModal from "@/components/common/AlertModal"
import { cn } from "@/lib/utils"

const statusTabs = [
  { label: "All", value: "All" },
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
]

interface CitiesTableProps {
  cities: CityItem[]
  onCitiesChange: (cities: CityItem[]) => void
  onEditCity: (city: CityItem) => void
}

const CitiesTable = ({
  cities: initialCities,
  onCitiesChange,
  onEditCity,
}: CitiesTableProps) => {
  const [cities, setCities] = useState<CityItem[]>(initialCities)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [deleteModalCity, setDeleteModalCity] = useState<CityItem | null>(null)

  useEffect(() => {
    setCities(initialCities)
  }, [initialCities])

  const updateList = (newItems: CityItem[]) => {
    setCities(newItems)
    onCitiesChange(newItems)
  }

  // Filter logic: Search + Status tab
  const filteredCities = useMemo(() => {
    return cities.filter((city) => {
      // Search
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        query === "" ||
        city.name.toLowerCase().includes(query) ||
        city.slug.toLowerCase().includes(query) ||
        city.stateName.toLowerCase().includes(query)

      // Status Filter
      const matchesStatus =
        selectedStatus === "All" || city.status === selectedStatus

      return matchesSearch && matchesStatus
    })
  }, [cities, searchQuery, selectedStatus])

  // Toggle Active/Inactive status via Switch
  const handleToggleStatus = (id: string, checked?: boolean) => {
    const updated = cities.map((c) =>
      c.id === id
        ? {
            ...c,
            status: (checked !== undefined
              ? checked
                ? "Active"
                : "Inactive"
              : c.status === "Active"
              ? "Inactive"
              : "Active") as CityItem["status"],
          }
        : c
    )
    updateList(updated)
  }

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!deleteModalCity) return
    const updated = cities.filter((c) => c.id !== deleteModalCity.id)
    updateList(updated)
    setDeleteModalCity(null)
  }

  const columns = useMemo<ColumnDef<CityItem>[]>(
    () => [
      {
        id: "city",
        header: "City",
        cell: ({ row }) => {
          const city = row.original
          return (
            <div className="flex items-center gap-3 py-1">
              <div className="size-9 rounded-xl flex items-center justify-center shrink-0 border border-border bg-muted/40 text-muted-foreground">
                <MapPin className="size-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="min-w-0">
                <span className="text-sm font-bold text-foreground">
                  {city.name}
                </span>
                <p className="text-xs text-muted-foreground font-mono mt-0.5">
                  /{city.slug}
                </p>
              </div>
            </div>
          )
        },
      },
      {
        id: "state",
        header: "State",
        cell: ({ row }) => {
          const city = row.original
          return (
            <div className="flex items-center gap-1.5">
              <Badge
                variant="outline"
                className="text-xs font-semibold rounded-lg border-indigo-200 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-900/60 dark:text-indigo-300"
              >
                {city.stateName} ({city.stateCode})
              </Badge>
            </div>
          )
        },
      },
      {
        id: "listingCount",
        header: "Listing Count",
        cell: ({ row }) => {
          const count = row.original.listingsCount
          return (
            <Badge
              variant="secondary"
              className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
            >
              {count.toLocaleString()} Listings
            </Badge>
          )
        },
      },
      {
        id: "status",
        header: "Status",
        cell: ({ row }) => {
          const city = row.original
          const isActive = city.status === "Active"

          return (
            <div className="flex items-center gap-2.5">
              <Switch
                checked={isActive}
                onCheckedChange={(checked) => handleToggleStatus(city.id, checked)}
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
          const city = row.original
          return (
            <div className="flex items-center justify-end">
              <PopoverMenu
                align="end"
                contentClass="w-38"
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
                      onClick={() => onEditCity(city)}
                      className="w-full justify-start gap-2 h-8 px-2.5 text-xs font-semibold text-foreground cursor-pointer rounded-lg transition-colors group"
                    >
                      <Pencil className="size-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      <span>Edit City</span>
                    </Button>
                  </PopoverClose>

                  <PopoverClose asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteModalCity(city)}
                      className="w-full justify-start gap-2 h-8 px-2.5 text-xs font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer rounded-lg transition-colors group"
                    >
                      <Trash2 className="size-3.5 text-destructive transition-colors" />
                      <span>Delete City</span>
                    </Button>
                  </PopoverClose>
                </div>
              </PopoverMenu>
            </div>
          )
        },
      },
    ],
    [onEditCity]
  )

  return (
    <>
      <DataTable
        columns={columns}
        data={filteredCities}
        searchPlaceholder="Search cities by name, slug, or state..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        toolbarActions={
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter Tabs */}
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
        emptyMessage="No cities found matching your criteria."
      />

      {/* Delete Confirmation Alert Modal */}
      <AlertModal
        open={!!deleteModalCity}
        onOpenChange={(open) => !open && setDeleteModalCity(null)}
        title="Delete City"
        description={
          deleteModalCity
            ? `Are you sure you want to remove "${deleteModalCity.name}" (${deleteModalCity.stateName}) from the directory? Listings associated with this city will lose their city tag.`
            : ""
        }
        confirmLabel="Delete"
        confirmVariant="destructive"
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}

export default CitiesTable
