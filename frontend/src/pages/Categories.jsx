import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
// import { categories } from '@/lib/data';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-ateaze-cream py-12">
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-display font-semibold text-ateaze-charcoal mb-2">
          Browse Categories
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mb-8">
          Explore our collection of handcrafted items organized by category to
          find exactly what you're looking for.
        </p>

        {/* Search */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCategories.map((category) => (
            <Link to={`/categories/${category.id}`} key={category.id}>
              <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg group">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-display font-medium text-xl mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {category.description ||
                      `Browse our handcrafted ${category.name.toLowerCase()} collection`}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No categories found</h3>
            <p className="text-gray-600">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
