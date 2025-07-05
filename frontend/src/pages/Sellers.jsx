
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Star, MapPin } from "lucide-react";

// Mock data for sellers
const mockSellers = [
  {
    id: '1',
    name: 'Pottery Studio',
    imageUrl: 'https://images.unsplash.com/photo-1525974160448-038dacadcc71?q=80&w=400',
    description: 'Handcrafted ceramic pieces made with love. Each piece is unique and reflects our passion for pottery.',
    rating: 4.9,
    totalReviews: 142,
    location: 'Portland, OR',
    featured: true,
    specialties: ['Ceramics', 'Pottery', 'Home Decor']
  },
  {
    id: '2',
    name: 'Woolen Crafts',
    imageUrl: 'https://images.unsplash.com/photo-1602910344079-28f5b1548add?q=80&w=400',
    description: 'Warm and cozy hand-knitted items made from ethically sourced wool and natural fibers.',
    rating: 4.7,
    totalReviews: 98,
    location: 'Seattle, WA',
    featured: true,
    specialties: ['Knitwear', 'Textiles', 'Winter Accessories']
  },
  {
    id: '3',
    name: 'WoodWorks',
    imageUrl: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=400',
    description: 'Functional and beautiful wooden items for your home. Sustainably sourced materials and traditional craftsmanship.',
    rating: 4.8,
    totalReviews: 215,
    location: 'Denver, CO',
    featured: false,
    specialties: ['Wooden Crafts', 'Home Goods', 'Furniture']
  },
  {
    id: '4',
    name: 'Textile Arts',
    imageUrl: 'https://images.unsplash.com/photo-1516117505815-b570597d27fc?q=80&w=400',
    description: 'Contemporary textile arts including macramé, wall hangings, and woven decor pieces.',
    rating: 4.6,
    totalReviews: 86,
    location: 'Austin, TX',
    featured: false,
    specialties: ['Macramé', 'Weaving', 'Wall Art']
  },
  {
    id: '5',
    name: 'Leather Goods Co.',
    imageUrl: 'https://images.unsplash.com/photo-1473646590311-c48e1bc1e1d8?q=80&w=400',
    description: 'Handmade leather accessories built to last. Timeless style meets traditional craftsmanship.',
    rating: 4.9,
    totalReviews: 177,
    location: 'Chicago, IL',
    featured: true,
    specialties: ['Leather Goods', 'Accessories', 'Bags']
  },
  {
    id: '6',
    name: 'Soap & Candle Studio',
    imageUrl: 'https://images.unsplash.com/photo-1608376626114-27cdda489ecc?q=80&w=400',
    description: 'Artisanal soaps and candles made with natural ingredients. Each scent tells a unique story.',
    rating: 4.7,
    totalReviews: 124,
    location: 'Nashville, TN',
    featured: false,
    specialties: ['Soap Making', 'Candles', 'Bath Products']
  },
];

const Sellers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const filteredSellers = mockSellers.filter(seller =>
    seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    seller.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    seller.specialties.some(specialty => specialty.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedSellers = [...filteredSellers].sort((a, b) => {
    switch(sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.totalReviews - a.totalReviews;
      case 'featured':
      default:
        return b.featured ? 1 : a.featured ? -1 : 0;
    }
  });

  return (
    <div className="min-h-screen bg-ateaze-cream py-12">
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-display font-semibold text-ateaze-charcoal mb-2">
          Meet Our Sellers
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mb-8">
          Discover talented artisans and craftspeople from around the world who bring their unique creations to At Eaze.
        </p>

        {/* Search and Sort Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search sellers by name or specialty..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="reviews">Most Reviews</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Seller Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedSellers.map(seller => (
            <Card key={seller.id} className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={seller.imageUrl} 
                  alt={seller.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {seller.featured && (
                  <div className="absolute top-0 right-0 bg-ateaze-terracotta text-white text-xs px-3 py-1">
                    Featured
                  </div>
                )}
              </div>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-semibold text-xl">{seller.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">{seller.rating}</span>
                    <span className="text-xs text-muted-foreground ml-1">({seller.totalReviews})</span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{seller.location}</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3 mb-3">{seller.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {seller.specialties.map((specialty, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      {specialty}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-5 pt-0">
                <Button asChild variant="outline" className="w-full">
                  <Link to={`/sellers/${seller.id}`}>
                    View Shop
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {sortedSellers.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No sellers found</h3>
            <p className="text-gray-600">Try a different search term</p>
          </div>
        )}

        {/* Become a Seller CTA */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-display font-semibold text-ateaze-charcoal mb-2">
                Are You a Handmade Creator?
              </h2>
              <p className="text-gray-600 mb-4 md:mb-0">
                Join our community of talented artisans and start selling your creations today.
              </p>
            </div>
            <Button asChild size="lg" className="px-6">
              <Link to="/sellers/join">
                Become a Seller
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sellers;
