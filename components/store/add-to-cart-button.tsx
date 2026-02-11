"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const handleAddToCart = () => {
    // We'll implement cart functionality next
    alert(`Added ${product.name} to cart! (Cart coming next)`);
  };

  return (
    <Button
      size="lg"
      className="w-full"
      onClick={handleAddToCart}
      disabled={product.stock === 0}
    >
      <ShoppingCart className="h-5 w-5 mr-2" />
      {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
    </Button>
  );
}