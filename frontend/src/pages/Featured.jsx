import React, { useEffect, useState } from "react";
import { fetchProducts } from "../lib/api";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Featured = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data.products))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  // For now, just show the first 5 as featured
  const featured = products.slice(0, 5);

  return (
    <div className="min-h-screen bg-ateaze-cream py-12">
      <div className="container">
        <Button variant="ghost" className="flex items-center mb-6" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <h1 className="text-3xl md:text-4xl font-display font-semibold text-ateaze-charcoal mb-2">
          Featured Products
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mb-8">
          Discover our curated selection of unique and exceptional handmade
          creations that showcase the best of artisanal craftsmanship.
        </p>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No featured products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Featured;
