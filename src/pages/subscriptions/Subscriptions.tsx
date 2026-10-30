import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/common/PageHeader"
import {
  mockSubscriptionPlans,
  type SubscriptionPlanItem,
} from "@/data/dummyData"
import SubscriptionPlansTable from "@/components/features/subscriptions/SubscriptionPlansTable"
import SubscriptionPlanModal from "@/components/features/subscriptions/SubscriptionPlanModal"

const Subscriptions = () => {
  const [plans, setPlans] = useState<SubscriptionPlanItem[]>(mockSubscriptionPlans)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlanItem | null>(null)

  const handleOpenCreatePlan = () => {
    setEditingPlan(null)
    setIsModalOpen(true)
  }

  const handleOpenEditPlan = (plan: SubscriptionPlanItem) => {
    setEditingPlan(plan)
    setIsModalOpen(true)
  }

  const handleSavePlan = (savedPlan: SubscriptionPlanItem) => {
    if (editingPlan) {
      setPlans((prev) =>
        prev.map((p) => (p.id === savedPlan.id ? savedPlan : p))
      )
      const idx = mockSubscriptionPlans.findIndex((p) => p.id === savedPlan.id)
      if (idx !== -1) mockSubscriptionPlans[idx] = savedPlan
    } else {
      setPlans((prev) => [savedPlan, ...prev])
      mockSubscriptionPlans.unshift(savedPlan)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header with Action Button */}
      <PageHeader
        title="Subscription Plans"
        description="Manage pricing packages, membership tiers, and directory advertising benefits."
      >
        <Button
          type="button"
          size="sm"
          onClick={handleOpenCreatePlan}
          className="h-9 gap-1.5 px-3.5 text-xs font-semibold shadow-xs cursor-pointer"
        >
          <Plus className="size-4" />
          <span>Create Plan</span>
        </Button>
      </PageHeader>

      {/* Subscription Plans Table */}
      <SubscriptionPlansTable
        plans={plans}
        onPlansChange={setPlans}
        onEditPlan={handleOpenEditPlan}
      />

      {/* Create / Edit Plan Modal with Zod Validation */}
      <SubscriptionPlanModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        plan={editingPlan}
        onSave={handleSavePlan}
      />
    </div>
  )
}

export default Subscriptions
