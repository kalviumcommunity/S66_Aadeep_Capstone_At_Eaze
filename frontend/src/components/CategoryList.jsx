import React, { useEffect, useState } from "react";
// import { categories } from '@/lib/data';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // TODO: Fetch categories from backend or derive from products
    setCategories([
      "Home Decor",
      "Jewelry",
      "Art",
      "Clothing",
      "Accessories",
      "Other",
    ]);
  }, []);

  return (
    <section className="py-16 bg-ateaze-cream">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-ateaze-charcoal mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our diverse collection of handcrafted items across multiple
            categories.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link to={`/categories/${category.id}`} key={category.id}>
              <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg group">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-medium">{category.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
