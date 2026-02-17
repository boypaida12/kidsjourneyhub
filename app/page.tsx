import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import StoreLayout from "@/components/store/store-layout";
import ProductCard from "@/components/store/product-card";
import TestimonialCarousel from "@/components/store/testimonials";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default async function HomePage() {
  // 30 days ago for new arrivals
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  // Fetch featured products
  const featuredProducts = await prisma.product.findMany({
    where: {
      isActive: true,
      isFeatured: true,
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 8,
  });

  // Fetch new arrivals (last 30 days, excluding featured)
  const newArrivals = await prisma.product.findMany({
    where: {
      isActive: true,
      createdAt: { gte: thirtyDaysAgo },
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 8,
  });

  // Fetch all active products
  const allProducts = await prisma.product.findMany({
    where: { isActive: true },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return (
    <StoreLayout>
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="bg-linear-to-r from-blue-50 to-purple-50 py-20">
        <div className="md:w-3xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Your trusted haven for baby and mum essentials
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Curated with love for expectant mums, new parents, and thoughtful
            gift buyers. Premium quality, easy ordering online.
          </p>
          <Link href="/products">
            <Button size="lg" className="rounded-full">
              <ShoppingBag />
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Featured Products ───────────────────────────── */}
      {featuredProducts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold">Featured Products</h2>
                <p className="text-gray-500 text-sm mt-1">
                  Hand-picked favourites just for you
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/products" className="flex items-center gap-1">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── New Arrivals ─────────────────────────────────── */}
      {newArrivals.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold">New Arrivals</h2>
                <p className="text-gray-500 text-sm mt-1">
                  Fresh additions to our collection
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/products" className="flex items-center gap-1">
                  See More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Empty State ───────────────────────────────────── */}
      {allProducts.length === 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-gray-50 rounded-lg py-16">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-4">
                No products available yet
              </p>
              <p className="text-gray-400 text-sm">
                Check back soon for new arrivals!
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonials ─────────────────────────────────── */}
      <TestimonialCarousel />
    </StoreLayout>
  );
}