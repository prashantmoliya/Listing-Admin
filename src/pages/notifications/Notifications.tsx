import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/common/PageHeader"
import { mockNotifications, type NotificationItem } from "@/data/dummyData"
import NotificationStats from "@/components/features/notifications/NotificationStats"
import NotificationsTable from "@/components/features/notifications/NotificationsTable"
import SendNotificationModal from "@/components/features/notifications/SendNotificationModal"

const Notifications = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications)
  const [isSendModalOpen, setIsSendModalOpen] = useState(false)

  const handleSendNotification = (newNotif: NotificationItem) => {
    setNotifications((prev) => [newNotif, ...prev])
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Notifications"
        description="Broadcast platform announcements, system alerts, and track business directory notifications."
      >
        <Button
          size="sm"
          onClick={() => setIsSendModalOpen(true)}
          className="h-9 gap-1.5 px-3.5 text-xs font-semibold shadow-xs cursor-pointer"
        >
          <Send className="size-3.5" />
          Send Notification
        </Button>
      </PageHeader>

      {/* 4 Stat Cards */}
      <NotificationStats notifications={notifications} />

      {/* Filterable Table with Tabs & Actions */}
      <NotificationsTable
        notifications={notifications}
        onNotificationsChange={setNotifications}
      />

      {/* Broadcast Modal */}
      <SendNotificationModal
        open={isSendModalOpen}
        onOpenChange={setIsSendModalOpen}
        onSend={handleSendNotification}
      />
    </div>
  )
}

export default Notifications
