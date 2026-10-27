import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import {
  FolderTree,
  MoreVertical,
  ExternalLink,
  Pencil,
} from "lucide-react"
import { mockCategories, type CategoryItem } from "@/data/dummyData"
import DataTable, { type ColumnDef } from "@/components/common/DataTable"
import PopoverMenu from "@/components/common/PopoverMenu"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

const statusFilters = ["All", "Active", "Inactive"]

const CategoriesTable = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState<CategoryItem[]>(() => [...mockCategories])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")

  const handleToggleStatus = (id: string, checked: boolean) => {
    const newStatus: "Active" | "Inactive" = checked ? "Active" : "Inactive"
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    )
    const inMock = mockCategories.find((c) => c.id === id)
    if (inMock) {
      inMock.status = newStatus
    }
  }

  // Filter logic: Search by name or slug, and filter by status
  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        query === "" ||
        cat.name.toLowerCase().includes(query) ||
        cat.slug.toLowerCase().includes(query)

      const matchesStatus =
        selectedStatus === "All" || cat.status === selectedStatus

      return matchesSearch && matchesStatus
    })
  }, [categories, searchQuery, selectedStatus])

  // Column Definitions
  const columns = useMemo<ColumnDef<CategoryItem>[]>(
    () => [
      {
        id: "category",
        header: "Category",
        cell: ({ row }) => {
          const cat = row.original
          return (
            <div className="flex items-center gap-3.5">
              <div className="size-11 rounded-xl overflow-hidden border border-border bg-muted/50 shrink-0 relative flex items-center justify-center shadow-2xs">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="size-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <FolderTree className="size-5 text-muted-foreground" />
                )}
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-foreground text-sm truncate">
                  {cat.name}
                </div>
                <div className="text-[11px] text-muted-foreground font-mono mt-0.5">
                  /{cat.slug}
                </div>
              </div>
            </div>
          )
        },
      },
      {
        id: "listingCount",
        header: "Listing Count",
        cell: ({ row }) => {
          const count = row.original.listingCount
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
          const cat = row.original
          const isActive = cat.status === "Active"

          return (
            <div className="flex items-center gap-2.5">
              <Switch
                checked={isActive}
                onCheckedChange={(checked) => handleToggleStatus(cat.id, checked)}
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
        id: "createdAt",
        header: "Created At",
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
          const cat = row.original
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
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(`/categories/${cat.id}/edit`)}
                    className="w-full justify-start gap-2 h-8 px-2.5 text-xs font-semibold hover:bg-primary/10 hover:text-primary text-foreground cursor-pointer rounded-lg transition-colors group"
                  >
                    <Pencil className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span>Edit Category</span>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/listings")}
                    className="w-full justify-start gap-2 h-8 px-2.5 text-xs font-semibold hover:bg-primary/10 hover:text-primary text-foreground cursor-pointer rounded-lg transition-colors group"
                  >
                    <ExternalLink className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span>View Listings</span>
                  </Button>
                </div>
              </PopoverMenu>
            </div>
          )
        },
      },
    ],
    [navigate]
  )

  

  return (
    <DataTable
      columns={columns}
      data={filteredCategories}
      searchPlaceholder="Search categories by name or slug..."
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      toolbarActions={
        <Tabs
          value={selectedStatus}
          onValueChange={(val) => setSelectedStatus(val)}
          className="self-start sm:self-auto"
        >
          <TabsList className="h-9 p-1 bg-muted/40 border border-border rounded-lg gap-1">
            {statusFilters.map((st) => (
              <TabsTrigger
                key={st}
                value={st}
                className="h-7 px-3 text-xs font-semibold rounded-lg"
              >
                {st}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      }
      emptyMessage="No categories found matching your search and filter criteria."
    />
  )
}

export default CategoriesTable
