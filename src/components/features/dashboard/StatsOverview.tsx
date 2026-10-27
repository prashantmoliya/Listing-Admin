import {
  Building2,
  Users,
  MessageSquare,
  Clock,
  type LucideIcon,
} from "lucide-react"

interface StatItem {
  label: string
  val: string
  icon: LucideIcon
  color: string
}

const stats: StatItem[] = [
  {
    label: "Total Listings",
    val: "14,820",
    icon: Building2,
    color: "text-indigo-600 bg-indigo-500/10",
  },
  {
    label: "Total Users",
    val: "8,940",
    icon: Users,
    color: "text-blue-600 bg-blue-500/10",
  },
  {
    label: "Total Inquiries",
    val: "42,350",
    icon: MessageSquare,
    color: "text-emerald-600 bg-emerald-500/10",
  },
  {
    label: "Pending Approvals",
    val: "28",
    icon: Clock,
    color: "text-amber-600 bg-amber-500/10",
  },
]

const StatsOverview = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className="p-5 rounded-2xl border border-border bg-card shadow-xs hover:border-border/80 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </span>
              <div className={`p-2 rounded-xl ${stat.color}`}>
                <Icon className="size-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-bold tracking-tight">
                {stat.val}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default StatsOverview;