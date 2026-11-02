import React from 'react';
import {
  Train,
  Ship,
  Hotel,
  Compass,
  Search,
  Calendar,
  MapPin,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import { ServiceCategory, HolidayVibe, BudgetTier } from '../types';

interface SearchHeroProps {
  category: ServiceCategory;
  onSelectCategory: (cat: ServiceCategory) => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedVibe: HolidayVibe;
  onSelectVibe: (vibe: HolidayVibe) => void;
  budgetTier: BudgetTier;
  onSelectBudgetTier: (tier: BudgetTier) => void;
  originFilter: string;
  onOriginChange: (val: string) => void;
  departureDate: string;
  onDepartureDateChange: (val: string) => void;
  onExecuteSearch: () => void;
  onOpenHolidayBuilder: () => void;
}

export const SearchHero: React.FC<SearchHeroProps> = ({
  category,
  onSelectCategory,
  searchTerm,
  onSearchChange,
  selectedVibe,
  onSelectVibe,
  budgetTier,
  onSelectBudgetTier,
  originFilter,
  onOriginChange,
  departureDate,
  onDepartureDateChange,
  onExecuteSearch,
  onOpenHolidayBuilder,
}) => {
  return (
    <section className="relative pt-6 pb-14 overflow-hidden">
      {/* Visual Hero Banner with High-Fidelity Train Backdrop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-stone-900 shadow-xl border border-stone-200">
          <img
            src="/src/assets/images/hero_scenic_green_train_1793599879366.jpg"
            alt="Scenic high-speed electric train cruising across green alpine mountain valleys"
            referrerPolicy="no-referrer"
            className="w-full h-80 sm:h-96 object-cover object-center filter brightness-95"
          />

          {/* Measured Contrast Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/45 to-transparent" />

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-12 text-white">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 mb-2">
                <span>The Low-Impact Way to Explore</span>
                <span aria-hidden="true">·</span>
                <span>Electric Rail, Solar Ferries & Regenerative Stays</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight [text-wrap:balance]">
                Travel Without the Carbon Debt.
              </h1>
              <p className="mt-3 text-sm sm:text-base text-stone-200 max-w-2xl leading-relaxed">
                Book scenic electric railways, solar-hybrid ferries, and verified zero-waste eco-lodges. Customize holidays matched precisely to your budget and travel preferences.
              </p>
            </div>
          </div>
        </div>

        {/* Traveloka-style Search Console Floating Overlay */}
        <div className="relative -mt-10 sm:-mt-12 bg-white rounded-2xl shadow-xl border border-stone-200/90 p-5 sm:p-7 z-20">
          {/* Mode Selector Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 pb-5 border-b border-stone-200 overflow-x-auto no-scrollbar">
            <button
              onClick={() => onSelectCategory('all')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                category === 'all'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>All Sustainable</span>
            </button>

            <button
              onClick={() => onSelectCategory('package')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                category === 'package'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>Eco Holidays & Packages</span>
            </button>

            <button
              onClick={() => onSelectCategory('train')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                category === 'train'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              <Train className="w-4 h-4" />
              <span>Electric High-Speed Rail</span>
            </button>

            <button
              onClick={() => onSelectCategory('ferry')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                category === 'ferry'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              <Ship className="w-4 h-4" />
              <span>Solar & Electric Boats</span>
            </button>

            <button
              onClick={() => onSelectCategory('stay')}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                category === 'stay'
                  ? 'bg-emerald-800 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              <Hotel className="w-4 h-4" />
              <span>Certified Eco-Stays</span>
            </button>

            {/* Quick Holiday Builder launch button */}
            <div className="ml-auto hidden lg:flex items-center">
              <button
                onClick={onOpenHolidayBuilder}
                className="px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Customize by Budget & Vibe</span>
              </button>
            </div>
          </div>

          {/* Search Inputs Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-5">
            {/* Origin */}
            <div className="relative">
              <label className="block text-xs font-semibold text-stone-500 mb-1">
                Departure Station / Origin
              </label>
              <div className="relative flex items-center">
                <MapPin className="w-4 h-4 text-stone-400 absolute left-3" />
                <input
                  type="text"
                  placeholder="e.g. Zurich, Tokyo, Bali..."
                  value={originFilter}
                  onChange={(e) => onOriginChange(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm text-stone-800 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Destination or Keyword */}
            <div className="relative">
              <label className="block text-xs font-semibold text-stone-500 mb-1">
                Destination or Holiday Theme
              </label>
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-stone-400 absolute left-3" />
                <input
                  type="text"
                  placeholder="Where to? (Alps, Norway, Bali...)"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm text-stone-800 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Departure Date */}
            <div className="relative">
              <label className="block text-xs font-semibold text-stone-500 mb-1">
                Travel Date
              </label>
              <div className="relative flex items-center">
                <Calendar className="w-4 h-4 text-stone-400 absolute left-3" />
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => onDepartureDateChange(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm text-stone-800 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                onClick={onExecuteSearch}
                className="w-full py-2.5 px-5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Search Green Journeys</span>
              </button>
            </div>
          </div>

          {/* Quick Filter Bar: Budget Tiers & Travel Vibes */}
          <div className="mt-4 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Travel Vibes Filter */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-stone-500 font-semibold mr-1">Vibe:</span>
              {(
                [
                  { id: 'all', label: 'All Vibes' },
                  { id: 'alpine', label: 'Alpine & Valleys' },
                  { id: 'coastal', label: 'Fjords & Ocean' },
                  { id: 'forest', label: 'Rainforest Canopy' },
                  { id: 'cultural', label: 'Slow Heritage' },
                  { id: 'wellness', label: 'Organic Wellness' },
                ] as const
              ).map((vibe) => (
                <button
                  key={vibe.id}
                  onClick={() => onSelectVibe(vibe.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                    selectedVibe === vibe.id
                      ? 'bg-stone-900 text-white'
                      : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
                  }`}
                >
                  {vibe.label}
                </button>
              ))}
            </div>

            {/* Budget Tiers */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 font-semibold mr-1">Budget:</span>
              {(
                [
                  { id: 'all', label: 'Any' },
                  { id: 'budget', label: 'Under $200' },
                  { id: 'moderate', label: '$200 - $450' },
                  { id: 'premium', label: '$450+' },
                ] as const
              ).map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => onSelectBudgetTier(tier.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                    budgetTier === tier.id
                      ? 'bg-emerald-800 text-white'
                      : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
