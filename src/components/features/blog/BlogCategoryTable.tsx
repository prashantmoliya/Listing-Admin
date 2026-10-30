import { useState, useMemo } from "react"
import {
  MoreVertical,
  Pencil,
  Trash2,
  FolderTree,
} from "lucide-react"
import DataTable, { type ColumnDef } from "@/components/common/DataTable"
import PopoverMenu from "@/components/common/PopoverMenu"
import { PopoverClose } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import AlertModal from "@/components/common/AlertModal"
import { type BlogCategoryItem, type BlogItem } from "@/data/dummyData"
import { cn } from "@/lib/utils"

interface BlogCategoryTableProps {
  categories: BlogCategoryItem[]
  blogs?: BlogItem[]
  onCategoriesChange: (categories: BlogCategoryItem[]) => void
  onEditCategory: (category: BlogCategoryItem) => void
}

const statusTabs = [
  { label: "All", value: "All" },
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
]

const BlogCategoryTable = ({
  categories,
  blogs = [],
  onCategoriesChange,
  onEditCategory,
}: BlogCategoryTableProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [deleteModalCategory, setDeleteModalCategory] = useState<BlogCategoryItem | null>(null)

  // Toggle category status
  const handleToggleStatus = (id: string, checked?: boolean) => {
    const updated = categories.map((cat) =>
      cat.id === id
        ? {
            ...cat,
            status: (checked !== undefined
              ? checked
                ? "Active"
                : "Inactive"
              : cat.status === "Active"
              ? "Inactive"
              : "Active") as BlogCategoryItem["status"],
          }
        : cat
    )
    onCategoriesChange(updated)
  }

  // Delete Category confirmation
  const handleConfirmDelete = () => {
    if (!deleteModalCategory) return
    const updated = categories.filter((c) => c.id !== deleteModalCategory.id)
    onCategoriesChange(updated)
    setDeleteModalCategory(null)
  }

  // Filter logic
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

  const columns = useMemo<ColumnDef<BlogCategoryItem>[]>(
    () => [
      {
        id: "name",
        header: "Category",
        cell: ({ row }) => {
          const cat = row.original
          return (
            <div className="flex items-center gap-3 py-1 min-w-[200px]">
              <div className="size-9 rounded-xl border border-border bg-primary/5 text-primary flex items-center justify-center shrink-0">
                <FolderTree className="size-4.5" />
              </div>
              <div className="min-w-0 flex-1">
                <span
                  className="text-sm font-semibold text-foreground block"
                >
                  {cat.name}
                </span>
                <p className="text-[11px] text-muted-foreground font-mono mt-0.5 truncate">
                  /{cat.slug}
                </p>
              </div>
            </div>
          )
        },
      },
      {
        id: "blogCount",
        header: "Assigned Blogs",
        cell: ({ row }) => {
          const cat = row.original
          const count = blogs.filter((b) => b.category === cat.name).length
          return (
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="text-xs font-semibold rounded-lg px-2.5 py-0.5 bg-muted/40 border-border"
              >
                {count} {count === 1 ? "Blog" : "Blogs"}
              </Badge>
            </div>
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
        header: "Created Date",
        cell: ({ row }) => (
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {row.original.createdAt || "Oct 2026"}
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
                  <PopoverClose asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditCategory(cat)}
                      className="w-full justify-start gap-2 h-8 px-2.5 text-xs font-semibold hover:bg-primary/10 hover:text-primary text-foreground cursor-pointer rounded-lg transition-colors group"
                    >
                      <Pencil className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span>Edit Category</span>
                    </Button>
                  </PopoverClose>

                  <PopoverClose asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteModalCategory(cat)}
                      className="w-full justify-start gap-2 h-8 px-2.5 text-xs font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer rounded-lg transition-colors group"
                    >
                      <Trash2 className="size-3.5 text-destructive transition-colors" />
                      <span>Delete Category</span>
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
    [blogs, categories]
  )

  return (
    <>
      <DataTable
        columns={columns}
        data={filteredCategories}
        searchPlaceholder="Search categories by name or slug..."
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
        emptyMessage="No categories found matching your criteria."
      />

      {/* Delete Confirmation Alert Modal */}
      <AlertModal
        open={!!deleteModalCategory}
        onOpenChange={(open) => !open && setDeleteModalCategory(null)}
        title="Delete Category?"
        description={
          deleteModalCategory
            ? `Are you sure you want to permanently delete "${deleteModalCategory.name}"? This action cannot be undone.`
            : "Are you sure you want to delete this category?"
        }
        confirmLabel="Delete Category"
        confirmVariant="destructive"
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}

export default BlogCategoryTable
