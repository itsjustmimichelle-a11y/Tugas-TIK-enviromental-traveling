import React, { useState, useEffect, useMemo } from 'react';
import {
  Filter,
  ArrowUpDown,
  Sparkles,
  Train,
  Ship,
  Hotel,
  Compass,
  CheckCircle2,
  SlidersHorizontal,
  ShieldCheck,
  Search,
  RotateCcw,
} from 'lucide-react';
import { ServiceCategory, HolidayVibe, BudgetTier, TravelItem, BookingRecord } from './types';
import { TRAVEL_ITEMS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { SearchHero } from './components/SearchHero';
import { ListingCard } from './components/ListingCard';
import { DetailModal } from './components/DetailModal';
import { BookingModal } from './components/BookingModal';
import { TicketPassModal } from './components/TicketPassModal';
import { CarbonRouteCalculator } from './components/CarbonRouteCalculator';
import { HolidayBuilder } from './components/HolidayBuilder';
import { ImpactDashboardModal } from './components/ImpactDashboardModal';
import { EcoPledgeSection } from './components/EcoPledgeSection';
import { Footer } from './components/Footer';

const STORAGE_KEY = 'terraloka_saved_bookings_v1';

// Seed initial demo booking for instant immersion
const INITIAL_DEMO_BOOKING: BookingRecord = {
  bookingId: 'TL-882E41',
  itemId: 'pkg-alpine-express',
  item: TRAVEL_ITEMS[0],
  passengerName: 'Alex Rivers',
  passengerEmail: 'alex.rivers@mindfultravel.eco',
  passengerPhone: '+1 (555) 234-8901',
  travelDate: '2026-11-18',
  travelersCount: 2,
  seatPreference: 'panoramic_window',
  carbonOffsetDonation: 12,
  reusableKitAddon: true,
  organicMealAddon: true,
  discountAmount: 48,
  totalPrice: 976,
  totalCarbonSaved: 373.2,
  treesPlanted: 4,
  status: 'confirmed',
  bookingTimestamp: '2026-10-28T14:20:00Z',
  qrCodeUrl: 'https://terraloka.eco/verify/TL-882E41',
};

export default function App() {
  // Navigation & Category states
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [originFilter, setOriginFilter] = useState<string>('');
  const [departureDate, setDepartureDate] = useState<string>(
    new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]
  );
  const [selectedVibe, setSelectedVibe] = useState<HolidayVibe>('all');
  const [budgetTier, setBudgetTier] = useState<BudgetTier>('all');
  const [maxCustomBudget, setMaxCustomBudget] = useState<number | null>(null);

  // Sorting
  const [sortBy, setSortBy] = useState<
    'lowest_carbon' | 'highest_carbon_saved' | 'price_asc' | 'price_desc' | 'rating'
  >('lowest_carbon');

  // Modals
  const [detailItem, setDetailItem] = useState<TravelItem | null>(null);
  const [bookingItem, setBookingItem] = useState<TravelItem | null>(null);
  const [activeTicketBooking, setActiveTicketBooking] = useState<BookingRecord | null>(null);
  const [isMyTripsOpen, setIsMyTripsOpen] = useState<boolean>(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState<boolean>(false);
  const [isHolidayBuilderModalOpen, setIsHolidayBuilderModalOpen] = useState<boolean>(false);

  // Saved bookings in localStorage
  const [savedBookings, setSavedBookings] = useState<BookingRecord[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading stored bookings', e);
    }
    return [INITIAL_DEMO_BOOKING];
  });

  // Sync bookings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedBookings));
    } catch (e) {
      console.error('Error persisting bookings', e);
    }
  }, [savedBookings]);

  // Execute Search handler (smoothly scrolls to catalog)
  const handleExecuteSearch = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered & Sorted items
  const filteredItems = useMemo(() => {
    return TRAVEL_ITEMS.filter((item) => {
      // Category match
      if (activeCategory !== 'all' && item.type !== activeCategory) {
        return false;
      }

      // Vibe match
      if (selectedVibe !== 'all' && item.vibe !== selectedVibe) {
        return false;
      }

      // Budget tier match
      if (budgetTier === 'budget' && item.price > 200) return false;
      if (budgetTier === 'moderate' && (item.price < 200 || item.price > 450)) return false;
      if (budgetTier === 'premium' && item.price <= 450) return false;

      // Custom budget from holiday builder if applied
      if (maxCustomBudget !== null && item.price > maxCustomBudget) {
        return false;
      }

      // Keyword / Destination search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesText =
          item.title.toLowerCase().includes(query) ||
          item.destination.toLowerCase().includes(query) ||
          item.country.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.certifications.some((c) => c.toLowerCase().includes(query));
        if (!matchesText) return false;
      }

      // Origin filter
      if (originFilter.trim()) {
        const originQuery = originFilter.toLowerCase();
        if (item.origin && !item.origin.toLowerCase().includes(originQuery)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'lowest_carbon':
          return a.carbonEmissionKg - b.carbonEmissionKg;
        case 'highest_carbon_saved':
          return b.carbonSavedKg - a.carbonSavedKg;
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [
    activeCategory,
    selectedVibe,
    budgetTier,
    maxCustomBudget,
    searchTerm,
    originFilter,
    sortBy,
  ]);

  // Handle booking confirmed
  const handleBookingConfirmed = (newBooking: BookingRecord) => {
    setSavedBookings((prev) => [newBooking, ...prev]);
    setBookingItem(null);
    setActiveTicketBooking(newBooking);
  };

  // Handle cancel booking
  const handleCancelBooking = (bookingId: string) => {
    setSavedBookings((prev) =>
      prev.map((b) => (b.bookingId === bookingId ? { ...b, status: 'cancelled' } : b))
    );
  };

  // Apply filters from HolidayBuilder
  const handleApplyHolidayBuilderFilters = (vibe: HolidayVibe, maxBudget: number) => {
    setSelectedVibe(vibe);
    setMaxCustomBudget(maxBudget);
    setActiveCategory('package');
    const el = document.getElementById('catalog-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSearchTerm('');
    setOriginFilter('');
    setSelectedVibe('all');
    setBudgetTier('all');
    setMaxCustomBudget(null);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col font-sans text-stone-900">
      {/* 1. Header / Navbar conforming strictly to the Top Bar Contract */}
      <Navbar
        activeTab={activeCategory}
        setActiveTab={setActiveCategory}
        savedBookings={savedBookings}
        onOpenMyTrips={() => setIsMyTripsOpen(true)}
        onOpenCalculator={() => setIsCalculatorModalOpen(true)}
        onOpenHolidayBuilder={() => setIsHolidayBuilderModalOpen(true)}
      />

      {/* 2. Hero & Traveloka-style Search Console */}
      <SearchHero
        category={activeCategory}
        onSelectCategory={setActiveCategory}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedVibe={selectedVibe}
        onSelectVibe={setSelectedVibe}
        budgetTier={budgetTier}
        onSelectBudgetTier={(tier) => {
          setBudgetTier(tier);
          setMaxCustomBudget(null);
        }}
        originFilter={originFilter}
        onOriginChange={setOriginFilter}
        departureDate={departureDate}
        onDepartureDateChange={setDepartureDate}
        onExecuteSearch={handleExecuteSearch}
        onOpenHolidayBuilder={() => setIsHolidayBuilderModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-20 space-y-16">
        {/* 3. Catalog Section with Sorting & Filters */}
        <section id="catalog-section" className="pt-2">
          {/* Section Sub-header & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
                <Compass className="w-4 h-4 text-emerald-700" />
                <span>Verified Low-Emission Catalog</span>
                <span aria-hidden="true">·</span>
                <span>GHG Protocol Scope 3 Compliant</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-stone-900">
                {activeCategory === 'package'
                  ? 'Curated Eco-Holiday Packages'
                  : activeCategory === 'train'
                  ? 'High-Speed Electric Rail Routes'
                  : activeCategory === 'ferry'
                  ? 'Solar & Electric Maritime Crossings'
                  : activeCategory === 'stay'
                  ? 'Certified Bio-Chalets & Eco-Lodges'
                  : 'All Sustainable Journeys'}
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Showing {filteredItems.length} {filteredItems.length === 1 ? 'option' : 'options'} matching your green criteria
                {maxCustomBudget && ` (Budget cap: $${maxCustomBudget})`}
              </p>
            </div>

            {/* Sort & Reset Controls */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {(activeCategory !== 'all' || selectedVibe !== 'all' || budgetTier !== 'all' || searchTerm || maxCustomBudget) && (
                <button
                  onClick={handleResetFilters}
                  className="px-3 py-1.5 text-xs font-medium text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}

              <div className="flex items-center gap-2 text-xs bg-white border border-stone-200 rounded-lg px-3 py-1.5 shadow-2xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                <span className="font-semibold text-stone-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-stone-800 font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="lowest_carbon">Lowest Carbon Footprint</option>
                  <option value="highest_carbon_saved">Most CO2 Avoided vs Flight</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Top Traveler Rating</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8">
              {filteredItems.map((item) => (
                <ListingCard
                  key={item.id}
                  item={item}
                  onViewDetails={setDetailItem}
                  onQuickBook={setBookingItem}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center bg-white rounded-2xl border border-stone-200 p-8 mt-8">
              <Search className="w-10 h-10 text-stone-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-stone-800">
                No low-carbon journeys match your exact search
              </h3>
              <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
                Try widening your budget filter, clearing destination keywords, or using our interactive Holiday Tailor to find alternatives.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg transition inline-flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Show All Sustainable Options</span>
              </button>
            </div>
          )}
        </section>

        {/* 4. Dedicated Section: Holiday Tailor by Budget & Preference */}
        <section id="holiday-builder-section">
          <HolidayBuilder
            allItems={TRAVEL_ITEMS}
            onSelectHoliday={(item) => {
              setDetailItem(item);
            }}
            onApplyFilters={handleApplyHolidayBuilderFilters}
          />
        </section>

        {/* 5. Real-World Carbon Route & Corridors Calculator */}
        <section id="route-calculator-section">
          <CarbonRouteCalculator
            onSelectRoute={(city) => {
              setSearchTerm(city);
              const el = document.getElementById('catalog-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </section>

        {/* 6. Environmental Standard & Pledge */}
        <EcoPledgeSection />
      </main>

      {/* Footer adhering strictly to design guidelines */}
      <Footer
        onOpenCalculator={() => setIsCalculatorModalOpen(true)}
        onOpenHolidayBuilder={() => setIsHolidayBuilderModalOpen(true)}
        onSelectCategory={setActiveCategory}
      />

      {/* Modals */}
      {detailItem && (
        <DetailModal
          item={detailItem}
          onClose={() => setDetailItem(null)}
          onBookNow={(item) => {
            setDetailItem(null);
            setBookingItem(item);
          }}
        />
      )}

      {bookingItem && (
        <BookingModal
          item={bookingItem}
          initialTravelDate={departureDate}
          onClose={() => setBookingItem(null)}
          onBookingConfirmed={handleBookingConfirmed}
        />
      )}

      {activeTicketBooking && (
        <TicketPassModal
          booking={activeTicketBooking}
          onClose={() => setActiveTicketBooking(null)}
          onViewAllTrips={() => setIsMyTripsOpen(true)}
        />
      )}

      {isMyTripsOpen && (
        <ImpactDashboardModal
          bookings={savedBookings}
          onClose={() => setIsMyTripsOpen(false)}
          onViewTicket={(b) => {
            setIsMyTripsOpen(false);
            setActiveTicketBooking(b);
          }}
          onCancelBooking={handleCancelBooking}
          onStartBooking={() => {
            setIsMyTripsOpen(false);
            const el = document.getElementById('catalog-section');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {isCalculatorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/75 backdrop-blur-xs overflow-y-auto">
          <CarbonRouteCalculator
            isModal={true}
            onClose={() => setIsCalculatorModalOpen(false)}
            onSelectRoute={(city) => {
              setIsCalculatorModalOpen(false);
              setSearchTerm(city);
              const el = document.getElementById('catalog-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>
      )}

      {isHolidayBuilderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/75 backdrop-blur-xs overflow-y-auto">
          <HolidayBuilder
            isModal={true}
            allItems={TRAVEL_ITEMS}
            onClose={() => setIsHolidayBuilderModalOpen(false)}
            onSelectHoliday={(item) => {
              setIsHolidayBuilderModalOpen(false);
              setDetailItem(item);
            }}
            onApplyFilters={(vibe, maxBudget) => {
              setIsHolidayBuilderModalOpen(false);
              handleApplyHolidayBuilderFilters(vibe, maxBudget);
            }}
          />
        </div>
      )}
    </div>
  );
}
