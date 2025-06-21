import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white text-gray-800 px-6 py-12 max-w-5xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-6">
        Privacy Policy
      </h1>

      <p className="text-lg mb-4">
        At <span className="font-semibold text-blue-600">TechMart</span>, your
        privacy is very important to us. This Privacy Policy explains how we
        collect, use, and protect your information when you use our website.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700 mt-8 mb-3">
        1. Information We Collect
      </h2>
      <p className="text-base mb-3">
        We may collect the following information:
      </p>
      <ul className="list-disc list-inside text-base space-y-1 pl-2 text-gray-700">
        <li>Personal details like name, email address, and phone number</li>
        <li>Shipping and billing address</li>
        <li>Payment information</li>
        <li>Device and browser information</li>
      </ul>

      <h2 className="text-2xl font-semibold text-indigo-700 mt-8 mb-3">
        2. How We Use Your Information
      </h2>
      <ul className="list-disc list-inside text-base space-y-1 pl-2 text-gray-700">
        <li>To process your orders and provide customer service</li>
        <li>To personalize your experience on TechMart</li>
        <li>To send order updates, offers, and newsletters (if opted in)</li>
        <li>To improve website performance and security</li>
      </ul>

      <h2 className="text-2xl font-semibold text-indigo-700 mt-8 mb-3">
        3. Data Protection
      </h2>
      <p className="text-base mb-3">
        We use secure technologies and procedures to protect your personal data
        from unauthorized access, misuse, or disclosure.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700 mt-8 mb-3">
        4. Cookies
      </h2>
      <p className="text-base mb-3">
        We use cookies to enhance your browsing experience. You can manage
        cookie preferences through your browser settings.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700 mt-8 mb-3">
        5. Your Rights
      </h2>
      <p className="text-base mb-3">
        You have the right to access, update, or delete your personal data.
        Contact us at{" "}
        <a
          href="mailto:support@techmart.com"
          className="text-blue-600 font-medium underline"
        >
          support@techmart.com
        </a>{" "}
        for any privacy-related requests.
      </p>

      <h2 className="text-2xl font-semibold text-indigo-700 mt-8 mb-3">
        6. Updates to this Policy
      </h2>
      <p className="text-base mb-3">
        TechMart may update this Privacy Policy from time to time. We recommend
        reviewing this page regularly.
      </p>

      <p className="text-base mt-8 text-gray-700 italic">
        Last updated: June 2025
      </p>
    </div>
  );
};

export default PrivacyPolicy;
