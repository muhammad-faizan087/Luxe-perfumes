"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import About from "@/components/about";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function Home({ products }) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [Navigating, setNavigating] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 ${
          Navigating
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } bg-black/70`}
      >
        <Loader2 className="animate-spin text-white w-10 h-10" />
      </div>
      <div className="relative w-full h-screen overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src="/perfume-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Navbar */}
        <Navbar />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1
            className="text-6xl md:text-7xl font-serif font-bold text-white mb-6"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Essence of Luxury
          </h1>
          <p
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Discover our exclusive collection of premium fragrances
          </p>
          <Link
            href="/products"
            className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold transition-colors"
            style={{ fontFamily: "Georgia, serif" }}
            onClick={() => {
              setNavigating(true);
            }}
          >
            Explore Collection
          </Link>
        </div>
      </div>

      {/* Featured Collection Section */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-5xl font-bold text-center mb-16 text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Featured Fragrances
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group cursor-pointer"
                onClick={() => {
                  setNavigating(true);
                }}
              >
                <div className="bg-gray-900 overflow-hidden mb-4 relative w-full h-96 hover:opacity-80 transition-opacity">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    // quality={100}
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3
                  className="text-2xl font-semibold text-white mb-2"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {product.name}
                </h3>
                <p className="text-gray-400 mb-3">{product.description}</p>
                <p className="text-amber-600 text-lg font-semibold">
                  $ {product.price}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      {/* <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl font-bold mb-8 text-white"
            style={{ fontFamily: "Georgia, serif" }}
          >
            About Luxe Perfume
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Since 1995, Luxe Perfume has been crafting exceptional fragrances
            that capture the essence of luxury and elegance. Each scent is
            carefully composed by master perfumers using the finest ingredients
            from around the world.
          </p>
          <p className="text-gray-400">
            Our commitment to quality and sustainability ensures that every
            bottle represents the pinnacle of perfumery.
          </p>
        </div>
      </section> */}
      <About />

      {/* Footer */}
      <Footer />
    </div>
  );
}
