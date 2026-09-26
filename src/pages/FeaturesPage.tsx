import React, { useState } from 'react';
import {
  ThermometerSun,
  CloudSun,
  Flame,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Zap,
  Globe2,
  Leaf,
  Layers,
  Award,
  Clock,
  HeartHandshake
} from 'lucide-react';
import { SpotlightCard } from '../components/SpotlightCard';
import { CourseProgramView } from '../components/CourseProgramView';

interface FeaturesPageProps {
  onOpenModal: () => void;
  onNavigate: (page: string) => void;
  initialSection?: 'summary' | 'lessons';
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({
  onOpenModal,
  onNavigate,
  initialSection = 'summary'
}) => {
  // Mode toggle: 'summary' (Part 1) vs 'lessons' (Part 2)
  const [activeSection, setActiveSection] = useState<'summary' | 'lessons'>(initialSection);

  // Sync activeSection if initialSection changes externally
  React.useEffect(() => {
    if (initialSection) {
      setActiveSection(initialSection);
    }
  }, [initialSection]);

  // Part 1: Detailed summaries on the 4 core topics requested
  const summaryTopics = [
    {
      id: 'increasing-temperature',
      number: '01',
      title: 'Increasing Temperature',
      subtitle: 'Planetary Heat Buildup & Radiative Forcing',
      color: '#087FCE',
      spotlight: 'rgba(8, 127, 206, 0.22)',
      icon: ThermometerSun,
      badge: 'Core Metric: +1.24°C Anomaly',
      description:
        'Earth’s global average surface temperature has surged by more than +1.2°C above the pre-industrial benchmark (1850–1900). This thermal spike is driven by an atmospheric radiative imbalance: the planet is currently absorbing roughly 0.8 to 1.0 Watts per square meter more solar energy than it radiates back to space. Over 90% of this excess thermal energy is absorbed by the world’s oceans, elevating sea surface temperatures, fueling marine heatwaves, and driving continuous global temperature records.',
      keyMetrics: [
        '+1.24°C global mean surface temperature rise since 1850',
        '90%+ of trapped heat energy absorbed by oceans',
        'Arctic warming 3 to 4 times faster (Arctic Amplification)',
        '10 warmest years on geological record occurred since 2014'
      ]
    },
    {
      id: 'change-weather-patterns',
      number: '02',
      title: 'Change of Weather Patterns Due to Increase in Temperature',
      subtitle: 'Atmospheric Thermodynamics & Jet Stream Meanders',
      color: '#075985',
      spotlight: 'rgba(7, 89, 133, 0.22)',
      icon: CloudSun,
      badge: 'Climatic Volatility: +38%',
      description:
        'As ambient air warms, its moisture-holding capacity expands exponentially according to the Clausius-Clapeyron equation (~7% more water vapor per 1°C of warming). This thermodynamic shift supercharges extreme precipitation and severe atmospheric rivers while simultaneously desiccating soils in arid zones. Concurrently, a shrinking temperature gradient between the equator and the Arctic weakens and destabilizes the polar jet stream, creating persistent atmospheric blocking ridges (heat domes) that lock intense heatwaves or torrential storms in place for weeks.',
      keyMetrics: [
        '7% increased atmospheric moisture capacity per 1°C of thermal rise',
        'Slowing jet stream driving persistent stagnant heat domes',
        'Severe intensification of Category 4 and 5 tropical cyclones',
        'Disruption of seasonal Asian and West African monsoon cycles'
      ]
    },
    {
      id: 'causes-temperature-spike',
      number: '03',
      title: 'Causes of Temperature Spike',
      subtitle: 'Anthropogenic Emissions & Carbon Sink Destruction',
      color: '#ef4444',
      spotlight: 'rgba(239, 68, 68, 0.22)',
      icon: Flame,
      badge: 'Fossil Emissions: 37+ Gt CO₂/yr',
      description:
        'The primary catalyst of the modern temperature spike is the rapid combustion of fossil fuels (coal, petroleum, natural gas) for electricity generation, industrial manufacturing, and global transport. These activities vent over 37 billion metric tons of CO₂ into the troposphere annually, driving atmospheric concentrations above 422 ppm (up from 280 ppm pre-industrial). In addition, massive deforestation (especially in the Amazon and Southeast Asia) eliminates vital carbon sinks, while agricultural livestock and gas pipeline leaks release potent methane (CH₄) that traps 80× more heat over a 20-year timescale.',
      keyMetrics: [
        'Carbon Dioxide (CO₂) accounts for ~76% of net greenhouse emissions',
        'Atmospheric CO₂ surged from 280 ppm to over 422 ppm',
        'Methane (CH₄) leaks and cattle digestion drive 16% of warming',
        'Deforestation and land clearance account for 10%–15% of emissions'
      ]
    },
    {
      id: 'prevention-methods',
      number: '04',
      title: 'Prevention Methods',
      subtitle: 'Systemic Decarbonization & Regenerative Development',
      color: '#16A34A',
      spotlight: 'rgba(22, 163, 74, 0.22)',
      icon: ShieldCheck,
      badge: 'Target: Net-Zero by 2050',
      description:
        'Halting and reversing temperature rise demands a comprehensive, science-backed transition: tripling global renewable energy capacity (solar PV and wind) by 2030, deploying utility-scale battery storage, electrifying transportation fleets, and decarbonizing heavy industry through green hydrogen. In parallel, nature-based solutions—including the restoration of coastal mangrove wetlands (which sequester up to 4× more carbon per hectare than tropical forests), peatland re-wetting, regenerative agroforestry, circular material reuse, and energy efficiency retrofits—provide proven, scalable pathways to net-zero emissions.',
      keyMetrics: [
        'Solar and wind power costs plummeted 60%–85% over the past decade',
        'Tripling renewable energy capacity target by 2030 (COP28 mandate)',
        'Coastal blue carbon ecosystems sequester up to 4× more CO₂',
        'Circular manufacturing reducing embodied cement and steel emissions'
      ]
    }
  ];

  const handleContinueToLessons = () => {
    setActiveSection('lessons');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Page Header & Switcher Banner */}
      <section className="pt-12 pb-16 md:pt-16 md:pb-20 bg-gradient-to-b from-[#F5FFF9] via-white to-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16A34A]/10 text-xs font-bold text-[#16A34A] mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Comprehensive Climate Curriculum • Features & Lessons</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#075985] tracking-tight leading-tight">
            Climate Dynamics & <span className="text-[#16A34A]">Interactive Lessons</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Explore in-depth scientific summaries on rising global temperature, changing weather patterns, primary causes, and prevention methods—then continue into the gamified questionnaire course to earn rewards.
          </p>

          {/* Section Navigation Tabs: Part 1 vs Part 2 */}
          <div className="mt-8 inline-flex p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200 shadow-inner">
            <button
              onClick={() => setActiveSection('summary')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeSection === 'summary'
                  ? 'bg-white text-[#075985] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Part 1: Topic Summaries & Descriptions
            </button>
            <button
              onClick={() => setActiveSection('lessons')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeSection === 'lessons'
                  ? 'bg-[#16A34A] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Part 2: Interactive Course Programme & Gamification</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {activeSection === 'summary' ? (
            /* PART 1: BRIEF SUMMARY ON TOPICS WITH THOROUGH DESCRIPTIONS */
            <div className="space-y-16">
              
              {/* Introduction Callout */}
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-bold uppercase tracking-wider text-[#087FCE]">
                  Curriculum Overview • Part 1
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Core Foundations of Planetary Climate Science
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2">
                  Read through each key topic below to understand the mechanisms of global warming, then proceed to the interactive lessons.
                </p>
              </div>

              {/* 4 Topic Cards with Comprehensive Descriptions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {summaryTopics.map((topic) => {
                  const IconComponent = topic.icon;

                  return (
                    <SpotlightCard
                      key={topic.id}
                      spotlightColor={topic.spotlight}
                      className="rounded-3xl p-7 sm:p-9 border border-slate-200/90 bg-white hover:border-[#16A34A]/50 shadow-sm hover:shadow-card-hover transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Header Row: Icon, Number, Badge */}
                        <div className="flex items-center justify-between gap-3 mb-5">
                          <div
                            className="w-13 h-13 rounded-2xl flex items-center justify-center shadow-sm"
                            style={{
                              backgroundColor: `${topic.color}15`,
                              color: topic.color
                            }}
                          >
                            <IconComponent className="w-6 h-6" />
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                              Topic {topic.number}
                            </span>
                            <span className="text-xs font-bold text-[#16A34A] bg-[#F5FFF9] px-2.5 py-1 rounded-md border border-[#16A34A]/30">
                              {topic.badge}
                            </span>
                          </div>
                        </div>

                        {/* Title & Subtitle */}
                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                          {topic.title}
                        </h3>
                        <div className="text-xs font-semibold text-[#075985] mt-1">
                          {topic.subtitle}
                        </div>

                        {/* Comprehensive Description */}
                        <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                          {topic.description}
                        </p>

                        {/* Key Metrics / Highlights */}
                        <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                            Key Verified Evidence:
                          </span>
                          {topic.keyMetrics.map((metric, mIdx) => (
                            <div key={mIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                              <span>{metric}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400">
                          Included in Lesson Questionnaire
                        </span>
                        <button
                          onClick={handleContinueToLessons}
                          className="text-xs font-bold text-[#087FCE] hover:text-[#16A34A] inline-flex items-center gap-1 transition-colors group"
                        >
                          <span>Explore in Course</span>
                          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </SpotlightCard>
                  );
                })}
              </div>

              {/* TRANSITION BUTTON: "Continue to lessons" */}
              <div className="pt-8 text-center">
                <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#F5FFF9] via-white to-[#F5FFF9] border-2 border-[#16A34A]/30 shadow-md max-w-3xl mx-auto space-y-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#087FCE] to-[#16A34A] text-white flex items-center justify-center mx-auto shadow-md">
                    <Sparkles className="w-7 h-7 text-amber-300" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#075985]">
                    Ready to Test Your Knowledge & Earn Rewards?
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
                    Proceed to the interactive course. Each questionnaire has 5 questions carrying a total of 20 points (100 points total). Check answers <strong className="text-emerald-700">on the spot</strong>, and gain <strong className="text-emerald-700">permission to advance to the next chapter only if at least 2 answers are correct</strong>. Scores of <strong>80%+ earn an extra +5 bonus points</strong>!
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={handleContinueToLessons}
                      className="inline-flex items-center justify-center px-9 py-4 rounded-xl text-base font-bold text-white bg-[#16A34A] hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl active:scale-95 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A]"
                    >
                      <BookOpen className="w-5 h-5 mr-2" />
                      <span>Continue to Lessons (Part 2)</span>
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 pt-2">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                      5 Interactive Lessons + Quizzes
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#087FCE]" />
                      100 Total Points + 25 Bonus Points
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                      Redeemable Discount Coupons
                    </span>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* PART 2: INTERACTIVE COURSE PROGRAMME WITH GAMIFIED LESSONS 1 TO 6 */
            <CourseProgramView
              onBackToOverview={() => {
                setActiveSection('summary');
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
              onOpenModal={onOpenModal}
            />
          )}

        </div>
      </section>
    </div>
  );
};
