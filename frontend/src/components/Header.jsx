import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingBag,
  User,
  Search,
  Menu,
  X,
  LogOut,
  Settings,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated, user, logout, getUserRole } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // In a real app, this would navigate to search results
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-display font-semibold text-ateaze-charcoal">
              At Eaze
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="text-ateaze-charcoal hover:text-ateaze-terracotta transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-ateaze-charcoal hover:text-ateaze-terracotta transition-colors"
            >
              Shop
            </Link>
            <Link
              to="/categories"
              className="text-ateaze-charcoal hover:text-ateaze-terracotta transition-colors"
            >
              Categories
            </Link>
            <Link
              to="/sellers"
              className="text-ateaze-charcoal hover:text-ateaze-terracotta transition-colors"
            >
              Sellers
            </Link>
          </nav>

          {/* Search, User, Cart - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search handmade gifts..."
                className="w-40 lg:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Search className="h-4 w-4 text-muted-foreground" />
              </button>
            </form>

            {/* User */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="User account">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {user?.name || "User"}
                  </div>
                  <div className="px-2 py-1.5 text-xs text-muted-foreground">
                    {user?.email}
                  </div>
                  <DropdownMenuSeparator />
                  {getUserRole() === "vendor" && (
                    <DropdownMenuItem asChild>
                      <Link to="/seller/dashboard">
                        <Settings className="mr-2 h-4 w-4" />
                        Seller Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {getUserRole() === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin/dashboard">
                        <Settings className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon" aria-label="User account">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}

            {/* Cart */}
            <Button variant="ghost" size="icon" aria-label="Shopping cart">
              <div className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-ateaze-terracotta text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </div>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t mt-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-ateaze-charcoal hover:text-ateaze-terracotta transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-ateaze-charcoal hover:text-ateaze-terracotta transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/categories"
                className="text-ateaze-charcoal hover:text-ateaze-terracotta transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/sellers"
                className="text-ateaze-charcoal hover:text-ateaze-terracotta transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sellers
              </Link>

              {/* Search form */}
              <form onSubmit={handleSearch} className="relative mt-2">
                <Input
                  type="search"
                  placeholder="Search handmade gifts..."
                  className="w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Search className="h-4 w-4 text-muted-foreground" />
                </button>
              </form>

              <div className="flex space-x-4 pt-2">
                {isAuthenticated ? (
                  <>
                    <Button
                      variant="outline"
                      className="flex items-center space-x-2 flex-1"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </Button>
                    {getUserRole() === "vendor" && (
                      <Link to="/seller/dashboard" className="flex-1">
                        <Button
                          variant="outline"
                          className="flex items-center space-x-2 w-full"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Settings className="h-4 w-4" />
                          <span>Dashboard</span>
                        </Button>
                      </Link>
                    )}
                  </>
                ) : (
                  <Link to="/login" className="flex-1">
                    <Button
                      variant="outline"
                      className="flex items-center space-x-2 w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Login</span>
                    </Button>
                  </Link>
                )}
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 flex-1"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Cart (0)</span>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
