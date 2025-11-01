import React from "react";

const about = () => {
  return (
    <div className="pt-32 pb-20 px-4 bg-gray-950">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="text-4xl font-bold mb-8 text-white"
          style={{ fontFamily: "Georgia, serif" }}
        >
          About Luxe Perfume
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          Since 1995, Luxe Perfume has been crafting exceptional fragrances that
          capture the essence of luxury and elegance. Each scent is carefully
          composed by master perfumers using the finest ingredients from around
          the world.
        </p>
        <p className="text-gray-400">
          Our commitment to quality and sustainability ensures that every bottle
          represents the pinnacle of perfumery.
        </p>
      </div>
    </div>
  );
};

export default about;
