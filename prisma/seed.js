import { db } from "../lib/prisma.js";

const main = async () => {
  await db.product.createMany({
    data: [
      {
        name: "Midnight Elegance",
        category: "unisex",
        price: 120,
        image: "/luxury-perfume-bottle-dark.jpg",
        description: "A sophisticated blend of oud and sandalwood",
        notes: ["Oud", "Sandalwood", "Amber", "Musk"],
        volume: "100ml",
        concentration: "Eau de Parfum",
        rating: 4.8,
        reviews: 124,
      },
      {
        name: "Golden Hour",
        category: "women",
        price: 135,
        image: "/luxury-gold-perfume.png",
        description: "Warm amber and vanilla notes",
        notes: ["Oud", "Sandalwood", "Amber", "Musk"],
        volume: "100ml",
        concentration: "Eau de Parfum",
        rating: 4.8,
        reviews: 124,
      },
      {
        name: "Crystal Dreams",
        category: "women",
        price: 125,
        image: "/luxury-perfume-bottle-crystal.jpg",
        description: "Fresh citrus with floral undertones",
        notes: ["Oud", "Sandalwood", "Amber", "Musk"],
        volume: "100ml",
        concentration: "Eau de Parfum",
        rating: 4.8,
        reviews: 124,
      },
      {
        name: "Ocean Breeze",
        category: "men",
        price: 115,
        image: "/luxury-perfume-bottle-blue.jpg",
        description: "Crisp aquatic with woody base",
        notes: ["Oud", "Sandalwood", "Amber", "Musk"],
        volume: "100ml",
        concentration: "Eau de Parfum",
        rating: 4.8,
        reviews: 124,
      },
      {
        name: "Rose Garden",
        category: "women",
        price: 130,
        image: "/luxury-perfume-bottle-rose.jpg",
        description: "Classic rose with modern twist",
        notes: ["Oud", "Sandalwood", "Amber", "Musk"],
        volume: "100ml",
        concentration: "Eau de Parfum",
        rating: 4.8,
        reviews: 124,
      },
      {
        name: "Spice Route",
        category: "men",
        price: 128,
        image: "/luxury-perfume-bottle-spice.jpg",
        description: "Exotic spices with leather notes",
        notes: ["Oud", "Sandalwood", "Amber", "Musk"],
        volume: "100ml",
        concentration: "Eau de Parfum",
        rating: 4.8,
        reviews: 124,
      },
    ],
  });
  console.log("✅ Products seeded successfully!");
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
