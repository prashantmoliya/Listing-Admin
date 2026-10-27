import { PageHeader } from "@/components/common/PageHeader"
import UserStats from "@/components/features/users/UserStats"
import UsersTable from "@/components/features/users/UsersTable"

const Users = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="User Accounts"
        description="Manage registered business owners and account status across the platform."
      />
      <UserStats />
      <UsersTable />
    </div>
  )
}

export default Users