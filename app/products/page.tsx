import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import StoreLayout from "@/components/store/store-layout";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  // Fetch categories for filter
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  // Build filter query
  const whereClause: Prisma.ProductWhereInput = {
    isActive: true,
  };

  if (category) {
    whereClause.categoryId = category;
  }

  // Fetch products
  const products = await prisma.product.findMany({
    where: whereClause,
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <StoreLayout>
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Categories Filter */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-lg border p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Categories</h2>
              <div className="space-y-2">
                <Link href="/products">
                  <Button
                    variant={!category ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    All Products
                  </Button>
                </Link>
                {categories.map((cat) => (
                  <Link key={cat.id} href={`/products?category=${cat.id}`}>
                    <Button
                      variant={category === cat.id ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      {cat.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
          {/* Main Content - Products Grid */}
          <main className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">
                {category
                  ? categories.find((c) => c.id === category)?.name ||
                    "Products"
                  : "All Products"}
              </h1>
              <p className="text-gray-600 mt-2">
                {products.length}{" "}
                {products.length === 1 ? "product" : "products"} found
              </p>
            </div>
            {products.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500 mb-4">
                  No products found in this category
                </p>
                <Button variant="outline" asChild>
                  <Link href="/products">View All Products</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <Link href={`/products/${product.slug}`}>
                      <div className="aspect-square bg-gray-100 flex items-center justify-center">
                        {product.images.length > 0 ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-gray-400 text-center p-4">
                            <ShoppingCart className="h-16 w-16 mx-auto mb-2" />
                            <p>No image</p>
                          </div>
                        )}
                      </div>
                    </Link>
                    <CardContent className="p-4">
                      {product.category && (
                        <Badge variant="secondary" className="mb-2">
                          {product.category.name}
                        </Badge>
                      )}
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="font-semibold text-lg hover:text-blue-600 line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>
                      {product.description && (
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xl font-bold">
                          GH₵ {product.price.toFixed(2)}
                        </span>
                        {product.compareAtPrice &&
                          product.compareAtPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                              GH₵ {product.compareAtPrice.toFixed(2)}
                            </span>
                          )}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        {product.stock === 0 ? (
                          <Badge
                            variant="secondary"
                            className="bg-red-100 text-red-800"
                          >
                            Out of Stock
                          </Badge>
                        ) : product.stock < 5 ? (
                          <Badge
                            variant="secondary"
                            className="bg-orange-100 text-orange-800"
                          >
                            Only {product.stock} left
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800"
                          >
                            In Stock
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button
                        className="w-full"
                        disabled={product.stock === 0}
                        asChild={product.stock > 0}
                      >
                        {product.stock > 0 ? (
                          <Link href={`/products/${product.slug}`}>
                            View Details
                          </Link>
                        ) : (
                          "Out of Stock"
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </StoreLayout>
  );
}
