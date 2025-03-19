import React from 'react'

const Footer = () => {
  return (
    <div className="bg-indigo-600 text-white py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-sm">© 2025 Expense Manager. All rights reserved.</div>
        <div className="space-x-6">
          <a 
            href="/privacy-policy" 
            className="hover:text-indigo-300 transition duration-300"
          >
            Privacy Policy
          </a>
          <a 
            href="/terms-of-service" 
            className="hover:text-indigo-300 transition duration-300"
          >
            Terms of Service
          </a>
          <a 
            href="/contact" 
            className="hover:text-indigo-300 transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
