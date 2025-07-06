import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import FileUpload from "@/components/ui/file-upload";
import { uploadMultipleFiles } from "@/lib/api";

const sellerFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  website: z.string().optional(),
  category: z.string({
    required_error: "Please select a primary category.",
  }),
  experience: z.string({
    required_error: "Please select your experience level.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions." }),
  }),
});

const SellWithUs = () => {
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(sellerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      businessName: "",
      website: "",
      description: "",
      termsAccepted: false,
    },
  });

  async function onSubmit(data) {
    try {
      setIsSubmitting(true);
      // Show loading state
      toast({
        title: "Submitting application...",
        description: "Please wait while we process your application.",
      });

      let imageUrls = [];

      // Upload files if any are selected
      if (uploadedFiles.length > 0) {
        try {
          const uploadResult = await uploadMultipleFiles(
            uploadedFiles,
            "seller-application"
          );
          imageUrls = uploadResult.urls;
        } catch (error) {
          toast({
            title: "Upload Error",
            description: `Failed to upload images: ${error.message}`,
            variant: "destructive",
          });
          return;
        }
      }

      // Prepare application data with uploaded image URLs
      const applicationData = {
        ...data,
        images: imageUrls,
        submittedAt: new Date().toISOString(),
      };

      // Submit application to backend
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000/api"
        }/vendors/applications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(applicationData),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit application");
      }

      // Success
      toast({
        title: "Application submitted successfully!",
        description:
          "We'll review your application and get back to you within 2-3 business days.",
      });

      // Reset form
      form.reset();
      setUploadedFiles([]);
    } catch (error) {
      console.error("Application submission error:", error);
      toast({
        title: "Submission failed",
        description:
          error.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-ateaze-cream py-12">
      <div className="container">
        <Button variant="ghost" className="flex items-center mb-6" asChild>
          <Link to="/become-a-seller">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Seller Information
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h1 className="text-2xl md:text-3xl font-display font-semibold text-ateaze-charcoal mb-6">
                  Apply to Become a Seller
                </h1>
                <p className="text-gray-600 mb-6">
                  Complete the following form to apply for a seller account.
                  We'll review your application and get back to you within 2-3
                  business days.
                </p>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <h2 className="text-xl font-display font-medium text-ateaze-charcoal">
                        Personal Information
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Jane Doe" {...field} />
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
                                <Input
                                  placeholder="jane@example.com"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="(555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-xl font-display font-medium text-ateaze-charcoal">
                        Business Information
                      </h2>
                      <FormField
                        control={form.control}
                        name="businessName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business/Shop Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Jane's Handmade Crafts"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Website/Social Media (Optional)
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://www.example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Share your existing website or social media
                              profiles where you showcase your work.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Primary Category</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="jewelry">
                                    Jewelry
                                  </SelectItem>
                                  <SelectItem value="home_decor">
                                    Home Decor
                                  </SelectItem>
                                  <SelectItem value="pottery">
                                    Pottery & Ceramics
                                  </SelectItem>
                                  <SelectItem value="paper_crafts">
                                    Paper Crafts
                                  </SelectItem>
                                  <SelectItem value="candles">
                                    Candles & Soaps
                                  </SelectItem>
                                  <SelectItem value="textiles">
                                    Textiles & Fiber Arts
                                  </SelectItem>
                                  <SelectItem value="woodworking">
                                    Woodworking
                                  </SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="experience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Experience Level</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select experience level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="beginner">
                                    Just Starting Out (0-1 years)
                                  </SelectItem>
                                  <SelectItem value="intermediate">
                                    Growing Business (1-3 years)
                                  </SelectItem>
                                  <SelectItem value="experienced">
                                    Established Artisan (3+ years)
                                  </SelectItem>
                                  <SelectItem value="professional">
                                    Professional Crafts Business
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Tell us about your products and crafting process
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe what you make, your creative process, and what makes your products unique..."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-xl font-display font-medium text-ateaze-charcoal">
                        Product Photos
                      </h2>
                      <FileUpload
                        multiple={true}
                        accept="image/*"
                        maxFiles={5}
                        maxSize={5 * 1024 * 1024} // 5MB
                        value={uploadedFiles}
                        onChange={setUploadedFiles}
                        onError={(errors) => {
                          toast({
                            title: "Upload Error",
                            description: errors.join(", "),
                            variant: "destructive",
                          });
                        }}
                      />
                      <p className="text-sm text-muted-foreground">
                        Upload photos of your products to help us understand
                        your craft
                      </p>
                    </div>

                    <FormField
                      control={form.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I agree to the{" "}
                              <Link
                                to="/terms"
                                className="text-ateaze-terracotta hover:underline"
                              >
                                Terms of Service
                              </Link>{" "}
                              and{" "}
                              <Link
                                to="/privacy"
                                className="text-ateaze-terracotta hover:underline"
                              >
                                Privacy Policy
                              </Link>
                            </FormLabel>
                            <FormDescription>
                              By submitting this application, you agree to our
                              seller guidelines and policies.
                            </FormDescription>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end">
                      <Button type="submit" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-24">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-display font-medium text-ateaze-charcoal mb-4">
                    What Happens Next?
                  </h2>
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="mr-4 bg-ateaze-cream p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                        <span className="font-medium text-ateaze-charcoal">
                          1
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">Application Review</h3>
                        <p className="text-sm text-gray-600">
                          Our team reviews your application and product photos
                          (2-3 business days).
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="mr-4 bg-ateaze-cream p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                        <span className="font-medium text-ateaze-charcoal">
                          2
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">Approval & Onboarding</h3>
                        <p className="text-sm text-gray-600">
                          If approved, you'll receive an email with next steps
                          to set up your shop.
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="mr-4 bg-ateaze-cream p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                        <span className="font-medium text-ateaze-charcoal">
                          3
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">Create Your Shop</h3>
                        <p className="text-sm text-gray-600">
                          Set up your seller profile, add products, and
                          configure shipping options.
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="mr-4 bg-ateaze-cream p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                        <span className="font-medium text-ateaze-charcoal">
                          4
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">Start Selling!</h3>
                        <p className="text-sm text-gray-600">
                          Launch your shop and start reaching customers who love
                          handmade items.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-display font-medium text-ateaze-charcoal mb-4">
                    Seller Requirements
                  </h2>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        All products must be handmade or handcrafted
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Clear, high-quality product photography
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Detailed and accurate product descriptions
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Ability to ship products safely and on time
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Responsive communication with customers
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-display font-medium text-ateaze-charcoal mb-4">
                    Need Help?
                  </h2>
                  <p className="text-gray-700 mb-4">
                    If you have questions about the application process or
                    seller requirements, our team is here to help.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/contact">Contact Seller Support</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellWithUs;
