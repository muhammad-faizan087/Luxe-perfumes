"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";

export default function ProductsPage({ products }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <h1
            className="text-5xl font-bold text-white mb-4 text-center"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Our Collection
          </h1>
          <p className="text-gray-400 text-center mb-12">
            Discover our curated selection of premium fragrances
          </p>

          {/* Category Filter */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {["all", "men", "women", "unisex"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 transition-colors capitalize ${
                  selectedCategory === category
                    ? "bg-amber-600 text-white"
                    : "bg-gray-900 text-gray-300 hover:bg-gray-800"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="group cursor-pointer">
                  <div className="bg-gray-900 overflow-hidden relative w-full h-96 mb-4 hover:opacity-80 transition-opacity">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      // quality={100}
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <h3
                    className="text-xl font-semibold text-white mb-2"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {product.name}
                  </h3>
                  <p className="text-gray-400 mb-3 text-sm">
                    {product.description}
                  </p>
                  <p className="text-amber-600 text-lg font-semibold">
                    ${product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
