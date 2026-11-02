import React from 'react';
import {
  X,
  Ticket,
  ShieldCheck,
  TreePine,
  Sparkles,
  Calendar,
  MapPin,
  Train,
  CheckCircle2,
  Trash2,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import { BookingRecord } from '../types';
import { ECO_BADGES } from '../data/mockData';

interface ImpactDashboardModalProps {
  bookings: BookingRecord[];
  onClose: () => void;
  onViewTicket: (booking: BookingRecord) => void;
  onCancelBooking: (bookingId: string) => void;
  onStartBooking: () => void;
}

export const ImpactDashboardModal: React.FC<ImpactDashboardModalProps> = ({
  bookings,
  onClose,
  onViewTicket,
  onCancelBooking,
  onStartBooking,
}) => {
  const confirmedBookings = bookings.filter((b) => b.status === 'confirmed');

  const totalCarbonAvoided = confirmedBookings.reduce(
    (acc, b) => acc + b.totalCarbonSaved,
    0
  );

  const totalTreesSponsored = confirmedBookings.reduce(
    (acc, b) => acc + b.treesPlanted,
    0
  );

  const totalSpent = confirmedBookings.reduce(
    (acc, b) => acc + b.totalPrice,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-start justify-between bg-stone-50">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
              <Ticket className="w-4 h-4" />
              <span>Conscious Traveler Hub</span>
              <span aria-hidden="true">·</span>
              <span>Personal Impact Audit</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              My Green Trips & Climate Ledger
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Track your confirmed tickets, total avoided flight emissions, and certified trees sponsored.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-lg transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs">
          {/* Key Impact Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-[11px] text-emerald-800 font-medium block">
                Total CO2 Avoided
              </span>
              <span className="text-xl font-extrabold text-emerald-950 tabular-nums">
                {totalCarbonAvoided.toFixed(1)} kg
              </span>
              <span className="text-[10px] text-emerald-700 block mt-0.5">
                vs equivalent air travel
              </span>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[11px] text-stone-500 font-medium block">
                Confirmed Trips
              </span>
              <span className="text-xl font-extrabold text-stone-900 tabular-nums">
                {confirmedBookings.length}
              </span>
              <span className="text-[10px] text-stone-500 block mt-0.5">
                Zero-carbon journeys
              </span>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[11px] text-stone-500 font-medium block">
                Native Trees Sponsored
              </span>
              <span className="text-xl font-extrabold text-stone-900 tabular-nums">
                {totalTreesSponsored}
              </span>
              <span className="text-[10px] text-stone-500 block mt-0.5">
                Agroforestry co-ops
              </span>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[11px] text-stone-500 font-medium block">
                Sustainable Investment
              </span>
              <span className="text-xl font-extrabold text-stone-900 tabular-nums">
                ${totalSpent}
              </span>
              <span className="text-[10px] text-stone-500 block mt-0.5">
                Local green economy
              </span>
            </div>
          </div>

          {/* Unlocked Badges */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Conscious Traveler Badges</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {ECO_BADGES.map((badge, idx) => {
                const isUnlocked =
                  (idx === 0 && confirmedBookings.length >= 1) ||
                  (idx === 1 && totalCarbonAvoided >= 100) ||
                  (idx === 2 && totalTreesSponsored >= 2) ||
                  (idx === 3 && confirmedBookings.some((b) => b.item.type === 'package'));

                return (
                  <div
                    key={badge.id}
                    className={`p-3 rounded-xl border text-center transition ${
                      isUnlocked
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                        : 'bg-stone-50/60 border-stone-200 text-stone-400 opacity-60'
                    }`}
                  >
                    <div className="text-xs font-bold">{badge.title}</div>
                    <div className="text-[10px] mt-0.5 line-clamp-2">{badge.desc}</div>
                    <div className="text-[10px] font-semibold mt-1.5">
                      {isUnlocked ? '✓ Unlocked' : 'Locked'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bookings List */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center justify-between">
              <span>Your Booked Itineraries & Digital Tickets</span>
              <span className="text-stone-400 font-normal">
                {confirmedBookings.length} {confirmedBookings.length === 1 ? 'trip' : 'trips'}
              </span>
            </h3>

            {confirmedBookings.length > 0 ? (
              <div className="space-y-3">
                {confirmedBookings.map((b) => (
                  <div
                    key={b.bookingId}
                    className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <img
                        src={b.item.image}
                        alt={b.item.title}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-[11px] text-stone-500">
                          <span className="font-mono font-bold text-emerald-800">
                            {b.bookingId}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-stone-400" />
                            <span>{b.travelDate}</span>
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-stone-900 truncate mt-0.5">
                          {b.item.title}
                        </h4>

                        <div className="text-[11px] text-stone-600 flex items-center gap-2 mt-1">
                          <span>{b.passengerName}</span>
                          <span aria-hidden="true">·</span>
                          <span>{b.travelersCount} guest(s)</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-emerald-700 font-medium">
                            Saved {b.totalCarbonSaved} kg CO2
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:self-center shrink-0">
                      <button
                        onClick={() => onViewTicket(b)}
                        className="py-1.5 px-3 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        <span>View E-Pass</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Cancel booking ${b.bookingId}? Any carbon donations will be refunded.`)) {
                            onCancelBooking(b.bookingId);
                          }
                        }}
                        className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Cancel this booking"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 px-4 bg-stone-50 rounded-xl border border-dashed border-stone-200">
                <Ticket className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-stone-700">No trips booked yet</h4>
                <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                  Ready to travel without leaving a carbon scar? Browse electric trains, solar boats, and certified eco-lodges.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onStartBooking();
                  }}
                  className="mt-4 py-2 px-4 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg transition inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Sustainable Trips</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-5 text-xs font-semibold text-stone-700 hover:bg-stone-200 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
