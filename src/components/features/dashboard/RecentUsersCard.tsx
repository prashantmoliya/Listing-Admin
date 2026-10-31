import { ArrowUpRight, CheckCircle2, XCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { mockUsers } from "@/data/dummyData"
import { UserAvatar } from "@/components/common"

const RecentUsersCard = () => {
  // Show first 4 recently registered business owners
  const recentUsers = mockUsers.slice(0, 4)

  return (
    <div className="p-5 rounded-2xl border border-border bg-card shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Recent Users
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Newly registered business owners
          </p>
        </div>
        <Link
          to="/users"
          className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1 cursor-pointer"
        >
          View All <ArrowUpRight className="size-3" />
        </Link>
      </div>

      <div className="space-y-3.5">
        {recentUsers.map((user) => {
          return (
            <Link
              key={user.id}
              to={`/users/${user.id}`}
              className="flex items-center justify-between gap-3 p-1.5 -mx-1.5 rounded-xl hover:bg-muted/50 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <UserAvatar name={user.name} />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {user.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-1 whitespace-nowrap ${
                  user.status === "Active"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {user.status === "Active" ? (
                  <CheckCircle2 className="size-2.5" />
                ) : (
                  <XCircle className="size-2.5" />
                )}
                {user.status}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default RecentUsersCard