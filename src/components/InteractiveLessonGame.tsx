import React, { useState } from 'react';
import {
  ThermometerSun,
  Flame,
  Zap,
  Globe2,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Layers,
  Leaf
} from 'lucide-react';
import { Lesson } from '../data/lessonsData';

interface InteractiveLessonGameProps {
  lesson: Lesson;
  onGameComplete?: (bonusPointsEarned: number) => void;
}

export const InteractiveLessonGame: React.FC<InteractiveLessonGameProps> = ({
  lesson,
  onGameComplete
}) => {
  // Game 1: Thermostat simulation (Lesson 1)
  const [co2Level, setCo2Level] = useState<number>(420); // 280 to 650 ppm

  // Game 2: Sector matching (Lesson 2)
  const [matchedItems, setMatchedItems] = useState<{ [key: string]: string }>({});
  const [feedbackMsg, setFeedbackMsg] = useState<string>('');

  // Game 3: Hotspot matching (Lesson 3)
  const [selectedHotspotIndex, setSelectedHotspotIndex] = useState<number | null>(null);
  const [hotspotMatches, setHotspotMatches] = useState<{ [key: number]: boolean }>({});

  // Game 4: Clean Grid Simulator (Lesson 4)
  const [solarMix, setSolarMix] = useState<number>(45);
  const [windMix, setWindMix] = useState<number>(35);
  const [batteryStorage, setBatteryStorage] = useState<number>(20);

  // Game 5: Circular Economy Challenge (Lesson 5)
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([]);

  // Simulation calculations for Game 1
  const baselineCo2 = 280;
  const tempAnomalyCalc = ((co2Level - baselineCo2) / 100) * 0.85;
  const oceanHeatWatts = ((co2Level - baselineCo2) * 0.0075 + 0.1).toFixed(2);
  const seaLevelCalc = (((co2Level - baselineCo2) * 0.28)).toFixed(1);

  // Game 2 logic
  const emissionCards = [
    { id: 'coal', name: 'Coal Thermal Power Plant', targetGas: 'CO2' },
    { id: 'cattle', name: 'Ruminant Cattle Digestion', targetGas: 'CH4' },
    { id: 'fertilizer', name: 'Synthetic Nitrogen Fertilizer', targetGas: 'N2O' },
    { id: 'slash', name: 'Tropical Forest Slashing & Fire', targetGas: 'CO2' }
  ];

  const handleMatch = (cardId: string, gas: string) => {
    const card = emissionCards.find((c) => c.id === cardId);
    if (!card) return;
    if (card.targetGas === gas) {
      setMatchedItems((prev) => ({ ...prev, [cardId]: gas }));
      setFeedbackMsg(`Correct! ${card.name} primarily emits ${gas}.`);
    } else {
      setFeedbackMsg(`Try again! ${card.name} is mainly driven by ${card.targetGas}.`);
    }
  };

  // Game 4: Clean grid calculation
  const totalCleanMix = solarMix + windMix + batteryStorage;
  const isGridBalanced = totalCleanMix === 100 && batteryStorage >= 20;

  // Render according to lesson interactive game type
  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl my-8">
      {/* Game Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#087FCE] to-[#16A34A] flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              Interactive Lab Simulation
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {lesson.interactiveGame.title}
            </h3>
          </div>
        </div>

        <span className="text-xs font-semibold text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 self-start sm:self-auto">
          Hands-on Learning
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-300 mt-4 mb-6 leading-relaxed">
        {lesson.interactiveGame.instructions}
      </p>

      {/* GAME 1: Thermostat (Lesson 1) */}
      {lesson.id === 1 && (
        <div className="space-y-6">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">
                Atmospheric CO₂ Concentration Slider:
              </span>
              <span className="font-mono text-base font-extrabold text-amber-400">
                {co2Level} ppm
              </span>
            </div>
            <input
              type="range"
              min="280"
              max="650"
              step="5"
              value={co2Level}
              onChange={(e) => setCo2Level(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#16A34A]"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1">
              <span>Pre-industrial (280 ppm)</span>
              <span className="text-emerald-400 font-bold">Current (~422 ppm)</span>
              <span className="text-red-400 font-bold">Extreme Runaway (650 ppm)</span>
            </div>
          </div>

          {/* Telemetry output metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                Projected Temp Anomaly
              </span>
              <div
                className={`text-2xl font-black font-mono ${
                  tempAnomalyCalc > 2.0 ? 'text-red-400' : tempAnomalyCalc > 1.4 ? 'text-amber-400' : 'text-emerald-400'
                }`}
              >
                +{tempAnomalyCalc.toFixed(2)}°C
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">Relative to 1850–1900</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                Planetary Radiative Imbalance
              </span>
              <div className="text-2xl font-black font-mono text-[#087FCE]">
                +{oceanHeatWatts} W/m²
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">Net heat trapped in biosphere</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">
                Mean Sea Level Inundation
              </span>
              <div className="text-2xl font-black font-mono text-[#16A34A]">
                +{seaLevelCalc} cm
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">Thermal expansion + meltwater</span>
            </div>
          </div>
        </div>
      )}

      {/* GAME 2: Source Sorting (Lesson 2) */}
      {lesson.id === 2 && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {emissionCards.map((card) => {
              const matched = matchedItems[card.id];
              return (
                <div
                  key={card.id}
                  className={`p-4 rounded-xl border transition-all ${
                    matched
                      ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold text-white mb-2">{card.name}</div>
                  {matched ? (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Linked to {matched}</span>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {['CO2', 'CH4', 'N2O'].map((gas) => (
                        <button
                          key={gas}
                          onClick={() => handleMatch(card.id, gas)}
                          className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-800 hover:bg-[#087FCE] text-white transition-colors"
                        >
                          Match {gas}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {feedbackMsg && (
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-amber-300 font-medium">
              {feedbackMsg}
            </div>
          )}
        </div>
      )}

      {/* GAME 3: Vulnerability Hotspots (Lesson 3) */}
      {lesson.id === 3 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { region: 'Tuvalu & Maldives', threat: 'Coastal Inundation & Aquifer Salinization' },
              { region: 'Siberian Tundra', threat: 'Permafrost Collapse & Methane Release' },
              { region: 'Mediterranean Basin', threat: 'Agricultural Mega-Drought & Wildfires' },
              { region: 'Indo-Gangetic Plain', threat: 'Lethal Wet-Bulb Heat Spikes' }
            ].map((item, index) => {
              const isDone = hotspotMatches[index];
              return (
                <div
                  key={index}
                  onClick={() => setHotspotMatches((prev) => ({ ...prev, [index]: true }))}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isDone
                      ? 'bg-[#16A34A]/20 border-[#16A34A] text-white'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{item.region}</span>
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <span className="text-[10px] uppercase font-bold text-amber-400">Click to diagnose</span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 mt-2">{item.threat}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* GAME 4: Clean Grid Simulator (Lesson 4) */}
      {lesson.id === 4 && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-amber-400">Solar PV Mix</span>
                <span className="font-mono">{solarMix}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="70"
                value={solarMix}
                onChange={(e) => setSolarMix(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500"
              />
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-cyan-400">Wind Turbine Mix</span>
                <span className="font-mono">{windMix}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="70"
                value={windMix}
                onChange={(e) => setWindMix(parseInt(e.target.value, 10))}
                className="w-full accent-cyan-500"
              />
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-emerald-400">Battery Storage (BESS)</span>
                <span className="font-mono">{batteryStorage}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                value={batteryStorage}
                onChange={(e) => setBatteryStorage(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-500"
              />
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border flex items-center justify-between ${
              isGridBalanced
                ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                : 'bg-slate-950 border-amber-500/50 text-amber-200'
            }`}
          >
            <div>
              <div className="text-xs font-bold">
                {isGridBalanced ? '✅ Grid 100% Balanced & Net-Zero!' : '⚡ Grid Imbalance: Adjust sliders to reach exactly 100% with >= 20% Storage'}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Total Renewable Mix: <strong className="text-white">{totalCleanMix}%</strong> (Target: 100%)
              </div>
            </div>
            {isGridBalanced && (
              <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-xs">
                Zero Fossil Peakers
              </span>
            )}
          </div>
        </div>
      )}

      {/* GAME 5: Circular Economy Challenge (Lesson 5) */}
      {lesson.id === 5 && (
        <div className="space-y-4">
          <div className="text-xs font-semibold text-slate-300">
            Select 3 sustainable production strategies to replace high-emission industrial models:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: 'timber', text: 'Mass Timber Construction instead of high-emission Portland concrete' },
              { id: 'h2', text: 'Green Hydrogen direct reduction ironmaking instead of coking coal' },
              { id: 'battery-recycle', text: 'Closed-loop lithium and cobalt recycling for electric vehicles' },
              { id: 'landfill', text: 'Incinerate all electronics in open landfill trenches (Incorrect)' }
            ].map((choice) => {
              const isSelected = selectedSolutions.includes(choice.id);
              return (
                <button
                  key={choice.id}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedSolutions(selectedSolutions.filter((s) => s !== choice.id));
                    } else {
                      setSelectedSolutions([...selectedSolutions, choice.id]);
                    }
                  }}
                  className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all ${
                    isSelected
                      ? choice.id === 'landfill'
                        ? 'bg-red-950/50 border-red-500 text-red-200'
                        : 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px]">
                      {isSelected ? '✓' : ''}
                    </span>
                    <span>{choice.text}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
