import React, { useState } from 'react';
import {
  Globe2,
  Send,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Clock,
  ShieldAlert,
  HelpCircle,
  PhoneCall,
  MapPin,
  Mail
} from 'lucide-react';
import { SpotlightCard } from '../components/SpotlightCard';

interface ContactPageProps {
  onOpenModal: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenModal }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'High-Performance Web Development',
    budget: '$10k - $25k',
    message: ''
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
  };

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="pt-12 pb-16 md:pt-16 md:pb-20 bg-gradient-to-b from-[#F5FFF9] via-white to-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#087FCE]/10 text-xs font-bold text-[#087FCE] mb-4">
            <Mail className="w-3.5 h-3.5" />
            Direct Communication & Support
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#075985] tracking-tight">
            Connect with Our <span className="text-[#16A34A]">Engineering Team</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Have a project in mind, need a full architectural consultation, or wish to audit your current system's carbon footprint? We're here to assist.
          </p>
        </div>
      </section>

      {/* Main Form & Office Info */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-[#087FCE]">
                  Direct Inquiries
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#075985] mt-1">
                  How Can We Help You?
                </h2>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Our engineering advisors provide technical guidance, code assessments, and sustainability evaluations with zero sales pressure.
                </p>
              </div>

              {/* Office Contact Cards */}
              <div className="space-y-4 text-sm text-slate-600">
                <SpotlightCard
                  spotlightColor="rgba(8, 127, 206, 0.16)"
                  className="p-5 rounded-2xl bg-[#F5FFF9] border border-[#16A34A]/20 flex items-start gap-4 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#087FCE]/10 text-[#087FCE] flex items-center justify-center shrink-0">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Global Headquarters</h4>
                    <p className="text-xs text-slate-500 mt-0.5">100 Green Innovation Blvd, Tech Corridor</p>
                    <span className="inline-block mt-2 text-[11px] font-semibold text-[#16A34A] bg-[#16A34A]/10 px-2 py-0.5 rounded">
                      100% Solar-Powered Facility
                    </span>
                  </div>
                </SpotlightCard>

                <SpotlightCard
                  spotlightColor="rgba(22, 163, 74, 0.16)"
                  className="p-5 rounded-2xl bg-[#F5FFF9] border border-[#16A34A]/20 flex items-start gap-4 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center shrink-0">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Electronic Mail</h4>
                    <p className="text-xs text-slate-500 mt-0.5">engineering@terratrack.io</p>
                    <p className="text-xs text-slate-500">advisory@terratrack.io</p>
                  </div>
                </SpotlightCard>

                <SpotlightCard
                  spotlightColor="rgba(7, 89, 133, 0.16)"
                  className="p-5 rounded-2xl bg-[#F5FFF9] border border-[#16A34A]/20 flex items-start gap-4 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#075985]/10 text-[#075985] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Response Timeline</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Engineers review tickets Monday – Friday</p>
                    <span className="text-xs font-semibold text-[#075985]">Guaranteed reply within 4 business hours</span>
                  </div>
                </SpotlightCard>
              </div>

              {/* FAQ Accordion preview */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Frequently Asked
                </h4>
                <div className="space-y-2 text-xs text-slate-600">
                  <p><strong>Q: Can existing sites be migrated to Terra Track?</strong></p>
                  <p className="text-slate-500">Yes, we regularly audit existing codebases and incrementally migrate assets to cut payload sizes without downtime.</p>
                </div>
              </div>
            </div>

            {/* Right Form Card */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-subtle">
              {formSubmitted ? (
                <div className="text-center py-16 space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#075985]">Inquiry Successfully Dispatched!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. A principal engineer will evaluate your requirements and contact you at <span className="font-semibold text-slate-900">{formData.email}</span>.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          company: '',
                          projectType: 'High-Performance Web Development',
                          budget: '$10k - $25k',
                          message: ''
                        });
                      }}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#087FCE] border border-[#087FCE]/40 hover:bg-[#F5FFF9] transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="border-b border-slate-100 pb-4 mb-2">
                    <h3 className="text-xl font-bold text-slate-900">Project Brief</h3>
                    <p className="text-xs text-slate-500">Fill in the parameters of your project or inquiry.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Your Full Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Sarah Jenkins"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#087FCE] transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Work Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#087FCE] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-company" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Organization / Domain
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Innovations"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#087FCE] transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-budget" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Estimated Scope
                      </label>
                      <select
                        id="contact-budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#087FCE] bg-white transition-all"
                      >
                        <option value="< $10k">Starter Prototype (&lt; $10k)</option>
                        <option value="$10k - $25k">Standard Enterprise Build ($10k - $25k)</option>
                        <option value="$25k - $75k">Comprehensive Digital Overhaul ($25k - $75k)</option>
                        <option value="Custom Enterprise">Ongoing Architectural SLA ($75k+)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-projectType" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Primary Service Category
                    </label>
                    <select
                      id="contact-projectType"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#087FCE] bg-white transition-all"
                    >
                      <option value="High-Performance Web Development">High-Performance Web Development</option>
                      <option value="Carbon Reduction & Eco-Audit">Carbon Footprint Reduction & Sustainability Audit</option>
                      <option value="Responsive Modernization">Adaptive Responsive Redesign (Desktop/Tablet/Mobile)</option>
                      <option value="Full Cloud Infrastructure">Carbon-Neutral Cloud Hosting Architecture</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Project Goals & Technical Specifics *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your timeline, desired deliverables, target audiences, or existing performance pain points..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#087FCE] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-6 py-4 rounded-xl text-sm font-bold text-white bg-[#087FCE] hover:bg-[#075985] transition-all shadow-md hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087FCE]"
                  >
                    <span>Send Project Inquiry</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                  <p className="text-[11px] text-center text-slate-400">
                    We respect your privacy. All inquiries are covered under our technical NDA guarantee.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
