import React, { useState, useEffect } from 'react';
import { useReview } from '../contexts/ReviewContext';
import { BarChart, PieChart, Star } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

// Mock review data for demonstration purposes
const MOCK_REVIEWS = [
  {
    id: '1',
    restaurantId: 'rest1',
    rating: 5,
    review: 'Amazing food and service! Will definitely be back.',
    name: 'John Doe',
    email: 'john.doe@example.com',
    timestamp: '2025-04-01T15:23:11Z',
    googleReviewed: true
  },
  {
    id: '2',
    restaurantId: 'rest1',
    rating: 4,
    review: 'Great food but service was a bit slow.',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    timestamp: '2025-04-01T14:15:22Z',
    googleReviewed: false
  },
  {
    id: '3',
    restaurantId: 'rest2',
    rating: 5,
    review: 'Best sushi in town! Loved everything about it.',
    name: 'Mike Johnson',
    email: 'mike.j@example.com',
    timestamp: '2025-04-01T12:05:18Z',
    googleReviewed: true
  },
  {
    id: '4',
    restaurantId: 'rest3',
    rating: 3,
    review: 'Decent burgers but a bit overpriced.',
    name: 'Sarah Wilson',
    email: 'sarah.w@example.com',
    timestamp: '2025-03-31T19:42:33Z',
    googleReviewed: false
  },
  {
    id: '5',
    restaurantId: 'rest2',
    rating: 5,
    review: 'Fresh fish and amazing rolls! Service was impeccable.',
    name: 'David Brown',
    email: 'david.b@example.com',
    timestamp: '2025-03-31T18:30:10Z',
    googleReviewed: true
  },
  {
    id: '6',
    restaurantId: 'rest1',
    rating: 2,
    review: 'Disappointing experience. Food was cold when it arrived.',
    name: 'Laura Miller',
    email: 'laura.m@example.com',
    timestamp: '2025-03-30T20:15:45Z',
    googleReviewed: false
  }
];

const AdminDashboard: React.FC = () => {
  const { restaurants, isLoading } = useReview();
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('all');
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    googleReviews: 0,
    ratingCounts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  });

  // Update page title
  useEffect(() => {
    document.title = 'Admin Dashboard | Restaurant Review System';
  }, []);

  // Fetch reviews and calculate stats
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);

      try {
        // In a real app, this would fetch from Supabase
        // For demo purposes, we'll use mock data
        const filteredReviews = selectedRestaurant === 'all'
          ? MOCK_REVIEWS
          : MOCK_REVIEWS.filter(r => r.restaurantId === selectedRestaurant);

        setReviews(filteredReviews);

        // Calculate stats
        const totalReviews = filteredReviews.length;
        const sumRatings = filteredReviews.reduce((sum, r) => sum + r.rating, 0);
        const avgRating = totalReviews > 0 ? sumRatings / totalReviews : 0;
        const googleReviews = filteredReviews.filter(r => r.googleReviewed).length;

        // Count ratings
        const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        filteredReviews.forEach(r => {
          ratingCounts[r.rating as keyof typeof ratingCounts]++;
        });

        setStats({
          totalReviews,
          averageRating: parseFloat(avgRating.toFixed(1)),
          googleReviews,
          ratingCounts,
        });
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [selectedRestaurant]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold">ReviewBoost Admin Dashboard</h1>
          <a href="/" className="px-4 py-2 bg-indigo-800 rounded-md hover:bg-indigo-900 transition-colors">
            Back to Home
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Restaurant selector */}
        <div className="mb-8">
          <label htmlFor="restaurant-select" className="block text-sm font-medium text-gray-700 mb-2">
            Select Restaurant
          </label>
          <select
            id="restaurant-select"
            value={selectedRestaurant}
            onChange={(e) => setSelectedRestaurant(e.target.value)}
            className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All Restaurants</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.name}
              </option>
            ))}
          </select>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Total Reviews</h3>
            <p className="text-3xl font-bold text-indigo-600">{stats.totalReviews}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Average Rating</h3>
            <div className="flex items-center">
              <p className="text-3xl font-bold text-indigo-600 mr-2">{stats.averageRating}</p>
              <Star size={24} className="text-yellow-500 fill-current" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Google Reviews</h3>
            <p className="text-3xl font-bold text-indigo-600">{stats.googleReviews}</p>
            <p className="text-sm text-gray-500 mt-1">
              {stats.totalReviews > 0 ?
                `${Math.round((stats.googleReviews / stats.totalReviews) * 100)}% conversion rate` :
                '0% conversion rate'}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Email Collected</h3>
            <p className="text-3xl font-bold text-indigo-600">{stats.totalReviews}</p>
            <p className="text-sm text-gray-500 mt-1">100% collection rate</p>
          </div>
        </div>

        {/* Charts section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Rating Distribution</h3>
              <BarChart size={20} className="text-gray-400" />
            </div>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = stats.ratingCounts[rating as keyof typeof stats.ratingCounts];
                const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;

                return (
                  <div key={rating} className="flex items-center">
                    <div className="flex items-center w-16">
                      <span className="text-sm font-medium text-gray-700">{rating}</span>
                      <Star size={16} className="ml-1 text-yellow-500 fill-current" />
                    </div>
                    <div className="flex-1 h-5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-indigo-600"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-700 w-12 text-right">
                      {count} ({Math.round(percentage)}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Google Review Conversion</h3>
              <PieChart size={20} className="text-gray-400" />
            </div>
            <div className="h-48 flex items-center justify-center">
              <div className="relative h-36 w-36">
                <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
                <div
                  className="absolute inset-0 rounded-full border-8 border-indigo-600"
                  style={{
                    // clipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`,
                    clipPath: `path('M18,18 L82,18 A64,64 0 ${stats.totalReviews > 0 ? (stats.googleReviews / stats.totalReviews) * 360 > 180 ? 1 : 0 : 0},1 ${stats.totalReviews > 0 ? Math.cos((stats.googleReviews / stats.totalReviews) * Math.PI * 2) * 64 + 50 : 50},${stats.totalReviews > 0 ? Math.sin((stats.googleReviews / stats.totalReviews) * Math.PI * 2) * 64 + 50 : 50} L50,50 Z')`,
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-2xl font-bold text-indigo-600">
                    {stats.totalReviews > 0 ? Math.round((stats.googleReviews / stats.totalReviews) * 100) : 0}%
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-6 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-indigo-600 mr-1"></div>
                <span className="text-gray-700">Posted to Google</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-200 mr-1"></div>
                <span className="text-gray-700">Not posted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Reviews</h3>
          </div>

          {loading ? (
            <div className="p-6 flex justify-center">
              <LoadingSpinner />
            </div>
          ) : reviews.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No reviews found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Restaurant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Review
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Google Review
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reviews.map((review) => {
                    const restaurant = restaurants.find(r => r.id === review.restaurantId);

                    return (
                      <tr key={review.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{review.name}</div>
                          <div className="text-sm text-gray-500">{review.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {restaurant ? restaurant.name : review.restaurantId}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={16}
                                className={star <= review.rating ? 'fill-current text-yellow-500' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {review.review}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${review.googleReviewed
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                            }`}>
                            {review.googleReviewed ? 'Posted' : 'Not posted'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(review.timestamp).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;