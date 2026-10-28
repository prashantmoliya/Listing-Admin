import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InputWithLabel } from "@/components/common"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginFormValues } from "@/schemas"

const Login = () => {
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormValues) => {
    console.log("data", data)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    reset();
    navigate("/");
  }

  return (
    <>
      {/* Form Title & Subtitle */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Sign In
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Enter your credentials to access the admin portal.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputWithLabel
              id="email"
              type="email"
              label="Email Address"
              placeholder="name@example.com"
              {...field}
              error={errors.email?.message}
              disabled={isSubmitting}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputWithLabel
              id="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              placeholder="Enter your password"
              {...field}
              error={errors.password?.message}
              disabled={isSubmitting}
              rightElement={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-muted-foreground hover:text-foreground size-8 p-0 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </Button>
              }
            />
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-sm shadow-md shadow-primary/20 transition-all cursor-pointer flex items-center justify-center gap-2 mt-7"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </form>
    </>
  )
}

export default Login
