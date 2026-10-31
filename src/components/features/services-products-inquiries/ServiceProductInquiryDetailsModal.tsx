import { Modal } from "@/components/common/modal"
import { UserAvatar } from "@/components/common"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type ServiceProductInquiryItem } from "@/data/dummyData"
import { cn } from "@/lib/utils"
import {
  CheckCircle2,
  Clock,
  XCircle,
  Mail,
  Phone,
  Package,
  Store,
  User,
  MessageSquare,
  MessageCircle,
} from "lucide-react"

interface ServiceProductInquiryDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  inquiry: ServiceProductInquiryItem | null
}

const getPreferredContactBadge = (contact: ServiceProductInquiryItem["preferredContact"]) => {
  if (contact === "WhatsApp") {
    return {
      label: "WhatsApp",
      icon: MessageCircle,
      className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    }
  }
  return {
    label: "Phone Call",
    icon: Phone,
    className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  }
}

const ServiceProductInquiryDetailsModal = ({
  open,
  onOpenChange,
  inquiry,
}: ServiceProductInquiryDetailsModalProps) => {
  if (!inquiry) return null

  const handleClose = () => {
    onOpenChange(false)
  }

  const preferredBadge = getPreferredContactBadge(inquiry.preferredContact)
  const PreferredIcon = preferredBadge.icon

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      onClose={handleClose}
      title="Service & Product Inquiry"
      description={`Submitted on ${inquiry.createdAt} via Public Listing Page`}
      headerIcon={<Package className="size-4 text-primary" />}
      maxWidth="sm:max-w-2xl"
      footer={
        <div className="flex items-center justify-end w-full">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClose}
            className="w-full sm:w-auto px-6 cursor-pointer font-semibold"
          >
            Close
          </Button>
        </div>
      }
    >
      <div className="space-y-4 py-1">
        {/* ========================================================= */}
        {/* 1. CUSTOMER INFORMATION CARD                              */}
        {/* ========================================================= */}
        <div className="rounded-2xl border border-border bg-card/60 p-4 space-y-3">
          {/* Card Header: Title + Status + Preferred Contact */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                <User className="size-3.5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Customer Information
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Inquiry Status Badge */}
              <Badge
                variant="secondary"
                className={cn(
                  "gap-1 font-semibold text-[11px] px-2.5 py-0.5 rounded-full whitespace-nowrap",
                  inquiry.status === "Pending" &&
                    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
                  inquiry.status === "Resolved" &&
                    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
                  inquiry.status === "Rejected" &&
                    "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                )}
              >
                {inquiry.status === "Resolved" && <CheckCircle2 className="size-3" />}
                {inquiry.status === "Pending" && <Clock className="size-3" />}
                {inquiry.status === "Rejected" && <XCircle className="size-3" />}
                <span>{inquiry.status}</span>
              </Badge>

              {/* Preferred Contact Mode Badge */}
              <Badge
                variant="outline"
                className={cn(
                  "gap-1 font-semibold text-[11px] px-2.5 py-0.5 rounded-full shadow-2xs",
                  preferredBadge.className
                )}
              >
                <PreferredIcon className="size-3" />
                <span>Prefers {preferredBadge.label}</span>
              </Badge>
            </div>
          </div>

          {/* Customer Profile Identity */}
          <div className="flex items-center gap-3 min-w-0">
            <UserAvatar
              name={inquiry.fullName}
              className="size-11 text-base font-bold"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-sm sm:text-base font-bold text-foreground leading-tight truncate">
                {inquiry.fullName}
              </h4>
              <span className="text-[11px] text-muted-foreground block mt-0.5">
                Submitted inquiry on {inquiry.createdAt}
              </span>
            </div>
          </div>

          {/* Customer Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-muted/40 border border-border/60 text-foreground min-w-0">
              <div className="size-7 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <Mail className="size-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-muted-foreground block font-medium">Customer Email</span>
                <span className="truncate block font-semibold text-xs text-foreground">
                  {inquiry.email}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-muted/40 border border-border/60 text-foreground min-w-0">
              <div className="size-7 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Phone className="size-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-muted-foreground block font-medium">Customer Phone</span>
                <span className="truncate block font-semibold text-xs text-foreground">
                  {inquiry.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Requirement Message */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <MessageSquare className="size-3.5 text-primary" />
              <span>Customer Requirement / Message:</span>
            </div>
            <div className="p-3 rounded-xl bg-muted/30 border border-border/70 text-xs text-foreground leading-relaxed whitespace-pre-wrap break-words">
              {inquiry.message}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. BUSINESS & SERVICE INFORMATION CARD                    */}
        {/* ========================================================= */}
        <div className="rounded-2xl border border-border bg-card/60 p-4 space-y-3">
          {/* Card Header */}
          <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                <Store className="size-3.5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Business & Service Information
              </span>
            </div>
          </div>

          {/* Business Listing & Owner Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-muted/40 border border-border/60 space-y-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                  Target Listing
                </span>
                <Badge variant="outline" className="text-[10px] font-medium px-1.5 py-0 bg-background/50">
                  {inquiry.category}
                </Badge>
              </div>
              <span className="text-xs sm:text-sm font-bold text-foreground block truncate">
                {inquiry.listingName}
              </span>
              <span className="text-[11px] text-muted-foreground block truncate">
                {inquiry.city}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-muted/40 border border-border/60 space-y-1 min-w-0">
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">
                Business Owner
              </span>
              <span className="text-xs sm:text-sm font-bold text-foreground block truncate">
                {inquiry.businessOwnerName}
              </span>
              <span className="text-[11px] text-muted-foreground block truncate">
                {inquiry.businessOwnerEmail || inquiry.businessOwnerPhone || "Registered Business Owner"}
              </span>
            </div>
          </div>

          {/* Requested Service / Product item */}
          <div className="p-3 rounded-xl bg-muted/40 border border-border/60 space-y-1">
            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">
              Requested Offering
            </span>
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Package className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs sm:text-sm font-bold text-foreground block truncate">
                  {inquiry.service}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ServiceProductInquiryDetailsModal
