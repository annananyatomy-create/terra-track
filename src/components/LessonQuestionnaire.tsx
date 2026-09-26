import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award,
  Lock,
  Unlock,
  AlertTriangle,
  Zap,
  Eye,
  Check,
  ShieldCheck
} from 'lucide-react';
import { Lesson, QuizQuestion } from '../data/lessonsData';

interface LessonQuestionnaireProps {
  lesson: Lesson;
  currentPoints: number;
  hasPassed: boolean;
  onPassLesson: (score: number, bonus: number) => void;
  onNextLesson: () => void;
  hasNextLesson: boolean;
}

export const LessonQuestionnaire: React.FC<LessonQuestionnaireProps> = ({
  lesson,
  currentPoints,
  hasPassed,
  onPassLesson,
  onNextLesson,
  hasNextLesson
}) => {
  const questions: QuizQuestion[] = lesson.quiz;

  // Selected options: { [questionId]: optionIndex }
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  // Option to view whether the answer is correct or not ON THE SPOT (default: true)
  const [instantCheckEnabled, setInstantCheckEnabled] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(hasPassed);
  const [score, setScore] = useState<number>(currentPoints);
  const [bonusEarned, setBonusEarned] = useState<number>(0);

  // Count how many answers selected so far are correct
  const correctCount = questions.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctAnswer ? acc + 1 : acc;
  }, 0);

  // Rule: Permission to go to next chapter is granted ONLY IF at least 2 answers are correct!
  const hasPermissionForNextChapter = correctCount >= 2;

  const handleSelect = (questionId: number, optionIdx: number) => {
    if (submitted) return; // locked once finalized

    const updated = { ...selectedAnswers, [questionId]: optionIdx };
    setSelectedAnswers(updated);

    // Calculate score on the fly
    let earned = 0;
    let correct = 0;
    questions.forEach((q) => {
      if (updated[q.id] === q.correctAnswer) {
        earned += q.points; // 4 pts each
        correct += 1;
      }
    });

    // Check if all questions are answered
    const allAnswered = questions.every((q) => updated[q.id] !== undefined);
    if (allAnswered) {
      const percentage = (earned / 20) * 100;
      const bonus = percentage >= 80 ? 5 : 0;
      setScore(earned);
      setBonusEarned(bonus);

      // If at least 2 answers are correct, trigger onPassLesson
      if (correct >= 2) {
        onPassLesson(earned, bonus);
      }
    }
  };

  const handleSubmit = () => {
    let earned = 0;
    let correct = 0;

    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        earned += q.points; // 4 points each -> max 20 points
        correct += 1;
      }
    });

    const percentage = (earned / 20) * 100;
    const bonus = percentage >= 80 ? 5 : 0;

    setScore(earned);
    setBonusEarned(bonus);
    setSubmitted(true);

    // Permission granted only if at least 2 answers are correct!
    if (correct >= 2) {
      onPassLesson(earned, bonus);
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
    setBonusEarned(0);
  };

  const isAllAnswered = questions.every((q) => selectedAnswers[q.id] !== undefined);
  const percentage = (score / 20) * 100;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-lg my-12">
      
      {/* Questionnaire Header with On-the-Spot Toggle & Permission Rule */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#087FCE]/10 text-xs font-bold text-[#087FCE] mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Mastery Questionnaire • 5 Questions • 20 Points</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#075985]">
            {lesson.badge} Questionnaire
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Permission to unlock the next chapter is granted <strong className="text-slate-900 underline decoration-[#16A34A] decoration-2">only if at least 2 answers are correct</strong>. Students scoring <strong className="text-[#16A34A]">80%+ (4 or 5 correct) earn +5 bonus points</strong>!
          </p>
        </div>

        {/* Controls: On-the-Spot Verification Switch & Live Score */}
        <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
          
          {/* OPTION: View Correct/Incorrect On-the-Spot Switch */}
          <div className="bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200 flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 pl-2 flex items-center gap-1.5">
              <Zap className={`w-3.5 h-3.5 ${instantCheckEnabled ? 'text-amber-500 fill-amber-400' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">On-the-Spot Check:</span>
              <span className="sm:hidden">Spot Check:</span>
            </span>
            <button
              type="button"
              onClick={() => setInstantCheckEnabled(!instantCheckEnabled)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                instantCheckEnabled
                  ? 'bg-[#16A34A] text-white shadow-sm'
                  : 'bg-slate-300 text-slate-700'
              }`}
            >
              <span>{instantCheckEnabled ? 'ON (Live Feedback)' : 'OFF (Hidden)'}</span>
            </button>
          </div>

          {/* Live Permission Tracker Badge */}
          <div
            className={`px-3.5 py-2 rounded-2xl border text-xs font-bold flex items-center gap-2 ${
              hasPermissionForNextChapter
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-amber-50 border-amber-300 text-amber-800'
            }`}
          >
            {hasPermissionForNextChapter ? (
              <>
                <Unlock className="w-4 h-4 text-emerald-600" />
                <span>Permission: Granted ({correctCount}/5 Correct)</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-amber-600" />
                <span>Permission: Needs 2 Correct ({correctCount}/5)</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 5 Interactive Questions with Instant On-The-Spot Check */}
      <div className="py-6 space-y-8">
        {questions.map((q, qIndex) => {
          const userAnswer = selectedAnswers[q.id];
          const isAnswered = userAnswer !== undefined;
          const isCorrect = userAnswer === q.correctAnswer;
          // Show on-the-spot feedback if user answered and instant check is enabled (or quiz is submitted)
          const revealOnSpot = isAnswered && (instantCheckEnabled || submitted);

          return (
            <div
              key={q.id}
              className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                revealOnSpot
                  ? isCorrect
                    ? 'bg-emerald-50/50 border-emerald-300 ring-1 ring-emerald-300/40'
                    : 'bg-rose-50/50 border-rose-300 ring-1 ring-rose-300/40'
                  : 'bg-slate-50/60 border-slate-200/80 hover:border-slate-300'
              }`}
            >
              {/* Question text & On-Spot Status Tag */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-[#087FCE] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5 shadow-sm">
                    {qIndex + 1}
                  </span>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {q.question}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {revealOnSpot && (
                    <span
                      className={`text-xs font-extrabold px-2.5 py-1 rounded-lg flex items-center gap-1 ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Correct (+4 Pts)</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                          <span>Incorrect (0 Pts)</span>
                        </>
                      )}
                    </span>
                  )}
                  <span className="text-[11px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                    {q.points} Pts
                  </span>
                </div>
              </div>

              {/* 4 Options with Real-Time Feedback styling */}
              <div className="space-y-2.5 pl-0 sm:pl-10">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userAnswer === optIdx;
                  let optStyle = 'border-slate-200 bg-white hover:border-[#087FCE]/50 text-slate-700';

                  if (revealOnSpot) {
                    if (optIdx === q.correctAnswer) {
                      optStyle = 'border-emerald-500 bg-emerald-100/90 text-emerald-950 font-bold shadow-sm';
                    } else if (isSelected && !isCorrect) {
                      optStyle = 'border-rose-400 bg-rose-100/90 text-rose-950 font-medium';
                    } else {
                      optStyle = 'border-slate-200 bg-white/70 text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    optStyle = 'border-[#087FCE] bg-[#087FCE]/10 text-[#075985] font-semibold ring-2 ring-[#087FCE]/20';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={submitted}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${optStyle}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                            revealOnSpot && optIdx === q.correctAnswer
                              ? 'border-emerald-600 bg-emerald-600 text-white'
                              : revealOnSpot && isSelected && !isCorrect
                              ? 'border-rose-600 bg-rose-600 text-white'
                              : isSelected
                              ? 'border-[#087FCE] bg-[#087FCE] text-white'
                              : 'border-slate-300 text-slate-500'
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {revealOnSpot && optIdx === q.correctAnswer && (
                        <div className="flex items-center gap-1 text-emerald-700 font-bold text-xs shrink-0 ml-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Correct Answer</span>
                        </div>
                      )}

                      {revealOnSpot && isSelected && !isCorrect && (
                        <div className="flex items-center gap-1 text-rose-700 font-bold text-xs shrink-0 ml-2">
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>Your Choice</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* On-The-Spot Explanation Box */}
              {revealOnSpot && (
                <div className="mt-4 pt-3 border-t border-slate-200/80 pl-0 sm:pl-10">
                  <div
                    className={`p-3.5 rounded-xl border flex items-start gap-2.5 text-xs ${
                      isCorrect
                        ? 'bg-emerald-100/40 border-emerald-200 text-emerald-900'
                        : 'bg-amber-50 border-amber-200 text-amber-950'
                    }`}
                  >
                    <HelpCircle className="w-4 h-4 text-[#087FCE] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold mb-0.5">
                        {isCorrect ? '✅ Explanation Verified:' : '💡 Learning Insight & Explanation:'}
                      </strong>
                      <span>{q.explanation}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Questionnaire Footer & Permission-to-Advance Banner */}
      <div className="pt-6 border-t border-slate-100">
        {!submitted ? (
          <div className="space-y-4">
            {/* Live Progress Bar */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-slate-600">
                <span>Progress: <strong>{Object.keys(selectedAnswers).length}</strong> of {questions.length} answered • </span>
                <span>Correct on the spot: <strong className={correctCount >= 2 ? 'text-emerald-600' : 'text-amber-600'}>{correctCount}</strong> of 5</span>
              </div>

              {/* Instant Permission Indicator */}
              <div className="flex items-center gap-2">
                {hasPermissionForNextChapter ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Permission to Advance: Granted ({correctCount} Correct)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                    <Lock className="w-3.5 h-3.5 text-amber-600" />
                    Need at least 2 correct ({2 - correctCount} more needed)
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                You can change any answer before final submission.
              </div>

              <button
                disabled={!isAllAnswered}
                onClick={handleSubmit}
                className={`px-8 py-3.5 rounded-xl text-sm font-bold text-white transition-all flex items-center justify-center gap-2 shadow-md ${
                  isAllAnswered
                    ? 'bg-[#16A34A] hover:bg-emerald-700 active:scale-95'
                    : 'bg-slate-300 cursor-not-allowed opacity-60'
                }`}
              >
                <span>Finalize & Record Score (20 Pts)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Score Summary Box with Gating Permission based on "only if 2 answers are correct" */}
            <div
              className={`p-6 rounded-2xl border ${
                hasPermissionForNextChapter
                  ? 'bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-white border-emerald-300'
                  : 'bg-gradient-to-r from-rose-500/10 via-orange-500/5 to-white border-rose-300'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    {hasPermissionForNextChapter ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                        <Unlock className="w-3.5 h-3.5" />
                        PERMISSION GRANTED ({correctCount} of 5 Correct) • Next Chapter Unlocked!
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
                        <Lock className="w-3.5 h-3.5" />
                        PERMISSION DENIED: Only {correctCount} of 5 Correct (Need at least 2 correct)
                      </span>
                    )}

                    {bonusEarned > 0 && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400 text-slate-900 text-xs font-black animate-pulse">
                        <Sparkles className="w-3.5 h-3.5" />
                        +5 BONUS POINTS (80%+ Mark)
                      </span>
                    )}
                  </div>

                  <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
                    Score: {score} of 20 Points ({correctCount} Correct) {bonusEarned > 0 ? `(+${bonusEarned} Bonus = ${score + bonusEarned} Pts)` : ''}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {hasPermissionForNextChapter
                      ? 'Congratulations! You have answered at least 2 questions correctly, granting you permission to proceed directly to the next chapter.'
                      : 'You scored fewer than 2 correct answers. Permission to advance to the next chapter requires at least 2 correct answers. Please click Retake Quiz below!'}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleRetake}
                    className="px-4 py-3 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>

                  {/* PROCEED BUTTON: Available ONLY IF 2 answers are correct */}
                  {hasPermissionForNextChapter && hasNextLesson && (
                    <button
                      onClick={onNextLesson}
                      className="px-6 py-3 rounded-xl bg-[#087FCE] hover:bg-[#075985] text-white text-xs sm:text-sm font-bold transition-all shadow-md flex items-center gap-2 active:scale-95"
                    >
                      <span>Proceed to Next Chapter</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
