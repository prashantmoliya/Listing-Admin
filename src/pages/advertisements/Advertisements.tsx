import { PageHeader } from "@/components/common/PageHeader"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

const Advertisements = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Advertisements"
        description="Manage live banner ads, placements, impressions, and sponsored campaigns across the website."
      />

      <div className="flex flex-col items-center justify-center min-h-[380px] border border-dashed border-border rounded-2xl bg-card/40 p-8 text-center">
        <Badge
          variant="success"
          className="gap-2.5 font-bold px-5 py-2 text-2xl rounded-xl shadow-xs border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        >
          <Sparkles className="size-6!" />
          <span>Coming Soon</span>
        </Badge>
        <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-3">
          This module is currently under development.
        </p>
      </div>
    </div>
  )
}

export default Advertisements
