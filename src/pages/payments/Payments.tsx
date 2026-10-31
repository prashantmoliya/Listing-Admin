import { PageHeader } from "@/components/common/PageHeader"
import { ComingSoon } from "@/components/common"

const Payments = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Payments"
        description="Monitor invoice history, revenue transactions, and payment gateway logs."
      />

      <ComingSoon />
    </div>
  )
}

export default Payments
