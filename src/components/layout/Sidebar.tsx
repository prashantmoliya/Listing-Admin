import { NavLink, Link } from "react-router-dom"
import { 
  LayoutDashboard, 
  Building2, 
  FolderTree, 
  Users, 
  MessageSquare, 
  Star, 
  Settings,
  Building,
  ExternalLink
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Categories", href: "/categories", icon: FolderTree },
  { label: "Users", href: "/users", icon: Users },
  { label: "Listings", href: "/listings", icon: Building2 },
  { label: "Inquiries", href: "/inquiries", icon: MessageSquare },
  { label: "Reviews", href: "/reviews", icon: Star },
  { label: "Settings", href: "/settings", icon: Settings },
]

const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-card flex flex-col h-screen shrink-0 transition-transform duration-300 ease-in-out",
        "lg:sticky lg:top-0 lg:translate-x-0",
        isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      )}
    >
      {/* 1. Brand Header */}
      <div className="h-20 px-5 border-b border-border flex items-center justify-between shrink-0">
        <Link
          to="/"
          onClick={onClose}
          className="inline-flex items-center gap-2.5 group select-none min-w-0"
        >
          <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-indigo-600 via-indigo-500 to-fuchsia-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform shrink-0">
            <Building className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-0.5 leading-none">
              <span className="text-lg font-black tracking-tight text-foreground">
                IndianListing
              </span>
              <span className="text-lg font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">
                Bucket
              </span>
            </div>
            <span className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase mt-0.5">
              Admin Portal
            </span>
          </div>
        </Link>
      </div>

      {/* 2. Navigation Menu */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase px-3 py-2">
          Management
        </p>

        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-sm shadow-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={cn(
                      "size-4.5 transition-colors",
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          )
        })}

        {/* Shortcut to Live Web Portal */}
        <div className="pt-4 mt-4 border-t border-border">
          <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase px-3 mb-2">
            Shortcut
          </p>
          <a
            href="https://listing-website-six.vercel.app"
            target="_blank"
            rel="noreferrer"
            onClick={onClose}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="size-4.5 text-muted-foreground" />
              <span>View Site</span>
            </div>
          </a>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar;
