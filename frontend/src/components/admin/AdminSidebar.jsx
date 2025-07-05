
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Box,
  Tag,
  Settings,
  HelpCircle,
  LogOut,
  AlertCircle,
  BarChart4,
  FileText
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const AdminSidebar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Products', icon: Box },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    { href: '/admin/customers', label: 'Customers', icon: Users },
    { href: '/admin/sellers', label: 'Sellers', icon: Users },
    { href: '/admin/categories', label: 'Categories', icon: Tag },
    { href: '/admin/reports', label: 'Reports', icon: BarChart4 },
    { href: '/admin/content', label: 'Content', icon: FileText },
  ];

  const bottomNavItems = [
    { href: '/admin/settings', label: 'Settings', icon: Settings },
    { href: '/admin/help', label: 'Help', icon: HelpCircle },
  ];

  return (
    <div className="hidden md:flex flex-col bg-white border-r h-screen w-64 p-4">
      <div className="flex items-center mb-6 px-2">
        <Link to="/admin/dashboard" className="text-2xl font-display font-semibold text-ateaze-charcoal flex items-center space-x-1">
          <span>At Eaze</span>
          <span className="text-xs bg-ateaze-terracotta text-white px-1.5 py-0.5 rounded">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link key={item.href} to={item.href}>
            <div
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive(item.href)
                  ? "bg-ateaze-terracotta text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>

      <div className="mt-6">
        <div className="p-3 bg-ateaze-cream rounded-md">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-ateaze-terracotta bg-opacity-20 rounded-md">
              <AlertCircle className="h-4 w-4 text-ateaze-terracotta" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Need Help?</h4>
              <p className="text-xs text-gray-600">Check our docs</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full mt-3">View Documentation</Button>
        </div>

        <Separator className="my-4" />

        <div className="space-y-1">
          {bottomNavItems.map((item) => (
            <Link key={item.href} to={item.href}>
              <div className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </div>
            </Link>
          ))}
          <div className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
            <LogOut className="h-4 w-4" />
            <span>Log Out</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
