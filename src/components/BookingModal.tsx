import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Leaf,
  CheckCircle2,
  Lock,
  ArrowRight,
  Ticket,
  Calendar,
  User,
  Mail,
  Phone,
  Tag,
} from 'lucide-react';
import { TravelItem, BookingRecord } from '../types';

interface BookingModalProps {
  item: TravelItem;
  initialTravelDate: string;
  onClose: () => void;
  onBookingConfirmed: (booking: BookingRecord) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  item,
  initialTravelDate,
  onClose,
  onBookingConfirmed,
}) => {
  const [passengerName, setPassengerName] = useState('Alex Rivers');
  const [passengerEmail, setPassengerEmail] = useState('alex.rivers@mindfultravel.eco');
  const [passengerPhone, setPassengerPhone] = useState('+1 (555) 234-8901');
  const [travelDate, setTravelDate] = useState(
    initialTravelDate || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [travelersCount, setTravelersCount] = useState(1);
  const [seatPreference, setSeatPreference] = useState('panoramic_window');

  // Eco add-ons
  const [reusableKitAddon, setReusableKitAddon] = useState(false);
  const [organicMealAddon, setOrganicMealAddon] = useState(true);
  const [treeDonationCount, setTreeDonationCount] = useState(2); // 2 trees = $6

  // Promo code
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  // Calculations
  const baseTotal = item.price * travelersCount;
  const kitTotal = reusableKitAddon ? 14 * travelersCount : 0;
  const mealTotal = organicMealAddon ? 18 * travelersCount : 0;
  const treeDonationTotal = treeDonationCount * 3; // $3 per tree

  const subtotal = baseTotal + kitTotal + mealTotal + treeDonationTotal;
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const finalPrice = Math.max(0, subtotal - discountAmount);

  // Carbon metrics
  const totalCarbonAvoided = Number((item.carbonSavedKg * travelersCount).toFixed(1));
  const totalTreesSponsored = treeDonationCount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === 'GREENTRAVEL10' || cleanCode === 'ECO10') {
      setDiscountPercent(10);
      setCouponApplied(true);
    } else if (cleanCode === 'SLOWTRAVEL' || cleanCode === 'TERRA15') {
      setDiscountPercent(15);
      setCouponApplied(true);
    } else {
      setCouponError('Invalid voucher code. Try "GREENTRAVEL10" or "SLOWTRAVEL".');
    }
  };

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();

    if (!passengerName.trim() || !passengerEmail.trim()) {
      alert('Please provide your name and email address to receive your e-pass.');
      return;
    }

    const newBooking: BookingRecord = {
      bookingId: `TL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      itemId: item.id,
      item,
      passengerName: passengerName.trim(),
      passengerEmail: passengerEmail.trim(),
      passengerPhone: passengerPhone.trim(),
      travelDate,
      travelersCount,
      seatPreference,
      carbonOffsetDonation: treeDonationTotal,
      reusableKitAddon,
      organicMealAddon,
      discountAmount,
      totalPrice: finalPrice,
      totalCarbonSaved: totalCarbonAvoided,
      treesPlanted: totalTreesSponsored,
      status: 'confirmed',
      bookingTimestamp: new Date().toISOString(),
      qrCodeUrl: `https://terraloka.eco/verify/${item.id}`,
    };

    onBookingConfirmed(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 flex items-start justify-between bg-stone-50">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
              <Ticket className="w-4 h-4" />
              <span>Conscious Booking</span>
              <span aria-hidden="true">·</span>
              <span>Zero Paper E-Ticket</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
              {item.title}
            </h2>
            <div className="text-xs text-stone-500 mt-0.5">
              {item.destination} · {item.duration} · {item.certifications[0]}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200 rounded-lg transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleCompleteBooking} className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
          {/* Section 1: Passenger Info */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-stone-400" />
              <span>1. Lead Traveler Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  placeholder="e.g. Maya Lin"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Email (for E-Ticket Pass)</label>
                <input
                  type="email"
                  required
                  value={passengerEmail}
                  onChange={(e) => setPassengerEmail(e.target.value)}
                  placeholder="maya@example.com"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={passengerPhone}
                  onChange={(e) => setPassengerPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Travel Date</label>
                <input
                  type="date"
                  required
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Travelers Count</label>
                <div className="flex border border-stone-200 rounded-lg bg-stone-50 p-1">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setTravelersCount(num)}
                      className={`flex-1 py-1 text-xs font-semibold rounded-md transition ${
                        travelersCount === num
                          ? 'bg-emerald-800 text-white shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Carriage Preference</label>
                <select
                  value={seatPreference}
                  onChange={(e) => setSeatPreference(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white"
                >
                  <option value="panoramic_window">Panoramic Nature Window</option>
                  <option value="quiet_car">Silent Sanctuary Car (Work/Rest)</option>
                  <option value="bike_luggage">Bicycle / Green Gear Storage Bay</option>
                  <option value="family_table">Four-Top Wooden Table</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Sustainable Travel Add-ons */}
          <div className="pt-3 border-t border-stone-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-emerald-700" />
              <span>2. Conscious Journey Add-ons</span>
            </h3>

            <div className="space-y-2.5">
              {/* Organic Farm Lunch */}
              <label className="flex items-start gap-3 p-3 rounded-lg border border-stone-200 bg-stone-50/60 hover:bg-stone-50 transition cursor-pointer">
                <input
                  type="checkbox"
                  checked={organicMealAddon}
                  onChange={(e) => setOrganicMealAddon(e.target.checked)}
                  className="mt-0.5 rounded text-emerald-700 focus:ring-emerald-700 h-4 w-4"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-900">
                      Onboard Organic Farm-to-Seat Meal Box
                    </span>
                    <span className="font-bold text-stone-900 tabular-nums">
                      +$18 / traveler
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    100% locally sourced organic seasonal harvest, served in biodegradable banana leaf packaging.
                  </p>
                </div>
              </label>

              {/* Zero-Waste Kit */}
              <label className="flex items-start gap-3 p-3 rounded-lg border border-stone-200 bg-stone-50/60 hover:bg-stone-50 transition cursor-pointer">
                <input
                  type="checkbox"
                  checked={reusableKitAddon}
                  onChange={(e) => setReusableKitAddon(e.target.checked)}
                  className="mt-0.5 rounded text-emerald-700 focus:ring-emerald-700 h-4 w-4"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-900">
                      TerraLoka Zero-Waste Travel Kit
                    </span>
                    <span className="font-bold text-stone-900 tabular-nums">
                      +$14 / traveler
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Handmade organic cotton tote, polished bamboo cutlery set, and double-walled stainless flask.
                  </p>
                </div>
              </label>

              {/* Tree planting sponsor */}
              <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/50">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-emerald-950 block">
                      Agroforestry & Biodiversity Tree Stewardship
                    </span>
                    <span className="text-[11px] text-emerald-800">
                      Certified native trees planted with GPS tracking & farmer income guarantees.
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {[1, 2, 5].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setTreeDonationCount(count)}
                        className={`px-2 py-1 rounded text-[11px] font-semibold border transition ${
                          treeDonationCount === count
                            ? 'bg-emerald-800 text-white border-emerald-800'
                            : 'bg-white text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                        }`}
                      >
                        {count} {count === 1 ? 'tree' : 'trees'} (${count * 3})
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Voucher Code */}
          <div className="pt-3 border-t border-stone-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-stone-400" />
              <span>3. Green Voucher / Promo</span>
            </h3>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Try: GREENTRAVEL10 or SLOWTRAVEL"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700 uppercase"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg transition"
              >
                Apply
              </button>
            </div>
            {couponApplied && (
              <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                ✓ Promo code applied! {discountPercent}% discount deducted.
              </p>
            )}
            {couponError && (
              <p className="text-[11px] text-red-600 mt-1">{couponError}</p>
            )}
          </div>

          {/* Price & Carbon Impact Summary Box */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
            <div className="flex items-center justify-between text-stone-600">
              <span>Base Fare (${item.price} × {travelersCount} {travelersCount === 1 ? 'traveler' : 'travelers'})</span>
              <span className="tabular-nums font-medium text-stone-900">${baseTotal}</span>
            </div>

            {mealTotal > 0 && (
              <div className="flex items-center justify-between text-stone-600">
                <span>Organic Farm Meal Boxes</span>
                <span className="tabular-nums font-medium text-stone-900">+${mealTotal}</span>
              </div>
            )}

            {kitTotal > 0 && (
              <div className="flex items-center justify-between text-stone-600">
                <span>Zero-Waste Travel Kits</span>
                <span className="tabular-nums font-medium text-stone-900">+${kitTotal}</span>
              </div>
            )}

            {treeDonationTotal > 0 && (
              <div className="flex items-center justify-between text-stone-600">
                <span>Native Tree Stewardship ({treeDonationCount} trees)</span>
                <span className="tabular-nums font-medium text-stone-900">+${treeDonationTotal}</span>
              </div>
            )}

            {discountAmount > 0 && (
              <div className="flex items-center justify-between text-emerald-700 font-medium">
                <span>Green Travel Discount ({discountPercent}%)</span>
                <span className="tabular-nums">-${discountAmount}</span>
              </div>
            )}

            <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-stone-900">Total Conscious Price</span>
                <span className="block text-[11px] text-emerald-800 font-medium">
                  Includes all eco-taxes, port fees & carbon accounting
                </span>
              </div>
              <div className="text-xl font-extrabold text-stone-900 tabular-nums">
                ${finalPrice} <span className="text-xs font-normal text-stone-500">USD</span>
              </div>
            </div>

            {/* Total Avoided Carbon Banner */}
            <div className="mt-3 pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-emerald-900 font-semibold bg-emerald-50/70 p-2.5 rounded-lg">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Total Carbon Avoided on This Booking:</span>
              </span>
              <span className="tabular-nums font-bold text-emerald-950">
                {totalCarbonAvoided} kg CO2
              </span>
            </div>
          </div>

          {/* Submission button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-6 bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <Lock className="w-4 h-4" />
              <span>Confirm & Issue Digital Green E-Ticket</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-center text-[11px] text-stone-500 mt-2 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
              <span>Instant digital confirmation · Free cancellation up to 48h prior</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
