import { Link } from "react-router-dom"
import {
  Building2,
  ExternalLink,
  Star,
  CheckCircle2,
  Clock,
  MapPin,
  ArrowRight,
} from "lucide-react"
import type { UserListingRef } from "@/data/dummyData"
import { Badge } from "@/components/ui/badge"

interface UserRegisteredListingsProps {
  listings: UserListingRef[]
}

const UserRegisteredListings = ({ listings }: UserRegisteredListingsProps) => {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Building2 className="size-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-foreground">
                Registered Businesses
              </h3>
              <Badge variant="secondary" className="rounded-full bg-primary/10 text-primary border-transparent font-semibold px-2">
                {listings.length}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Live business listings managed under this account
            </p>
          </div>
        </div>

        {listings.length > 0 && (
          <Link
            to="/listings"
            className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            Manage All <ExternalLink className="size-3" />
          </Link>
        )}
      </div>

      {/* Content */}
      {listings.length === 0 ? (
        <div className="p-12 text-center space-y-3">
          <div className="size-14 rounded-2xl bg-muted/60 flex items-center justify-center mx-auto text-muted-foreground border border-border">
            <Building2 className="size-7" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              No Registered Businesses Yet
            </h4>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1">
              This owner has not added any business profiles to the platform yet.
            </p>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {listings.map((item) => (
            <div
              key={item.id}
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/30 transition-all group"
            >
              {/* Left Info */}
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="size-11 rounded-xl bg-gradient-to-br from-indigo-500/10 to-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <Building2 className="size-5" />
                </div>

                <div className="min-w-0 space-y-1">
                  <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {item.name}
                  </h4>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="text-[11px] font-medium">
                      {item.category}
                    </Badge>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3 text-muted-foreground/70" />
                      {item.city}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 text-amber-500 font-semibold">
                      <Star className="size-3 fill-amber-500 text-amber-500" />
                      {item.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Status & Link */}
              <div className="flex items-center gap-3 sm:self-center shrink-0">
                <Badge
                  variant={item.status === "Verified" ? "success" : "warning"}
                  className="rounded-full"
                >
                  {item.status === "Verified" ? (
                    <CheckCircle2 className="size-3" />
                  ) : (
                    <Clock className="size-3" />
                  )}
                  {item.status}
                </Badge>

                <Link
                  to="/listings"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-border bg-card hover:bg-muted text-xs font-semibold text-foreground transition-all shadow-2xs hover:border-primary/40 cursor-pointer"
                >
                  View <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserRegisteredListings;