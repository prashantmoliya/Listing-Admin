import { useEffect, useMemo } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MapPin } from "lucide-react"
import { Modal } from "@/components/common/modal"
import { Button } from "@/components/ui/button"
import { InputWithLabel } from "@/components/common/InputWithLabel"
import { SelectWithLabel } from "@/components/common/SelectWithLabel"
import { citySchema, type CityFormValues } from "@/schemas/city.schema"
import { INDIAN_STATES, type CityItem } from "@/data/locationsData"
import { cn, generateSlug } from "@/lib/utils"

interface CityModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  city?: CityItem | null
  onSave: (city: CityItem) => void
}

const CityModal = ({
  open,
  onOpenChange,
  city,
  onSave,
}: CityModalProps) => {
  const isEditing = !!city

  const stateOptions = useMemo(() =>
      INDIAN_STATES.map((s) => ({
        value: s.code,
        label: `${s.name} (${s.code})`,
      })),
    []
  )

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CityFormValues>({
    resolver: zodResolver(citySchema),
    defaultValues: {
      name: "",
      slug: "",
      stateCode: "GJ", // Default to Gujarat
      status: "Active",
    },
  })

  // Populate form when editing or resetting
  useEffect(() => {
    if (city && open) {
      reset({
        name: city.name,
        slug: city.slug,
        stateCode: city.stateCode,
        status: city.status,
      })
    } else if (!city && open) {
      reset({
        name: "",
        slug: "",
        stateCode: "GJ",
        status: "Active",
      })
    }
  }, [city, open, reset])

  const handleClose = () => {
    reset()
    onOpenChange(false)
  }

  const onSubmit = (data: CityFormValues) => {
    const selectedState = INDIAN_STATES.find((s) => s.code === data.stateCode)
    const stateName = selectedState ? selectedState.name : "Gujarat"

    const savedCity: CityItem = {
      id: city ? city.id : `city-${Date.now()}`,
      name: data.name.trim(),
      slug: data.slug.trim().toLowerCase(),
      stateCode: data.stateCode,
      stateName,
      listingsCount: city ? city.listingsCount : 0,
      status: data.status,
      createdAt: city ? city.createdAt : "Just now",
    }

    onSave(savedCity)
    reset()
    onOpenChange(false)
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      onClose={handleClose}
      title={isEditing ? "Edit City" : "Add New City"}
      description={
        isEditing
          ? "Update city details, state assignment, and status."
          : "Add a new dynamic city under an Indian state for listings."
      }
      headerIcon={<MapPin className="size-4" />}
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
            className="font-semibold cursor-pointer"
          >
            <MapPin className="size-3.5" />
            {isSubmitting ? "Saving..." : isEditing ? "Save Changes" : "Add City"}
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <Controller
          name="stateCode"
          control={control}
          render={({ field }) => (
            <SelectWithLabel
              label="State / Union Territory"
              placeholder="Select an Indian state or UT..."
              options={stateOptions}
              value={field.value}
              onValueChange={field.onChange}
              error={errors?.stateCode?.message}
            />
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                label="City Name"
                placeholder="e.g., Ahmedabad"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e)
                  if (!isEditing) {
                    setValue("slug", generateSlug(e.target.value), { shouldValidate: true })
                  }
                }}
                error={errors?.name?.message}
              />
            )}
          />

          <Controller
            name="slug"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                label="URL Slug"
                placeholder="e.g., ahmedabad"
                {...field}
                error={errors?.slug?.message}
              />
            )}
          />
        </div>

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-card">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-foreground">
                  City Status
                </span>
                <p className="text-[11px] text-muted-foreground">
                  {field.value === "Active" ? "Active and visible on directory website" : "Hidden from search & filters"}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => field.onChange("Active")}
                  className={cn(
                    "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer",
                    field.value === "Active"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  Active
                </button>
                <button
                  type="button"
                  onClick={() => field.onChange("Inactive")}
                  className={cn(
                    "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer",
                    field.value === "Inactive"
                      ? "bg-rose-600 text-white shadow-xs"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  Inactive
                </button>
              </div>
            </div>
          )}
        />
      </div>
    </Modal>
  )
}

export default CityModal
