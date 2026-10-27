interface CategoryItem {
  name: string
  count: string
  pct: number
}

const topCategories: CategoryItem[] = [
  { name: "Hotels & Stays", count: "3,410 listings", pct: 75 },
  { name: "Health & Medical", count: "2,890 listings", pct: 60 },
  { name: "Food & Restaurants", count: "2,450 listings", pct: 52 },
  { name: "Real Estate", count: "1,980 listings", pct: 40 },
]

const TopCategoryCard = () => {
  return (
    <div className="p-5 rounded-2xl border border-border bg-card shadow-xs">
      <h3 className="text-base font-semibold mb-3">Top Categories</h3>
      <div className="space-y-3">
        {topCategories.map((cat) => (
          <div key={cat.name} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-foreground">
                {cat.name}
              </span>
              <span className="text-muted-foreground">{cat.count}</span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${cat.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopCategoryCard;