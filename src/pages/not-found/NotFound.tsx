import { Link } from "react-router-dom"
import { AlertCircle, ArrowLeft } from "lucide-react"

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
      <div className="size-16 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mb-4">
        <AlertCircle className="size-8" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight">404 - Page Not Found</h1>
      <p className="text-sm text-muted-foreground mt-2 max-w-sm">
        The admin module or resource you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm"
      >
        <ArrowLeft className="size-3.5" /> Back to Dashboard
      </Link>
    </div>
  )
}
export default NotFound
