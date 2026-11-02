import React from 'react';
import {
  Train,
  Ship,
  Hotel,
  Sparkles,
  MapPin,
  Star,
  ShieldCheck,
  ArrowRight,
  Zap,
} from 'lucide-react';
import { TravelItem } from '../types';

interface ListingCardProps {
  item: TravelItem;
  onViewDetails: (item: TravelItem) => void;
  onQuickBook: (item: TravelItem) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  item,
  onViewDetails,
  onQuickBook,
}) => {
  const getCategoryIcon = () => {
    switch (item.type) {
      case 'train':
        return <Train className="w-3.5 h-3.5 text-emerald-700" />;
      case 'ferry':
        return <Ship className="w-3.5 h-3.5 text-emerald-700" />;
      case 'stay':
        return <Hotel className="w-3.5 h-3.5 text-emerald-700" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-emerald-700" />;
    }
  };

  const getCategoryLabel = () => {
    switch (item.type) {
      case 'train':
        return 'Electric Rail';
      case 'ferry':
        return 'Solar / Electric Ferry';
      case 'stay':
        return 'Certified Eco-Stay';
      default:
        return 'Tailored Eco-Holiday';
    }
  };

  // Percentage of carbon saved vs flying
  const carbonSavingsPercent = Math.round(
    (item.carbonSavedKg / item.flightComparisonKg) * 100
  );

  return (
    <article className="group bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Visual Frame */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
          <img
            src={item.image}
            alt={item.title}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          />

          {/* Subdued contrast gradient at bottom for legibility if needed */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />

          {/* Quiet Category Marker in top-left (Clean Unboxed or subtle glass tag) */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-stone-800 text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1.5 border border-stone-200/60">
            {getCategoryIcon()}
            <span>{getCategoryLabel()}</span>
          </div>

          {/* Rating tag in top-right */}
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-stone-900 text-[11px] font-bold px-2 py-1 rounded-md shadow-xs flex items-center gap-1 border border-stone-200/60">
            <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
            <span className="tabular-nums">{item.rating.toFixed(2)}</span>
            <span className="text-stone-400 font-normal">({item.reviewCount})</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          {/* Section 1.A: Unboxed metadata with typographic separators */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5 flex-wrap">
            <span className="flex items-center gap-1 text-stone-700 font-medium">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>{item.destination}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{item.duration}</span>
            <span aria-hidden="true">·</span>
            <span>{item.country}</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onViewDetails(item)}
            className="text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors cursor-pointer leading-snug line-clamp-2"
          >
            {item.title}
          </h3>

          {/* Carbon Footprint & Renewable Power Row */}
          <div className="mt-3 pt-3 border-t border-stone-100 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-600 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Avoided Carbon:</span>
              </span>
              <span className="font-semibold text-emerald-800 tabular-nums">
                -{carbonSavingsPercent}% CO2 ({item.carbonSavedKg.toFixed(1)} kg)
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-stone-500">
              <span className="flex items-center gap-1 truncate pr-2">
                <Zap className="w-3 h-3 text-amber-600 shrink-0" />
                <span className="truncate">{item.energySource}</span>
              </span>
              <span className="shrink-0 font-medium text-stone-700">
                Green Score: {item.greenScore}/100
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer with Price baseline and CTAs */}
      <div className="px-5 pb-5 pt-2">
        <div className="flex items-end justify-between gap-4 mb-3">
          <div>
            <div className="text-[11px] text-stone-500">From / person</div>
            <div className="text-xl font-bold text-stone-900 tabular-nums">
              ${item.price}
              <span className="text-xs font-normal text-stone-500 ml-1">USD</span>
            </div>
          </div>

          <div className="text-right text-[11px] text-emerald-700 font-medium">
            <span>{item.certifications[0]}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onViewDetails(item)}
            className="w-full py-2 px-3 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition text-center cursor-pointer"
          >
            Itinerary & Specs
          </button>
          <button
            type="button"
            onClick={() => onQuickBook(item)}
            className="w-full py-2 px-3 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer shadow-xs"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
