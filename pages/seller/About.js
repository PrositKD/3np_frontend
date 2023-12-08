import React from "react";
import Navigation from "./layout/navigation";
import Footer from "./layout/footer";

const About = () => {
  return (
    <div>
      <Navigation />

      <div className="bg-gray-100 p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-semibold mb-4">Welcome to Tri Gardening</h1>
          <p className="text-gray-700">
            At our Tri Gardening, we bring nature's beauty to your doorstep. Explore a wide variety of lush and vibrant plants, carefully curated to add a touch of greenery and serenity to your living spaces. Whether you're an experienced gardener or just beginning your plant journey, our website offers a one-stop destination for all your plant-related needs.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-8">
        <h2 className="text-2xl font-semibold mb-4">Our Plant Collection</h2>
        <p className="text-gray-700">
          Step into a world of botanical wonders as you browse through our diverse collection of indoor and outdoor plants. From elegant succulents that thrive on neglect to majestic indoor trees that bring the outdoors in, our selection caters to every type of plant enthusiast. Discover a spectrum of colors, shapes, and sizes that perfectly fit your aesthetic preferences and living conditions.
        </p>
      </div>

      {/* ... Continue with other sections ... */}

      <Footer />
    </div>
  );
};

export default About;
