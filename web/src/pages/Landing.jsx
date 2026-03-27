import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/* ─── Floating product silhouettes for hero ─── */
function ProductShape({ className }) {
  return <div className={`absolute bg-white/80 shadow-md rounded-2xl ${className}`} />;
}

/* ─── "How it works" step card ─── */
const HOW_STEPS = [
  {
    label: 'Signup',
    sub: 'Create your profile and let us customise your experience',
    bg: 'from-purple-100 to-purple-200',
    emoji: '📱',
  },
  {
    label: 'Receive',
    sub: 'Get your first samples delivered to your door',
    bg: 'from-amber-100 to-amber-200',
    emoji: '📦',
  },
  {
    label: 'Review',
    sub: 'Review the samples you received',
    bg: 'from-yellow-100 to-yellow-200',
    emoji: '⭐',
  },
  {
    label: 'Next Set',
    sub: 'Wait for the next set of samples',
    bg: 'from-navy-100 to-navy-200',
    emoji: '🛵',
  },
  {
    label: 'Refer',
    sub: 'Refer your friends and build our community',
    bg: 'from-pink-100 to-pink-200',
    emoji: '🤝',
  },
];

/* ─── Brand logos for marquee ─── */
const BRANDS = ['Ambreeque', 'Ktilario', 'DEMOTIVE GROUP', '/// Imoge', 'OWERR', 'Latch.', 'Makeofit', 'Revlon', 'NovaSkin', 'PureBrew'];

/* ─── Testimonials ─── */
const TESTIMONIALS = [
  { quote: 'I could finally find products that actually work for me.', name: 'Emily & Rachel Smith', color: 'bg-orange-400' },
  { quote: 'Efficient budgeting and savings with SampleSync.', name: 'Sarah Nguyen', color: 'bg-purple-600' },
  { quote: 'We can now test 1,000 samples every month.', name: 'Michael Rodriguez', color: 'bg-red-400' },
];

/* ─── Impact stats ─── */
const STATS = [
  { value: '+5k',  label: 'Brands Helped',     sub: 'Over 5,000 brands supported' },
  { value: '10m',  label: 'SKUs Tested',        sub: 'Products tested by real consumers' },
  { value: '3m',   label: 'Reviews Collected',  sub: 'Authentic feedback delivered' },
  { value: '85%',  label: 'Satisfaction Rate',  sub: 'Of consumers loved what they tried' },
];

export default function Landing() {
  return (
    <div className="min-h-screen font-sans">

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#EFEFEF]">

        {/* Scattered product shapes */}
        {/* Left column */}
        <ProductShape className="w-10 h-32 rotate-[-22deg] top-[15%] left-[10%]" />
        <ProductShape className="w-16 h-20 rotate-[12deg]  top-[55%] left-[7%]" />
        <ProductShape className="w-12 h-24 rotate-[-8deg]  top-[68%] left-[14%]" />

        {/* Center-left */}
        <ProductShape className="w-14 h-44 rotate-[6deg]   top-[8%]  left-[30%]" />
        <ProductShape className="w-8  h-20 rotate-[-5deg]  top-[72%] left-[33%]" />

        {/* Center */}
        <ProductShape className="w-10 h-14 rotate-[15deg]  top-[75%] left-[48%]" />

        {/* Center-right */}
        <ProductShape className="w-12 h-36 rotate-[5deg]   top-[6%]  right-[28%]" />
        <ProductShape className="w-10 h-16 rotate-[-10deg] top-[60%] right-[26%]" />

        {/* Right column */}
        <ProductShape className="w-8  h-24 rotate-[18deg]  top-[12%] right-[10%]" />
        <ProductShape className="w-14 h-44 rotate-[-4deg]  top-[22%] right-[6%]" />
        <ProductShape className="w-12 h-20 rotate-[10deg]  top-[68%] right-[8%]" />

        {/* Headline content */}
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-black text-navy-700 leading-tight mb-6">
            Try products before you buy
          </h1>
          <p className="text-lg md:text-xl text-navy-700/60 font-normal mb-10 max-w-xl mx-auto">
            Simplifying sampling for brands with tailored review systems
          </p>
          <Link to="/signup" className="btn-outline text-base !px-10 !py-4">
            Get Started
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BRAND LOGOS MARQUEE
      ══════════════════════════════════════ */}
      <section className="bg-navy-700 py-5 overflow-hidden marquee-track">
        <div className="marquee-inner flex animate-marquee-left-slow whitespace-nowrap">
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <span key={i} className="text-white font-semibold text-base mx-12 tracking-wide opacity-90 shrink-0">
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section className="py-24 bg-[#EFEFEF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-8xl font-black text-navy-700 lowercase mb-4">
              how it works
            </h2>
            <p className="text-navy-700/60 text-lg max-w-md mx-auto">
              Protecting what matters most with tailored sampling processes
            </p>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-5 md:overflow-visible scrollbar-hide">
            {HOW_STEPS.map((step) => (
              <div key={step.label} className="min-w-[260px] md:min-w-0 rounded-3xl overflow-hidden shadow-sm flex-shrink-0">
                {/* Image area */}
                <div className={`bg-gradient-to-br ${step.bg} h-52 flex items-center justify-center text-6xl`}>
                  {step.emoji}
                </div>
                {/* Navy label area */}
                <div className="bg-navy-700 p-5 relative">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-1">{step.label}</h3>
                      <p className="text-white/60 text-sm leading-snug">{step.sub}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center shrink-0 ml-3 mt-1">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          COMMUNITY CTA — split layout
      ══════════════════════════════════════ */}
      <section className="py-16 bg-[#EFEFEF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-4 rounded-3xl overflow-hidden shadow-sm">
            {/* Left — photo */}
            <div className="bg-yellow-400 min-h-[440px] flex items-center justify-center">
              <div className="text-center p-10">
                <div className="text-8xl mb-4">😊</div>
                <p className="text-yellow-900/60 font-medium">Real people, real opinions</p>
              </div>
            </div>
            {/* Right — navy panel */}
            <div className="bg-navy-700 p-12 flex flex-col justify-center">
              <p className="text-white/50 text-sm font-semibold tracking-widest uppercase mb-6">Community</p>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-8">
                Sign up now and be a part of{' '}
                <span className="text-lime-500 relative">
                  SampleSync
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                    <path d="M2 6 C50 2, 150 2, 198 6" stroke="#7EE87E" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>
              <Link to="/signup" className="btn-white self-start !px-10 !py-3.5 text-sm font-bold tracking-widest uppercase">
                Signup
              </Link>
              <p className="text-white/40 text-sm mt-8 leading-relaxed max-w-sm">
                Join thousands of samplers and brands already connected on SampleSync. Share honest feedback and discover products you'll love.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════ */}
      <section className="py-20 bg-[#EFEFEF]">
        <div className="max-w-4xl mx-auto px-6 space-y-4">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl px-8 py-7 flex items-center gap-6 shadow-sm">
              <div className={`w-14 h-14 rounded-full ${t.color} shrink-0`} />
              <div>
                <p className="text-navy-700 font-bold text-lg mb-1">"{t.quote}"</p>
                <p className="text-navy-700/50 text-sm">{t.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          IMPACT STATS — dual marquee + cards
      ══════════════════════════════════════ */}
      <section className="py-20 bg-[#EFEFEF] overflow-hidden">
        {/* "Our Impact" scrolls right, "in Numbers" scrolls left */}
        <div className="mb-2 overflow-hidden marquee-track">
          <div className="marquee-inner flex animate-marquee-right whitespace-nowrap">
            {Array(8).fill('Our Impact').map((t, i) => (
              <span key={i} className="text-5xl md:text-7xl font-black text-navy-700 mx-10 shrink-0">{t}</span>
            ))}
          </div>
        </div>
        <div className="mb-12 overflow-hidden marquee-track">
          <div className="marquee-inner flex animate-marquee-left whitespace-nowrap">
            {Array(8).fill('in Numbers').map((t, i) => (
              <span key={i} className="text-5xl md:text-7xl font-black text-navy-700 mx-10 shrink-0">{t}</span>
            ))}
          </div>
        </div>

        {/* Stats cards with varying heights */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end gap-5 overflow-x-auto pb-4 md:overflow-visible">
            {STATS.map((s, i) => (
              <div
                key={i}
                className="bg-navy-700 rounded-3xl p-7 flex flex-col justify-between min-w-[220px] shrink-0 md:min-w-0 md:flex-1"
                style={{ minHeight: `${200 + i * 60}px` }}
              >
                <span className="text-5xl md:text-6xl font-black text-white">{s.value}</span>
                <div>
                  <p className="text-white font-bold text-sm mb-1">{s.label}</p>
                  <p className="text-white/50 text-xs leading-snug">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          START SAMPLING CTA
      ══════════════════════════════════════ */}
      <section className="py-28 bg-[#EFEFEF] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-8 right-16 w-16 h-16 opacity-60">
          <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 360) / 12;
              const rad = (angle * Math.PI) / 180;
              return (
                <line key={i} x1="30" y1="30"
                  x2={30 + 25 * Math.cos(rad)} y2={30 + 25 * Math.sin(rad)}
                  stroke="#7EE87E" strokeWidth="2" strokeLinecap="round" />
              );
            })}
          </svg>
        </div>
        <div className="absolute top-[55%] left-[45%] w-32 h-16 border-2 border-blue-500 rounded-full opacity-30 rotate-[20deg]" />
        <div className="absolute top-[50%] left-[42%] w-8 h-8 bg-lime-400 opacity-40 rounded" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-sm font-bold text-navy-700/60 tracking-widest uppercase mb-6">
            Discover Experiential Marketing
          </p>
          <h2 className="text-5xl md:text-7xl font-black text-navy-700 leading-tight mb-8">
            Start sampling<br />right away on<br />SampleSync
          </h2>
          <p className="text-navy-700/50 text-base max-w-xl mx-auto mb-10 leading-relaxed">
            Join our platform to connect real consumers with brands who care about honest feedback. Sign up today and get your first sample box within two weeks.
          </p>
          <Link to="/signup" className="btn-primary text-base !px-10 !py-4">
            Get Started
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer className="bg-navy-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-end gap-0 mb-4">
                <span className="font-black text-6xl text-white/90 leading-none">Samp</span>
                <span className="font-black text-lime-500 text-5xl leading-none">*</span>
              </div>
              <p className="text-white/50 text-sm font-semibold leading-snug">
                Simplifying sampling for brands and consumers
              </p>
              <div className="mt-3 w-24 h-0.5 bg-orange-300/50 rounded" />
            </div>

            {/* Address */}
            <div>
              <p className="text-white/60 text-sm leading-relaxed">
                500 Terry Francine St.<br />
                San Francisco, CA 94158<br />
                Tel: 123-456-7890
              </p>
            </div>

            {/* Social */}
            <div className="space-y-2">
              {['LinkedIn', 'Facebook', 'X'].map((s) => (
                <p key={s}><a href="#" className="text-white/60 hover:text-white text-sm underline transition-colors">{s}</a></p>
              ))}
            </div>

            {/* Links */}
            <div className="space-y-2">
              {[['info@samplesync.com', '#'], ['Contact', '/login'], ['Blogs', '#'], ['News', '#']].map(([label, href]) => (
                <p key={label}><a href={href} className="text-white/60 hover:text-white text-sm underline transition-colors">{label}</a></p>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <p className="text-white/30 text-xs text-center">&copy; {new Date().getFullYear()} SampleSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
