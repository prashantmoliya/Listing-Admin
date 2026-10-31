import { PageHeader } from "@/components/common/PageHeader"
import { mockServiceProductInquiries } from "@/data/dummyData"
import ServicesProductsInquiriesTable from "@/components/features/services-products-inquiries/ServicesProductsInquiriesTable"

const ServicesProductsInquiries = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Services & Products Inquiries"
        description="Monitor customer inquiries and quote requests sent for listed services and products across all businesses."
      />

      <ServicesProductsInquiriesTable
        inquiries={mockServiceProductInquiries}
      />
    </div>
  )
}

export default ServicesProductsInquiries
