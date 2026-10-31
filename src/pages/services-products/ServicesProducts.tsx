import { PageHeader } from "@/components/common/PageHeader"
import { mockServicesProducts } from "@/data/dummyData"
import ServicesProductsTable from "@/components/features/services-products/ServicesProductsTable"

const ServicesProducts = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Services & Products"
        description="Browse and review service and product offerings added by owners of approved business listings."
      />

      <ServicesProductsTable items={mockServicesProducts} />
    </div>
  )
}

export default ServicesProducts
