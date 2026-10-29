import {
  Bell,
  AlertCircle,
  Send,
  type LucideIcon,
} from "lucide-react"
import type { NotificationItem } from "@/data/dummyData"

interface NotificationStatsProps {
  notifications: NotificationItem[]
}

interface StatItem {
  label: string
  value: number
  icon: LucideIcon
  color: string
}

const NotificationStats = ({ notifications }: NotificationStatsProps) => {
  const stats: StatItem[] = [
    {
      label: "Total Notifications",
      value: notifications.length,
      icon: Bell,
      color: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10",
    },
    {
      label: "Unread Notifications",
      value: notifications.filter((n) => !n.read).length,
      icon: AlertCircle,
      color: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
    },
    {
      label: "Broadcasts Sent",
      value: notifications.filter((n) => n.type === "broadcast").length,
      icon: Send,
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
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
          </div>
        )
      })}
    </div>
  )
}

export default NotificationStats
