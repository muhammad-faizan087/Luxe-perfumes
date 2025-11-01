"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart, removeFromCart } = useCart();

  const cartData = useRef();

  // useEffect(() => {
  //   const getCart = async () => {
  //     const CartData = await fetchCart();
  //     setCart(CartData);
  //   };
  //   getCart();
  // }, []);

  const items = cart?.items || [];

  const HandleRemoveFromCart = async (itemId, type) => {
    await removeFromCart(itemId, type);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const activeItems = items.length > 0 ? items : cartData.current?.items || [];

  const subtotal = activeItems.reduce(
    (sum, item) => sum + item.item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + tax + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    cartData.current = cart;
    await HandleRemoveFromCart(null, "clearCart");
  };

  // if (items.length === 0) {
  //   return (
  //     <div className="min-h-screen bg-black">
  //       <Navbar />

  //       <div className="pt-32 pb-20 px-4">
  //         <div className="max-w-2xl mx-auto">
  //           <h1
  //             className="text-4xl font-bold text-white mb-12"
  //             style={{ fontFamily: "Georgia, serif" }}
  //           >
  //             Checkout
  //           </h1>

  //           <div className="bg-gray-900 rounded-lg p-12 text-center">
  //             <p className="text-gray-400 mb-6">
  //               Your cart is empty. Add items before proceeding to checkout.
  //             </p>
  //             <Link
  //               href="/products"
  //               className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 transition-colors"
  //             >
  //               Back to Products
  //             </Link>
  //           </div>
  //         </div>
  //       </div>

  //       <Footer />
  //     </div>
  //   );
  // }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />

        <div className="pt-32 pb-20 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-900 rounded-lg p-12 text-center">
              <h2
                className="text-3xl font-bold text-amber-600 mb-4"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Order Confirmed
              </h2>
              <p className="text-gray-300 mb-2">Thank you for your purchase!</p>
              <p className="text-gray-400 mb-8">
                Order confirmation has been sent to {formData.email}
              </p>
              <p className="text-2xl font-bold text-white mb-8">
                Total: ${total.toFixed(2)}
              </p>
              <Link
                href="/products"
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1
            className="text-4xl font-bold text-white mb-12"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900 rounded-lg p-8 mb-8">
                <h2
                  className="text-2xl font-bold text-white mb-6"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6 border-b border-gray-700 pb-6">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="text-white font-semibold">
                          {item.item.name}
                        </p>
                        <p className="text-gray-400 text-sm">
                          Qty: {item.quantity} × ${item.item.price}
                        </p>
                      </div>
                      <p className="text-amber-600 font-bold">
                        ${(item.item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (10%):</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-white font-bold text-lg pt-4 border-t border-gray-700">
                    <span>Total:</span>
                    <span className="text-amber-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Form */}
              <div className="bg-gray-900 rounded-lg p-8">
                <h2
                  className="text-2xl font-bold text-white mb-6"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Shipping Information
                </h2>

                <form onSubmit={handlePlaceOrder} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:border-amber-600 focus:outline-none"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:border-amber-600 focus:outline-none"
                    />
                  </div>

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:border-amber-600 focus:outline-none"
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:border-amber-600 focus:outline-none"
                  />

                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:border-amber-600 focus:outline-none"
                  />

                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:border-amber-600 focus:outline-none"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:border-amber-600 focus:outline-none"
                    />
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP Code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:border-amber-600 focus:outline-none"
                    />
                  </div>

                  <h3
                    className="text-xl font-bold text-white mt-8 mb-4"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Payment Information
                  </h3>

                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:border-amber-600 focus:outline-none"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:border-amber-600 focus:outline-none"
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:border-amber-600 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded transition-colors mt-6"
                  >
                    Place Order
                  </button>
                </form>
              </div>
            </div>

            {/* Price Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 rounded-lg p-6 sticky top-32">
                <h3
                  className="text-xl font-bold text-white mb-4"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Order Total
                </h3>

                <div className="space-y-3 text-sm text-gray-300 mb-6 pb-6 border-b border-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-white font-bold text-lg mb-6">
                  <span>Total</span>
                  <span className="text-amber-600">${total.toFixed(2)}</span>
                </div>

                <Link
                  href="/cart"
                  className="block text-center text-amber-600 hover:text-amber-500 text-sm mb-4"
                >
                  Back to Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
