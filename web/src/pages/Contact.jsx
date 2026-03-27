import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#EFEFEF] py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-black text-navy-700 mb-4">Contact Us</h1>
        <p className="text-navy-700/60 text-lg mb-12">
          Have a question or want to work with us? Send us a message and we'll get back to you within 24 hours.
        </p>

        {sent ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
            <div className="font-black text-lime-500 text-6xl mb-4">*</div>
            <h2 className="text-2xl font-bold text-navy-700 mb-2">Message sent!</h2>
            <p className="text-navy-700/50">We'll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-10 shadow-sm space-y-6">
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">Name</label>
              <input
                className="input-field"
                placeholder="Your name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">Email</label>
              <input
                type="email"
                className="input-field"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-2">Message</label>
              <textarea
                rows={6}
                className="input-field resize-none"
                placeholder="How can we help?"
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full">Send Message</button>
          </form>
        )}

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { label: 'Email', value: 'info@samplesync.com' },
            { label: 'Phone', value: '123-456-7890' },
            { label: 'Address', value: '500 Terry Francine St, San Francisco CA 94158' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-navy-700 rounded-2xl p-6">
              <p className="text-lime-500 text-xs font-bold uppercase tracking-widest mb-2">{label}</p>
              <p className="text-white text-sm leading-relaxed">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
