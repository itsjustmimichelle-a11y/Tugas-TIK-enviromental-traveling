import React from 'react';
import { Leaf, ShieldCheck, Ticket } from 'lucide-react';
import { BookingRecord, ServiceCategory } from '../types';

interface NavbarProps {
  activeTab: ServiceCategory;
  setActiveTab: (tab: ServiceCategory) => void;
  savedBookings: BookingRecord[];
  onOpenMyTrips: () => void;
  onOpenCalculator: () => void;
  onOpenHolidayBuilder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedBookings,
  onOpenMyTrips,
  onOpenCalculator,
  onOpenHolidayBuilder,
}) => {
  const totalCarbonAvoided = savedBookings.reduce(
    (acc, b) => (b.status === 'confirmed' ? acc + b.totalCarbonSaved : acc),
    0
  );

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            setActiveTab('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 group text-left cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold tracking-tight shadow-sm transition-transform group-hover:scale-105">
            <Leaf className="w-4 h-4" />
          </div>
          <span className="text-xl font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0">
            TerraLoka
          </span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          <button
            onClick={() => {
              setActiveTab('all');
              const el = document.getElementById('catalog-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`transition-colors hover:text-stone-950 whitespace-nowrap shrink-0 ${
              activeTab === 'all' ? 'text-emerald-800 font-semibold' : ''
            }`}
          >
            Conscious Trips
          </button>
          <button
            onClick={() => {
              setActiveTab('train');
              const el = document.getElementById('catalog-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`transition-colors hover:text-stone-950 whitespace-nowrap shrink-0 ${
              activeTab === 'train' ? 'text-emerald-800 font-semibold' : ''
            }`}
          >
            Electric Rail
          </button>
          <button
            onClick={() => {
              setActiveTab('stay');
              const el = document.getElementById('catalog-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`transition-colors hover:text-stone-950 whitespace-nowrap shrink-0 ${
              activeTab === 'stay' ? 'text-emerald-800 font-semibold' : ''
            }`}
          >
            Certified Eco-Stays
          </button>
          <button
            onClick={onOpenHolidayBuilder}
            className="transition-colors hover:text-stone-950 whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span>Holiday Tailor</span>
          </button>
          <button
            onClick={onOpenCalculator}
            className="transition-colors hover:text-stone-950 whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span>Carbon Benchmark</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenMyTrips}
            className="relative px-3.5 py-2 text-xs font-semibold text-stone-900 bg-stone-100 border border-stone-200 rounded-lg hover:bg-stone-200 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <Ticket className="w-3.5 h-3.5 text-emerald-700" />
            <span>My Green Trips</span>
            {savedBookings.filter((b) => b.status === 'confirmed').length > 0 && (
              <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[11px] font-bold flex items-center justify-center">
                {savedBookings.filter((b) => b.status === 'confirmed').length}
              </span>
            )}
          </button>

          {totalCarbonAvoided > 0 && (
            <div className="hidden lg:flex items-center gap-1 text-xs text-stone-600 bg-emerald-50 border border-emerald-200/80 rounded-lg px-2.5 py-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span className="font-semibold text-emerald-900 tabular-nums">
                {totalCarbonAvoided.toFixed(1)} kg
              </span>
              <span>CO2 avoided</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
