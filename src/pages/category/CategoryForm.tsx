import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Check,
  Plus,
  Loader2,
} from "lucide-react"
import { categorySchema, type CategoryFormValues } from "@/schemas"
import { mockCategories, type CategoryItem } from "@/data/dummyData"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ImageUpload, InputWithLabel } from "@/components/common"
import { generateSlug } from "@/lib/utils"

const CategoryForm = () => {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const existingCategory = isEdit
    ? mockCategories.find((c) => c.id === id)
    : null

  const [isSlugManual, setIsSlugManual] = useState(isEdit)

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      image: "",
      status: "Active",
    },
  })

  // Auto-fill form values in edit mode
  useEffect(() => {
    if (existingCategory) {
      reset({
        name: existingCategory.name,
        slug: existingCategory.slug,
        image: existingCategory.image,
        status: existingCategory.status,
      })
    }
  }, [existingCategory, reset])


  const onSubmit = (data: CategoryFormValues) => {
    if (isEdit && id) {
      const idx = mockCategories.findIndex((c) => c.id === id)
      if (idx !== -1) {
        mockCategories[idx] = {
          ...mockCategories[idx],
          name: data.name.trim(),
          slug: data.slug.trim(),
          image: data.image.trim(),
          status: data.status,
        }
      }
    } else {
      const newCategory: CategoryItem = {
        id: `CAT-${100 + mockCategories.length + 1}`,
        name: data.name.trim(),
        slug: data.slug.trim(),
        image: data.image.trim(),
        listingCount: 0,
        status: data.status,
        createdAt: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      }
      mockCategories.unshift(newCategory)
    }

    navigate("/categories")
  }

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          {isEdit ? "Edit Category" : "Create New Category"}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          {isEdit
            ? `Update details and configurations for "${existingCategory?.name ?? "Category"}".`
            : "Add a new business category to organize platform directory listings."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-2xl border border-border bg-card shadow-xs p-6 sm:p-8 space-y-6">
          {/* Category Name & Slug in 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Category Name */}
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <InputWithLabel
                  id="name"
                  type="text"
                  label="Category Name"
                  placeholder="e.g. Food & Restaurants"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e)
                    if (!isSlugManual) {
                      setValue("slug", generateSlug(e.target.value), { shouldValidate: true })
                    }
                  }}
                  error={errors.name?.message}
                  disabled={isSubmitting}
                />
              )}
            />

            {/* Category Slug */}
            <Controller
              name="slug"
              control={control}
              render={({ field }) => (
                <InputWithLabel
                  id="slug"
                  type="text"
                  label="URL Slug"
                  description="URL-friendly identifier used in route filters."
                  placeholder="food-restaurants"
                  leftElement={<span className="text-xs font-mono text-muted-foreground">/</span>}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e)
                    setIsSlugManual(true)
                  }}
                  error={errors.slug?.message}
                  disabled={isSubmitting}
                />
              )}
            />
          </div>

          {/* Category Image Upload */}
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <ImageUpload
                id="image"
                label="Image"
                value={field.value}
                onChange={field.onChange}
                error={errors.image?.message}
                disabled={isSubmitting}
                description="SVG, PNG, JPG or WEBP (max. 5MB)"
              />
            )}
          />

          {/* Category Status Card */}
          <Controller
            name="status"
            control={control}
            render={({ field }) => {
              const isActive = field.value === "Active"
              return (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-muted/20">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Label
                        htmlFor="status"
                        className="text-xs font-semibold text-foreground cursor-pointer"
                      >
                        Status
                      </Label>
                      <Badge
                        variant={isActive ? "success" : "secondary"}
                        className="rounded-full px-2 py-0.5 text-[11px] font-semibold select-none"
                      >
                        {isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Toggle to make this category active and visible in directory searches and listings.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Switch
                      id="status"
                      checked={isActive}
                      onCheckedChange={(checked) =>
                        field.onChange(checked ? "Active" : "Inactive")
                      }
                      className="data-[checked]:bg-emerald-600 data-[checked]:hover:bg-emerald-700 cursor-pointer"
                    />
                  </div>
                </div>
              )
            }}
          />
        </div>

        {/* Action Buttons Footer */}
        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/categories")}
            className="px-4 text-xs font-semibold cursor-pointer"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-5 text-xs font-semibold gap-1.5 cursor-pointer shadow-xs"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-3.5 animate-spin" /> Saving...
              </>
            ) : isEdit ? (
              <>
                <Check className="size-3.5" /> Save Changes
              </>
            ) : (
              <>
                <Plus className="size-3.5" /> Submit
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CategoryForm
