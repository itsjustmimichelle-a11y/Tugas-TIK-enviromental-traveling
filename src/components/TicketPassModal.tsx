import React, { useRef } from 'react';
import {
  X,
  CheckCircle2,
  Download,
  Share2,
  ShieldCheck,
  TreePine,
  Calendar,
  User,
  MapPin,
  Train,
  Ship,
  Sparkles,
  QrCode,
  Printer,
} from 'lucide-react';
import { BookingRecord } from '../types';

interface TicketPassModalProps {
  booking: BookingRecord | null;
  onClose: () => void;
  onViewAllTrips: () => void;
}

export const TicketPassModal: React.FC<TicketPassModalProps> = ({
  booking,
  onClose,
  onViewAllTrips,
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Printable Ticket Container */}
        <div ref={printRef} className="p-6 sm:p-8 bg-white">
          {/* Top Success Banner */}
          <div className="text-center pb-6 border-b border-dashed border-stone-200">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Booking Confirmed & Verified
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 mt-0.5">
              Digital Green Pass & E-Ticket
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Zero paper required. Present this digital pass at check-in or boarding gates.
            </p>
          </div>

          {/* Ticket Body Card */}
          <div className="mt-6 bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden">
            {/* Ticket Header */}
            <div className="bg-emerald-900 text-white p-4 sm:p-5 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-medium text-emerald-200 uppercase tracking-wider">
                  Ticket Reference
                </span>
                <div className="text-xl font-mono font-bold tracking-wider">{booking.bookingId}</div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-medium text-emerald-200 uppercase tracking-wider">
                  Status
                </span>
                <div className="text-xs font-bold bg-emerald-800 px-2.5 py-0.5 rounded-full mt-0.5 inline-block">
                  CONFIRMED
                </div>
              </div>
            </div>

            {/* Ticket Route Details */}
            <div className="p-5 space-y-4">
              <div>
                <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                  Journey / Destination
                </span>
                <div className="text-base font-bold text-stone-900 mt-0.5">
                  {booking.item.title}
                </div>
                <div className="text-xs text-stone-600 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>
                    {booking.item.origin ? `${booking.item.origin} → ` : ''}
                    {booking.item.destination} ({booking.item.country})
                  </span>
                </div>
              </div>

              {/* Passenger & Date Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-stone-200 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-stone-400 block">
                    Lead Traveler
                  </span>
                  <span className="font-bold text-stone-800">{booking.passengerName}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-semibold text-stone-400 block">
                    Travel Date
                  </span>
                  <span className="font-bold text-stone-800">{booking.travelDate}</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-semibold text-stone-400 block">
                    Travelers
                  </span>
                  <span className="font-bold text-stone-800">
                    {booking.travelersCount} {booking.travelersCount === 1 ? 'Guest' : 'Guests'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-semibold text-stone-400 block">
                    Carriage Choice
                  </span>
                  <span className="font-medium text-stone-800 capitalize">
                    {booking.seatPreference.replace('_', ' ')}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-semibold text-stone-400 block">
                    Total Fare Paid
                  </span>
                  <span className="font-bold text-stone-900 tabular-nums">
                    ${booking.totalPrice} USD
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-semibold text-stone-400 block">
                    Clean Energy
                  </span>
                  <span className="font-medium text-emerald-800 truncate block">
                    {booking.item.energySource.split('&')[0]}
                  </span>
                </div>
              </div>

              {/* Certified Environmental Impact Badge */}
              <div className="p-3.5 bg-emerald-100/70 rounded-xl border border-emerald-300 text-xs text-emerald-950 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0" />
                  <div>
                    <span className="font-bold block">Verified Carbon Avoidance Certificate</span>
                    <span className="text-[11px] text-emerald-800">
                      Calculated under GHG Protocol scope 3 travel benchmarks
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-base font-extrabold text-emerald-900 tabular-nums">
                    {booking.totalCarbonSaved} kg
                  </div>
                  <div className="text-[10px] text-emerald-700">CO2 Avoided</div>
                </div>
              </div>

              {/* QR Code and Barcode simulation */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-white p-1 rounded-lg border border-stone-300 flex items-center justify-center">
                    {/* Simulated SVG QR Code */}
                    <svg viewBox="0 0 100 100" className="w-full h-full text-stone-900 fill-current">
                      <rect x="10" y="10" width="25" height="25" rx="3" />
                      <rect x="15" y="15" width="15" height="15" fill="#f5f5f4" />
                      <rect x="18" y="18" width="9" height="9" />
                      <rect x="65" y="10" width="25" height="25" rx="3" />
                      <rect x="70" y="15" width="15" height="15" fill="#f5f5f4" />
                      <rect x="73" y="18" width="9" height="9" />
                      <rect x="10" y="65" width="25" height="25" rx="3" />
                      <rect x="15" y="70" width="15" height="15" fill="#f5f5f4" />
                      <rect x="18" y="73" width="9" height="9" />
                      <circle cx="45" cy="45" r="5" />
                      <rect x="42" y="15" width="6" height="15" />
                      <rect x="65" y="42" width="15" height="6" />
                      <rect x="42" y="65" width="12" height="12" />
                      <rect x="60" y="65" width="10" height="20" />
                      <rect x="75" y="75" width="15" height="10" />
                    </svg>
                  </div>
                  <div className="text-[11px] text-stone-500">
                    <span className="font-semibold text-stone-800 block">Scan at Gate / Boarding</span>
                    <span>Valid across partner electric rail & ferry terminals</span>
                  </div>
                </div>

                {booking.treesPlanted > 0 && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                    <TreePine className="w-4 h-4 text-emerald-700" />
                    <span className="font-semibold">{booking.treesPlanted} Native Trees Sponsored</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handlePrint}
              className="w-full sm:flex-1 py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF Pass</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onViewAllTrips();
              }}
              className="w-full sm:flex-1 py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View in My Green Trips</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
