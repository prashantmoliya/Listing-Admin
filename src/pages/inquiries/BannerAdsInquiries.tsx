import { useState } from "react"
import { PageHeader } from "@/components/common/PageHeader"
import { mockBannerAdInquiries, type BannerAdInquiryItem } from "@/data/dummyData"
import BannerAdsInquiriesTable from "@/components/features/banner-ads-inquiries/BannerAdsInquiriesTable"

const BannerAdsInquiries = () => {
  const [inquiries, setInquiries] = useState<BannerAdInquiryItem[]>(mockBannerAdInquiries)

  return (
    <div className="space-y-6">
      <PageHeader
        title="Banner Ads Inquiries"
        description="Review incoming banner placement requests, contact advertisers, and confirm ad slots."
      />

      <BannerAdsInquiriesTable
        inquiries={inquiries}
        onInquiriesChange={setInquiries}
      />
    </div>
  )
}

export default BannerAdsInquiries
