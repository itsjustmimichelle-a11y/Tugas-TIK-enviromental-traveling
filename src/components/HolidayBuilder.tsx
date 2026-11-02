import React, { useState, useMemo } from 'react';
import {
  Sliders,
  DollarSign,
  Compass,
  Train,
  Ship,
  Sparkles,
  TreePine,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  X,
} from 'lucide-react';
import { TravelItem, HolidayVibe } from '../types';

interface HolidayBuilderProps {
  allItems: TravelItem[];
  onSelectHoliday: (item: TravelItem) => void;
  onApplyFilters: (vibe: HolidayVibe, maxBudget: number) => void;
  onClose?: () => void;
  isModal?: boolean;
}

export const HolidayBuilder: React.FC<HolidayBuilderProps> = ({
  allItems,
  onSelectHoliday,
  onApplyFilters,
  onClose,
  isModal = false,
}) => {
  const [budgetPerPerson, setBudgetPerPerson] = useState<number>(450);
  const [selectedVibe, setSelectedVibe] = useState<HolidayVibe>('alpine');
  const [transportPref, setTransportPref] = useState<'train' | 'ferry' | 'any'>('train');
  const [travelers, setTravelers] = useState<number>(2);
  const [durationPref, setDurationPref] = useState<'short' | 'medium' | 'extended'>('medium');

  // Filter matched packages and eco-stays based on user preference and budget
  const matchedItems = useMemo(() => {
    return allItems.filter((item) => {
      // Must be within budget per person
      const matchesBudget = item.price <= budgetPerPerson * 1.15; // small buffer
      // Matches vibe or is generic
      const matchesVibe = selectedVibe === 'all' || item.vibe === selectedVibe;
      // Matches transport preference if specific
      const matchesTransport =
        transportPref === 'any' ||
        (transportPref === 'train' && (item.type === 'train' || item.type === 'package')) ||
        (transportPref === 'ferry' && (item.type === 'ferry' || item.type === 'package'));

      return matchesBudget && (matchesVibe || item.price <= budgetPerPerson);
    }).slice(0, 3);
  }, [allItems, budgetPerPerson, selectedVibe, transportPref]);

  // Dynamic cost allocation breakdown
  const transportCost = Math.round(budgetPerPerson * 0.28);
  const stayCost = Math.round(budgetPerPerson * 0.44);
  const activitiesCost = Math.round(budgetPerPerson * 0.22);
  const carbonImpactDonation = Math.round(budgetPerPerson * 0.06);

  // Carbon savings estimation based on budget and duration
  const estimatedCarbonAvoided = Math.round(
    (durationPref === 'short' ? 95 : durationPref === 'medium' ? 165 : 240) * travelers
  );

  return (
    <div className={isModal ? 'bg-white rounded-2xl p-6 sm:p-8 max-w-4xl w-full mx-auto max-h-[90vh] overflow-y-auto' : 'bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm'}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
            <Sliders className="w-4 h-4" />
            <span>Interactive Green Holiday Tailor</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Waste Itineraries</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            Design Your Eco-Holiday by Budget & Preference
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Tell us your budget, preferred terrain, and travel style. We’ll calculate your carbon savings and assemble verified low-impact journeys.
          </p>
        </div>

        {isModal && onClose && (
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Budget per person slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-stone-900 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-700" />
                <span>Budget per Traveler</span>
              </label>
              <span className="text-lg font-bold text-emerald-900 tabular-nums">
                ${budgetPerPerson} USD
              </span>
            </div>

            <input
              type="range"
              min="80"
              max="1200"
              step="20"
              value={budgetPerPerson}
              onChange={(e) => setBudgetPerPerson(Number(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
            />

            {/* Quick preset buttons */}
            <div className="grid grid-cols-4 gap-2 mt-2.5">
              {[
                { label: 'Eco Backpacker', value: 120 },
                { label: 'Mindful Explorer', value: 250 },
                { label: 'Alpine Retreat', value: 480 },
                { label: 'Green Luxury', value: 850 },
              ].map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setBudgetPerPerson(preset.value)}
                  className={`py-1 px-2 text-[11px] font-medium rounded border transition ${
                    budgetPerPerson === preset.value
                      ? 'border-emerald-700 bg-emerald-50 text-emerald-900 font-semibold'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Travel Vibe / Preference */}
          <div>
            <label className="text-sm font-semibold text-stone-900 block mb-2 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-700" />
              <span>Holiday Preference & Vibe</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'alpine', label: 'Alpine & Glaciers', desc: 'Hydro trains & mountain air' },
                { id: 'coastal', label: 'Fjords & Coasts', desc: 'Silent electric catamarans' },
                { id: 'forest', label: 'Rainforest & Canopy', desc: 'Permaculture bamboo stays' },
                { id: 'wellness', label: 'Slow Living & Spa', desc: 'Saunas, e-bikes & bio-farms' },
                { id: 'cultural', label: 'Heritage Corridor', desc: 'Shinkansen & artisan towns' },
                { id: 'all', label: 'Surprise Me', desc: 'Broad low-impact options' },
              ].map((vibe) => (
                <button
                  key={vibe.id}
                  type="button"
                  onClick={() => setSelectedVibe(vibe.id as HolidayVibe)}
                  className={`p-2.5 text-left rounded-xl border transition-all ${
                    selectedVibe === vibe.id
                      ? 'border-emerald-700 bg-emerald-50/60 ring-1 ring-emerald-700 text-emerald-950'
                      : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-stone-50/50'
                  }`}
                >
                  <div className="text-xs font-semibold">{vibe.label}</div>
                  <div className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">{vibe.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Transport Preference & Group Size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                Preferred Clean Transport
              </label>
              <div className="flex rounded-lg border border-stone-200 p-1 bg-stone-50">
                <button
                  type="button"
                  onClick={() => setTransportPref('train')}
                  className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition flex items-center justify-center gap-1 ${
                    transportPref === 'train' ? 'bg-white shadow-xs text-stone-900 font-semibold' : 'text-stone-600'
                  }`}
                >
                  <Train className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Electric Rail</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTransportPref('ferry')}
                  className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition flex items-center justify-center gap-1 ${
                    transportPref === 'ferry' ? 'bg-white shadow-xs text-stone-900 font-semibold' : 'text-stone-600'
                  }`}
                >
                  <Ship className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Solar Ferry</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTransportPref('any')}
                  className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition flex items-center justify-center gap-1 ${
                    transportPref === 'any' ? 'bg-white shadow-xs text-stone-900 font-semibold' : 'text-stone-600'
                  }`}
                >
                  <span>Any</span>
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                Travel Party
              </label>
              <div className="flex rounded-lg border border-stone-200 p-1 bg-stone-50">
                {[
                  { count: 1, label: 'Solo' },
                  { count: 2, label: 'Couple' },
                  { count: 4, label: 'Family (4)' },
                ].map((item) => (
                  <button
                    key={item.count}
                    type="button"
                    onClick={() => setTravelers(item.count)}
                    className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition ${
                      travelers === item.count ? 'bg-white shadow-xs text-stone-900 font-semibold' : 'text-stone-600'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Duration */}
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1.5">
              Trip Duration Pace
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'short', label: '2–3 Days', sub: 'Mindful Getaway' },
                { id: 'medium', label: '4–5 Days', sub: 'Deep Immersion' },
                { id: 'extended', label: '7+ Days', sub: 'Slow Overland' },
              ].map((dur) => (
                <button
                  key={dur.id}
                  type="button"
                  onClick={() => setDurationPref(dur.id as any)}
                  className={`p-2 text-center rounded-lg border transition ${
                    durationPref === dur.id
                      ? 'border-emerald-700 bg-emerald-50 text-emerald-950 font-semibold'
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <div className="text-xs">{dur.label}</div>
                  <div className="text-[10px] text-stone-500">{dur.sub}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculation & Dynamic Matches Column */}
        <div className="lg:col-span-5 bg-stone-50 rounded-xl p-5 border border-stone-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Transparent Budget Allocation
              </span>
              <span className="text-xs font-bold text-stone-900 tabular-nums">
                Total for {travelers} {travelers === 1 ? 'traveler' : 'travelers'}: ${(budgetPerPerson * travelers).toLocaleString()}
              </span>
            </div>

            {/* Allocation breakdown bars */}
            <div className="space-y-3 mt-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-stone-600">Zero-Emission Transit (Electric Train / Ferry)</span>
                <span className="font-semibold text-stone-900 tabular-nums">${transportCost * travelers}</span>
              </div>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '28%' }} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-stone-600">Certified Eco-Lodge / Bio-Chalet Stay</span>
                <span className="font-semibold text-stone-900 tabular-nums">${stayCost * travelers}</span>
              </div>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-teal-600 h-full rounded-full" style={{ width: '44%' }} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-stone-600">Organic Farm Dining & Guided E-Biking</span>
                <span className="font-semibold text-stone-900 tabular-nums">${activitiesCost * travelers}</span>
              </div>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-600 h-full rounded-full" style={{ width: '22%' }} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-stone-600">Agroforestry & Coral Nursery Contribution</span>
                <span className="font-semibold text-stone-900 tabular-nums">${carbonImpactDonation * travelers}</span>
              </div>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-800 h-full rounded-full" style={{ width: '6%' }} />
              </div>
            </div>

            {/* Environmental Impact Counter */}
            <div className="mt-6 p-3 bg-emerald-50 rounded-lg border border-emerald-200/80">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Calculated Environmental Footprint</span>
              </div>
              <p className="mt-1 text-xs text-emerald-800 leading-snug">
                By choosing this low-carbon itinerary instead of regional flights & rental cars, you will avoid an estimated{' '}
                <strong className="font-bold tabular-nums">{estimatedCarbonAvoided} kg of CO2</strong> (equivalent to planting {Math.round(estimatedCarbonAvoided / 22)} trees).
              </p>
            </div>

            {/* Matched Packages Preview */}
            <div className="mt-5">
              <span className="text-xs font-semibold text-stone-600 block mb-2">
                Top Tailored Match for Your Budget:
              </span>
              {matchedItems.length > 0 ? (
                <div className="space-y-2">
                  {matchedItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onSelectHoliday(item)}
                      className="group p-2.5 bg-white rounded-lg border border-stone-200 hover:border-emerald-600 hover:shadow-xs transition cursor-pointer flex items-center gap-3"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-stone-900 group-hover:text-emerald-800 truncate">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-stone-500 flex items-center gap-1.5 mt-0.5">
                          <span>{item.duration}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-emerald-700 font-medium">-{Math.round((item.carbonSavedKg / item.flightComparisonKg) * 100)}% CO2</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-xs font-bold text-stone-900 tabular-nums">${item.price}</div>
                        <div className="text-[10px] text-stone-400">/ traveler</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-stone-500 py-3 text-center">
                  Adjust budget slider or preference to view matching packages.
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={() => {
                onApplyFilters(selectedVibe, budgetPerPerson);
                if (isModal && onClose) onClose();
              }}
              className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore All Matched Holidays in Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
