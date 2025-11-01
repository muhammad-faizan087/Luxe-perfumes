"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchCart as serverFetchCart,
  addToCart as serverAddToCart,
  removeFromCart as serverRemoveFromCart,
  UpdateQuantity as serverUpdateQuantity,
} from "@/actions/cart";

const CartContext = createContext({
  cart: null,
  setCart: () => {},
  loading: false,
  setLoading: () => {},
  addToCart: async () => {},
  removeFromCart: async () => {},
  updateQuantity: async () => {},
  // clearCart: async () => {},
  reloadCart: async () => {},
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const reloadCart = async () => {
    try {
      // setLoading(true);
      const data = await serverFetchCart();
      if (data) setCart(data);
    } catch (err) {
      console.error("reloadCart error:", err);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    reloadCart();
  }, []);

  const addToCart = async (product, quantity = 1) => {
    try {
      await serverAddToCart(product, quantity, cart);
      await reloadCart();
    } catch (err) {
      console.error("addToCart error:", err);
    }
  };

  const removeFromCart = async (itemId, type) => {
    try {
      await serverRemoveFromCart(itemId, type);
      await reloadCart();
    } catch (err) {
      console.error("removeFromCart error:", err);
    }
  };

  const updateQuantity = async (itemId, quantity, type) => {
    try {
      await serverUpdateQuantity(itemId, quantity, type);
      await reloadCart();
    } catch (err) {
      console.error("updateQuantity error:", err);
    }
  };

  // const clearCart = async () => {
  //   try {
  //     await serverRemoveFromCart(null, "clearCart");
  //     await reloadCart();
  //   } catch (err) {
  //     console.error("clearCart error:", err);
  //   }
  // };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        loading,
        setLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        // clearCart,
        reloadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
