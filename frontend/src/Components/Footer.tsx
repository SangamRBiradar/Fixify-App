import React from "react";
import { Facebook, Instagram, Twitter, LinkedIn } from "@mui/icons-material";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="max-w-6xl mx-auto px-6">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold">YourCompany</h2>
            <p className="mt-2 text-gray-400">
              Providing the best services for you. Your satisfaction is our priority.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-blue-400">Home</a></li>
              <li><a href="/services" className="text-gray-400 hover:text-blue-400">Services</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-blue-400">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-blue-400">Contact</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold">Follow Us</h3>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-gray-400 hover:text-blue-400"><Facebook /></a>
              <a href="#" className="text-gray-400 hover:text-blue-400"><Instagram /></a>
              <a href="#" className="text-gray-400 hover:text-blue-400"><Twitter /></a>
              <a href="#" className="text-gray-400 hover:text-blue-400"><LinkedIn /></a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400">
          &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
