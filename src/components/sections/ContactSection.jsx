import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { getDesignProfile } from '../../utils/designData';
import { usePortfolioData } from '../../contexts/PortfolioContext';
import Reveal from '../ui/Reveal';

export default function ContactSection() {
  const { profile, freelanceSettings, contactSettings } = usePortfolioData();
  const designProfile = getDesignProfile(profile, freelanceSettings);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', honeypot: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  if (!contactSettings?.formEnabled) return null;

  const submit = async (e) => {
    e.preventDefault();
    if (form.honeypot) return;
    setSending(true);
    try {
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
          to_email: contactSettings.email || designProfile.email,
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      toast.success('Message sent! I\'ll respond within 24 hours.');
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '', honeypot: '' });
    } catch {
      toast.error('Failed to send. Please email me directly.');
    } finally {
      setSending(false);
    }
  };

  const hrRate = designProfile.hourlyRate?.includes('/') ? designProfile.hourlyRate : `${designProfile.hourlyRate}/hr`;
  const social = profile?.social || {};

  return (
    <section className="section contact-section" id="contact">
      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />
      <div className="container">
        <Reveal>
          <div className="lbl">Contact</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="sec-title">{contactSettings?.heading || 'Get In Touch'}</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="sec-sub" style={{ marginBottom: '24px' }}>
            {contactSettings?.subheading || 'Ready to start your project? Send a message or book a free 30-minute consultation.'}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="divider" />
        </Reveal>

        <div className="contact-grid">
          <Reveal dir="left">
            <div className="contact-info">
              <h3 className="contact-info-title">Ready to start a project?</h3>
              <p className="contact-info-desc">
                {contactSettings?.availabilityMessage || designProfile.consultationText}. I typically respond within 24 hours.
              </p>

              {/* Hourly rate highlight */}
              {designProfile.availability && (
                <div className="contact-rate-card card">
                  <div className="contact-rate-header">
                    <span className="availability-pulse" />
                    <span className="contact-rate-label">{designProfile.availabilityText}</span>
                  </div>
                  <div className="contact-rate-value">{hrRate}</div>
                  <p className="contact-rate-note">{designProfile.consultationText}</p>
                </div>
              )}

              <div className="contact-details">
                <a href={`mailto:${designProfile.email}`} className="contact-detail-item">
                  <span className="contact-detail-icon">📧</span>
                  <span className="contact-detail-label">Email</span>
                  <span className="contact-detail-value">{designProfile.email}</span>
                </a>
                <div className="contact-detail-item">
                  <span className="contact-detail-icon">📍</span>
                  <span className="contact-detail-label">Location</span>
                  <span className="contact-detail-value">{designProfile.location}</span>
                </div>
                <div className="contact-detail-item">
                  <span className="contact-detail-icon">🕐</span>
                  <span className="contact-detail-label">Availability</span>
                  <span className="contact-detail-value">{designProfile.timezone} · {designProfile.responseTime}</span>
                </div>
              </div>

              {(social.whatsapp || social.telegram) && (
                <div className="contact-quick-actions">
                  {social.whatsapp && (
                    <a href={social.whatsapp} target="_blank" rel="noreferrer" className="btn btn-secondary contact-quick-btn">
                      WhatsApp
                    </a>
                  )}
                  {social.telegram && (
                    <a href={social.telegram} target="_blank" rel="noreferrer" className="btn btn-ghost contact-quick-btn">
                      Telegram
                    </a>
                  )}
                </div>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            {sent ? (
              <div className="card contact-success">
                <div className="contact-success-icon">✅</div>
                <h3 className="contact-success-title">Message Sent!</h3>
                <p className="contact-success-desc">
                  I&apos;ll get back to you within {designProfile.responseTime.toLowerCase()}.
                </p>
                <button type="button" onClick={() => setSent(false)} className="btn btn-primary">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="contact-form">
                <div className="hidden" aria-hidden="true">
                  <input type="text" name="honeypot" value={form.honeypot} onChange={(e) => setForm((f) => ({ ...f, honeypot: e.target.value }))} tabIndex={-1} autoComplete="off" />
                </div>
                <div className="contact-form-row">
                  <div className="contact-form-field">
                    <label>Your Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="contact-form-field">
                    <label>Email Address *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="contact-form-field">
                  <label>Subject *</label>
                  <input
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Project inquiry, Collaboration, etc."
                  />
                </div>
                <div className="contact-form-field">
                  <label>Your Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project, timeline, and budget..."
                    style={{ resize: 'vertical', minHeight: '120px' }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary contact-form-submit"
                  disabled={sending}
                >
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>

      <style>{`
        .contact-section { background: var(--bg2); }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
        .contact-info { display: flex; flex-direction: column; gap: 20px; }
        .contact-info-title { font-size: 20px; font-weight: 700; margin: 0; }
        .contact-info-desc { color: var(--txt2); font-size: 15px; line-height: 1.7; margin: 0; }
        .contact-rate-card { padding: 20px 24px; border-left: 4px solid var(--s); }
        .contact-rate-header { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .contact-rate-label { font-weight: 700; font-size: 14px; color: var(--s); }
        .contact-rate-value { font-size: 24px; font-weight: 800; color: var(--txt); margin-bottom: 4px; }
        .contact-rate-note { font-size: 13px; color: var(--txt3); margin: 0; }
        .contact-details { display: flex; flex-direction: column; gap: 16px; }
        .contact-detail-item { display: flex; flex-direction: column; gap: 2px; text-decoration: none; color: inherit; }
        .contact-detail-item a { color: var(--p); }
        .contact-detail-icon { font-size: 18px; margin-bottom: 2px; }
        .contact-detail-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--txt3); }
        .contact-detail-value { font-size: 14px; font-weight: 500; color: var(--txt2); }
        .contact-detail-item[href] .contact-detail-value { color: var(--p); }
        a.contact-detail-item:hover .contact-detail-value { color: var(--s); }
        .contact-quick-actions { display: flex; gap: 10px; flex-wrap: wrap; }
        .contact-quick-btn { padding: 10px 18px; font-size: 13px; text-decoration: none; }
        .contact-success { padding: 48px 32px; text-align: center; }
        .contact-success-icon { font-size: 56px; margin-bottom: 16px; }
        .contact-success-title { font-size: 22px; font-weight: 700; margin-bottom: 8px; }
        .contact-success-desc { color: var(--txt2); margin-bottom: 24px; }
        .contact-form { display: flex; flex-direction: column; gap: 16px; }
        .contact-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .contact-form-field label { margin-bottom: 6px; }
        .contact-form-submit { padding: 14px 24px; font-size: 15px; justify-content: center; }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr; gap: 32px; }
          .contact-form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
