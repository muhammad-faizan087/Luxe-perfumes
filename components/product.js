"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function ProductDetail({ product }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  // const [cart, setCart] = useState();
  const { loading, setLoading, addToCart } = useCart();

  // useEffect(() => {
  //   const getCart = async () => {
  //     const CartData = await fetchCart();
  //     setCart(CartData);
  //   };
  //   getCart();
  // }, []);

  const handleAddToCart = async () => {
    console.log("Product:", product, "Quantity:", quantity);

    await addToCart(product, quantity);

    setLoading(false);

    router.push("/cart");
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-gray-400">
            <Link href="/products" className="hover:text-amber-600">
              Products
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-900 p-8">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-auto"
              />
            </div>

            <div>
              <h1
                className="text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-amber-600">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="text-gray-400">
                  ({product.reviews} reviews)
                </span>
              </div>

              <p className="text-gray-300 text-lg mb-6">
                {product.description}
              </p>

              <p className="text-3xl font-bold text-amber-600 mb-8">
                ${product.price}
              </p>

              <div className="bg-gray-900 p-6 mb-8 space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Volume</p>
                  <p className="text-white font-semibold">{product.volume}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Concentration</p>
                  <p className="text-white font-semibold">
                    {product.concentration}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-white font-semibold mb-4">
                  Fragrance Notes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.notes.map((note) => (
                    <span
                      key={note}
                      className="bg-gray-900 text-gray-300 px-4 py-2 text-sm"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mb-8">
                <div className="flex items-center border border-gray-700">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-white hover:bg-gray-900"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-white hover:bg-gray-900"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={async () => {
                    setLoading(true);
                    await handleAddToCart();
                  }}
                  disabled={loading}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 transition-colors"
                >
                  {loading ? (
                    <span className="flex justify-center items-center gap-2">
                      <Loader2 className="animate-spin" />
                      Adding...
                    </span>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </div>

              <div className="border-t border-gray-700 pt-6 text-gray-400 text-sm space-y-2">
                <p>✓ Free shipping on orders over $100</p>
                <p>✓ 30-day money-back guarantee</p>
                <p>✓ Authentic luxury fragrances</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
