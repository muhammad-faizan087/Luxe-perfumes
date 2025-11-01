import Home from "@/components/Home";
import { db } from "@/lib/prisma";
import React from "react";

const Homepage = async () => {
  const FeaturedProducts = await db.product.findMany({});

  return (
    <div>
      <Home products={FeaturedProducts.slice(0, 3)} />
    </div>
  );
};

export default Homepage;
