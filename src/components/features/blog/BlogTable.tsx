import { useState, useMemo, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  MoreVertical,
  Pencil,
  Trash2,
  ExternalLink,
  Eye,
  FileText,
} from "lucide-react"
import DataTable, { type ColumnDef } from "@/components/common/DataTable"
import PopoverMenu from "@/components/common/PopoverMenu"
import { PopoverClose } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import AlertModal from "@/components/common/AlertModal"
import { type BlogItem } from "@/data/dummyData"
import { cn } from "@/lib/utils"

const statusTabs = [
  { label: "All", value: "All" },
  { label: "Published", value: "Published" },
  { label: "Draft", value: "Draft" },
]

interface BlogTableProps {
  blogs: BlogItem[]
  onBlogsChange: (blogs: BlogItem[]) => void
}

const BlogTable = ({
  blogs: initialBlogs,
  onBlogsChange,
}: BlogTableProps) => {
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState<BlogItem[]>(initialBlogs)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [deleteModalBlog, setDeleteModalBlog] = useState<BlogItem | null>(null)

  useEffect(() => {
    setBlogs(initialBlogs)
  }, [initialBlogs])

  const updateList = (newItems: BlogItem[]) => {
    setBlogs(newItems)
    onBlogsChange(newItems)
  }

  // Filter logic: Search + Status tabs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      // Search
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        query === "" ||
        blog.title.toLowerCase().includes(query) ||
        blog.slug.toLowerCase().includes(query) ||
        blog.category.toLowerCase().includes(query) ||
        blog.author.toLowerCase().includes(query)

      // Status
      const matchesStatus =
        selectedStatus === "All" || blog.status === selectedStatus

      return matchesSearch && matchesStatus
    })
  }, [blogs, searchQuery, selectedStatus])

  // Toggle Published/Draft status via Switch
  const handleToggleStatus = (id: string, checked?: boolean) => {
    const updated = blogs.map((b) =>
      b.id === id
        ? {
            ...b,
            status: (checked !== undefined
              ? checked
                ? "Published"
                : "Draft"
              : b.status === "Published"
              ? "Draft"
              : "Published") as BlogItem["status"],
            publishedAt:
              checked || b.status === "Draft" ? "Just now" : "Draft",
          }
        : b
    )
    updateList(updated)
  }

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!deleteModalBlog) return
    const updated = blogs.filter((b) => b.id !== deleteModalBlog.id)
    updateList(updated)
    setDeleteModalBlog(null)
  }

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "Business Tips":
        return "border-indigo-200 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-900/60 dark:text-indigo-300"
      case "Local Guides":
        return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-900/60 dark:text-emerald-300"
      case "Marketing & SEO":
        return "border-violet-200 bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:border-violet-900/60 dark:text-violet-300"
      case "Market Trends":
        return "border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:border-amber-900/60 dark:text-amber-300"
      default:
        return "border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:border-blue-900/60 dark:text-blue-300"
    }
  }

  const columns = useMemo<ColumnDef<BlogItem>[]>(
    () => [
      {
        id: "blog",
        header: "Blog",
        cell: ({ row }) => {
          const blog = row.original
          return (
            <div className="flex items-center gap-3 py-1 min-w-[260px] max-w-[360px]">
              <div className="size-12 rounded-xl overflow-hidden shrink-0 border border-border bg-muted/40 relative">
                {blog.image ? (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <FileText className="size-5" />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-sm font-semibold text-foreground line-clamp-1">
                  {blog.title}
                </span>
                <p className="text-[11px] text-muted-foreground font-mono mt-0.5 truncate">
                  /{blog.slug}
                </p>
              </div>
            </div>
          )
        },
      },
      {
        id: "category",
        header: "Category",
        cell: ({ row }) => (
          <Badge
            variant="outline"
            className={cn(
              "text-xs font-semibold rounded-lg px-2.5 py-0.5 whitespace-nowrap",
              getCategoryBadgeClass(row.original.category)
            )}
          >
            {row.original.category}
          </Badge>
        ),
      },
      {
        id: "author",
        header: "Author",
        cell: ({ row }) => (
          <span className="text-xs font-semibold text-foreground whitespace-nowrap">
            {row.original.author}
          </span>
        ),
      },
      {
        id: "views",
        header: "Views",
        cell: ({ row }) => (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground whitespace-nowrap">
            <Eye className="size-3.5 text-muted-foreground" />
            <span className="font-semibold text-foreground">
              {row.original.views.toLocaleString()}
            </span>
          </div>
        ),
      },
      {
        id: "status",
        header: "Status",
        cell: ({ row }) => {
          const blog = row.original
          const isPublished = blog.status === "Published"

          return (
            <div className="flex items-center gap-2.5">
              <Switch
                checked={isPublished}
                onCheckedChange={(checked) => handleToggleStatus(blog.id, checked)}
                className="data-[checked]:bg-emerald-600 data-[checked]:hover:bg-emerald-700 cursor-pointer"
              />
              <span
                className={cn(
                  "text-xs font-semibold select-none",
                  isPublished
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-muted-foreground"
                )}
              >
                {isPublished ? "Published" : "Draft"}
              </span>
            </div>
          )
        },
      },
      {
        id: "publishedAt",
        header: "Published Date",
        cell: ({ row }) => (
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {row.original.publishedAt}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const blog = row.original
          return (
            <div className="flex items-center justify-end">
              <PopoverMenu
                align="end"
                contentClass="w-40"
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
                      onClick={() => navigate(`/blog/${blog.id}/edit`)}
                      className="w-full justify-start gap-2 h-8 px-2.5 text-xs font-semibold hover:bg-primary/10 hover:text-primary text-foreground cursor-pointer rounded-lg transition-colors group"
                    >
                      <Pencil className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                      <span>Edit Blog</span>
                    </Button>
                  </PopoverClose>

                  <PopoverClose asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(`https://listing-website-six.vercel.app/blog/${blog.slug}`, "_blank")}
                      className="w-full justify-start gap-2 h-8 px-2.5 text-xs font-semibold hover:bg-muted text-foreground cursor-pointer rounded-lg transition-colors group"
                    >
                      <ExternalLink className="size-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      <span>View Live</span>
                    </Button>
                  </PopoverClose>

                  <PopoverClose asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteModalBlog(blog)}
                      className="w-full justify-start gap-2 h-8 px-2.5 text-xs font-semibold text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer rounded-lg transition-colors group"
                    >
                      <Trash2 className="size-3.5 text-destructive transition-colors" />
                      <span>Delete Blog</span>
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
    [navigate, blogs]
  )

  return (
    <>
      <DataTable
        columns={columns}
        data={filteredBlogs}
        searchPlaceholder="Search blogs by title, slug, category, or author..."
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
        emptyMessage="No blogs found matching your criteria."
      />

      {/* Delete Confirmation Alert Modal */}
      <AlertModal
        open={!!deleteModalBlog}
        onOpenChange={(open) => !open && setDeleteModalBlog(null)}
        title="Delete Blog?"
        description={
          deleteModalBlog
            ? `Are you sure you want to permanently delete "${deleteModalBlog.title}"? This will remove the blog post from the live website.`
            : "Are you sure you want to delete this blog?"
        }
        confirmLabel="Delete Blog"
        confirmVariant="destructive"
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}

export default BlogTable

