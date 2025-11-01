"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [Removing, setRemoving] = useState(false);
  const [Clearing, setClearing] = useState(false);
  const [Incrementing, setIncrementing] = useState(false);
  const [Decrementing, setDecrementing] = useState(false);

  const items = cart?.items || [];

  const calculateSubtotal = () => {
    return items.reduce((total, cartItem) => {
      return total + cartItem.item.price * cartItem.quantity;
    }, 0);
  };

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
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 ${
          Removing
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } bg-black/70`}
      >
        <Loader2 className="animate-spin text-white w-10 h-10" />
      </div>
      <Navbar />

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-4xl font-bold text-white mb-12"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Shopping Cart
          </h1>

          {items.length === 0 ? (
            <div className="bg-gray-900 rounded-lg p-12 text-center">
              <svg
                className="w-16 h-16 mx-auto text-gray-600 mb-4"
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
              <h2 className="text-2xl font-semibold text-white mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-400 mb-6">
                Start shopping to add items to your cart
              </p>
              <Link
                href="/products"
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {items.map((cartItem) => (
                    <div
                      key={cartItem.item.id}
                      className="bg-gray-900 rounded-lg p-6 flex gap-6"
                    >
                      <div className="flex-shrink-0">
                        <img
                          src={cartItem.item.image || "/placeholder.svg"}
                          alt={cartItem.item.name}
                          className="w-24 h-24 object-cover rounded"
                        />
                      </div>

                      <div className="flex-grow">
                        <h3
                          className="text-lg font-semibold text-white mb-2"
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          {cartItem.item.name}
                        </h3>
                        <p className="text-amber-600 font-semibold mb-4">
                          ${cartItem.item.price.toFixed(2)}
                        </p>

                        <div className="flex items-center gap-4">
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
                            <span className="px-4 py-1 text-white border-l border-r border-gray-700">
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
                            className="text-red-500 hover:text-red-400 transition-colors text-sm font-medium cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <p className="text-white font-semibold">
                          $
                          {(cartItem.item.price * cartItem.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/products"
                  className="inline-block mt-6 text-amber-600 hover:text-amber-500 transition-colors font-medium cursor-pointer"
                >
                  ← Continue Shopping
                </Link>
              </div>

              {/* Order Summary Section */}
              <div className="lg:col-span-1">
                <div className="bg-gray-900 rounded-lg p-6 sticky top-32">
                  <h2
                    className="text-xl font-semibold text-white mb-6"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6 pb-6 border-b border-gray-700">
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

                  <div className="flex justify-between mb-6">
                    <span className="text-lg font-semibold text-white">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-amber-600">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full block text-center cursor-pointer bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded transition-colors mb-3"
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
                    className="w-full text-center cursor-pointer border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 font-semibold py-3 rounded transition-colors"
                  >
                    {Clearing ? "Clearing Cart..." : "Clear Cart"}
                  </button>

                  {subtotal <= 100 && (
                    <p className="text-sm text-gray-500 mt-4 text-center">
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
