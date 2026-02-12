import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import StoreLayout from "@/components/store/store-layout";
import ProductCard from "@/components/store/product-card";

export default async function HomePage() {
  // Fetch featured products
  const featuredProducts = await prisma.product.findMany({
    where: {
      isActive: true,
      isFeatured: true,
    },
    include: {
      category: true,
    },
    take: 8,
  });

  // Fetch all active products if no featured
  const allProducts =
    featuredProducts.length === 0
      ? await prisma.product.findMany({
          where: { isActive: true },
          include: { category: true },
          take: 8,
        })
      : [];

  const productsToShow =
    featuredProducts.length > 0 ? featuredProducts : allProducts;

  return (
    <StoreLayout>
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Quality Kids Clothing & Accessories
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Comfortable, stylish, and affordable clothing for your little ones
          </p>
          <Button size="lg" asChild>
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              {featuredProducts.length > 0
                ? "Featured Products"
                : "Our Products"}
            </h2>
            <Button variant="outline" asChild>
              <Link href="/products">View All</Link>
            </Button>
          </div>

          {productsToShow.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No products available yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {productsToShow.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </StoreLayout>
  );
}
