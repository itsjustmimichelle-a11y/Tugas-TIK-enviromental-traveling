import React from 'react';
import {
  X,
  MapPin,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Leaf,
  Users,
  ArrowRight,
  Train,
  Ship,
  Sparkles,
} from 'lucide-react';
import { TravelItem } from '../types';

interface DetailModalProps {
  item: TravelItem | null;
  onClose: () => void;
  onBookNow: (item: TravelItem) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  item,
  onClose,
  onBookNow,
}) => {
  if (!item) return null;

  const carbonSavingsPercent = Math.round(
    (item.carbonSavedKg / item.flightComparisonKg) * 100
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-stone-900/60 hover:bg-stone-900 text-white rounded-full transition shadow-md"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto flex-1">
          {/* Hero Visual Area */}
          <div className="relative h-64 sm:h-80 w-full bg-stone-900">
            <img
              src={item.image}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/40 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center gap-2 text-xs text-emerald-300 font-semibold mb-1">
                <span>{item.destination}</span>
                <span aria-hidden="true">·</span>
                <span>{item.duration}</span>
                <span aria-hidden="true">·</span>
                <span>{item.country}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {item.title}
              </h2>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Carbon Footprint Delta Benchmark Strip */}
            <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-200">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-200/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-800" />
                  <span className="text-sm font-bold text-emerald-950">
                    Third-Party Verified Carbon Footprint
                  </span>
                </div>
                <span className="text-xs font-semibold text-emerald-800">
                  Green Score: {item.greenScore}/100
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-center">
                <div className="bg-white/80 p-3 rounded-lg border border-emerald-200/60">
                  <span className="text-[11px] text-stone-500 block">This Low-Carbon Journey</span>
                  <span className="text-lg font-extrabold text-emerald-900 tabular-nums">
                    {item.carbonEmissionKg.toFixed(1)} kg CO2
                  </span>
                </div>

                <div className="bg-white/80 p-3 rounded-lg border border-emerald-200/60">
                  <span className="text-[11px] text-stone-500 block">Conventional Flight / Car</span>
                  <span className="text-lg font-extrabold text-stone-500 tabular-nums line-through">
                    {item.flightComparisonKg.toFixed(1)} kg CO2
                  </span>
                </div>

                <div className="bg-emerald-800 text-white p-3 rounded-lg shadow-xs">
                  <span className="text-[11px] text-emerald-200 block">Carbon Avoided</span>
                  <span className="text-lg font-extrabold text-white tabular-nums">
                    -{carbonSavingsPercent}% ({item.carbonSavedKg.toFixed(1)} kg)
                  </span>
                </div>
              </div>

              <div className="mt-3 text-xs text-emerald-900 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Clean Power Source:</strong> {item.energySource}
                </span>
              </div>
            </div>

            {/* Description & Highlights */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-2">
                About This Sustainable Journey
              </h3>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                {item.description}
              </p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {item.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Day-by-day Itinerary (if available) */}
            {item.itinerary && item.itinerary.length > 0 && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-3">
                  Low-Carbon Itinerary & Transit Modes
                </h3>
                <div className="space-y-3">
                  {item.itinerary.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold mb-1">
                          <span>{step.day}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-stone-900 font-bold">{step.title}</span>
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed">{step.desc}</p>
                      </div>

                      <div className="sm:text-right shrink-0">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-stone-200 rounded-md text-[11px] font-semibold text-stone-700">
                          <Train className="w-3 h-3 text-emerald-700" />
                          <span>{step.transportMode}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inclusions & Certifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-stone-200">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  What's Included
                </h3>
                <ul className="space-y-1.5 text-xs text-stone-700">
                  {item.included.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Verified Eco-Certifications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.certifications.map((cert, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs font-medium text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-md"
                    >
                      {cert}
                    </span>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-600">
                  <div className="font-semibold text-stone-900 mb-1 flex items-center gap-1">
                    <Leaf className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Local Community & Ecosystem Impact</span>
                  </div>
                  <p>{item.localCommunityImpact}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Sticky Action Bar */}
        <div className="p-4 sm:p-6 bg-white border-t border-stone-200 flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-stone-500 block">Total starting from</span>
            <div className="text-2xl font-extrabold text-stone-900 tabular-nums">
              ${item.price}
              <span className="text-xs font-normal text-stone-500 ml-1">USD / person</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="py-2.5 px-4 text-xs font-semibold text-stone-700 hover:bg-stone-100 rounded-lg transition"
            >
              Back to Catalog
            </button>
            <button
              onClick={() => {
                onClose();
                onBookNow(item);
              }}
              className="py-2.5 px-6 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs transition flex items-center gap-1.5"
            >
              <span>Book Conscious Trip</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
