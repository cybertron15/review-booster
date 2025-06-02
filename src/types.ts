export interface Review {
  id?: string;
  restaurantId: string;
  rating: number;
  review: string;
  name: string;
  email: string;
  timestamp: string;
  googleReviewed?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  specialOffer?: string;
  normalDiscount: string;
  vipDiscount: string;
  googleReviewLink: string;
}