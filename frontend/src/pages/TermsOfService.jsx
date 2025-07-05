
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-ateaze-cream py-12">
      <div className="container max-w-4xl">
        <Button variant="ghost" className="flex items-center mb-6" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-display font-semibold text-ateaze-charcoal mb-6">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500 mb-6">Last Updated: May 20, 2025</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-display font-medium text-ateaze-charcoal mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing and using the At Eaze website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-medium text-ateaze-charcoal mb-3">2. Use of Services</h2>
              <p className="text-gray-700 mb-3">
                At Eaze provides an online marketplace connecting sellers of handmade goods with buyers. You may use our services only as permitted by these terms and any applicable laws or regulations.
              </p>
              <p className="text-gray-700">
                You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account or any other breach of security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-medium text-ateaze-charcoal mb-3">3. User Accounts</h2>
              <p className="text-gray-700 mb-3">
                To access certain features of our platform, you may be required to register for an account. When registering, you must provide accurate and complete information. You are solely responsible for the activity that occurs on your account.
              </p>
              <p className="text-gray-700">
                You may not use another user's account without permission. You must notify us immediately of any breach of security or unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-medium text-ateaze-charcoal mb-3">4. Seller Terms</h2>
              <p className="text-gray-700 mb-3">
                If you register as a seller on our platform, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Provide accurate and complete information about your products</li>
                <li>Set fair and transparent prices for your products</li>
                <li>Fulfill orders promptly and professionally</li>
                <li>Communicate with buyers in a timely manner</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Pay all applicable fees and commissions</li>
              </ul>
              <p className="text-gray-700 mt-3">
                At Eaze reserves the right to remove any product listings that violate these terms or our community guidelines.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-medium text-ateaze-charcoal mb-3">5. Buyer Terms</h2>
              <p className="text-gray-700 mb-3">
                If you use our platform as a buyer, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Provide accurate and complete payment information</li>
                <li>Pay for products purchased through our platform</li>
                <li>Communicate with sellers in a respectful manner</li>
                <li>Not engage in fraudulent or deceptive activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-medium text-ateaze-charcoal mb-3">6. Intellectual Property</h2>
              <p className="text-gray-700 mb-3">
                The content on the At Eaze platform, including text, graphics, logos, images, and software, is the property of At Eaze or its licensors and is protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p className="text-gray-700">
                Sellers retain ownership of the intellectual property rights in their product listings and content. By posting content on our platform, sellers grant At Eaze a non-exclusive, worldwide, royalty-free license to use, display, and distribute that content in connection with our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-medium text-ateaze-charcoal mb-3">7. Prohibited Activities</h2>
              <p className="text-gray-700 mb-3">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Use our services for any illegal purpose</li>
                <li>Violate any laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Interfere with or disrupt our services</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Collect or harvest user data without permission</li>
                <li>Impersonate another person or entity</li>
                <li>Post false, misleading, or deceptive content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-medium text-ateaze-charcoal mb-3">8. Limitation of Liability</h2>
              <p className="text-gray-700">
                To the maximum extent permitted by law, At Eaze and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from or in connection with your use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-medium text-ateaze-charcoal mb-3">9. Governing Law</h2>
              <p className="text-gray-700">
                These Terms of Service shall be governed by and construed in accordance with the laws of the state of [State], without regard to its conflict of law provisions. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in [State].
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-medium text-ateaze-charcoal mb-3">10. Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify these Terms of Service at any time. We will notify users of any changes by posting the new terms on this page and updating the "Last Updated" date. Your continued use of our services after such changes constitutes your acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-medium text-ateaze-charcoal mb-3">11. Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-3">
                <p className="text-gray-700">Email: legal@ateaze.com</p>
                <p className="text-gray-700">Phone: (555) 123-4567</p>
                <p className="text-gray-700">Address: 123 Craft Lane, Artisan City, AC 12345</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
