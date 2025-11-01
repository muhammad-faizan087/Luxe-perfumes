"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // const [cart, setCart] = useState();

  // useEffect(() => {
  //   const getCart = async () => {
  //     const CartData = await fetchCart();
  //     setCart(CartData);
  //   };
  //   getCart();
  // }, []);

  const { cart } = useCart();

  const items = cart?.items || [];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-amber-600 flex items-center justify-center">
              <span
                className="text-white font-bold text-lg"
                style={{ fontFamily: "Georgia, serif" }}
              >
                L
              </span>
            </div>
            <span
              className="text-white font-semibold inline"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Luxe
            </span>
          </Link>

          <SignedOut>
            <button className="cursor-pointer py-2 px-4 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-full transition-colors">
              <Link href={"/sign-in"}>Sign In</Link>
            </button>
          </SignedOut>

          <SignedIn>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-white hover:text-amber-600 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-white hover:text-amber-600 transition-colors"
              >
                Products
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-amber-600 transition-colors"
              >
                About
              </Link>
              {/* <Link
              href="/contact"
              className="text-white hover:text-amber-600 transition-colors"
              >
              Contact
              </Link> */}
            </div>
          </SignedIn>

          <SignedIn>
            <div className="flex items-center space-x-4 relative">
              <div className="flex items-center  justify-center gap-2">
                <Link
                  href="/cart"
                  className="text-white hover:text-amber-600 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </Link>
                <UserButton
                  className="cursor-pointer"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "h-14 w-14", // enlarges avatar
                      userButtonPopoverCard: "shadow-xl", // correct key
                      userPreviewMainIdentifier: "font-semibold", // bold main identifier
                    },
                  }}
                />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-white"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <span className="bg-orange-400 h-[20px] w-4 rounded-xl text-sm absolute top-[-8px] right-[87px] md:right-[46px] text-center">
                {items.length}
              </span>
            </div>
          </SignedIn>
        </div>

        <SignedIn>
          {isOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <Link
                href="/"
                className="block text-white hover:text-amber-600 py-2"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="block text-white hover:text-amber-600 py-2"
              >
                Products
              </Link>
              <Link
                href="/about"
                className="block text-white hover:text-amber-600 py-2"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block text-white hover:text-amber-600 py-2"
              >
                Contact
              </Link>
            </div>
          )}
        </SignedIn>
      </div>
    </nav>
  );
}
