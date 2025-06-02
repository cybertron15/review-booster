import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, CheckCircle } from 'lucide-react';

interface LastReview {
  restaurantId: string;
  rating: number;
  review: string;
  name: string;
  email: string;
}

const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();
  const [lastReview, setLastReview] = useState<LastReview | null>(null);

  useEffect(() => {
    const reviewData = sessionStorage.getItem('lastReview');
    
    if (!reviewData) {
      navigate('/');
      return;
    }
    
    try {
      const parsedData = JSON.parse(reviewData);
      setLastReview(parsedData);
    } catch (error) {
      console.error('Error parsing review data:', error);
      navigate('/');
    }
  }, [navigate]);

  if (!lastReview) {
    return null;
  }

  const isPerfectRating = lastReview.rating === 5;
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        <div className="text-center mb-6">
          <CheckCircle size={64} className="mx-auto mb-4 text-green-500" />
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            Thank You, {lastReview.name}!
          </h2>
          <p className="text-gray-600">
            We appreciate you taking the time to share your feedback.
          </p>
          
          <div className="flex justify-center my-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                className={star <= lastReview.rating ? 'fill-current text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
        </div>

        <div className="bg-gray-50 border rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Your Discount Coupon
          </h3>
          <p className="text-gray-600 mb-3">
            We've sent a coupon for 10% off your next visit to your email address.
          </p>
          <p className="text-sm text-gray-500">
            Check your inbox at {lastReview.email} in the next few minutes.
          </p>
        </div>
        
        {isPerfectRating && (
          <div className="border-2 border-yellow-400 rounded-lg p-4 mb-6 bg-yellow-50">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Get an Additional Discount!
            </h3>
            <p className="text-gray-600 mb-4">
              Share your amazing review on Google and receive 15% off your next visit plus a free dessert!
            </p>
            <a
              href={`https://g.page/r/${lastReview.restaurantId}/review`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
            >
              Post on Google
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThankYouPage;