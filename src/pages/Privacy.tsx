import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, Lock, Eye, Database, Bell, Globe, UserCheck, FileCheck } from 'lucide-react';

interface PolicySectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const PolicySection: React.FC<PolicySectionProps> = ({ title, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-[#f5f3f0] hover:bg-[#e8e2db] rounded-lg"
      >
        <div className="flex items-center space-x-3">
          {icon}
          <span className="font-semibold text-lg text-[#4b2e2e]">{title}</span>
        </div>
        {isOpen ? <ChevronUp className="h-5 w-5 text-[#4b2e2e]" /> : <ChevronDown className="h-5 w-5 text-[#4b2e2e]" />}
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-[#e8e2db] rounded-b-lg">
          {children}
        </div>
      )}
    </div>
  );
};

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#ece7e2] py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-[#d3b7a1] rounded-full mb-4">
            <Shield className="h-8 w-8 text-[#4b2e2e]" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-[#4b2e2e]">Privacy Policy</h1>
          <p className="text-[#6d4c41]">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-[#f5f3f0] p-6 rounded-lg shadow-sm mb-8">
          <p className="text-[#6d4c41] leading-relaxed">
            At Muxa Academy, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, 
            and safeguard your information when you visit our website or use our services. Please read this privacy policy 
            carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-6">
          <PolicySection title="Information We Collect" icon={<Database className="h-6 w-6 text-[#4b2e2e]" />}>
            <ul className="list-disc pl-6 space-y-3 text-[#6d4c41]">
              <li>Personal identification information (Name, email address, phone number, etc.)</li>
              <li>Educational background and academic records</li>
              <li>Payment information and transaction history</li>
              <li>Device information and usage data</li>
              <li>Communication preferences and course interests</li>
            </ul>
          </PolicySection>

          <PolicySection title="How We Use Your Information" icon={<Eye className="h-6 w-6 text-[#4b2e2e]" />}>
            <ul className="list-disc pl-6 space-y-3 text-[#6d4c41]">
              <li>To provide and maintain our educational services</li>
              <li>To process your payments and enrollment</li>
              <li>To send administrative information and updates</li>
              <li>To improve our website and services</li>
              <li>To personalize your learning experience</li>
              <li>To communicate about new courses and programs</li>
            </ul>
          </PolicySection>

          <PolicySection title="Data Security" icon={<Lock className="h-6 w-6 text-[#4b2e2e]" />}>
            <div className="space-y-4 text-[#6d4c41]">
              <p>
                We implement appropriate technical and organizational security measures to protect your personal data against 
                accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access. These measures include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and penetration testing</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Regular staff training on data protection</li>
              </ul>
            </div>
          </PolicySection>

          <PolicySection title="Cookies and Tracking" icon={<Globe className="h-6 w-6 text-[#4b2e2e]" />}>
            <div className="space-y-4 text-[#6d4c41]">
              <p>
                We use cookies and similar tracking technologies to track activity on our website and store certain information. 
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
              <p>We use cookies for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Understanding and saving user preferences</li>
                <li>Keeping track of advertisements</li>
                <li>Compiling aggregate data about site traffic</li>
                <li>Improving our website and services</li>
              </ul>
            </div>
          </PolicySection>

          <PolicySection title="Your Rights" icon={<UserCheck className="h-6 w-6 text-[#4b2e2e]" />}>
            <ul className="list-disc pl-6 space-y-3 text-[#6d4c41]">
              <li>Right to access your personal data</li>
              <li>Right to rectify inaccurate information</li>
              <li>Right to erasure ('right to be forgotten')</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
            </ul>
          </PolicySection>

          <PolicySection title="Communications" icon={<Bell className="h-6 w-6 text-[#4b2e2e]" />}>
            <div className="space-y-4 text-[#6d4c41]">
              <p>
                By enrolling in our courses or subscribing to our newsletter, you agree to receive:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Course-related communications and updates</li>
                <li>Administrative notifications</li>
                <li>Marketing communications (with option to opt-out)</li>
                <li>Important announcements about our services</li>
              </ul>
            </div>
          </PolicySection>

          <PolicySection title="Updates to This Policy" icon={<FileCheck className="h-6 w-6 text-[#4b2e2e]" />}>
            <div className="space-y-4 text-[#6d4c41]">
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
              </p>
              <p>
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy 
                are effective when they are posted on this page.
              </p>
            </div>
          </PolicySection>
        </div>

        {/* Contact Information */}
        <div className="mt-12 bg-[#f5f3f0] p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-[#4b2e2e]">Contact Us</h2>
          <p className="text-[#6d4c41]">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="mt-4 space-y-2 text-[#6d4c41]">
            <li>Email: privacy@muxaacademy.com</li>
            <li>Phone: +1 234 567 890</li>
            <li>Address: 123 Education Street, Learning City, LC 12345</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
