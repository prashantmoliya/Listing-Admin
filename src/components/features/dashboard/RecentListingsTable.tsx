import { useMemo } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  ArrowUpRight,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle,
  Star,
  MapPin,
  Eye,
} from "lucide-react"
import { recentListings, type RecentListing } from "@/data/dummyData"
import DataTable, { type ColumnDef } from "@/components/common/DataTable"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import PopoverMenu from "@/components/common/PopoverMenu"

const RecentListingsTable = () => {
  const navigate = useNavigate()

  const columns = useMemo<ColumnDef<RecentListing>[]>(
    () => [
      {
        id: "business",
        header: "Business",
        cell: ({ row }) => {
          const item = row.original
          return (
            <div>
              <div className="font-semibold text-foreground">{item.name}</div>
              <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 mt-0.5">
                <span className="font-mono">{item.id}</span>
                <span>•</span>
                <span className="inline-flex items-center gap-0.5 text-amber-500 font-semibold">
                  <Star className="size-3 fill-amber-500 text-amber-500" />
                  {item.rating}
                </span>
                <span className="text-muted-foreground/70">
                  ({item.reviews})
                </span>
              </div>
            </div>
          )
        },
      },
      {
        id: "category",
        header: "Category",
        cell: ({ row }) => (
          <Badge variant="secondary" className="text-xs font-medium">
            {row.original.category}
          </Badge>
        ),
      },
      {
        id: "location",
        header: "Location",
        cell: ({ row }) => (
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
            <MapPin className="size-3 text-muted-foreground/70" />
            {row.original.city}
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
              variant={
                item.status === "Verified"
                  ? "success"
                  : item.status === "Pending"
                    ? "warning"
                    : "info"
              }
              className="rounded-full"
            >
              {item.status === "Verified" ? (
                <CheckCircle2 className="size-3" />
              ) : item.status === "Pending" ? (
                <Clock className="size-3" />
              ) : (
                <AlertCircle className="size-3" />
              )}
              {item.status}
            </Badge>
          )
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: () => (
          <div className="flex items-center justify-end">
            <PopoverMenu
              align="end"
              contentClass="w-32"
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
                  onClick={() => navigate("/listings")}
                  className="w-full justify-start gap-2 h-8 px-2.5 text-xs font-semibold hover:bg-primary/10 hover:text-primary text-foreground cursor-pointer rounded-lg transition-colors group"
                >
                  <Eye className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span>View Details</span>
                </Button>
              </div>
            </PopoverMenu>
          </div>
        ),
      },
    ],
    [navigate]
  )

  return (
    <DataTable
      columns={columns}
      data={recentListings}
      title="Recent Listings"
      description="Latest businesses registered on your portal"
      toolbarActions={
        <Link
          to="/listings"
          className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1 cursor-pointer"
        >
          View All <ArrowUpRight className="size-3" />
        </Link>
      }
      showPagination={false}
      emptyMessage="No recent listings found."
    />
  )
}

export default RecentListingsTable