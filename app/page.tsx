import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import StoreLayout from "@/components/store/store-layout";

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productsToShow.map((product) => (
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
                    {product.stock === 0 && (
                      <Badge
                        variant="secondary"
                        className="mt-2 bg-red-100 text-red-800"
                      >
                        Out of Stock
                      </Badge>
                    )}
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
        </div>
      </section>
    </StoreLayout>
  );
}
