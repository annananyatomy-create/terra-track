import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Users,
  Compass,
  Award,
  Globe,
  Leaf,
  Zap,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { SpotlightCard } from '../components/SpotlightCard';

interface AboutPageProps {
  onOpenModal: () => void;
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenModal, onNavigate }) => {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="pt-12 pb-16 md:pt-16 md:pb-20 bg-gradient-to-b from-[#F5FFF9] via-white to-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16A34A]/10 text-xs font-bold text-[#16A34A] mb-4">
            <Compass className="w-3.5 h-3.5" />
            Our Vision & Engineering Philosophy
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#075985] tracking-tight">
            Engineering a Cleaner, <br />
            <span className="text-[#16A34A]">High-Impact Web</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Terra Track was founded on a simple conviction: the fastest, most reliable software architectures are also the ones that tread lightest on our planet.
          </p>
        </div>
      </section>

      {/* Origin & Core Philosophy */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold tracking-widest uppercase text-[#087FCE]">
                The Terra Track Blueprint
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#075985] tracking-tight">
                Why Sustainable Code Matters More Than Ever
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                The global internet accounts for more electricity consumption and greenhouse gas emissions than the aviation industry. Bloated dependencies, uncompressed assets, and inefficient algorithmic execution loops burn electricity on millions of devices around the clock.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                By enforcing strict bundle budgeting, tree-shaking, edge compute routing, and carbon-aware batch tasks, we deliver web applications that load in milliseconds while slashing digital emissions by up to 86%.
              </p>

              <div className="pt-2">
                <button
                  onClick={onOpenModal}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#087FCE] text-white text-sm font-bold hover:bg-[#075985] transition-all shadow-sm"
                >
                  <span>Request Technical Paper</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Impact Metric Cards */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#F5FFF9] to-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-subtle">
              <h3 className="font-bold text-slate-900 text-lg mb-6 flex items-center justify-between">
                <span>Audited Environmental Outcomes</span>
                <span className="text-xs font-semibold text-[#16A34A] bg-[#16A34A]/10 px-2.5 py-1 rounded-full">
                  Verified Data
                </span>
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span>Average Carbon Reduction Across Client Stacks</span>
                    <span className="text-[#16A34A]">86%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#16A34A] h-full rounded-full w-[86%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span>Clean Energy Server Utilization Rate</span>
                    <span className="text-[#087FCE]">99.8%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#087FCE] h-full rounded-full w-[99.8%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                    <span>Core Web Vitals Pass Rate (First Try)</span>
                    <span className="text-[#075985]">100%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#075985] h-full rounded-full w-full" />
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-[#16A34A] shrink-0" />
                <p className="text-xs text-slate-600 leading-normal">
                  Our systems are built in alignment with the Sustainable Web Manifesto and the Green Web Foundation compliance registries.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Pillars Grid */}
      <section className="py-16 md:py-20 bg-[#F5FFF9]/50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#075985]">
              Core Disciplines
            </span>
            <h2 className="text-3xl font-extrabold text-[#075985] mt-1">
              The Four Tenets of Terra Track Engineering
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SpotlightCard
              spotlightColor="rgba(8, 127, 206, 0.16)"
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-card-hover transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#087FCE]/10 text-[#087FCE] flex items-center justify-center font-bold text-sm mb-4">
                01
              </div>
              <h4 className="font-bold text-slate-900 text-base">Lean Codebases</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Eliminating unnecessary dependencies, redundant polyfills, and heavyweight runtimes cuts device power dissipation.
              </p>
            </SpotlightCard>

            <SpotlightCard
              spotlightColor="rgba(22, 163, 74, 0.16)"
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-card-hover transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center font-bold text-sm mb-4">
                02
              </div>
              <h4 className="font-bold text-slate-900 text-base">Carbon-Smart Cloud</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Algorithmic scheduling shifts asynchronous compute jobs dynamically to regions with surplus solar or wind generation.
              </p>
            </SpotlightCard>

            <SpotlightCard
              spotlightColor="rgba(7, 89, 133, 0.16)"
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-card-hover transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#075985]/10 text-[#075985] flex items-center justify-center font-bold text-sm mb-4">
                03
              </div>
              <h4 className="font-bold text-slate-900 text-base">Universal Accessibility</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Strict WCAG AA standards ensure keyboard navigation, screen reader semantic structure, and accessible contrast ratios.
              </p>
            </SpotlightCard>

            <SpotlightCard
              spotlightColor="rgba(22, 163, 74, 0.16)"
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-card-hover transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center font-bold text-sm mb-4">
                04
              </div>
              <h4 className="font-bold text-slate-900 text-base">Resilient Standards</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Modern standard HTML5/CSS3 semantics guarantee long-term stability without framework churn or forced rewrites.
              </p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Leadership & Values */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#075985] via-[#087FCE] to-[#16A34A] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                Join Our Mission
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold">Ready to evaluate your digital footprint?</h3>
              <p className="text-white/80 text-sm max-w-xl">
                We provide complimentary carbon audits for tech, education, and enterprise organizations seeking sustainable web practices.
              </p>
            </div>
            <div className="flex gap-4 shrink-0">
              <button
                onClick={onOpenModal}
                className="px-6 py-3.5 rounded-xl bg-white text-[#075985] font-bold text-sm hover:bg-[#F5FFF9] transition-all shadow-md"
              >
                Book Free Audit
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 rounded-xl border border-white/40 text-white font-bold text-sm hover:bg-white/10 transition-all"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
