"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const fetchCart = async () => {
  const { userId } = await auth();
  if (!userId) {
    return;
  }
  let cart = await db.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          item: true,
        },
      },
    },
  });

  if (!cart) {
    cart = await db.cart.create({
      data: { userId },
      include: {
        items: {
          include: {
            item: true,
          },
        },
      },
    });
  }

  return cart;
};

export const addToCart = async (product, quantity, cart) => {
  const { userId } = await auth();
  if (!cart || !cart.items) return;
  const CartItem = cart.items.find((item) => item.itemId === product.id);
  if (CartItem) {
    await db.cart.update({
      where: { userId: userId },
      data: {
        items: {
          updateMany: {
            where: { itemId: product.id },
            data: { quantity: CartItem.quantity + quantity },
          },
        },
      },
    });
  } else {
    await db.cart.update({
      where: { userId: userId },
      data: {
        items: {
          create: {
            itemId: product.id,
            quantity: quantity,
            name: product.name,
            price: product.price,
            image: product.image,
          },
        },
      },
    });
  }
};

export const removeFromCart = async (itemId, type) => {
  const { userId } = await auth();

  if (!userId) throw new Error("User not authenticated");

  if (type === "deleteOne") {
    await db.cartItem.deleteMany({
      where: {
        itemId: itemId,
        cart: {
          userId: userId,
        },
      },
    });
  } else if (type === "clearCart") {
    await db.cartItem.deleteMany({
      where: {
        cart: {
          userId: userId,
        },
      },
    });
  }
};

export const UpdateQuantity = async (itemId, quantity, type) => {
  const { userId } = await auth();

  if (!userId) throw new Error("User not authenticated");
  const existingCartItem = await db.cartItem.findFirst({
    where: {
      itemId: itemId,
      cart: {
        userId: userId,
      },
    },
  });

  if (!existingCartItem) {
    throw new Error("Cart item not found");
  }
  const newQuantity =
    existingCartItem.quantity + (type === "increment" ? quantity : -quantity);

  if (newQuantity < 1) {
    await removeFromCart(itemId, "deleteOne");
  } else {
    await db.cartItem.update({
      where: { id: existingCartItem.id },
      data: { quantity: newQuantity },
    });
  }
};
