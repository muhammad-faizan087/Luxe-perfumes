// "use server";

// import { db } from "@/lib/prisma";

// export const getProducts = async () => {
//   const products = await db.product.findMany({});
//   if (!products) {
//     return { success: false, products: [] };
//   }
//   return { success: true, products };
// };

// export const getProductById = async (id) => {
//   const product = await db.product.findUnique({
//     where: {
//       id: id,
//     },
//   });
//   if (!product) {
//     return { success: false, product: null };
//   }
//   return { success: true, product };
// };
