import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { fetchAdminOrders, getUserRole } from "../../lib/api";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [permissionError, setPermissionError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = getUserRole();
    if (!token || role !== "admin") {
      setPermissionError(true);
      setLoading(false);
      return;
    }
    fetchAdminOrders(token)
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (permissionError) return <div>Permission denied: Admins only.</div>;

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "completed":
        return "default";
      case "processing":
        return "outline";
      case "canceled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order._id}>
            <TableCell className="font-medium">{order._id}</TableCell>
            <TableCell>{order.user?.name || "N/A"}</TableCell>
            <TableCell>${order.totalAmount?.toFixed(2) ?? "N/A"}</TableCell>
            <TableCell>
              <Badge variant={getStatusBadgeVariant(order.status)}>
                {order.status?.charAt(0).toUpperCase() +
                  order.status?.slice(1) || "N/A"}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {order.createdAt ? formatDate(order.createdAt) : "N/A"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecentOrders;
