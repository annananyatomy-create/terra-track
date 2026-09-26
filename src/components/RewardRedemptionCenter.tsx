import React, { useState } from 'react';
import {
  Award,
  Gift,
  Copy,
  Check,
  Sparkles,
  Lock,
  Unlock,
  Printer,
  ChevronRight,
  ShieldCheck,
  TreePine,
  ExternalLink
} from 'lucide-react';
import { REWARD_COUPONS, RewardCoupon } from '../data/lessonsData';

interface RewardRedemptionCenterProps {
  totalPoints: number;
  bonusPoints: number;
  completedLessonsCount: number;
}

export const RewardRedemptionCenter: React.FC<RewardRedemptionCenterProps> = ({
  totalPoints,
  bonusPoints,
  completedLessonsCount
}) => {
  const [copiedCouponId, setCopiedCouponId] = useState<string | null>(null);
  const [studentName, setStudentName] = useState<string>('Alex Morgan');
  const [isEditingName, setIsEditingName] = useState<boolean>(false);

  const totalEffectivePoints = totalPoints + bonusPoints;

  const handleCopyCode = (coupon: RewardCoupon) => {
    navigator.clipboard.writeText(coupon.code);
    setCopiedCouponId(coupon.id);
    setTimeout(() => {
      setCopiedCouponId(null);
    }, 2500);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="space-y-12">
      {/* Rewards Overview Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 bg-gradient-to-r from-[#075985] via-[#087FCE] to-[#16A34A] text-white shadow-2xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-emerald-200 mb-4 border border-white/20">
            <Gift className="w-3.5 h-3.5" />
            <span>Student Reward & Coupon Redemption Center</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Redeem Your Climate Action Rewards
          </h2>
          <p className="mt-3 text-base sm:text-lg text-white/90 leading-relaxed">
            Every lesson completed with a passing questionnaire (75%+) awards points toward certified green merchandise discounts, tree plantation certificates, and academic credentials.
          </p>

          {/* Points Tally Cards */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <span className="text-[10px] uppercase font-bold text-emerald-200 block">
                Standard Points
              </span>
              <span className="text-2xl sm:text-3xl font-black font-mono mt-0.5 block">
                {totalPoints} / 100
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <span className="text-[10px] uppercase font-bold text-amber-300 block">
                80%+ Bonus Points
              </span>
              <span className="text-2xl sm:text-3xl font-black font-mono text-amber-300 mt-0.5 block">
                +{bonusPoints} Pts
              </span>
            </div>

            <div className="bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-emerald-300/40 col-span-2 sm:col-span-2">
              <span className="text-[10px] uppercase font-bold text-emerald-200 block">
                Total Redeemable Score
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                  {totalEffectivePoints} Points
                </span>
                <span className="text-xs font-semibold text-emerald-200">
                  ({completedLessonsCount} of 5 Completed)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Rewards / Coupons Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-extrabold text-[#075985]">
              Redeemable Coupons & Vouchers
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Unlock coupons as your score milestones accumulate across all questionnaires.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REWARD_COUPONS.map((coupon) => {
            const isUnlocked = totalEffectivePoints >= coupon.minPoints;
            const pointsNeeded = coupon.minPoints - totalEffectivePoints;
            const isCopied = copiedCouponId === coupon.id;

            return (
              <div
                key={coupon.id}
                className={`rounded-3xl p-6 sm:p-7 border transition-all duration-300 relative flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-white border-emerald-300 shadow-md hover:shadow-lg ring-1 ring-emerald-200/50'
                    : 'bg-slate-50/70 border-slate-200/90 opacity-75'
                }`}
              >
                <div>
                  {/* Top Bar: Category & Unlock Status */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                      {coupon.category}
                    </span>

                    {isUnlocked ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                        <Unlock className="w-3.5 h-3.5" />
                        Unlocked ({coupon.minPoints}+ Pts)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-600 text-xs font-bold">
                        <Lock className="w-3.5 h-3.5" />
                        Requires {coupon.minPoints} Pts ({pointsNeeded} pts to unlock)
                      </span>
                    )}
                  </div>

                  {/* Title & Discount Value */}
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-lg font-bold text-slate-900 leading-snug">
                      {coupon.title}
                    </h4>
                    <span className="text-sm font-black text-[#16A34A] bg-emerald-50 px-2.5 py-1 rounded-lg shrink-0 border border-emerald-200">
                      {coupon.discountValue}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {coupon.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                    <span>Partner: <strong>{coupon.partner}</strong></span>
                    <span>{coupon.validThrough}</span>
                  </div>
                </div>

                {/* Bottom Action: Copy Coupon Code */}
                <div className="mt-6 pt-3">
                  {isUnlocked ? (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-100 px-3.5 py-2.5 rounded-xl font-mono text-xs font-bold text-slate-800 tracking-wider border border-slate-200 text-center">
                        {coupon.code}
                      </div>
                      <button
                        onClick={() => handleCopyCode(coupon)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 ${
                          isCopied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#087FCE] hover:bg-[#075985] text-white'
                        }`}
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? 'Copied!' : 'Copy Voucher'}</span>
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-2 px-3 rounded-xl bg-slate-200/60 text-slate-500 text-xs font-semibold">
                      Complete more lessons to unlock this reward
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Certificate of Completion (Printable) */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#16A34A]/40 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16A34A]/10 text-xs font-bold text-[#16A34A] mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Academic Verification</span>
            </div>
            <h3 className="text-2xl font-extrabold text-[#075985]">
              Certificate of Climate Literacy
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Personalize and print your verified certificate of course completion.
            </p>
          </div>

          <button
            onClick={handlePrintCertificate}
            className="px-5 py-2.5 rounded-xl bg-[#075985] hover:bg-slate-900 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm self-start md:self-auto"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save Certificate</span>
          </button>
        </div>

        {/* Certificate Mockup Canvas */}
        <div className="mt-8 p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-[#F5FFF9] via-white to-[#F5FFF9] border-4 border-double border-[#16A34A]/50 text-center relative shadow-sm">
          <div className="max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#087FCE] to-[#16A34A] text-white flex items-center justify-center mx-auto shadow-md">
              <Award className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-[#16A34A] block">
              Global Climate Science & Education Alliance
            </span>

            <h4 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Certificate of Climate Literacy
            </h4>

            <p className="text-xs text-slate-500 italic">This credential is proudly awarded to</p>

            {/* Editable student name */}
            <div className="py-2">
              {isEditingName ? (
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  onBlur={() => setIsEditingName(false)}
                  autoFocus
                  className="text-2xl sm:text-3xl font-bold text-[#075985] border-b-2 border-[#16A34A] text-center bg-transparent focus:outline-none px-4 py-1"
                />
              ) : (
                <div
                  onClick={() => setIsEditingName(true)}
                  className="text-2xl sm:text-3xl font-bold text-[#075985] cursor-pointer hover:underline inline-flex items-center gap-2"
                  title="Click to change name"
                >
                  <span>{studentName}</span>
                  <span className="text-xs text-slate-400 font-normal no-underline">(Click to edit)</span>
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              for successfully completing all 5 interactive modules on <strong>Rising Climate, Changing Weather Patterns, and Sustainable Development Measures</strong>, achieving a score of <strong>{totalEffectivePoints} points</strong>.
            </p>

            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 font-mono">
              <span>Date: September 2026</span>
              <span className="text-emerald-700 font-bold">Credential ID: GCE-2026-CL-889</span>
              <span>Status: Verified Authentic</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
