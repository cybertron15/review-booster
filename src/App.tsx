import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ReviewPage from './pages/ReviewPage';
import ThankYouPage from './pages/ThankYouPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { ReviewProvider } from './contexts/ReviewContext';

function App() {
  return (
    <Router>
      <ReviewProvider>
        <div className="min-h-screen bg-neutral-50 text-neutral-900">
          <Toaster position="top-center" />
          <Routes>
            {/* Static routes first */}
            <Route path="/" element={<HomePage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Dynamic routes */}
            <Route
              path="/business/:restaurantId/admin"
              element={
                <AdminDashboard />
              }
            />
            <Route path="/business/:restaurantId" element={<ReviewPage />} />

            {/* Catch-all route for 404 */}
            <Route path="/not-found" element={<NotFoundPage />} />
          </Routes>
        </div>
      </ReviewProvider>
    </Router>
  );
}

export default App;