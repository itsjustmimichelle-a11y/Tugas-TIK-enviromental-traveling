import React from 'react';
import { ShieldCheck, Leaf, Zap, HeartHandshake, Award } from 'lucide-react';

export const EcoPledgeSection: React.FC = () => {
  return (
    <section className="py-16 bg-stone-100 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>The TerraLoka Environmental Standard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight [text-wrap:balance]">
            We Vet Every Mile. Zero Greenwashing, Zero Shortcuts.
          </h2>
          <p className="mt-3 text-sm text-stone-600 leading-relaxed">
            Unlike legacy travel platforms that merely sell cheap carbon offsets after burning jet fuel, TerraLoka prioritizes fundamental emission elimination through electric ground and marine transport, coupled with verified regenerative hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold mb-4">
              <Zap className="w-5 h-5 text-emerald-700" />
            </div>
            <h3 className="text-sm font-bold text-stone-900 mb-1.5">
              1. 100% Renewable Transit Grids
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We exclusively contract high-speed rail lines and electric ferry operators powered by certified hydro-electric, geothermal, and solar grids with regenerative braking.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold mb-4">
              <Award className="w-5 h-5 text-emerald-700" />
            </div>
            <h3 className="text-sm font-bold text-stone-900 mb-1.5">
              2. Certified Passive & Bio-Stays
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every lodge and chalet in our catalog holds verified Green Key, EarthCheck, or Passive House certification with biological greywater recycling and zero single-use plastics.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold mb-4">
              <HeartHandshake className="w-5 h-5 text-emerald-700" />
            </div>
            <h3 className="text-sm font-bold text-stone-900 mb-1.5">
              3. Living Wages & Direct Community Benefit
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              A minimum of 10% of booking commissions is routed directly to local community biodiversity corridors, organic farming co-operatives, and coral reef rehabilitation nurseries.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold mb-4">
              <Leaf className="w-5 h-5 text-emerald-700" />
            </div>
            <h3 className="text-sm font-bold text-stone-900 mb-1.5">
              4. GHG Scope 3 Algorithmic Audits
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Our emissions calculations strictly apply Greenhouse Gas Protocol Scope 3 travel standards, providing honest per-passenger carbon delta comparisons against aviation alternatives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
