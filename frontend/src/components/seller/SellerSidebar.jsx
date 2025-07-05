
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Settings,
  HelpCircle,
  LogOut,
  AlertCircle,
  LineChart,
  MessageSquare
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const SellerSidebar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { href: '/seller/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/seller/products', label: 'Products', icon: Package },
    { href: '/seller/orders', label: 'Orders', icon: ShoppingBag },
    { href: '/seller/analytics', label: 'Analytics', icon: LineChart },
    { href: '/seller/messages', label: 'Messages', icon: MessageSquare },
  ];

  const bottomNavItems = [
    { href: '/seller/settings', label: 'Settings', icon: Settings },
    { href: '/seller/help', label: 'Help Center', icon: HelpCircle },
  ];

  return (
    <div className="hidden md:flex flex-col bg-white border-r h-screen w-64 p-4">
      <div className="flex items-center mb-6 px-2">
        <Link to="/seller/dashboard" className="text-2xl font-display font-semibold text-ateaze-charcoal flex items-center space-x-1">
          <span>At Eaze</span>
          <span className="text-xs bg-ateaze-sage text-white px-1.5 py-0.5 rounded">Seller</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link key={item.href} to={item.href}>
            <div
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive(item.href)
                  ? "bg-ateaze-sage text-white"
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
            <div className="p-2 bg-ateaze-sage bg-opacity-20 rounded-md">
              <AlertCircle className="h-4 w-4 text-ateaze-sage" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Need Help?</h4>
              <p className="text-xs text-gray-600">Contact support</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full mt-3">Get Support</Button>
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

export default SellerSidebar;
