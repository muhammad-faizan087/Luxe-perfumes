import ProductDetail from "@/components/product";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const page = async ({ params }) => {
  // const { userId } = await auth();

  const product = await db.product.findUnique({
    where: {
      id: params.id,
    },
  });
  console.log(product);

  return (
    <div>
      <ProductDetail product={product} />
    </div>
  );
};

export default page;
