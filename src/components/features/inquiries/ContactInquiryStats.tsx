import {
  MessageSquare,
  Clock,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react"
import { type ContactInquiryItem } from "@/data/dummyData"

interface ContactInquiryStatsProps {
  inquiries: ContactInquiryItem[]
}

interface StatItem {
  label: string
  value: string | number
  subText: string
  icon: LucideIcon
  color: string
}

const ContactInquiryStats = ({ inquiries }: ContactInquiryStatsProps) => {
  const total = inquiries.length
  const newCount = inquiries.filter((i) => i.status === "New").length
  const repliedCount = inquiries.filter((i) => i.status === "Replied").length

  const stats: StatItem[] = [
    {
      label: "Total Inquiries",
      value: total,
      subText: "All-time contact messages",
      icon: MessageSquare,
      color: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10",
    },
    {
      label: "Pending / New",
      value: newCount,
      subText: `${newCount} awaiting response`,
      icon: Clock,
      color: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
    },
    {
      label: "Replied & Resolved",
      value: repliedCount,
      subText: "Responses sent to sender",
      icon: CheckCircle2,
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
              <div
                className={`size-8 rounded-xl flex items-center justify-center ${stat.color}`}
              >
                <Icon className="size-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground">
                {stat.value}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mt-1">
              {stat.subText}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default ContactInquiryStats