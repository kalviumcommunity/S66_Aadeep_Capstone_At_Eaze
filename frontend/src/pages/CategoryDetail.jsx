import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const CategoryDetail = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  // Mock price range filter state
  const [priceRange, setPriceRange] = useState([0, 200]);

  // Mock filter states for desktop and mobile
  const [filterOptions, setFilterOptions] = useState({
    inStock: true,
    freeShipping: false,
    handmadeOnly: true,
    customizable: false,
  });

  useEffect(() => {
    // TODO: Fetch category details from backend or hardcode for now
    setCategory({ name: categoryId });

    // TODO: Fetch products for this category from backend
    // For now, set empty array
    setProducts([]);
    setLoading(false);
  }, [categoryId]);

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low-high":
        return a.price - b.price;
      case "price-high-low":
        return b.price - a.price;
      case "newest":
        return (
          new Date(b.createdAt || Date.now()).getTime() -
          new Date(a.createdAt || Date.now()).getTime()
        );
      case "featured":
      default:
        return b.rating - a.rating; // Using rating as a proxy for "featured" status
    }
  });

  if (loading) {
    return (
      <div className="container py-12">
        <p>Loading category details...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container py-12">
        <h1 className="text-3xl font-display font-semibold mb-4">
          Category Not Found
        </h1>
        <p>The requested category does not exist.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ateaze-cream py-12">
      <div className="container">
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-semibold text-ateaze-charcoal mb-2">
            {category.name}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            {category.description ||
              `Browse our collection of handcrafted ${category.name.toLowerCase()} made by talented artisans.`}
          </p>
        </div>

        {/* Search and Sort Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={`Search in ${category.name}...`}
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low-high">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="price-high-low">
                  Price: High to Low
                </SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile Filters Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Price Range</h3>
                      <div className="pt-2">
                        <Slider
                          defaultValue={[0, 200]}
                          max={200}
                          step={1}
                          onValueChange={(value) => setPriceRange(value)}
                        />
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm">${priceRange[0]}</span>
                          <span className="text-sm">${priceRange[1]}</span>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Product Options</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="in-stock-mobile"
                            checked={filterOptions.inStock}
                            onCheckedChange={(checked) =>
                              setFilterOptions({
                                ...filterOptions,
                                inStock: checked,
                              })
                            }
                          />
                          <Label htmlFor="in-stock-mobile">In Stock</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="free-shipping-mobile"
                            checked={filterOptions.freeShipping}
                            onCheckedChange={(checked) =>
                              setFilterOptions({
                                ...filterOptions,
                                freeShipping: checked,
                              })
                            }
                          />
                          <Label htmlFor="free-shipping-mobile">
                            Free Shipping
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="handmade-only-mobile"
                            checked={filterOptions.handmadeOnly}
                            onCheckedChange={(checked) =>
                              setFilterOptions({
                                ...filterOptions,
                                handmadeOnly: checked,
                              })
                            }
                          />
                          <Label htmlFor="handmade-only-mobile">
                            Handmade Only
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="customizable-mobile"
                            checked={filterOptions.customizable}
                            onCheckedChange={(checked) =>
                              setFilterOptions({
                                ...filterOptions,
                                customizable: checked,
                              })
                            }
                          />
                          <Label htmlFor="customizable-mobile">
                            Customizable
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() =>
                      setFilterOptions({
                        inStock: true,
                        freeShipping: false,
                        handmadeOnly: true,
                        customizable: false,
                      })
                    }
                  >
                    Reset
                  </Button>
                  <Button className="flex-1">Apply</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Main Content with Sidebar */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden md:block w-64 space-y-6">
            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="pt-2">
                <Slider
                  defaultValue={[0, 200]}
                  max={200}
                  step={1}
                  onValueChange={(value) => setPriceRange(value)}
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm">${priceRange[0]}</span>
                  <span className="text-sm">${priceRange[1]}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium mb-3">Product Options</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="in-stock"
                    checked={filterOptions.inStock}
                    onCheckedChange={(checked) =>
                      setFilterOptions({ ...filterOptions, inStock: checked })
                    }
                  />
                  <Label htmlFor="in-stock">In Stock</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="free-shipping"
                    checked={filterOptions.freeShipping}
                    onCheckedChange={(checked) =>
                      setFilterOptions({
                        ...filterOptions,
                        freeShipping: checked,
                      })
                    }
                  />
                  <Label htmlFor="free-shipping">Free Shipping</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="handmade-only"
                    checked={filterOptions.handmadeOnly}
                    onCheckedChange={(checked) =>
                      setFilterOptions({
                        ...filterOptions,
                        handmadeOnly: checked,
                      })
                    }
                  />
                  <Label htmlFor="handmade-only">Handmade Only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="customizable"
                    checked={filterOptions.customizable}
                    onCheckedChange={(checked) =>
                      setFilterOptions({
                        ...filterOptions,
                        customizable: checked,
                      })
                    }
                  />
                  <Label htmlFor="customizable">Customizable</Label>
                </div>
              </div>
            </div>

            <Separator />

            <Button className="w-full" variant="outline">
              Apply Filters
            </Button>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-600">Try different search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
