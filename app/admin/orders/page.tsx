import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import OrdersTable from "@/components/admin/orders-table";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const orders = await prisma.order.findMany({
    include: {
      customer: true,
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Orders</h1>
            <p className="text-gray-600 mt-1">
              Manage customer orders and fulfillment
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/admin/dashboard">Back to Dashboard</Link>
          </Button>
        </div>

        {/* Orders Table */}
        {orders.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-white">
            <p className="text-gray-500 mb-2">No orders yet</p>
            <p className="text-sm text-gray-400">
              Orders will appear here when customers make purchases
            </p>
          </div>
        ) : (
          <OrdersTable orders={orders} />
        )}
      </div>
    </div>
  );
}