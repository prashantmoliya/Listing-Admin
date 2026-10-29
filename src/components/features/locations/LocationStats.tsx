import {
  MapPin,
  Building2,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react"
import { INDIAN_STATES, type CityItem } from "@/data/locationsData"

interface LocationStatsProps {
  cities: CityItem[]
}

interface StatItem {
  label: string
  value: string | number
  subText: string
  icon: LucideIcon
  color: string
}

const LocationStats = ({ cities }: LocationStatsProps) => {
  const activeCitiesCount = cities.filter((c) => c.status === "Active").length
  const totalListingsCount = cities.reduce((sum, c) => sum + c.listingsCount, 0)

  const stats: StatItem[] = [
    {
      label: "States & UTs",
      value: INDIAN_STATES.length,
      subText: "28 States + 8 Union Territories",
      icon: MapPin,
      color: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10",
    },
    {
      label: "Active Cities",
      value: activeCitiesCount,
      subText: `${cities.length} total cities registered`,
      icon: CheckCircle2,
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
    },
    {
      label: "Local Listings",
      value: totalListingsCount.toLocaleString(),
      subText: "Across all active city zones",
      icon: Building2,
      color: "text-blue-600 dark:text-blue-400 bg-blue-500/10",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className="p-4 rounded-2xl border border-border bg-card shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </span>
              <div className={`p-2 rounded-xl ${stat.color}`}>
                <Icon className="size-4" />
              </div>
            </div>
            <p className="text-2xl font-bold mt-2 text-foreground">
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.subText}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default LocationStats
