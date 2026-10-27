import RecentListingsTable from "@/components/features/dashboard/RecentListingsTable";
import RecentUsersCard from "@/components/features/dashboard/RecentUsersCard";
import StatsOverview from "@/components/features/dashboard/StatsOverview";
import TopCategoryCard from "@/components/features/dashboard/TopCategoryCard";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Top Welcome & Actions Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          Dashboard Overview
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Platform metrics, recent activities, and performance overview.
        </p>
      </div>

      {/* 4 Stats Cards */}
      <StatsOverview />

      {/* Main Content Grid: Recent Listings Table & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Listings */}
        <div className="lg:col-span-2">
          <RecentListingsTable />
        </div>

        {/* Right 1 Col: Quick Status & Popular Categories */}
        <div className="space-y-6">
          <RecentUsersCard />
          <TopCategoryCard />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;

