import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreditCard, Sparkles, IndianRupee, Check, Plus, X } from "lucide-react"
import { Modal } from "@/components/common/modal"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { InputWithLabel } from "@/components/common/InputWithLabel"
import { SelectWithLabel } from "@/components/common/SelectWithLabel"
import { TextareaWithLabel } from "@/components/common/TextareaWithLabel"
import {
  subscriptionPlanSchema,
  type SubscriptionPlanFormValues,
} from "@/schemas/subscription.schema"
import { type SubscriptionPlanItem } from "@/data/dummyData"
import { cn } from "@/lib/utils"

interface SubscriptionPlanModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  plan?: SubscriptionPlanItem | null
  onSave: (plan: SubscriptionPlanItem) => void
}

const PLAN_ICON_OPTIONS = [
  { value: "🏢", label: "🏢 Basic / Office" },
  { value: "⭐", label: "⭐ Featured / Star" },
  { value: "🚀", label: "🚀 Pro / Rocket" },
  { value: "🖼️", label: "🖼️ Banner Ads" },
  { value: "⚙️", label: "⚙️ ERP Solutions" },
  { value: "👑", label: "👑 VIP / Crown" },
  { value: "💎", label: "💎 Premium / Diamond" },
  { value: "⚡", label: "⚡ Speed / Boost" },
  { value: "🎯", label: "🎯 Target / Growth" },
  { value: "💼", label: "💼 Corporate / Business" },
  { value: "🏆", label: "🏆 Elite / Trophy" },
]

const emptyDefaultValues: SubscriptionPlanFormValues = {
  name: "",
  tag: "",
  icon: "",
  price: 0,
  period: "",
  popular: false,
  headline: "",
  description: "",
  servicesLimit: 0,
  includedFeatures: [],
  status: "Active",
}

const SubscriptionPlanModal = ({
  open,
  onOpenChange,
  plan,
  onSave,
}: SubscriptionPlanModalProps) => {
  const isEditing = Boolean(plan)
  const [featureInput, setFeatureInput] = useState("")

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SubscriptionPlanFormValues>({
    resolver: zodResolver(subscriptionPlanSchema),
    defaultValues: emptyDefaultValues,
  })

  useEffect(() => {
    if (open) {
      if (plan) {
        const numericPrice =
          typeof plan.price === "number"
            ? plan.price
            : Number(String(plan.price).replace(/\D/g, "")) || 0

        reset({
          name: plan.name,
          tag: plan.tag,
          icon: plan.icon,
          price: numericPrice,
          period: plan.period,
          popular: Boolean(plan.popular),
          headline: plan.headline,
          description: plan.description,
          servicesLimit: plan.servicesLimit ?? 0,
          includedFeatures: plan.includedFeatures || [],
          status: plan.status,
        })
      } else {
        reset(emptyDefaultValues)
      }
      setFeatureInput("")
    }
  }, [plan, open, reset])

  const handleClose = () => {
    setFeatureInput("")
    reset(emptyDefaultValues)
    onOpenChange(false)
  }

  const onSubmit = (data: SubscriptionPlanFormValues) => {
    const includedList = data.includedFeatures
      .map((line) => line.trim())
      .filter(Boolean)

    const savedPlan: SubscriptionPlanItem = {
      id: plan ? plan.id : `plan-${Date.now()}`,
      name: data.name.trim(),
      tag: data.tag.trim().toUpperCase(),
      icon: data.icon,
      price: data.price,
      period: data.period.trim(),
      popular: data.popular,
      headline: data.headline.trim(),
      description: data.description.trim(),
      servicesLimit: Number(data.servicesLimit) || 0,
      includedFeatures: includedList,
      status: data.status,
      createdAt: plan?.createdAt || "Oct 2026",
    }

    onSave(savedPlan)
    handleClose()
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      onClose={handleClose}
      title={isEditing ? "Edit Subscription Plan" : "Create Subscription Plan"}
      description={
        isEditing
          ? `Revise pricing, billing period, and limits for "${plan?.name}".`
          : "Configure a new membership package for platform business listings."
      }
      headerIcon={<CreditCard className="size-4" />}
      maxWidth="sm:max-w-xl"
      asForm
      onSubmit={handleSubmit(onSubmit)}
      footer={
        <div className="flex items-center justify-end gap-2 w-full">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClose}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="sm"
            disabled={isSubmitting}
            className="cursor-pointer font-semibold"
          >
            {isEditing ? "Save Changes" : "Create Plan"}
          </Button>
        </div>
      }
    >
      <div className="space-y-4 py-1">
        {/* Top 6 Fields: 2 fields per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Row 1: Plan Name & Package Tag */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                id="name"
                label="Plan Name"
                placeholder="e.g. Featured Listing"
                value={field.value}
                onChange={field.onChange}
                error={errors.name?.message}
              />
            )}
          />

          <Controller
            name="tag"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                id="tag"
                label="Package Tag"
                placeholder="e.g. PACKAGE 2"
                value={field.value}
                onChange={field.onChange}
                error={errors.tag?.message}
              />
            )}
          />

          {/* Row 2: Price & Billing Period */}
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                id="price"
                type="text"
                inputMode="numeric"
                label="Price"
                placeholder="199"
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/\D/g, "")
                  field.onChange(cleaned === "" ? 0 : Number(cleaned))
                }}
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-", "."].includes(e.key)) {
                    e.preventDefault()
                  }
                }}
                leftElement={<IndianRupee className="size-3.5 text-muted-foreground" />}
                error={errors.price?.message}
              />
            )}
          />

          <Controller
            name="period"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                id="period"
                label="Billing Period"
                placeholder="e.g. / 3 months"
                value={field.value}
                onChange={field.onChange}
                error={errors.period?.message}
              />
            )}
          />

          {/* Row 3: Plan Icon & Services & Products */}
          <Controller
            name="icon"
            control={control}
            render={({ field }) => (
              <SelectWithLabel
                id="icon"
                label="Plan Icon"
                placeholder="Select an icon"
                options={PLAN_ICON_OPTIONS}
                value={field.value}
                onValueChange={field.onChange}
                error={errors.icon?.message}
              />
            )}
          />

          <Controller
            name="servicesLimit"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                id="servicesLimit"
                type="text"
                inputMode="numeric"
                label="Services & Products"
                placeholder="0"
                value={field.value !== undefined ? String(field.value) : ""}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/\D/g, "")
                  field.onChange(cleaned === "" ? 0 : Number(cleaned))
                }}
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-", "."].includes(e.key)) {
                    e.preventDefault()
                  }
                }}
                error={errors.servicesLimit?.message}
                description="Max allowable count"
              />
            )}
          />
        </div>

        {/* Popular Switch */}
        <Controller
          name="popular"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/20">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-amber-500" />
                  Popular Plan
                </span>
                <p className="text-[11px] text-muted-foreground">
                  Mark this plan as Popular on the platform pricing page.
                </p>
              </div>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                className="data-[checked]:bg-indigo-600 cursor-pointer"
              />
            </div>
          )}
        />

        {/* Headline */}
        <Controller
          name="headline"
          control={control}
          render={({ field }) => (
            <InputWithLabel
              id="headline"
              label="Headline"
              placeholder="e.g. Maximum Visibility for Your Business"
              value={field.value}
              onChange={field.onChange}
              error={errors.headline?.message}
            />
          )}
        />

        {/* Description */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextareaWithLabel
              id="description"
              label="Description"
              placeholder="Brief summary of who this plan is best suited for..."
              rows={2}
              value={field.value}
              onChange={field.onChange}
              error={errors.description?.message}
            />
          )}
        />

        {/* Included Features using InputWithLabel with Right Add Button */}
        <Controller
          name="includedFeatures"
          control={control}
          render={({ field }) => {
            const list = field.value || []

            const handleAddFeature = () => {
              const trimmed = featureInput.trim()
              if (!trimmed) return
              field.onChange([...list, trimmed])
              setFeatureInput("")
            }

            const handleRemoveFeature = (indexToRemove: number) => {
              field.onChange(list.filter((_, i) => i !== indexToRemove))
            }

            return (
              <div className="space-y-2">
                <InputWithLabel
                  id="includedFeatures"
                  label="Included Features"
                  placeholder="e.g. Featured listing on homepage"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddFeature()
                    }
                  }}
                  className="pr-20"
                  rightElement={
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleAddFeature}
                      disabled={!featureInput.trim()}
                      className="h-7 px-3 text-xs font-semibold gap-1 cursor-pointer rounded-md shadow-xs"
                    >
                      <Plus className="size-3.5" />
                      <span>Add</span>
                    </Button>
                  }
                  error={errors.includedFeatures?.message}
                  description="Type a benefit and click Add (or press Enter)."
                />

                {/* List of added features shown in lines below */}
                {list.length > 0 && (
                  <div className="space-y-1.5 pt-0.5 max-h-48 overflow-y-auto pr-1">
                    {list.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-2.5 px-3 py-2 rounded-xl border border-border bg-muted/20 text-xs font-medium group hover:bg-muted/40 transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="size-4.5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                            <Check className="size-3" />
                          </div>
                          <span className="text-foreground truncate">{item}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveFeature(idx)}
                          className="size-6 text-muted-foreground hover:text-destructive cursor-pointer shrink-0 rounded-md hover:bg-destructive/10"
                        >
                          <X className="size-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          }}
        />

        {/* Plan Availability Status with Right-Side Switch */}
        <Controller
          name="status"
          control={control}
          render={({ field }) => {
            const isActive = field.value === "Active"
            return (
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-muted/20">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-foreground block">
                    Plan Availability Status
                  </span>
                  <p className="text-[11px] text-muted-foreground">
                    {isActive
                      ? "Plan is active and available for businesses to purchase"
                      : "Plan is inactive and hidden from pricing page"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "text-xs font-semibold select-none",
                      isActive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-muted-foreground"
                    )}
                  >
                    {isActive ? "Active" : "Inactive"}
                  </span>
                  <Switch
                    checked={isActive}
                    onCheckedChange={(checked) =>
                      field.onChange(checked ? "Active" : "Inactive")
                    }
                    className="data-[checked]:bg-emerald-600 cursor-pointer"
                  />
                </div>
              </div>
            )
          }}
        />
      </div>
    </Modal>
  )
}

export default SubscriptionPlanModal
