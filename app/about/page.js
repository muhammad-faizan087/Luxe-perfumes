import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import About from "@/components/about";
import React from "react";

const Aboutpage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <About />
      <Footer />
    </div>
  );
};

export default Aboutpage;
