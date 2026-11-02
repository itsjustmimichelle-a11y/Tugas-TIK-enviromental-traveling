import React from 'react';
import { Leaf, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenCalculator: () => void;
  onOpenHolidayBuilder: () => void;
  onSelectCategory: (cat: any) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCalculator,
  onOpenHolidayBuilder,
  onSelectCategory,
}) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-14 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-stone-800">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">TerraLoka</span>
            </div>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              The sustainable travel platform for conscious explorers. We connect travelers with electric high-speed rail networks, solar-hybrid ferries, and certified regenerative stays worldwide.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Low-Carbon Travel Coalition Member</span>
            </div>
          </div>

          {/* Column 2: Low-Carbon Transit */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Clean Transportation
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onSelectCategory('train')}
                  className="hover:text-white transition text-left"
                >
                  Scenic Electric Rail
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('ferry')}
                  className="hover:text-white transition text-left"
                >
                  Solar & Electric Ferries
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('train')}
                  className="hover:text-white transition text-left"
                >
                  Overnight Nightjet Sleepers
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCalculator}
                  className="hover:text-white transition text-left"
                >
                  Carbon vs Flight Benchmark
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Conscious Holidays */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Tailored Holidays
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={onOpenHolidayBuilder}
                  className="hover:text-white transition text-left"
                >
                  Budget & Vibe Holiday Tailor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('stay')}
                  className="hover:text-white transition text-left"
                >
                  Certified Bio-Lodges
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('package')}
                  className="hover:text-white transition text-left"
                >
                  Alpine Wildflower Treks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('package')}
                  className="hover:text-white transition text-left"
                >
                  Rainforest Permaculture Retreats
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Standards & Ethics */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Green Integrity
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <span className="text-stone-300">GHG Scope 3 Calculations</span>
              </li>
              <li>
                <span className="text-stone-300">EarthCheck & Green Key Partners</span>
              </li>
              <li>
                <span className="text-stone-300">Community Reinvestment Fund</span>
              </li>
              <li>
                <span className="text-stone-300">Zero Single-Use Plastic Guarantee</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quiet Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} TerraLoka Travel Systems Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Terms of Conscious Service</span>
            <span>Environmental Transparency Policy</span>
            <span>Partner with TerraLoka</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
