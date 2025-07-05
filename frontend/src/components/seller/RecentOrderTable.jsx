import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchVendorOrders, getUserRole } from "../../lib/api";

const RecentOrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [permissionError, setPermissionError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = getUserRole();
    if (!token || role !== "vendor") {
      setPermissionError(true);
      setLoading(false);
      return;
    }
    fetchVendorOrders(token)
      .then((data) => setOrders(data.orders || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (permissionError) return <div>Permission denied: Vendors only.</div>;

  const formatDate = (dateString) => {
    const options = {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "new":
        return "default";
      case "processing":
        return "secondary";
      case "shipped":
        return "outline";
      case "delivered":
        return "default";
      case "canceled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell className="font-medium">
                <div>
                  <p>{order._id}</p>
                  <p className="text-xs text-muted-foreground">
                    {order.items?.[0]?.product?.name || ""}
                  </p>
                </div>
              </TableCell>
              <TableCell>{order.user?.name || "N/A"}</TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(order.status)}>
                  {order.status?.charAt(0).toUpperCase() +
                    order.status?.slice(1) || "N/A"}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {order.createdAt ? formatDate(order.createdAt) : "N/A"}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/seller/orders/${order._id}`}>View</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-4">
        <Button variant="outline" asChild>
          <Link to="/seller/orders">View All Orders</Link>
        </Button>
      </div>
    </div>
  );
};

export default RecentOrderTable;
