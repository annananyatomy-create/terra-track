import React, { useRef, useState } from 'react';
import {
  CloudSun,
  Globe2,
  AlertTriangle,
  Compass,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ThermometerSun,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Award,
  Clock,
  Layers,
  Leaf,
  Droplets,
  Wind
} from 'lucide-react';
import { SpotlightCard } from '../components/SpotlightCard';
import { MotionGlobe } from '../components/MotionGlobe';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenModal: () => void;
  activeTab: 'fast' | 'eco' | 'responsive';
  setActiveTab: (tab: 'fast' | 'eco' | 'responsive') => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenModal,
  activeTab,
  setActiveTab,
}) => {
  // Ultra-smooth 3D Parallax Tilt ref (Zero React re-renders for buttery 120fps smoothness)
  const heroOrbRef = useRef<HTMLDivElement>(null);
  const chip1Ref = useRef<HTMLDivElement>(null);
  const chip2Ref = useRef<HTMLDivElement>(null);
  const chip3Ref = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  // Active curriculum module selected for deep-dive preview
  const [selectedModule, setSelectedModule] = useState<number>(0);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroOrbRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rx = -(y / rect.height) * 14;
    const ry = (x / rect.width) * 14;
    const tx = (x / rect.width) * 15;
    const ty = (y / rect.height) * 15;

    heroOrbRef.current.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    if (coreRef.current) {
      coreRef.current.style.transform = `translateZ(30px) translate3d(${(tx * 0.5).toFixed(1)}px, ${(ty * 0.5).toFixed(1)}px, 0)`;
    }
    if (chip1Ref.current) {
      chip1Ref.current.style.transform = `translateZ(50px) translate3d(${(tx * 1.3).toFixed(1)}px, ${(ty * 1.3).toFixed(1)}px, 0)`;
    }
    if (chip2Ref.current) {
      chip2Ref.current.style.transform = `translateZ(45px) translate3d(${(-tx * 1.1).toFixed(1)}px, ${(-ty * 1.1).toFixed(1)}px, 0)`;
    }
    if (chip3Ref.current) {
      chip3Ref.current.style.transform = `translateZ(40px) translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0)`;
    }
  };

  const handleHeroMouseLeave = () => {
    if (heroOrbRef.current) {
      heroOrbRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
    }
    if (coreRef.current) coreRef.current.style.transform = `translateZ(30px) translate3d(0, 0, 0)`;
    if (chip1Ref.current) chip1Ref.current.style.transform = `translateZ(50px) translate3d(0, 0, 0)`;
    if (chip2Ref.current) chip2Ref.current.style.transform = `translateZ(45px) translate3d(0, 0, 0)`;
    if (chip3Ref.current) chip3Ref.current.style.transform = `translateZ(40px) translate3d(0, 0, 0)`;
  };

  const curriculumModules = [
    {
      id: 0,
      title: "Changing Weather Patterns Due to Rising Heat",
      tagline: "Atmospheric & Thermodynamic Disruption",
      icon: CloudSun,
      badge: "Module 01",
      color: "#087FCE",
      spotlight: "rgba(8, 127, 206, 0.22)",
      description: "Understand the science behind intensifying heatwaves, erratic precipitation, prolonged droughts, and shifting monsoon cycles driven by rising atmospheric and oceanic temperatures.",
      highlights: [
        "Thermodynamic expansion and humidity saturation",
        "Disrupted polar vortex and slowing jet stream patterns",
        "Urban heat island intensification in metropolitan centers",
        "Flash droughts and agricultural growing window shifts"
      ],
      duration: "30 Min Read",
      level: "Foundational"
    },
    {
      id: 1,
      title: "Globally Affected Areas & Their Contributions to Temperature Rise",
      tagline: "Geographic Vulnerability & Emission Hotspots",
      icon: Globe2,
      badge: "Module 02",
      color: "#16A34A",
      spotlight: "rgba(22, 163, 74, 0.22)",
      description: "Explore frontline geographical regions experiencing acute environmental shifts, alongside the industrial, transport, and energy sectors contributing most heavily to global thermal increase.",
      highlights: [
        "Polar ice sheets, permafrost thaw, and albedo feedback loops",
        "Low-lying coastal plains and small island developing states (SIDS)",
        "Major industrial manufacturing belts and fossil fuel corridors",
        "Deforestation hot zones in tropical rainforest biomes"
      ],
      duration: "40 Min Read",
      level: "Intermediate"
    },
    {
      id: 2,
      title: "In Future: Critical Concerns on the Matter",
      tagline: "Projected Climate Horizons & Ecological Tipping Points",
      icon: AlertTriangle,
      badge: "Module 03",
      color: "#075985",
      spotlight: "rgba(7, 89, 133, 0.22)",
      description: "Examine predictive climate models, irreversible ecological thresholds, resource scarcity risks, and global socio-economic implications if warming exceeds 1.5°C and 2.0°C boundaries.",
      highlights: [
        "Coral reef bleaching and oceanic acidification tipping points",
        "Freshwater aquifer depletion and transboundary water stress",
        "Mass migration pressures and climate-induced economic volatility",
        "Extreme storm frequency scaling beyond historical return periods"
      ],
      duration: "35 Min Read",
      level: "Deep-Dive"
    },
    {
      id: 3,
      title: "Measures Needed to Build Sustainable Development Plans & Ideas",
      tagline: "Actionable Frameworks for Net-Zero Transformation",
      icon: Compass,
      badge: "Module 04",
      color: "#16A34A",
      spotlight: "rgba(52, 211, 153, 0.24)",
      description: "Discover practical, science-backed blueprints to overcome ecological crises: decentralized clean energy grids, carbon-neutral architecture, circular waste cycles, and nature-based carbon capture.",
      highlights: [
        "Clean power transition (solar, wind, geothermal & storage grids)",
        "Sustainable urban design, permeable pavements, and mass transit",
        "Regenerative agriculture, soil carbon banking, and agroforestry",
        "Circular industrial economies with zero landfill waste policies"
      ],
      duration: "45 Min Read",
      level: "Strategic"
    },
    {
      id: 4,
      title: "Contributions Made & Actions Needed to Achieve Those Measures",
      tagline: "Global Milestones & Your Immediate Action Roadmap",
      icon: HeartHandshake,
      badge: "Module 05",
      color: "#087FCE",
      spotlight: "rgba(16, 185, 129, 0.22)",
      description: "Analyze the international treaties, municipal policies, and corporate pledges enacted so far—and unpack the essential civic, enterprise, and personal contributions required to fulfill them.",
      highlights: [
        "The Paris Agreement benchmarks & COP accountability mechanisms",
        "Renewable energy capacity milestones and grid parity progress",
        "Corporate ESG disclosure standards and supply chain audits",
        "Practical household, community, and career action playbooks"
      ],
      duration: "35 Min Read",
      level: "Applied Action"
    }
  ];

  return (
    <div>
      {/* 1. Hero Section with Requested Main Tagline & Description */}
      <section
        id="home"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32 bg-gradient-to-b from-[#F5FFF9]/80 via-white to-white"
      >
        {/* Subtle background ambient geometric circles */}
        <div
          className="absolute top-0 right-1/4 w-96 h-96 bg-[#087FCE]/5 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/3 left-10 w-80 h-80 bg-[#16A34A]/5 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Requested Taglines, Description & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Meta indicator */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F5FFF9] border border-[#16A34A]/30 text-xs font-semibold text-[#075985] mx-auto lg:mx-0 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                <span>Open Educational Initiative • 100% Free Learning Platform</span>
              </div>

              {/* Main Headline Tagline requested by user */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Think Climate. <br />
                <span className="text-[#16A34A]">Act Today.</span> <br className="hidden sm:inline" />
                <span className="text-[#087FCE]">Protect Tomorrow.</span>
              </h1>

              {/* Description below main tagline requested by user */}
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                A free learning experience on <span className="font-semibold text-slate-800">rising climate</span>,{' '}
                <span className="font-semibold text-slate-800">change in weather patterns</span>, and{' '}
                <span className="font-semibold text-[#16A34A]">how to move forwards sustainably</span>.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={onOpenModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold text-white bg-[#087FCE] hover:bg-[#075985] transition-all shadow-md hover:shadow-lg active:scale-95 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087FCE] focus-visible:ring-offset-2"
                >
                  <BookOpen className="w-5 h-5 mr-2 text-[#34d399]" />
                  <span>Start Your Free Course</span>
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => onNavigate('features')}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-xl text-base font-semibold text-[#075985] bg-white border border-slate-200 hover:border-[#16A34A]/50 hover:bg-[#F5FFF9] transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A]"
                >
                  <span>Explore What You Will Learn</span>
                  <ChevronRight className="w-4 h-4 ml-1.5 text-[#16A34A]" />
                </button>
              </div>

              {/* Key Trust & Course Badges */}
              <div className="pt-8 border-t border-slate-100 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-slate-500 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>5 Self-Paced Modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#087FCE]" />
                  <span>Interactive Weather & Heat Telemetry</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#075985]" />
                  <span>Actionable Sustainable Roadmaps</span>
                </div>
              </div>
            </div>

            {/* Right Column: Climate Earth Core with 3D Parallax Tilt */}
            <div
              className="lg:col-span-5 flex justify-center items-center relative"
              style={{
                perspective: '1000px',
              }}
            >
              <div
                ref={heroOrbRef}
                className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] flex items-center justify-center transition-transform duration-200 ease-out will-change-transform"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                
                {/* Outer Atmospheric Orbital Ring 1 */}
                <div className="absolute inset-0 rounded-full border border-dashed border-[#087FCE]/25 animate-spin-slow" />
                
                {/* Outer Atmospheric Orbital Ring 2 */}
                <div className="absolute inset-6 rounded-full border border-[#16A34A]/25 animate-reverse-spin" />

                {/* Concentric Glow Ambient Center */}
                <div className="absolute w-56 h-56 rounded-full bg-gradient-to-tr from-[#087FCE]/15 via-[#F5FFF9] to-[#16A34A]/20 blur-xl" />

                {/* Core Circular Hero Element */}
                <div
                  ref={coreRef}
                  className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-white border-2 border-emerald-100 shadow-2xl flex flex-col items-center justify-center p-6 text-center animate-gentle-pulse transition-transform duration-200 ease-out will-change-transform"
                  style={{
                    transform: `translateZ(30px)`,
                  }}
                >
                  
                  {/* Center Globe Badge */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#087FCE] to-[#16A34A] text-white flex items-center justify-center shadow-md mb-3">
                    <Globe2 className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="font-bold text-lg text-[#075985]">
                    Climate Action Hub
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-[195px] leading-relaxed">
                    Think Climate. Act Today. Protect Tomorrow.
                  </p>

                  {/* Mini live indicator */}
                  <div className="mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5FFF9] border border-[#16A34A]/30 text-[11px] font-medium text-[#16A34A]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-ping" />
                    Free Open Enrollment
                  </div>
                </div>

                {/* Floating Stat Chip 1: Top Right */}
                <div
                  ref={chip1Ref}
                  className="absolute top-2 right-0 sm:right-2 bg-white/95 backdrop-blur-md py-2 px-3.5 rounded-xl border border-slate-100 shadow-subtle flex items-center gap-2.5 transition-transform duration-200 ease-out will-change-transform hover:scale-105"
                  style={{
                    transform: `translateZ(50px)`,
                  }}
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <ThermometerSun className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Heat Trend</div>
                    <div className="text-xs font-bold text-[#075985]">+1.2°C Tracked</div>
                  </div>
                </div>

                {/* Floating Stat Chip 2: Bottom Left */}
                <div
                  ref={chip2Ref}
                  className="absolute bottom-4 left-0 sm:left-2 bg-white/95 backdrop-blur-md py-2 px-3.5 rounded-xl border border-slate-100 shadow-subtle flex items-center gap-2.5 transition-transform duration-200 ease-out will-change-transform hover:scale-105"
                  style={{
                    transform: `translateZ(45px)`,
                  }}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Solutions</div>
                    <div className="text-xs font-bold text-[#16A34A]">Net-Zero Ideas</div>
                  </div>
                </div>

                {/* Floating Stat Chip 3: Bottom Right */}
                <div
                  ref={chip3Ref}
                  className="absolute bottom-1 right-8 hidden sm:flex bg-white/95 backdrop-blur-md py-2 px-3.5 rounded-xl border border-slate-100 shadow-subtle items-center gap-2 transition-transform duration-200 ease-out will-change-transform"
                  style={{
                    transform: `translateZ(40px)`,
                  }}
                >
                  <CloudSun className="w-4 h-4 text-[#087FCE]" />
                  <span className="text-xs font-semibold text-slate-700">Weather Patterns</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. DEDICATED SECTION: "What You Will Learn" */}
      <section id="what-you-will-learn" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16A34A]/10 text-xs font-bold text-[#16A34A] mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              Course Curriculum & Key Takeaways
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#075985] tracking-tight">
              What You Will <span className="text-[#16A34A]">Learn</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Explore essential climate topics—from the physics of rising atmospheric heat and vulnerable global regions to future projections and concrete sustainable roadmaps.
            </p>
          </div>

          {/* 5 Core Curriculum Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {curriculumModules.map((module) => {
              const IconComponent = module.icon;
              const isSelected = selectedModule === module.id;

              return (
                <SpotlightCard
                  key={module.id}
                  onClick={() => setSelectedModule(module.id)}
                  spotlightColor={module.spotlight}
                  className={`cursor-pointer rounded-2xl p-6 sm:p-7 border transition-all duration-200 group flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#16A34A] ring-2 ring-[#16A34A]/20 bg-[#F5FFF9]/50 shadow-md -translate-y-1'
                      : 'border-slate-200/90 bg-white hover:border-[#16A34A]/50 hover:shadow-card-hover hover:-translate-y-1'
                  }`}
                >
                  <div>
                    {/* Top Row: Icon & Module Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors"
                        style={{
                          backgroundColor: `${module.color}15`,
                          color: module.color,
                        }}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                        {module.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#075985] transition-colors leading-snug">
                      {module.title}
                    </h3>

                    {/* Tagline / Subtitle */}
                    <div className="text-xs font-semibold text-[#16A34A] mt-1">
                      {module.tagline}
                    </div>

                    {/* Description */}
                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {module.description}
                    </p>

                    {/* Highlights bullet preview */}
                    <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                      {module.highlights.slice(0, 2).map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="mt-6 pt-3 flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {module.duration}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedModule(module.id);
                      }}
                      className="text-[#087FCE] group-hover:text-[#16A34A] transition-colors inline-flex items-center gap-1"
                    >
                      <span>Explore Module</span>
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </SpotlightCard>
              );
            })}

            {/* Quick Summary Card: Full Course Overview */}
            <SpotlightCard
              onClick={onOpenModal}
              spotlightColor="rgba(8, 127, 206, 0.25)"
              className="cursor-pointer rounded-2xl p-6 sm:p-7 border border-emerald-200 bg-gradient-to-br from-[#F5FFF9] to-white flex flex-col justify-between hover:shadow-card-hover transition-all"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#087FCE] to-[#16A34A] text-white flex items-center justify-center mb-4 shadow-sm">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A]">
                  Course Certification
                </span>
                <h3 className="text-lg font-bold text-[#075985] mt-1">
                  Earn Your Climate Literacy Badge
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Complete all 5 modules at your own pace to earn an official, shareable certificate verifying your understanding of rising climate, weather shifts, and sustainable development.
                </p>
                <div className="mt-4 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>Free digital credential</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span>Actionable personal toolkit included</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3">
                <button
                  onClick={onOpenModal}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#16A34A] hover:bg-emerald-700 transition-colors shadow-sm text-center flex items-center justify-center gap-1.5"
                >
                  <span>Enroll in Course (Free)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </SpotlightCard>
          </div>

          {/* Interactive Deep-Dive Module Inspector Box */}
          <div className="mt-12 bg-slate-50/80 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#087FCE]">
                  Selected Syllabus Module Details
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#075985] mt-0.5">
                  {curriculumModules[selectedModule].badge}: {curriculumModules[selectedModule].title}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-lg">
                  Level: {curriculumModules[selectedModule].level}
                </span>
                <button
                  onClick={onOpenModal}
                  className="px-4 py-2 rounded-xl bg-[#087FCE] text-white text-xs font-bold hover:bg-[#075985] transition-colors"
                >
                  Start This Module
                </button>
              </div>
            </div>

            <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Module Summary
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {curriculumModules[selectedModule].description}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1 text-[#16A34A]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified Science Data
                  </span>
                  <span className="flex items-center gap-1 text-[#087FCE]">
                    <Clock className="w-3.5 h-3.5" /> {curriculumModules[selectedModule].duration}
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Core Learning Outcomes
                </h4>
                <ul className="space-y-2.5">
                  {curriculumModules[selectedModule].highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                        {idx + 1}
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Climate Data & Interactive Telemetry Dashboard */}
      <section className="py-16 bg-[#F5FFF9]/60 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#16A34A]/20 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200/60">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#16A34A]">
                  Verified Environmental Data Telemetry
                </span>
                <h3 className="text-2xl font-bold text-[#075985] mt-1">
                  Climate & Weather Pattern Monitoring Dashboard
                </h3>
              </div>
              <div className="inline-flex p-1 bg-slate-200/70 rounded-xl" role="tablist">
                <button
                  role="tab"
                  aria-selected={activeTab === 'fast'}
                  onClick={() => setActiveTab('fast')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                    activeTab === 'fast'
                      ? 'bg-white text-[#087FCE] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Weather Shifts
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'eco'}
                  onClick={() => setActiveTab('eco')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                    activeTab === 'eco'
                      ? 'bg-white text-[#16A34A] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Global Hotspots
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'responsive'}
                  onClick={() => setActiveTab('responsive')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                    activeTab === 'responsive'
                      ? 'bg-white text-[#075985] shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sustainable Action
                </button>
              </div>
            </div>

            <div className="pt-6">
              {activeTab === 'fast' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <SpotlightCard
                    spotlightColor="rgba(8, 127, 206, 0.18)"
                    className="bg-[#F5FFF9]/40 rounded-2xl p-5 border border-slate-200/70 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="text-3xl font-black text-[#087FCE]">+1.2°C</div>
                    <div className="text-xs font-bold text-slate-800 mt-1">Global Surface Temperature Increase</div>
                    <p className="text-xs text-slate-500 mt-2">Recorded above pre-industrial averages, accelerating atmospheric heat exchange cycles.</p>
                  </SpotlightCard>
                  <SpotlightCard
                    spotlightColor="rgba(7, 89, 133, 0.18)"
                    className="bg-[#F5FFF9]/40 rounded-2xl p-5 border border-slate-200/70 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="text-3xl font-black text-[#075985]">+38%</div>
                    <div className="text-xs font-bold text-slate-800 mt-1">Extreme Weather Event Volatility</div>
                    <p className="text-xs text-slate-500 mt-2">Frequency amplification observed in category 4-5 hurricanes, heat domes, and flash floods.</p>
                  </SpotlightCard>
                  <SpotlightCard
                    spotlightColor="rgba(22, 163, 74, 0.18)"
                    className="bg-[#F5FFF9]/40 rounded-2xl p-5 border border-slate-200/70 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="text-3xl font-black text-[#16A34A]">3.4 mm/yr</div>
                    <div className="text-xs font-bold text-slate-800 mt-1">Global Mean Sea Level Rise Rate</div>
                    <p className="text-xs text-slate-500 mt-2">Driven simultaneously by thermal water expansion and accelerated glacial melt runoff.</p>
                  </SpotlightCard>
                </div>
              )}

              {activeTab === 'eco' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <SpotlightCard
                    spotlightColor="rgba(22, 163, 74, 0.18)"
                    className="bg-[#F5FFF9]/40 rounded-2xl p-5 border border-slate-200/70 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="text-3xl font-black text-[#16A34A]">3x Faster</div>
                    <div className="text-xs font-bold text-slate-800 mt-1">Arctic Amplification Rate</div>
                    <p className="text-xs text-slate-500 mt-2">The polar north is warming at triple the global average, driving permafrost methane release.</p>
                  </SpotlightCard>
                  <SpotlightCard
                    spotlightColor="rgba(8, 127, 206, 0.18)"
                    className="bg-[#F5FFF9]/40 rounded-2xl p-5 border border-slate-200/70 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="text-3xl font-black text-[#087FCE]">72%</div>
                    <div className="text-xs font-bold text-slate-800 mt-1">Global Emissions from Cities & Energy</div>
                    <p className="text-xs text-slate-500 mt-2">Concentrated metropolitan grids and industrial sectors drive majority of temperature rise.</p>
                  </SpotlightCard>
                  <SpotlightCard
                    spotlightColor="rgba(7, 89, 133, 0.18)"
                    className="bg-[#F5FFF9]/40 rounded-2xl p-5 border border-slate-200/70 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="text-3xl font-black text-[#075985]">500M+</div>
                    <div className="text-xs font-bold text-slate-800 mt-1">People in High-Risk Coastlines</div>
                    <p className="text-xs text-slate-500 mt-2">Vulnerable populations facing sea-level ingress, salinization, and tidal surges.</p>
                  </SpotlightCard>
                </div>
              )}

              {activeTab === 'responsive' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <SpotlightCard
                    spotlightColor="rgba(7, 89, 133, 0.18)"
                    className="bg-[#F5FFF9]/40 rounded-2xl p-5 border border-slate-200/70 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="text-3xl font-black text-[#075985]">85%</div>
                    <div className="text-xs font-bold text-slate-800 mt-1">Cost Reduction in Solar & Wind</div>
                    <p className="text-xs text-slate-500 mt-2">Renewables are now the most affordable source of new electricity generation worldwide.</p>
                  </SpotlightCard>
                  <SpotlightCard
                    spotlightColor="rgba(8, 127, 206, 0.18)"
                    className="bg-[#F5FFF9]/40 rounded-2xl p-5 border border-slate-200/70 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="text-3xl font-black text-[#087FCE]">Net-Zero</div>
                    <div className="text-xs font-bold text-slate-800 mt-1">2050 Global Target Mandate</div>
                    <p className="text-xs text-slate-500 mt-2">The collective benchmark to keep global temperature rise within manageable thresholds.</p>
                  </SpotlightCard>
                  <SpotlightCard
                    spotlightColor="rgba(22, 163, 74, 0.18)"
                    className="bg-[#F5FFF9]/40 rounded-2xl p-5 border border-slate-200/70 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="text-3xl font-black text-[#16A34A]">100% Free</div>
                    <div className="text-xs font-bold text-slate-800 mt-1">Education & Climate Literacy Access</div>
                    <p className="text-xs text-slate-500 mt-2">Democratizing scientific data and sustainability frameworks for learners everywhere.</p>
                  </SpotlightCard>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. MOTION GLOBE WITH LIVE THERMAL VIEW */}
      <MotionGlobe />

      {/* 5. FINAL DASHBOARD: "Start Your Free Course" */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 md:p-16 bg-gradient-to-r from-[#075985] via-[#087FCE] to-[#16A34A] shadow-2xl text-white">
            <div
              className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-black/10 blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-emerald-200 border border-white/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Begin Your Learning Journey Today</span>
              </div>

              {/* Tagline on last dashboard */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Start Your Free Course
              </h2>

              <p className="text-lg sm:text-xl font-medium text-emerald-100">
                “Think Climate. Act Today. Protect Tomorrow.”
              </p>

              <p className="text-sm sm:text-base md:text-lg text-white/90 font-normal leading-relaxed max-w-2xl mx-auto">
                Join our free learning experience on rising climate, changing weather patterns, and how to move forwards sustainably. No prerequisites, no cost—just science, inspiration, and practical tools.
              </p>

              {/* Feature Checklist inside Dashboard */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-white/90">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>5 Comprehensive Modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Self-Paced & Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Free Completion Certificate</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={onOpenModal}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold text-[#075985] bg-white hover:bg-[#F5FFF9] transition-all shadow-lg hover:shadow-xl active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#087FCE]"
                >
                  <BookOpen className="w-5 h-5 mr-2 text-[#16A34A]" />
                  <span>Start Your Free Course</span>
                  <ArrowRight className="w-5 h-5 ml-2 text-[#16A34A]" />
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold text-white border border-white/30 hover:bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Connect with Climate Educators</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
