
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SellerSidebar from '@/components/seller/SellerSidebar';
import { BarChart, DollarSign, LineChart, ShoppingBag, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RecentOrderTable from '@/components/seller/RecentOrderTable';
import SellerStats from '@/components/seller/SellerStats';

const SellerDashboard = () => {
  return (
    <div className="flex min-h-screen bg-ateaze-cream">
      <SellerSidebar />
      <div className="flex-1 p-6 lg:p-8">
        <div className="space-y-6">
          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
            <h1 className="text-3xl font-display font-bold text-ateaze-charcoal">Seller Dashboard</h1>
            <div className="flex items-center space-x-2">
              <Link to="/seller/products/add">
                <Button>Add New Product</Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
                <DollarSign className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$142.32</div>
                <p className="text-xs text-muted-foreground">+18.2% from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">New Orders</CardTitle>
                <ShoppingBag className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+3</div>
                <p className="text-xs text-muted-foreground">Today's new orders</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Shop Views</CardTitle>
                <LineChart className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+251</div>
                <p className="text-xs text-muted-foreground">+10.6% from yesterday</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4%</div>
                <p className="text-xs text-muted-foreground">+0.2% from last week</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Latest orders from your shop
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentOrderTable />
              </CardContent>
            </Card>
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Sales Performance</CardTitle>
                <CardDescription>
                  Monthly sales data for your shop
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] w-full">
                <SellerStats />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Status</CardTitle>
                <CardDescription>
                  Products running low on stock
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b">
                    <div>
                      <p className="font-medium">Handcrafted Wooden Bowl</p>
                      <p className="text-sm text-muted-foreground">SKU: WB-001</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-red-500">2 left in stock</p>
                      <Link to="/seller/products/edit/1" className="text-sm text-ateaze-terracotta hover:underline">
                        Restock Now
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b">
                    <div>
                      <p className="font-medium">Macramé Wall Hanging</p>
                      <p className="text-sm text-muted-foreground">SKU: MWH-012</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-amber-500">3 left in stock</p>
                      <Link to="/seller/products/edit/2" className="text-sm text-ateaze-terracotta hover:underline">
                        Restock Now
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pb-2">
                    <div>
                      <p className="font-medium">Personalized Leather Keychain</p>
                      <p className="text-sm text-muted-foreground">SKU: PLK-023</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-amber-500">5 left in stock</p>
                      <Link to="/seller/products/edit/3" className="text-sm text-ateaze-terracotta hover:underline">
                        Restock Now
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
