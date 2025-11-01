import ProductsPage from "@/components/products";
import { db } from "@/lib/prisma";
import React from "react";

const Productpage = async () => {
  const products = await db.product.findMany({});

  return (
    <div>
      <ProductsPage products={products} />
    </div>
  );
};

export default Productpage;
