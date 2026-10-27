import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminLayout from "@/components/layout/AdminLayout"
import AuthLayout from "@/components/layout/AuthLayout"
import Login from "@/pages/login/Login"
import Category from "@/pages/category/Category"
import CategoryForm from "@/pages/category/CategoryForm"
import Dashboard from "@/pages/dashboard/Dashboard"
import Inquiries from "@/pages/inquiries/Inquiries"
import Listings from "@/pages/listings/Listings"
import NotFound from "@/pages/not-found/NotFound"
import Reviews from "@/pages/reviews/Reviews"
import Settings from "@/pages/settings/Settings"
import Users from "@/pages/users/Users"
import UserDetails from "@/pages/users/UserDetails"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/categories/create" element={<CategoryForm />} />
          <Route path="/categories/:id/edit" element={<CategoryForm />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/inquiries" element={<Inquiries />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
