import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice: number | null;
  images: string[];
  stock: number;
  category: {
    name: string;
  } | null;
};

export default function ProductCard({ product }: { product: Product }) {
  const discountPercentage =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(
          ((product.compareAtPrice - product.price) / product.compareAtPrice) *
            100,
        )
      : null;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-200 group flex flex-col">
      {/* Product Image */}
      <Link href={`/products/${product.slug}`} className="relative block">
        <div className="relative w-full aspect-3/4 bg-gray-100 overflow-hidden">
          {product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
              <ShoppingBag className="h-10 w-10 mb-2" />
              <p className="text-xs">No image</p>
            </div>
          )}

          {/* Discount Badge */}
          {discountPercentage && (
            <div className="absolute top-2 left-2">
              <Badge className="bg-red-500 hover:bg-red-500 text-white text-xs px-1.5 py-0.5">
                -{discountPercentage}%
              </Badge>
            </div>
          )}

          {/* Out of Stock Overlay */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <Badge variant="secondary" className="bg-gray-800 text-white">
                Out of Stock
              </Badge>
            </div>
          )}

          {/* Low Stock */}
          {product.stock > 0 && product.stock < 5 && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-orange-500 hover:bg-orange-500 text-white text-xs px-1.5 py-0.5">
                Only {product.stock} left
              </Badge>
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <CardContent className="p-3 flex-1">
        {product.category && (
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {product.category.name}
          </p>
        )}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-medium text-sm leading-tight hover:text-blue-600 transition-colors line-clamp-2 min-h-10">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-base font-bold">
            GH₵ {product.price.toFixed(2)}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-xs text-gray-400 line-through">
              GH₵ {product.compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>

      {/* Action Button */}
      <CardFooter className="p-3 pt-0">
        <Button
          className="w-full h-8 text-sm"
          disabled={product.stock === 0}
          variant={product.stock === 0 ? "secondary" : "default"}
          asChild={product.stock > 0}
        >
          {product.stock > 0 ? (
            <Link href={`/products/${product.slug}`}>View Details</Link>
          ) : (
            "Out of Stock"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
