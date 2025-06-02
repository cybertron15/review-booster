import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useReview } from '../contexts/ReviewContext';
import { Business, supabase } from '../lib/supabaseClient';
import LoadingSpinner from '../components/LoadingSpinner';

// UUID v4 regex pattern
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function ReviewPage() {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const { submitReview, getBusinessById } = useReview();
  
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchBusiness = async () => {
      // Validate restaurantId is a valid UUID before making the request);
      
      if (!restaurantId) {
        navigate('/not-found');
        return;
      }
      
      const { data } = await supabase
                .from('businesses')
                .select('*')
                .eq('id', restaurantId)
                .order('name');
      
      if (!data) {
        navigate('/not-found');
        return;
      }
      
      setBusiness(data);
      setLoading(false);
    };

    fetchBusiness();
  }, [restaurantId, getBusinessById, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!business) return;
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    
    setSubmitting(true);
    
    try {
      const success = await submitReview({
        business_id: business.id,
        rating,
        review,
        name,
        email
      });
      
      if (success) {
        sessionStorage.setItem('lastReview', JSON.stringify({
          businessId: business.id,
          businessName: business.name,
          rating,
          review,
          name,
          email
        }));
        
        navigate('/thank-you');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!business) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Share Your Feedback for {business.name}
        </h1>
        
        <div className="flex justify-center mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={48}
              className={`cursor-pointer transition-all duration-200 ${
                star <= (hoveredRating || rating) ? 'fill-current text-yellow-400' : 'text-gray-300'
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
            />
          ))}
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
              Your feedback (optional)
            </label>
            <textarea
              id="review"
              rows={4}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tell us about your experience..."
            />
          </div>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Your email (for your discount coupon)
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              We'll send your discount coupon to this email address.
            </p>
          </div>
          
          <button
            type="submit"
            disabled={submitting || rating === 0}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-md font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReviewPage;