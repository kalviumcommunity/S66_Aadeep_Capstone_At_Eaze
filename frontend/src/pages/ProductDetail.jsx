import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from "../lib/api";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Star, User } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchProductById(id)
      .then(setProduct)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product?.name} added to your cart.`,
      duration: 3000,
    });
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container py-8 md:py-12">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-ateaze-terracotta">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-ateaze-terracotta">Products</Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-auto object-cover aspect-square"
          />
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-6">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl md:text-3xl font-display font-semibold text-ateaze-charcoal">
                {product.name}
              </h1>
              {product.featured && (
                <Badge className="bg-ateaze-terracotta hover:bg-ateaze-terracotta">
                  Featured
                </Badge>
              )}
            </div>

            <div className="flex items-center mt-2 mb-4">
              <div className="flex items-center mr-3">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="font-medium">{product.rating.toFixed(1)}</span>
              </div>
              {product.seller && (
                <Link to={`/sellers/${product.seller.id}`} className="text-sm text-muted-foreground hover:text-ateaze-charcoal flex items-center">
                  <User className="h-3 w-3 mr-1" /> {product.seller.name}
                </Link>
              )}
            </div>

            <p className="text-2xl font-semibold text-ateaze-terracotta mb-4">
              ${product.price.toFixed(2)}
            </p>

            <div className="prose max-w-none mb-6 text-gray-700">
              <p>{product.description}</p>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4 mb-6">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="px-3 py-1 hover:bg-gray-100"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="px-3 py-1 hover:bg-gray-100"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button 
            onClick={handleAddToCart} 
            className="w-full md:w-auto px-8 bg-ateaze-terracotta hover:bg-ateaze-terracotta/90"
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>

          {/* Shipping, Returns */}
          <div className="mt-8 pt-6 border-t">
            <Tabs defaultValue="shipping">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="returns">Returns</TabsTrigger>
              </TabsList>
              <TabsContent value="shipping" className="text-sm text-gray-700 mt-4">
                <p>This item typically ships within 2-3 business days. Standard shipping takes 3-5 days to arrive.</p>
                <p className="mt-2">Express shipping options available at checkout.</p>
              </TabsContent>
              <TabsContent value="returns" className="text-sm text-gray-700 mt-4">
                <p>We accept returns within 30 days of delivery. Item must be unused and in the same condition you received it.</p>
                <p className="mt-2">Contact our customer service team to initiate a return.</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Reviews Section Placeholder */}
      <div className="mt-12 pt-8 border-t">
        <h2 className="text-2xl font-display font-semibold text-ateaze-charcoal mb-6">
          Customer Reviews
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-muted-foreground">This product doesn't have any reviews yet.</p>
          <Button variant="outline" className="mt-4">
            Write a Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
