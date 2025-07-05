
import React from 'react';
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

const ContactUs = () => {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(data) {
    console.log(data);
    // In a real app, this would send the data to your backend
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you as soon as possible.",
    });
    form.reset();
  }

  return (
    <div className="min-h-screen bg-ateaze-cream py-12">
      <div className="container">
        <Button variant="ghost" className="flex items-center mb-6" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <h1 className="text-3xl md:text-4xl font-display font-semibold text-ateaze-charcoal mb-2">
          Contact Us
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mb-8">
          We'd love to hear from you! Whether you have a question about our platform, need help with an order, or want to join as a seller, our team is ready to assist you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-display font-medium text-ateaze-charcoal mb-6">Send Us a Message</h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="How can we help you?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please provide details about your inquiry..." 
                              className="min-h-[150px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end">
                      <Button type="submit" size="lg">Send Message</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <h2 className="text-2xl font-display font-medium text-ateaze-charcoal mb-6">Contact Information</h2>
                
                <div className="space-y-8 flex-grow">
                  <div className="flex items-start">
                    <div className="bg-ateaze-cream p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-ateaze-terracotta" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Our Office</h3>
                      <p className="text-gray-600">
                        123 Craft Lane<br />
                        Artisan City, AC 12345<br />
                        United States
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-ateaze-cream p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-ateaze-terracotta" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email Us</h3>
                      <p className="text-gray-600">
                        General Inquiries: <a href="mailto:hello@ateaze.com" className="text-ateaze-terracotta hover:underline">hello@ateaze.com</a><br />
                        Seller Support: <a href="mailto:sellers@ateaze.com" className="text-ateaze-terracotta hover:underline">sellers@ateaze.com</a><br />
                        Customer Support: <a href="mailto:support@ateaze.com" className="text-ateaze-terracotta hover:underline">support@ateaze.com</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-ateaze-cream p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-ateaze-terracotta" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Call Us</h3>
                      <p className="text-gray-600">
                        Toll-Free: <a href="tel:+18001234567" className="text-ateaze-terracotta hover:underline">(800) 123-4567</a><br />
                        International: <a href="tel:+15551234567" className="text-ateaze-terracotta hover:underline">+1 (555) 123-4567</a>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h3 className="font-medium mb-3">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                    Saturday: 10:00 AM - 4:00 PM EST<br />
                    Sunday: Closed
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-display font-medium text-ateaze-charcoal mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "How do I track my order?",
                answer: "You can track your order by logging into your account and navigating to the Orders section. There, you'll find tracking information for all your recent purchases."
              },
              {
                question: "What is your return policy?",
                answer: "Our return policy varies by seller. Generally, handmade items can be returned within 14 days if they arrive damaged or don't match the description. Check the specific seller's policy on their shop page."
              },
              {
                question: "How do I become a seller?",
                answer: "To become a seller, visit our Sell with Us page and follow the registration process. You'll need to provide information about yourself and your handmade products."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept major credit cards, PayPal, and Apple Pay. All payments are securely processed through our payment partners."
              }
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
      </div>
    </div>
  );
};

export default ContactUs;
