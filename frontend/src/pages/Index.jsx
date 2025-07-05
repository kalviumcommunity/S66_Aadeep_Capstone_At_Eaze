
import React from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategoryList from '@/components/CategoryList';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <CategoryList />
      
      {/* Seller CTA Section */}
      <section className="py-16 bg-ateaze-sage text-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
                Are You a Handmade Artist?
              </h2>
              <p className="text-lg mb-6">
                Join our community of talented artisans and sell your unique creations to customers who appreciate handmade quality.
              </p>
              <Button asChild variant="secondary" className="bg-white text-ateaze-sage hover:bg-gray-100">
                <Link to="/sellers/join">
                  Become a Seller
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=800" 
                  alt="Artisan working in studio" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-ateaze-charcoal mb-4">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-ateaze-cream p-6 rounded-lg">
              <p className="italic text-gray-700 mb-4">
                "I found the perfect anniversary gift for my wife on At Eaze. The craftmanship was extraordinary, and it arrived beautifully packaged."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-ateaze-terracotta rounded-full flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">John D.</h4>
                  <p className="text-sm text-gray-600">Happy Customer</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-ateaze-cream p-6 rounded-lg">
              <p className="italic text-gray-700 mb-4">
                "As a seller, I appreciate how At Eaze makes it easy to connect with customers who truly value handmade items. My sales have doubled!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-ateaze-terracotta rounded-full flex items-center justify-center text-white font-semibold">
                  SM
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">Sarah M.</h4>
                  <p className="text-sm text-gray-600">Artisan Seller</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-ateaze-cream p-6 rounded-lg">
              <p className="italic text-gray-700 mb-4">
                "The unique selection at At Eaze is unmatched. I always find something special and meaningful for everyone on my gift list."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-ateaze-terracotta rounded-full flex items-center justify-center text-white font-semibold">
                  LT
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">Lisa T.</h4>
                  <p className="text-sm text-gray-600">Repeat Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
