export type ServiceCategory = 'all' | 'package' | 'train' | 'ferry' | 'stay' | 'ev';

export type HolidayVibe = 'all' | 'alpine' | 'coastal' | 'forest' | 'cultural' | 'wellness' | 'urban';

export type BudgetTier = 'all' | 'budget' | 'moderate' | 'premium';

export interface ItineraryDay {
  day: string;
  title: string;
  desc: string;
  transportMode: string;
}

export interface TravelItem {
  id: string;
  type: 'package' | 'train' | 'ferry' | 'stay' | 'ev';
  title: string;
  destination: string;
  origin?: string;
  country: string;
  region: string;
  vibe: HolidayVibe;
  duration: string;
  price: number;
  rating: number;
  reviewCount: number;
  carbonEmissionKg: number;
  flightComparisonKg: number;
  carbonSavedKg: number;
  greenScore: number;
  energySource: string;
  certifications: string[];
  image: string;
  description: string;
  highlights: string[];
  itinerary?: ItineraryDay[];
  included: string[];
  sustainabilityFeatures: string[];
  localCommunityImpact: string;
  availableSeats?: number;
  departureTimes?: string[];
  accommodationType?: string;
}

export interface BookingRecord {
  bookingId: string;
  itemId: string;
  item: TravelItem;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  travelDate: string;
  travelersCount: number;
  seatPreference: string;
  carbonOffsetDonation: number;
  reusableKitAddon: boolean;
  organicMealAddon: boolean;
  discountAmount: number;
  totalPrice: number;
  totalCarbonSaved: number;
  treesPlanted: number;
  status: 'confirmed' | 'cancelled';
  bookingTimestamp: string;
  qrCodeUrl: string;
}

export interface RouteComparison {
  route: string;
  from: string;
  to: string;
  distanceKm: number;
  options: {
    mode: 'electric_train' | 'flight' | 'ev_car' | 'electric_ferry';
    name: string;
    co2Kg: number;
    durationHours: string;
    typicalCostUsd: number;
    comfortScore: number; // out of 10
    ecoAdvantage: string;
  }[];
}
