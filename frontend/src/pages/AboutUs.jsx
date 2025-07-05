
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-ateaze-cream py-12">
      <div className="container">
        <Button variant="ghost" className="flex items-center mb-6" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <h1 className="text-3xl md:text-4xl font-display font-semibold text-ateaze-charcoal mb-6">
          About At Eaze
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-display font-medium text-ateaze-charcoal">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              At Eaze was founded in 2023 with a simple mission: to connect talented artisans with those seeking unique, handmade gifts. We believe that behind every handcrafted item is a story, a passion, and a maker who deserves a platform to share their creations with the world.
            </p>
            <p className="text-gray-700 leading-relaxed">
              In a world of mass production, we stand for authenticity, craftsmanship, and the personal touch that only handmade items can provide. Our marketplace is built on the belief that both creators and customers deserve a space where handmade gifts are celebrated and valued.
            </p>
          </div>

          <div className="rounded-lg overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=800" 
              alt="Craftsperson working in studio" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm mb-12">
          <h2 className="text-2xl font-display font-medium text-ateaze-charcoal mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="text-xl font-display font-medium text-ateaze-terracotta">Craftsmanship</h3>
              <p className="text-gray-700">
                We celebrate the skill, dedication, and creativity that goes into every handmade item. Each piece tells a story of its maker.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-display font-medium text-ateaze-terracotta">Community</h3>
              <p className="text-gray-700">
                We're building a community where artisans can thrive and customers can discover the perfect handmade treasures.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-display font-medium text-ateaze-terracotta">Sustainability</h3>
              <p className="text-gray-700">
                We support sustainable practices and encourage our sellers to use eco-friendly materials and methods whenever possible.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-display font-medium text-ateaze-charcoal mb-6">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Emma Reynolds",
                role: "Founder & CEO",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300"
              },
              {
                name: "Michael Chen",
                role: "Head of Operations",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300"
              },
              {
                name: "Sarah Johnson",
                role: "Seller Relations",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300"
              },
              {
                name: "David Kim",
                role: "Marketing Director",
                image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=300"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm transition-transform hover:scale-105">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full aspect-square object-cover"
                />
                <div className="p-4">
                  <h3 className="font-display font-medium text-lg">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-display font-medium text-ateaze-charcoal mb-6">Join Our Journey</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            At Eaze is more than just a marketplace—it's a movement toward appreciating the value of handmade goods in our lives. We invite you to join us, whether you're a talented artisan looking to share your creations or a discerning shopper seeking something truly special.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild>
              <Link to="/sellers/join">Become a Seller</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
