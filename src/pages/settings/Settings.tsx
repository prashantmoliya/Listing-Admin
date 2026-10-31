import { PageHeader } from "@/components/common/PageHeader"
import { ComingSoon } from "@/components/common"

const Settings = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform Settings"
        description="Configure SEO, payment gateways, branding, and notification rules."
      />

      <ComingSoon />
    </div>
  )
}

export default Settings