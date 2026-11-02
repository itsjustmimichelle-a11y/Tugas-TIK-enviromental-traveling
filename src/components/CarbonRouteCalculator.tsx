import React, { useState } from 'react';
import {
  Train,
  Plane,
  Ship,
  Car,
  ShieldCheck,
  TreePine,
  ArrowRight,
  TrendingDown,
  Info,
  Clock,
  DollarSign,
} from 'lucide-react';
import { ROUTE_COMPARISONS } from '../data/mockData';

interface CarbonRouteCalculatorProps {
  onSelectRoute: (keyword: string) => void;
  isModal?: boolean;
  onClose?: () => void;
}

export const CarbonRouteCalculator: React.FC<CarbonRouteCalculatorProps> = ({
  onSelectRoute,
  isModal = false,
  onClose,
}) => {
  const [selectedRouteIdx, setSelectedRouteIdx] = useState(0);
  const currentRoute = ROUTE_COMPARISONS[selectedRouteIdx];

  // Find electric train or electric ferry vs flight
  const cleanOption = currentRoute.options.find(
    (o) => o.mode === 'electric_train' || o.mode === 'electric_ferry'
  ) || currentRoute.options[0];

  const flightOption = currentRoute.options.find((o) => o.mode === 'flight');

  const carbonDelta = flightOption
    ? Number((flightOption.co2Kg - cleanOption.co2Kg).toFixed(1))
    : 0;

  const percentageSaved = flightOption
    ? Math.round((carbonDelta / flightOption.co2Kg) * 100)
    : 0;

  return (
    <div className={isModal ? 'bg-white rounded-2xl p-6 sm:p-8 max-w-4xl w-full mx-auto max-h-[90vh] overflow-y-auto' : 'bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm'}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 pb-5 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Scope 3 Aviation vs Clean Rail Benchmark</span>
            <span aria-hidden="true">·</span>
            <span>Real-World Corridors</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            Carbon & Cost Comparison Calculator
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-stone-600">
            Compare real door-to-door carbon emissions, cost, and comfort across popular travel corridors.
          </p>
        </div>

        {isModal && onClose && (
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition"
            aria-label="Close dialog"
          >
            ✕
          </button>
        )}
      </div>

      {/* Corridor Selector Tabs */}
      <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {ROUTE_COMPARISONS.map((route, idx) => (
          <button
            key={route.route}
            onClick={() => setSelectedRouteIdx(idx)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              selectedRouteIdx === idx
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
            }`}
          >
            {route.route} ({route.distanceKm} km)
          </button>
        ))}
      </div>

      {/* Comparison Display */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Options Cards & Bar Charts */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Door-to-Door Transport Modes on {currentRoute.route}
          </div>

          <div className="space-y-3">
            {currentRoute.options.map((opt) => {
              const isClean = opt.mode === 'electric_train' || opt.mode === 'electric_ferry';
              const isFlight = opt.mode === 'flight';

              // Visual bar width relative to highest emission
              const maxCo2 = Math.max(...currentRoute.options.map((o) => o.co2Kg));
              const barWidth = Math.max(6, Math.round((opt.co2Kg / maxCo2) * 100));

              return (
                <div
                  key={opt.name}
                  className={`p-4 rounded-xl border transition-all ${
                    isClean
                      ? 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-300/60'
                      : 'bg-stone-50 border-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isClean
                            ? 'bg-emerald-800 text-white'
                            : isFlight
                            ? 'bg-stone-300 text-stone-700'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {opt.mode === 'electric_train' ? (
                          <Train className="w-4 h-4" />
                        ) : opt.mode === 'electric_ferry' ? (
                          <Ship className="w-4 h-4" />
                        ) : opt.mode === 'flight' ? (
                          <Plane className="w-4 h-4" />
                        ) : (
                          <Car className="w-4 h-4" />
                        )}
                      </div>

                      <div>
                        <div className="text-xs font-bold text-stone-900">{opt.name}</div>
                        <div className="text-[11px] text-stone-500 flex items-center gap-2 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-stone-400" />
                            <span>{opt.durationHours}</span>
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3 text-stone-400" />
                            <span className="tabular-nums font-semibold text-stone-700">~${opt.typicalCostUsd}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`text-base font-extrabold tabular-nums ${
                          isClean ? 'text-emerald-900' : 'text-stone-700'
                        }`}
                      >
                        {opt.co2Kg} kg
                      </div>
                      <div className="text-[10px] text-stone-500 uppercase tracking-wider">
                        CO2 / passenger
                      </div>
                    </div>
                  </div>

                  {/* Relative Carbon Bar */}
                  <div className="mt-3">
                    <div className="w-full bg-stone-200/80 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isClean ? 'bg-emerald-600' : isFlight ? 'bg-rose-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>

                  {/* Explanatory Advantage */}
                  <p className="mt-2 text-[11px] text-stone-600 leading-snug">
                    {opt.ecoAdvantage}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Benchmark Delta & Action */}
        <div className="lg:col-span-5 bg-stone-900 text-white rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4" />
              <span>Carbon Delta on This Corridor</span>
            </div>

            <div className="mt-3">
              <div className="text-4xl font-extrabold text-white tabular-nums">
                -{percentageSaved}%
              </div>
              <div className="text-xs text-stone-300 mt-1">
                Avoiding <strong className="text-emerald-300">{carbonDelta} kg of CO2</strong> per person by booking {cleanOption.name} instead of a commercial flight.
              </div>
            </div>

            {/* Tree Equivalency Graphic */}
            <div className="mt-6 p-4 rounded-lg bg-stone-800/80 border border-stone-700 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-300 font-semibold">
                <TreePine className="w-4 h-4" />
                <span>Environmental Equivalent</span>
              </div>
              <p className="text-stone-300 leading-relaxed text-[11px]">
                Saving {carbonDelta} kg of CO2 equals the annual carbon absorbed by{' '}
                <strong className="text-white">{Math.max(1, Math.round(carbonDelta / 22))} mature trees</strong> or driving 560 km in an average gasoline car.
              </p>
            </div>

            <div className="mt-4 text-[11px] text-stone-400 space-y-1">
              <div>• Station-to-station city center arrival saves 2–3 hours of airport transfers.</div>
              <div>• Zero luggage weight fees, zero liquids restrictions, free WiFi.</div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-800">
            <button
              onClick={() => {
                onSelectRoute(currentRoute.to.split(',')[0]);
                if (isModal && onClose) onClose();
              }}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Trips to {currentRoute.to.split(',')[0]}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
