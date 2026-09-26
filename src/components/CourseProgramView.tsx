import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Lock,
  Unlock,
  Award,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Flame,
  Globe2,
  AlertTriangle,
  Compass,
  Gift,
  RotateCcw,
  ExternalLink,
  ChevronLeft,
  FileText,
  Copy,
  Check
} from 'lucide-react';
import { LESSONS_DATA, Lesson } from '../data/lessonsData';
import { InteractiveLessonGame } from './InteractiveLessonGame';
import { LessonQuestionnaire } from './LessonQuestionnaire';
import { RewardRedemptionCenter } from './RewardRedemptionCenter';

interface CourseProgramViewProps {
  onBackToOverview?: () => void;
  onOpenModal?: () => void;
}

export const CourseProgramView: React.FC<CourseProgramViewProps> = ({
  onBackToOverview,
  onOpenModal
}) => {
  // Saved state key
  const STORAGE_KEY = 'verdant_climate_course_state_v1';

  // State: active lesson ID (1 to 6)
  const [activeLessonId, setActiveLessonId] = useState<number>(1);

  // Unlocked lessons: Lesson 1 is always unlocked
  const [unlockedLessons, setUnlockedLessons] = useState<number[]>([1]);

  // Scores per lesson: { [lessonId]: points } (up to 20 pts per lesson)
  const [lessonScores, setLessonScores] = useState<{ [key: number]: number }>({});

  // Bonus points earned per lesson (5 pts for 80%+)
  const [lessonBonus, setLessonBonus] = useState<{ [key: number]: number }>({});

  // Option to view Lesson Brief vs Full In-Depth Curriculum
  const [lessonViewTab, setLessonViewTab] = useState<'brief' | 'full'>('brief');
  const [copiedBrief, setCopiedBrief] = useState<boolean>(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.unlockedLessons) setUnlockedLessons(parsed.unlockedLessons);
        if (parsed.lessonScores) setLessonScores(parsed.lessonScores);
        if (parsed.lessonBonus) setLessonBonus(parsed.lessonBonus);
        if (parsed.activeLessonId) setActiveLessonId(parsed.activeLessonId);
      }
    } catch (e) {
      console.error('Failed to load course state from storage:', e);
    }
  }, []);

  // Save to localStorage on change
  const saveState = (unlocked: number[], scores: { [key: number]: number }, bonus: { [key: number]: number }, activeId: number) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          unlockedLessons: unlocked,
          lessonScores: scores,
          lessonBonus: bonus,
          activeLessonId: activeId
        })
      );
    } catch (e) {
      console.error('Failed to save course state:', e);
    }
  };

  // Total points calculation (out of 100)
  const totalBasePoints = Object.values(lessonScores).reduce((acc, curr) => acc + curr, 0);
  const totalBonusPoints = Object.values(lessonBonus).reduce((acc, curr) => acc + curr, 0);
  const totalPoints = totalBasePoints + totalBonusPoints;

  const currentLesson = LESSONS_DATA.find((l) => l.id === activeLessonId) || LESSONS_DATA[0];

  // Callback when user passes questionnaire with >= 75%
  const handlePassLesson = (score: number, bonus: number) => {
    const updatedScores = { ...lessonScores, [activeLessonId]: score };
    const updatedBonus = { ...lessonBonus, [activeLessonId]: bonus };
    const nextLessonId = activeLessonId + 1;
    let updatedUnlocked = [...unlockedLessons];

    if (nextLessonId <= 6 && !updatedUnlocked.includes(nextLessonId)) {
      updatedUnlocked.push(nextLessonId);
    }

    setLessonScores(updatedScores);
    setLessonBonus(updatedBonus);
    setUnlockedLessons(updatedUnlocked);

    saveState(updatedUnlocked, updatedScores, updatedBonus, activeLessonId);
  };

  // Proceed to next lesson
  const handleNextLesson = () => {
    if (activeLessonId < 6) {
      const nextId = activeLessonId + 1;
      setActiveLessonId(nextId);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  // Reset entire course progress
  const handleResetCourse = () => {
    if (window.confirm('Reset all course progress, scores, and unlocked lessons?')) {
      setUnlockedLessons([1]);
      setLessonScores({});
      setLessonBonus({});
      setActiveLessonId(1);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="space-y-12">
      {/* 1. Gamified Course HUD Bar */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Part 2: Interactive Climate Learning Track & Gamification
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Part 2: <span className="text-[#34d399]">Interactive Course Programme & Gamification</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Complete each interactive lesson and get <strong className="text-emerald-400">permission to advance to the next chapter only if at least 2 answers are correct</strong>. View whether answers are correct on the spot, and students scoring <strong className="text-amber-400">80%+ earn an extra +5 bonus points</strong>! Total points redeem for rewards and discount coupons.
            </p>
          </div>

          {/* Points Counter Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-950 px-4 py-2.5 rounded-2xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Total Score
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-black font-mono text-[#087FCE]">
                  {totalBasePoints}
                </span>
                <span className="text-xs text-slate-400">/ 100 Pts</span>
                {totalBonusPoints > 0 && (
                  <span className="text-xs font-bold text-amber-400 ml-1">
                    (+{totalBonusPoints} Bonus)
                  </span>
                )}
              </div>
            </div>

            <div className="bg-slate-950 px-4 py-2.5 rounded-2xl border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Progression
              </span>
              <div className="text-xl sm:text-2xl font-black font-mono text-[#16A34A]">
                {unlockedLessons.length} / 6 Unlocked
              </div>
            </div>

            <button
              onClick={() => setActiveLessonId(6)}
              className="px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs transition-all shadow-md flex items-center gap-1.5 active:scale-95"
            >
              <Gift className="w-4 h-4 text-slate-950" />
              <span>Redeem Rewards</span>
            </button>
          </div>
        </div>

        {/* 2. Interactive Step Path: Lessons 1 to 6 */}
        <div className="pt-6">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
            <span>Course Roadmap & Path:</span>
            {onBackToOverview && (
              <button
                onClick={onBackToOverview}
                className="text-emerald-400 hover:text-emerald-300 text-xs font-semibold flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back to Topics Overview</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {LESSONS_DATA.map((lesson) => {
              const isUnlocked = unlockedLessons.includes(lesson.id);
              const isActive = activeLessonId === lesson.id;
              const score = lessonScores[lesson.id];
              const bonus = lessonBonus[lesson.id] || 0;
              const isPassed = score !== undefined && score >= 8; // Permission granted if at least 2 answers are correct (8+ pts)

              return (
                <button
                  key={lesson.id}
                  disabled={!isUnlocked}
                  onClick={() => {
                    setActiveLessonId(lesson.id);
                    window.scrollTo({ top: 380, behavior: 'smooth' });
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#087FCE] border-cyan-400 text-white shadow-lg ring-2 ring-cyan-300/40'
                      : isPassed
                      ? 'bg-emerald-950/40 border-emerald-500/70 text-emerald-200 hover:bg-emerald-900/50'
                      : isUnlocked
                      ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      : 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                        {lesson.badge}
                      </span>
                      {isPassed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : isUnlocked ? (
                        <Unlock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                      )}
                    </div>
                    <div className="text-xs font-bold line-clamp-2 leading-tight">
                      {lesson.shortTitle}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/10 text-[10px] flex items-center justify-between font-mono">
                    {score !== undefined ? (
                      <span className="font-bold text-emerald-300">
                        {score}/20 {bonus > 0 ? `(+${bonus})` : ''}
                      </span>
                    ) : isUnlocked ? (
                      <span className="text-slate-400">Available</span>
                    ) : (
                      <span className="text-slate-600">Locked</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Lesson Content Display */}
      {currentLesson.id === 6 ? (
        // LESSON 6: Bibliography & Reward Redemption Center
        <div className="space-y-12">
          {/* Bibliography Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#075985]/10 text-[#075985] flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#075985]">
                  Lesson 6 Reference Library
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Bibliography & Scientific Citations
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              All telemetry, greenhouse gas metrics, and temperature anomalies referenced throughout this curriculum are directly synthesized from the following primary peer-reviewed scientific repositories:
            </p>

            <div className="space-y-6">
              {currentLesson.sections.map((section, idx) => (
                <div key={idx} className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200">
                  <h4 className="text-base font-bold text-[#075985] mb-3">
                    {section.title}
                  </h4>
                  <ul className="space-y-2.5">
                    {section.keyPoints.map((ref, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                        <span>{ref}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Reward Redemption Center */}
          <RewardRedemptionCenter
            totalPoints={totalBasePoints}
            bonusPoints={totalBonusPoints}
            completedLessonsCount={Object.keys(lessonScores).length}
          />
        </div>
      ) : (
        // LESSONS 1 TO 5: Interactive Learning, Game Simulation & Questionnaire
        <div className="space-y-8">
          {/* Lesson Header Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16A34A]/10 text-xs font-bold text-[#16A34A] mb-2">
                  <span>{currentLesson.badge}</span>
                  <span>•</span>
                  <span>{currentLesson.level}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {currentLesson.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
                  {currentLesson.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-3 self-start md:self-auto text-xs font-semibold text-slate-500 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200">
                <span>Estimated: {currentLesson.readTime}</span>
              </div>
            </div>

            {/* VIEW MODE SELECTOR: Lesson Brief vs In-Depth Study */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 p-2 bg-slate-100/90 rounded-2xl border border-slate-200">
              <div className="inline-flex p-1 bg-white rounded-xl shadow-sm border border-slate-200">
                <button
                  onClick={() => setLessonViewTab('brief')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                    lessonViewTab === 'brief'
                      ? 'bg-[#16A34A] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Lesson Brief (Quick Summary)</span>
                </button>
                <button
                  onClick={() => setLessonViewTab('full')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                    lessonViewTab === 'full'
                      ? 'bg-[#087FCE] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>In-Depth Study (Detailed Curriculum)</span>
                </button>
              </div>

              {/* Action Button: Copy Brief */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(currentLesson.brief);
                  setCopiedBrief(true);
                  setTimeout(() => setCopiedBrief(false), 2000);
                }}
                className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm active:scale-95"
              >
                {copiedBrief ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Brief Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Copy Lesson Brief</span>
                  </>
                )}
              </button>
            </div>

            {/* TAB 1: LESSON BRIEF DISPLAY */}
            {lessonViewTab === 'brief' ? (
              <div className="mt-6 space-y-6">
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#F5FFF9] via-emerald-50/40 to-white border-2 border-[#16A34A]/40 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16A34A]/10 text-xs font-extrabold text-[#16A34A]">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Official Lesson Brief</span>
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      Reading Time: ~1.5 mins
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-extrabold text-[#075985] mb-3">
                    {currentLesson.shortTitle} — Core Brief
                  </h4>

                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal bg-white p-5 sm:p-6 rounded-xl border border-emerald-200/80 shadow-inner">
                    • {currentLesson.brief}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-emerald-200/60 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Tip: Master this brief to easily score 2+ correct answers and advance to the next chapter!</span>
                    </div>

                    <button
                      onClick={() => setLessonViewTab('full')}
                      className="text-xs font-bold text-[#087FCE] hover:underline flex items-center gap-1"
                    >
                      <span>Read Detailed Sections</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* TAB 2: IN-DEPTH CURRICULUM DISPLAY */
              <div className="mt-6 space-y-8">
                {/* Collapsible/Sticky Brief Reminder */}
                <div className="p-4 sm:p-5 rounded-2xl bg-[#F5FFF9] border border-[#16A34A]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <FileText className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs font-bold text-[#075985] uppercase tracking-wider block mb-0.5">
                        Lesson Brief Summary:
                      </strong>
                      <p className="text-xs text-slate-700 leading-relaxed line-clamp-2">
                        {currentLesson.brief}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setLessonViewTab('brief')}
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold transition-colors self-start sm:self-auto"
                  >
                    View Full Brief
                  </button>
                </div>

                {/* Core In-Depth Lesson Sections */}
                <div className="space-y-8">
                  {currentLesson.sections.map((section, idx) => (
                    <div key={idx} className="space-y-3">
                      <h4 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-[#087FCE]/10 text-[#087FCE] flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </span>
                        <span>{section.title}</span>
                      </h4>

                      <p className="text-sm sm:text-base text-slate-600 leading-relaxed pl-0 sm:pl-8">
                        {section.content}
                      </p>

                      <div className="pl-0 sm:pl-8 pt-2">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
                          <span className="text-[11px] uppercase font-bold text-slate-500 block mb-1">
                            Core Key Takeaways:
                          </span>
                          {section.keyPoints.map((point, pIdx) => (
                            <div key={pIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {section.callout && (
                        <div className="pl-0 sm:pl-8 pt-2">
                          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
                            💡 {section.callout}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Interactive Game Simulation */}
          <InteractiveLessonGame lesson={currentLesson} />

          {/* Gamified 5-Question Questionnaire with 2-Correct Permission Rule */}
          <LessonQuestionnaire
            lesson={currentLesson}
            currentPoints={lessonScores[currentLesson.id] || 0}
            hasPassed={lessonScores[currentLesson.id] !== undefined && lessonScores[currentLesson.id] >= 8}
            onPassLesson={handlePassLesson}
            onNextLesson={handleNextLesson}
            hasNextLesson={activeLessonId < 6}
          />
        </div>
      )}

      {/* Footer Navigation Bar */}
      <div className="pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={handleResetCourse}
          className="text-xs text-slate-400 hover:text-rose-500 transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Course Progress & Scores</span>
        </button>

        <div className="flex items-center gap-3">
          {activeLessonId > 1 && (
            <button
              onClick={() => {
                setActiveLessonId(activeLessonId - 1);
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors"
            >
              Previous Lesson
            </button>
          )}

          {activeLessonId < 6 && unlockedLessons.includes(activeLessonId + 1) && (
            <button
              onClick={() => {
                setActiveLessonId(activeLessonId + 1);
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-xl bg-[#087FCE] text-white text-xs font-bold hover:bg-[#075985] transition-colors flex items-center gap-1.5"
            >
              <span>Next Lesson</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
