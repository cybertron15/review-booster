import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <QrCode size={64} className="text-purple-700 mb-6" />
      <h1 className="text-4xl font-bold text-gray-900 mb-2">404 - Page Not Found</h1>
      <p className="text-xl text-gray-600 mb-8 text-center max-w-md">
        Sorry, the QR code you scanned might be invalid or the page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-purple-700 text-white rounded-lg shadow-lg hover:bg-purple-800 transition-all duration-200 transform hover:-translate-y-1 font-medium"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;