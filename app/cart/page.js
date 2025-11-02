"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [Removing, setRemoving] = useState(false);
  const [Clearing, setClearing] = useState(false);
  const [Incrementing, setIncrementing] = useState(false);
  const [Decrementing, setDecrementing] = useState(false);
  const [Navigating, setNavigating] = useState(false);

  const items = cart?.items || [];

  const calculateSubtotal = () =>
    items.reduce(
      (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
      0
    );

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  const HandleUpdateQuantity = async (itemId, quantity, type) => {
    await updateQuantity(itemId, quantity, type);
  };

  const HandleRemoveFromCart = async (itemId, type) => {
    await removeFromCart(itemId, type);
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Loader Overlay */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 ${
          Removing || Navigating
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } bg-black/70`}
      >
        <Loader2 className="animate-spin text-white w-10 h-10" />
      </div>

      <Navbar />

      <div className="pt-28 pb-20 px-3 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-3xl sm:text-4xl font-bold text-white mb-10 sm:mb-12 text-center sm:text-left"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Shopping Cart
          </h1>

          {items.length === 0 ? (
            <div className="bg-gray-900 rounded-lg p-8 sm:p-12 text-center">
              <svg
                className="w-14 h-14 sm:w-16 sm:h-16 mx-auto text-gray-600 mb-4"
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
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-400 mb-6 text-sm sm:text-base">
                Start shopping to add items to your cart
              </p>
              <Link
                href="/products"
                onClick={() => {
                  setNavigating(true);
                }}
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {items.map((cartItem) => (
                    <div
                      key={cartItem.item.id}
                      className="bg-gray-900 rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6"
                    >
                      {/* Image */}
                      <div className="flex-shrink-0 flex justify-center sm:justify-start">
                        <Image
                          src={cartItem.item.image || "/placeholder.svg"}
                          alt={cartItem.item.name}
                          className="object-cover rounded w-28 h-28 sm:w-24 sm:h-24"
                          width={96}
                          height={96}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-grow text-center sm:text-left">
                        <h3
                          className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2"
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          {cartItem.item.name}
                        </h3>
                        <p className="text-amber-600 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                          ${cartItem.item.price.toFixed(2)}
                        </p>

                        <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 flex-wrap">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-gray-700 rounded">
                            <button
                              onClick={async () => {
                                setDecrementing(true);
                                await HandleUpdateQuantity(
                                  cartItem.item.id,
                                  1,
                                  "decrement"
                                );
                                setDecrementing(false);
                              }}
                              className="px-3 py-1 text-gray-400 hover:text-white transition-colors"
                            >
                              {Decrementing ? "..." : "−"}
                            </button>
                            <span className="px-4 py-1 text-white border-l border-r border-gray-700 text-sm sm:text-base">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={async () => {
                                setIncrementing(true);
                                await HandleUpdateQuantity(
                                  cartItem.item.id,
                                  1,
                                  "increment"
                                );
                                setIncrementing(false);
                              }}
                              className="px-3 py-1 text-gray-400 hover:text-white transition-colors"
                            >
                              {Incrementing ? "..." : "+"}
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button
                            disabled={Removing}
                            onClick={async () => {
                              setRemoving(true);
                              await HandleRemoveFromCart(
                                cartItem.item.id,
                                "deleteOne"
                              );
                              setRemoving(false);
                            }}
                            className="text-red-500 hover:text-red-400 transition-colors text-xs sm:text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex-shrink-0 text-white font-semibold text-center sm:text-right mt-2 sm:mt-0">
                        <p className="text-sm sm:text-base">
                          $
                          {(cartItem.item.price * cartItem.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/products"
                  onClick={() => {
                    setNavigating(true);
                  }}
                  className="inline-block mt-6 text-amber-600 hover:text-amber-500 transition-colors font-medium text-sm sm:text-base"
                >
                  ← Continue Shopping
                </Link>
              </div>

              {/* Order Summary Section */}
              <div className="lg:col-span-1">
                <div className="bg-gray-900 rounded-lg p-5 sm:p-6 sticky top-32">
                  <h2
                    className="text-lg sm:text-xl font-semibold text-white mb-5 sm:mb-6 text-center sm:text-left"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Order Summary
                  </h2>

                  <div className="space-y-3 sm:space-y-4 mb-6 pb-6 border-b border-gray-700 text-sm sm:text-base">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Tax (10%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-500">Free</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between mb-6 text-sm sm:text-base">
                    <span className="text-lg font-semibold text-white">
                      Total
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-amber-600">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full block text-center cursor-pointer bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2.5 sm:py-3 rounded transition-colors mb-3 text-sm sm:text-base"
                  >
                    Proceed to Checkout
                  </Link>

                  <button
                    disabled={Clearing}
                    onClick={async () => {
                      setClearing(true);
                      await HandleRemoveFromCart(null, "clearCart");
                      setClearing(false);
                    }}
                    className="w-full text-center border cursor-pointer border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 font-semibold py-2.5 sm:py-3 rounded transition-colors text-sm sm:text-base"
                  >
                    {Clearing ? "Clearing Cart..." : "Clear Cart"}
                  </button>

                  {subtotal <= 100 && (
                    <p className="text-xs sm:text-sm text-gray-500 mt-4 text-center">
                      Free shipping on orders over $100
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
