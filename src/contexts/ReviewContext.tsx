import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { supabase, type Business, type Response } from '../lib/supabaseClient';

interface ReviewContextType {
  submitReview: (review: Omit<Response, 'id' | 'created_at' | 'google_reviewed'>) => Promise<boolean>;
  getBusinessById: (id: string) => Promise<Business | null>;
  restaurants: Business[];
  isLoading: boolean;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const useReview = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReview must be used within a ReviewProvider');
  }
  return context;
};

export const ReviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [restaurants, setRestaurants] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data, error } = await supabase
          .from('businesses')
          .select('*')
          .eq('active', true)
          .order('name');

        if (error) throw error;
        setRestaurants(data || []);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        toast.error('Failed to load restaurants');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const getBusinessById = async (id: string): Promise<Business | null> => {
    try {
      const { data, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', id)
        .eq('active', true)
        .limit(1);

      if (error) throw error;
      
      // Return null if no business was found
      if (!data || data.length === 0) {
        return null;
      }
      
      return data[0];
    } catch (error) {
      console.error('Error fetching business:', error);
      return null;
    }
  };

  const submitReview = async (review: Omit<Response, 'id' | 'created_at' | 'google_reviewed'>): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('responses')
        .insert([{
          business_id: review.business_id,
          rating: review.rating,
          review: review.review,
          name: review.name,
          email: review.email,
          google_reviewed: false
        }]);

      if (error) throw error;
      
      toast.success('Thank you for your feedback!');
      return true;
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
      return false;
    }
  };

  return (
    <ReviewContext.Provider value={{ submitReview, getBusinessById, restaurants, isLoading }}>
      {children}
    </ReviewContext.Provider>
  );
};