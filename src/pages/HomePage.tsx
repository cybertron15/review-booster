import React from 'react';
import { Link } from 'react-router-dom';
import { Star, QrCode, Mail, ThumbsUp } from 'lucide-react';
import { useReview } from '../contexts/ReviewContext';
import LoadingSpinner from '../components/LoadingSpinner';

const HomePage: React.FC = () => {
  const { restaurants, isLoading } = useReview();
  
  // Update page title
  React.useEffect(() => {
    document.title = 'Restaurant Review System';
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <header className="w-full py-6 bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <QrCode size={32} className="text-purple-700" />
              <h1 className="ml-2 text-2xl font-bold text-gray-800">ReviewBoost</h1>
            </div>
            <Link 
              to="/admin" 
              className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-medium"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Boost Your Restaurant Reviews & Build Your Email List
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Turn happy customers into vocal advocates with our simple QR code system. 
            Collect valuable feedback and email addresses while encouraging positive Google reviews.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <Link
              to="/demo"
              className="px-6 py-3 bg-purple-700 text-white rounded-lg shadow-lg hover:bg-purple-800 transition-all duration-200 transform hover:-translate-y-1 font-medium"
            >
              Try Demo
            </Link>
            <a
              href="#how-it-works"
              className="px-6 py-3 bg-white text-purple-700 border border-purple-700 rounded-lg shadow-lg hover:bg-purple-50 transition-all duration-200 transform hover:-translate-y-1 font-medium"
            >
              Learn More
            </a>
          </div>
        </section>

        {/* Features section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 transition-transform duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <QrCode size={24} className="text-purple-700" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Place QR Codes</h3>
              <p className="text-gray-600">
                Add QR codes to bills, tables, and promotional materials offering discounts in exchange for feedback.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 transition-transform duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Star size={24} className="text-purple-700" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Collect Reviews</h3>
              <p className="text-gray-600">
                Customers scan the QR code and leave ratings and feedback directly on your customized form.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 transition-transform duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Mail size={24} className="text-purple-700" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Build Email List</h3>
              <p className="text-gray-600">
                Automatically collect customer emails for your marketing list while sending them discount coupons.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white rounded-xl shadow-lg p-6 transition-transform duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <ThumbsUp size={24} className="text-purple-700" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Promote Google Reviews</h3>
              <p className="text-gray-600">
                For 5-star ratings, prompt customers to leave the same review on Google in exchange for additional discounts.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 transition-transform duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <div className="text-purple-700 font-bold text-lg">%</div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Special Offers</h3>
              <p className="text-gray-600">
                Create time-limited special offers like "Tonight only: 20% off" or "Free dessert" to drive immediate action.
              </p>
            </div>
          </div>
        </section>

        {/* Restaurant demos */}
        <section className="mb-16" id="demo-restaurants">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Try Our Demo Restaurants</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((restaurant) => (
              <Link 
                key={restaurant.id}
                to={`/${restaurant.id}`}
                className="block group"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${restaurant.logo})` }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2" style={{ color: restaurant.primaryColor }}>
                      {restaurant.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Scan the QR code at {restaurant.name} and leave your feedback to receive a special discount.
                    </p>
                    <div 
                      className="px-4 py-2 rounded text-white font-medium inline-block transition-all"
                      style={{ backgroundColor: restaurant.primaryColor }}
                    >
                      Try Demo
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <QrCode size={24} className="text-purple-400" />
                <span className="ml-2 text-xl font-bold">ReviewBoost</span>
              </div>
              <p className="mt-2 text-gray-400">
                Boost reviews, collect emails, grow your business.
              </p>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Contact Us
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} ReviewBoost. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;