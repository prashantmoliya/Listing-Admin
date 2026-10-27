import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Bell, Sun, Moon, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderConfig {
  title: string
  subtitle: string
}

interface NavbarProps {
  onMenuToggle?: () => void
}

const routeHeaders: Record<string, HeaderConfig> = {
  "/": {
    title: "Hello, Raj Sharma",
    subtitle: "Here's what's happening today.",
  },
  "/listings": {
    title: "Listings",
    subtitle: "Here's what's happening with your listings.",
  },
  "/categories": {
    title: "Categories",
    subtitle: "Manage and organize your portal categories.",
  },
  "/categories/create": {
    title: "Create Category",
    subtitle: "Add a new business category to your directory.",
  },
  "/users": {
    title: "Users",
    subtitle: "Manage registered members and permissions.",
  },
  "/inquiries": {
    title: "Inquiries",
    subtitle: "Review incoming client inquiries and leads.",
  },
  "/reviews": {
    title: "Reviews",
    subtitle: "Manage customer feedback and ratings.",
  },
  "/settings": {
    title: "Settings",
    subtitle: "Configure portal options and system settings.",
  },
}

const defaultHeader: HeaderConfig = {
  title: "Hello, Raj Sharma",
  subtitle: "Here's what's happening today.",
}

const getHeaderConfig = (pathname: string): HeaderConfig => {
  if (routeHeaders[pathname]) return routeHeaders[pathname]
  if (pathname.startsWith("/categories/") && pathname.endsWith("/edit")) {
    return {
      title: "Edit Category",
      subtitle: "Update category details and configurations.",
    }
  }
  if (pathname.startsWith("/users/")) {
    return {
      title: "User Profile",
      subtitle: "Review user activities and account details.",
    }
  }
  return defaultHeader
}

const Navbar = ({ onMenuToggle }: NavbarProps) => {
  const location = useLocation()
  const currentHeader = getHeaderConfig(location.pathname)

  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains("dark") ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
  })

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  const toggleDarkMode = () => setIsDark(!isDark)

  return (
    <header className="h-20 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-20 px-4 sm:px-6 flex items-center justify-between gap-3 sm:gap-4 shrink-0">
      {/* Left: Mobile Menu Toggle & Greeting Header */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        <Button
          variant="outline"
          size="icon"
          onClick={onMenuToggle}
          className="lg:hidden rounded-[10px] bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer shrink-0"
          title="Open Menu"
        >
          <Menu className="size-4.5" />
        </Button>

        <div className="hidden sm:flex flex-col justify-center min-w-0">
          <h1 className="text-base sm:text-lg font-bold tracking-tight text-foreground leading-tight truncate">
            {currentHeader.title}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 hidden sm:block truncate">
            {currentHeader.subtitle}
          </p>
        </div>
      </div>

      {/* Right: Actions & User Controls */}
      <div className="flex items-center gap-2">
        {/* Dark Mode Toggle */}
        <Button
          variant="outline"
          size="icon"
          onClick={toggleDarkMode}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="rounded-[10px] bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
        >
          {isDark ? <Sun className="size-4.5 text-amber-400" /> : <Moon className="size-4.5" />}
        </Button>

        {/* Notification Bell */}
        <Button
          variant="outline"
          size="icon"
          title="Notifications"
          className="relative rounded-[10px] bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <Bell className="size-4.5" />
          <span className="absolute top-2 right-2 size-2 rounded-full bg-primary ring-2 ring-card" />
        </Button>

        {/* Profile Avatar */}
        <div className="pl-2 ml-1 border-l border-border">
          <Button 
            size="icon"
            className="rounded-[10px] font-semibold text-xs cursor-pointer select-none shadow-xs"
          >
            RS
          </Button>
        </div>
      </div>
    </header>
  )
}


export default Navbar;