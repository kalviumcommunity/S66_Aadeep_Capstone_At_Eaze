
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PrivacyPolicy = () => {
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
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500 mb-6">Last Updated: May 20, 2025</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-display font-medium text-ateaze-charcoal mb-3">1. Introduction</h2>
              <p className="text-gray-700 mb-3">
                At Eaze ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and protect your information when you visit our website or use our services.
              </p>
              <p className="text-gray-700">
                Please read this privacy policy carefully. By using our website and services, you acknowledge that you have read and understood this policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-medium text-ateaze-charcoal mb-3">2. Information We Collect</h2>
              <p className="text-gray-700 mb-3">
                We collect personal information that you provide directly to us when you register for an account, create or modify your profile, make a purchase, contact customer support, or otherwise communicate with us.
              </p>
              <p className="text-gray-700 mb-3">
                The personal information we collect may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Contact information (name, email address, phone number, shipping and billing address)</li>
                <li>Account information (username, password)</li>
                <li>Payment information (credit card details, bank account information)</li>
                <li>Profile information (profile picture, bio, preferences)</li>
                <li>Transaction information (products purchased, order history)</li>
                <li>Communications (messages sent to us through our platform)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-medium text-ateaze-charcoal mb-3">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-3">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Providing and improving our services</li>
                <li>Processing transactions and fulfilling orders</li>
                <li>Communicating with you about your account, orders, and our services</li>
                <li>Personalizing your experience on our platform</li>
                <li>Sending marketing communications (with your consent)</li>
                <li>Responding to your inquiries and providing customer support</li>
                <li>Ensuring the security and integrity of our platform</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-medium text-ateaze-charcoal mb-3">4. Sharing Your Information</h2>
              <p className="text-gray-700 mb-3">
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>With sellers on our platform to fulfill orders and provide services</li>
                <li>With service providers who perform services on our behalf</li>
                <li>With third-party payment processors to process transactions</li>
                <li>If required by law or to respond to legal process</li>
                <li>To protect our rights, property, or safety, or the rights, property, or safety of others</li>
                <li>In connection with a business transaction, such as a merger or acquisition</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-medium text-ateaze-charcoal mb-3">5. Your Rights and Choices</h2>
              <p className="text-gray-700 mb-3">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Accessing your personal information</li>
                <li>Correcting inaccurate information</li>
                <li>Deleting your personal information</li>
                <li>Restricting or objecting to processing</li>
                <li>Data portability</li>
                <li>Withdrawing consent</li>
              </ul>
              <p className="text-gray-700 mt-3">
                To exercise these rights, please contact us using the information provided in the "Contact Us" section.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-medium text-ateaze-charcoal mb-3">6. Data Security</h2>
              <p className="text-gray-700">
                We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-medium text-ateaze-charcoal mb-3">7. Changes to This Privacy Policy</h2>
              <p className="text-gray-700">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date. We encourage you to review this privacy policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-medium text-ateaze-charcoal mb-3">8. Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions or concerns about this privacy policy or our data practices, please contact us at:
              </p>
              <div className="mt-3">
                <p className="text-gray-700">Email: privacy@ateaze.com</p>
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

export default PrivacyPolicy;
