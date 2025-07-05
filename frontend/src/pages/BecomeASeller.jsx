
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, ShoppingBag, Palette, BadgePercent, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const BecomeASeller = () => {
  const benefits = [
    {
      title: "Access to a Growing Marketplace",
      description: "Reach thousands of customers looking specifically for handmade, artisan products.",
      icon: ShoppingBag
    },
    {
      title: "Creative Freedom",
      description: "Showcase your unique style and craftsmanship with full control over your product listings.",
      icon: Palette
    },
    {
      title: "Low Commission Rates",
      description: "Keep more of what you earn with our seller-friendly commission structure.",
      icon: BadgePercent
    },
    {
      title: "Seamless Payment Processing",
      description: "Get paid quickly and securely through our integrated payment system.",
      icon: CreditCard
    }
  ];

  const testimonials = [
    {
      quote: "Joining At Eaze was the best decision for my small pottery business. The platform is so easy to use, and I've reached customers I never would have found otherwise.",
      author: "Emma J.",
      business: "Ceramic Studio Co.",
      image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=300"
    },
    {
      quote: "As a jewelry maker, I appreciate how At Eaze showcases handmade items. My sales have doubled since I started selling here a year ago!",
      author: "Michael T.",
      business: "Silver & Stone Designs",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300"
    },
    {
      quote: "The seller tools at At Eaze make it easy to manage my inventory and track sales. I can focus on creating rather than administration.",
      author: "Sarah L.",
      business: "Fiber Art Collective",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300"
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Register as a Seller",
      description: "Create your seller account and provide information about your craft."
    },
    {
      step: 2,
      title: "Set Up Your Shop",
      description: "Customize your shop profile and add your handmade products."
    },
    {
      step: 3,
      title: "Start Selling",
      description: "Publish your listings and start receiving orders from customers."
    },
    {
      step: 4,
      title: "Grow Your Business",
      description: "Use our tools and insights to expand your reach and increase sales."
    }
  ];

  return (
    <div className="min-h-screen bg-ateaze-cream">
      {/* Hero Section */}
      <div className="relative bg-ateaze-charcoal text-white">
        <div className="container py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Button variant="ghost" className="mb-6 text-white" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <h1 className="text-3xl md:text-5xl font-display font-bold mb-6">
                Share Your Craft With The World
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-300">
                Join our community of artisans and start selling your handmade creations to customers who value craftsmanship.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-ateaze-terracotta hover:bg-ateaze-terracotta/90">
                  <Link to="/sellers/join">
                    Start Selling Today
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-ateaze-charcoal" asChild>
                  <Link to="/contact">
                    Contact Sales
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556760544-74068565f05c?q=80&w=800" 
                alt="Artisan at work"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-ateaze-charcoal mb-4">
            Why Sell on At Eaze?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join thousands of artisans who have found success sharing their handmade creations with customers who appreciate quality craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-white border-0 transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="bg-ateaze-cream p-3 rounded-full inline-flex mb-4">
                  <benefit.icon className="h-6 w-6 text-ateaze-terracotta" />
                </div>
                <h3 className="text-xl font-display font-medium text-ateaze-charcoal mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-ateaze-charcoal mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Getting started as a seller on At Eaze is simple. Follow these steps to launch your handmade shop.
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {howItWorks.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="bg-ateaze-terracotta text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-display font-medium text-ateaze-charcoal mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-ateaze-terracotta hover:bg-ateaze-terracotta/90">
              <Link to="/sellers/join">
                Start Your Seller Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-ateaze-charcoal mb-4">
            Hear From Our Sellers
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover why artisans choose At Eaze as their platform for sharing their craft.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white border-0 transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                  </div>
                  <div className="mt-auto flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author} 
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <p className="font-medium text-ateaze-charcoal">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.business}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Fee Structure Section */}
      <div className="bg-white py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-ateaze-charcoal mb-4">
                Transparent Pricing
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We believe in fair and transparent pricing that allows artisans to keep more of what they earn.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Low Commission Rate</h3>
                    <p className="text-gray-600">Just 8% commission on each sale - well below industry standard.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">No Hidden Fees</h3>
                    <p className="text-gray-600">No listing fees, no monthly fees, no setup fees.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Transparent Payment Processing</h3>
                    <p className="text-gray-600">Standard payment processing fee of 2.9% + $0.30 per transaction.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">Fast Payouts</h3>
                    <p className="text-gray-600">Receive your earnings within 3 business days of a completed sale.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-ateaze-cream p-8 rounded-lg">
              <h3 className="text-2xl font-display font-medium text-ateaze-charcoal mb-4">
                Example Sale Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-200 pb-3">
                  <span className="font-medium">Product Price</span>
                  <span className="font-medium">$100.00</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-3">
                  <span className="text-gray-600">At Eaze Commission (8%)</span>
                  <span className="text-gray-600">-$8.00</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-3">
                  <span className="text-gray-600">Payment Processing (2.9% + $0.30)</span>
                  <span className="text-gray-600">-$3.20</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold text-lg">You Receive</span>
                  <span className="font-bold text-lg text-green-600">$88.80</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-600 text-sm">
                  *This is an example breakdown. Actual amounts may vary based on specific transaction details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-ateaze-charcoal mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Got questions about selling on At Eaze? Find answers to common questions below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              question: "What types of products can I sell on At Eaze?",
              answer: "At Eaze specializes in handmade and artisanal products. This includes but is not limited to jewelry, home decor, artwork, clothing, accessories, bath and body products, and food items. All products must be handmade by you or your small business."
            },
            {
              question: "How do I get paid for my sales?",
              answer: "When a customer makes a purchase, the funds are securely processed through our payment system. After the order is marked as shipped, the payment (minus our commission and processing fees) will be transferred to your connected bank account within 3 business days."
            },
            {
              question: "Can I sell internationally?",
              answer: "Yes! At Eaze supports international selling. You can specify which countries you're willing to ship to in your shop settings. You'll also be able to set different shipping rates for different regions."
            },
            {
              question: "How do I handle shipping and returns?",
              answer: "As a seller, you're responsible for shipping your products to customers. You can set your own shipping rates and policies. For returns, you can establish your own return policy, which will be displayed on your shop page. We recommend having a clear, fair return policy to build customer trust."
            },
            {
              question: "What support does At Eaze provide to sellers?",
              answer: "We provide a range of resources to help you succeed, including a comprehensive seller handbook, access to our seller community forum, monthly webinars on business growth, and dedicated seller support via email. We also offer tools to help manage your inventory, process orders, and track your performance."
            },
            {
              question: "Can I sell both online and in physical stores?",
              answer: "Absolutely! Many of our sellers maintain both an online presence on At Eaze and sell through other channels like craft fairs, local markets, or their own physical stores. There are no exclusivity requirements when you sell on our platform."
            },
          ].map((faq, index) => (
            <Card key={index} className="transition-all hover:shadow-md">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium text-ateaze-charcoal mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-ateaze-charcoal text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
            Ready to Share Your Craft?
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Join thousands of artisans who are already growing their business on At Eaze.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-ateaze-terracotta hover:bg-ateaze-terracotta/90">
              <Link to="/sellers/join">
                Start Selling Today
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-ateaze-charcoal" asChild>
              <Link to="/contact">
                Contact Us with Questions
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeASeller;
