import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
// import { Product } from '@/lib/data';
import { Star } from "lucide-react";


const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group">
        <div className="aspect-[4/3] overflow-hidden relative">
          {product.featured && (
            <Badge className="absolute top-2 left-2 z-10 bg-ateaze-terracotta hover:bg-ateaze-terracotta">
              Featured
            </Badge>
          )}
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-base md:text-lg line-clamp-1">
              {product.name}
            </h3>
            <span className="font-semibold text-ateaze-terracotta">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
            {product.description}
          </p>
          <div className="flex items-center mt-2 text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
