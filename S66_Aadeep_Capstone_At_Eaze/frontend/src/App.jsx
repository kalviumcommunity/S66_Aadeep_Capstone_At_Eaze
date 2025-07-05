import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductListing from "./pages/ProductListing";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Categories from "./pages/Categories";
import CategoryDetail from "./pages/CategoryDetail";
import Sellers from "./pages/Sellers";
import Featured from "./pages/Featured";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProductManagement from "./pages/admin/ProductManagement";
import SellerDashboard from "./pages/seller/Dashboard";
import SellerProductManagement from "./pages/seller/ProductManagement";
import AddProduct from "./pages/seller/AddProduct";
import EditProduct from "./pages/seller/EditProduct";
import BecomeASeller from "./pages/BecomeASeller";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import ContactUs from "./pages/ContactUs";
import SellWithUs from "./pages/SellWithUs";
import FileUploadDemo from "./pages/FileUploadDemo";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route
              path="/admin/products"
              element={<AdminProductManagement />}
            />
            <Route path="/admin/*" element={<AdminDashboard />} />

            {/* Seller Routes */}
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route
              path="/seller/products"
              element={<SellerProductManagement />}
            />
            <Route path="/seller/products/add" element={<AddProduct />} />
            <Route path="/seller/products/edit/:id" element={<EditProduct />} />
            <Route path="/seller/*" element={<SellerDashboard />} />

            {/* Public Routes with Header and Footer */}
            <Route
              path="/*"
              element={
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/products" element={<ProductListing />} />
                      <Route path="/products/:id" element={<ProductDetail />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/categories" element={<Categories />} />
                      <Route
                        path="/categories/:id"
                        element={<CategoryDetail />}
                      />
                      <Route path="/sellers" element={<Sellers />} />
                      <Route path="/featured" element={<Featured />} />
                      <Route
                        path="/become-a-seller"
                        element={<BecomeASeller />}
                      />
                      <Route path="/sellers/join" element={<SellWithUs />} />
                      <Route path="/upload-demo" element={<FileUploadDemo />} />
                      <Route path="/about" element={<AboutUs />} />
                      <Route path="/privacy" element={<PrivacyPolicy />} />
                      <Route path="/terms" element={<TermsOfService />} />
                      <Route path="/contact" element={<ContactUs />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
