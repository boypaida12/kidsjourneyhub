import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CategoriesTable from "@/components/admin/categories-table";
import CreateCategoryDialog from "@/components/admin/create-category-dialog";

export default async function CategoriesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Categories</h1>
            <p className="text-gray-600 mt-1">
              Organize your products into categories
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/admin/dashboard">Back to Dashboard</Link>
            </Button>
            <CreateCategoryDialog
              trigger={
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Category
                </Button>
              }
            />
          </div>
        </div>

        {/* Categories Table */}
        {categories.length === 0 ? (
          <div className="text-center py-12 border rounded-lg bg-white">
            <p className="text-gray-500 mb-4">No categories yet</p>
            <CreateCategoryDialog
              trigger={
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Category
                </Button>
              }
            />
          </div>
        ) : (
          <CategoriesTable categories={categories} />
        )}
      </div>
    </div>
  );
}