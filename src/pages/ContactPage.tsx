import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle2, ArrowRight } from 'lucide-react';

export const ContactPage: React.FC<{ setCurrentPage: (page: string) => void }> = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-rf-dark text-slate-100 font-sans pt-28 pb-20">
      {/* HEADER */}
      <section className="relative py-12 bg-radial-gradient border-b border-rf-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 rounded-full font-mono text-xs font-semibold">
            <Mail className="w-3.5 h-3.5" />
            ENGINEERING INQUIRIES
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Have an antenna requirement? Let's discuss it.
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Reach out to our engineering team with your general inquiries, technical questions, or collaboration proposals.
          </p>
        </div>
      </section>

      {/* CONTACT FORM & INFO GRID */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8 font-mono">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white font-sans">Contact Information</h3>
              <p className="text-slate-400 text-xs leading-relaxed font-sans">
                Our RF engineers respond to all technical inquiries within 24-48 business hours.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-rf-navy/80 border border-rf-border rounded-xl">
                <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Engineering Email</span>
                  <span className="text-sm font-bold text-white">engineering@anteynx.com</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-rf-navy/80 border border-rf-border rounded-xl">
                <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Phone Line</span>
                  <span className="text-sm font-bold text-white">+1 (800) 555-0199</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-rf-navy/80 border border-rf-border rounded-xl">
                <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Headquarters / R&D Hub</span>
                  <span className="text-sm font-bold text-white">Silicon Valley Tech Corridor, CA, USA</span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-rf-navy/80 border border-rf-border rounded-xl">
                <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Professional Network</span>
                  <a href="#linkedin" className="text-sm font-bold text-cyan-300 hover:underline">
                    linkedin.com/company/anteynx
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Quote Prompt Box */}
            <div className="p-5 bg-gradient-to-r from-cyan-950/40 to-rf-navy border border-cyan-500/30 rounded-xl space-y-3 font-sans">
              <h4 className="font-mono text-xs font-bold text-cyan-400 uppercase">Have Specific Specs Prepared?</h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                If you already have operating frequency, gain, bandwidth, or board dimensions, use our RF Requirement Quote Form.
              </p>
              <button
                onClick={() => setCurrentPage('quote')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400 text-slate-950 font-mono font-bold text-xs rounded-lg transition hover:bg-cyan-300"
              >
                <span>Go to Quote Form</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-rf-navy/90 border border-rf-border rounded-2xl p-6 sm:p-8 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4 font-mono">
                <div className="w-16 h-16 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center mx-auto border border-cyan-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-sans">Message Sent Successfully</h3>
                <p className="text-slate-300 text-xs sm:text-sm font-sans max-w-md mx-auto">
                  Thank you for contacting AnteynX. Our engineering team will review your message and reply via email.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-rf-border text-cyan-300 rounded-lg text-xs font-bold hover:bg-rf-navy transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-white border-b border-rf-border pb-3">Send a Message</h3>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-rf-dark border border-rf-border rounded-lg px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-rf-dark border border-rf-border rounded-lg px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Company / Organization</label>
                    <input
                      type="text"
                      placeholder="Company, Lab, or University"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-rf-dark border border-rf-border rounded-lg px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Message *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your inquiry or antenna design requirement..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-rf-dark border border-rf-border rounded-lg px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
