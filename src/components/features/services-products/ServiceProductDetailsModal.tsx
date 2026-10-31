import { Modal } from "@/components/common/modal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type ServiceProductItem } from "@/data/dummyData"
import {
  Package,
  Store,
  User,
  Sparkles,
  MapPin,
  Tag,
  CheckCircle2,
  XCircle,
} from "lucide-react"

interface ServiceProductDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: ServiceProductItem | null
}

const ServiceProductDetailsModal = ({
  open,
  onOpenChange,
  item,
}: ServiceProductDetailsModalProps) => {
  if (!item) return null

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      onClose={() => onOpenChange(false)}
      title="Service & Product Details"
      description={`Added on ${item.createdAt} under ${item.listingName}`}
      headerIcon={<Package className="size-4 text-primary" />}
      maxWidth="sm:max-w-2xl"
      footer={
        <div className="flex items-center justify-end w-full">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto px-6 cursor-pointer font-semibold"
          >
            Close
          </Button>
        </div>
      }
    >
      <div className="space-y-4 py-1">
        {/* ========================================================= */}
        {/* 1. SERVICE / PRODUCT INFORMATION CARD                     */}
        {/* ========================================================= */}
        <div className="rounded-2xl border border-border bg-card/60 p-4 space-y-3">
          {/* Card Header: Category & Popular Tag */}
          <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                <Package className="size-3.5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Offering Details
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Badge
                variant={item.status === "Active" ? "success" : "danger"}
                className="rounded-full"
              >
                {item.status === "Active" ? (
                  <CheckCircle2 className="size-3" />
                ) : (
                  <XCircle className="size-3" />
                )}
                {item.status}
              </Badge>

              <Badge variant="outline" className="text-[11px] font-semibold px-2.5 py-0.5">
                <Tag className="size-3 mr-1" />
                {item.category}
              </Badge>

              {item.popular && (
                <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-[11px] font-semibold px-2.5 py-0.5 gap-1 shadow-2xs">
                  <Sparkles className="size-3" />
                  Popular
                </Badge>
              )}
            </div>
          </div>

          {/* Image & Title & Price Row */}
          <div className="flex flex-col sm:flex-row gap-3.5 sm:items-center">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-full sm:w-28 h-28 rounded-xl object-cover border border-border shrink-0"
              />
            ) : (
              <div className="w-full sm:w-28 h-28 rounded-xl bg-muted/60 border border-border flex items-center justify-center text-muted-foreground shrink-0">
                <Package className="size-8" />
              </div>
            )}

            <div className="min-w-0 flex-1 space-y-1.5">
              <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                {item.name}
              </h3>

              <div className="flex items-baseline gap-1 text-primary">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  ₹{item.price.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  (Estimated / Listing Price)
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5 pt-1 border-t border-border/60">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
              Description & Specifications
            </span>
            <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed bg-muted/30 p-3 rounded-xl border border-border/70 whitespace-pre-wrap">
              {item.description}
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. ASSOCIATED BUSINESS LISTING CARD                       */}
        {/* ========================================================= */}
        <div className="rounded-2xl border border-border bg-card/60 p-4 space-y-3">
          <div className="flex items-center gap-2 border-b border-border/60 pb-2.5">
            <div className="size-6 rounded-md bg-primary/10 text-primary flex items-center justify-center">
              <Store className="size-3.5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Associated Business Listing
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-muted/40 border border-border/60 space-y-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">
                  Listing Name
                </span>
                <Badge variant="outline" className="text-[10px] font-medium px-1.5 py-0 bg-background/50">
                  {item.listingCategory}
                </Badge>
              </div>
              <span className="text-xs sm:text-sm font-bold text-foreground block truncate">
                {item.listingName}
              </span>
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <MapPin className="size-3 shrink-0" />
                <span className="truncate">{item.city}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-muted/40 border border-border/60 space-y-1 min-w-0">
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">
                Business Owner
              </span>
              <span className="text-xs sm:text-sm font-bold text-foreground block truncate">
                {item.businessOwnerName}
              </span>
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <User className="size-3 shrink-0" />
                <span>Verified Business Owner</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ServiceProductDetailsModal
