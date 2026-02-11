"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type OrderStatusUpdateProps = {
  orderId: string;
  currentStatus: string;
};

export default function OrderStatusUpdate({
  orderId,
  currentStatus,
}: OrderStatusUpdateProps) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    if (status === currentStatus) {
      alert("Status hasn't changed");
      return;
    }

    setIsUpdating(true);

    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        router.refresh();
        alert("Order status updated successfully!");
      } else {
        const error = await response.json();
        alert(error.error || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="status">Order Status</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="PROCESSING">Processing</SelectItem>
            <SelectItem value="SHIPPED">Shipped</SelectItem>
            <SelectItem value="DELIVERED">Delivered</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        onClick={handleUpdate}
        disabled={isUpdating || status === currentStatus}
        className="w-full"
      >
        {isUpdating ? "Updating..." : "Update Status"}
      </Button>
    </div>
  );
}