
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-ateaze-cream pt-12 pb-20 lg:py-24">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-ateaze-charcoal mb-6 leading-tight">
              Discover Unique <span className="text-ateaze-terracotta">Handcrafted</span> Gifts
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg mx-auto lg:mx-0">
              At Eaze connects you with talented artisans creating one-of-a-kind treasures for your loved ones.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Button asChild className="bg-ateaze-terracotta hover:bg-ateaze-terracotta/90 text-lg px-8 py-6">
                <Link to="/products">
                  Shop Now
                </Link>
              </Button>
              <Button asChild variant="outline" className="text-lg px-8 py-6">
                <Link to="/sellers/join">
                  Become a Seller
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1618220048045-10a6dbdf83e0?q=80&w=1080" 
                alt="Beautiful handmade pottery and crafts" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden lg:block absolute -bottom-12 -left-12 w-48 h-48 bg-ateaze-sage rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1495121605193-b116b5b9c5fe?q=80&w=200" 
                alt="Handmade jewelry" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-8 -right-4 md:-right-12 w-32 h-32 bg-white p-4 rounded-full shadow-xl flex items-center justify-center">
              <div className="text-center">
                <span className="block text-ateaze-terracotta font-display text-xl font-semibold">100%</span>
                <span className="block text-ateaze-charcoal text-sm">Handmade</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-40"></div>
    </section>
  );
};

export default Hero;
