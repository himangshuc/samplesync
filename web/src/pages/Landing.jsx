import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/* ─── Product SVG illustrations ─── */
const SodaCan = () => (
  <svg width="52" height="88" viewBox="0 0 52 88" fill="none">
    <rect x="6" y="13" width="40" height="63" rx="3" fill="#DC1C2E"/>
    <ellipse cx="26" cy="13" rx="20" ry="6" fill="#C0C0C0"/>
    <ellipse cx="26" cy="76" rx="20" ry="6" fill="#C0C0C0"/>
    <rect x="6" y="13" width="40" height="10" fill="#E8303E" opacity="0.6"/>
    <rect x="10" y="28" width="32" height="22" rx="2" fill="white" opacity="0.12"/>
    <path d="M6 52 Q16 47 26 52 Q36 57 46 52" stroke="white" strokeWidth="1.5" fill="none" opacity="0.35"/>
    <ellipse cx="26" cy="9" rx="5" ry="2.5" fill="#A8A8A8"/>
    <rect x="23" y="7" width="6" height="3" rx="1" fill="#B5B5B5"/>
  </svg>
);

const MoisturizerJar = () => (
  <svg width="80" height="62" viewBox="0 0 80 62" fill="none">
    <rect x="4" y="23" width="72" height="36" rx="7" fill="#003F8A"/>
    <rect x="0" y="9" width="80" height="18" rx="10" fill="#0056B3"/>
    <ellipse cx="40" cy="18" rx="32" ry="8" fill="#0065CC" opacity="0.45"/>
    <rect x="12" y="29" width="56" height="22" rx="4" fill="white" opacity="0.12"/>
    <rect x="20" y="35" width="40" height="4" rx="2" fill="white" opacity="0.28"/>
    <rect x="25" y="43" width="30" height="3" rx="1" fill="white" opacity="0.18"/>
  </svg>
);

const PumpBottle = () => (
  <svg width="52" height="134" viewBox="0 0 52 134" fill="none">
    <rect x="17" y="0" width="18" height="10" rx="5" fill="#E0E0E0"/>
    <rect x="23" y="10" width="6" height="18" fill="#CCCCCC"/>
    <rect x="18" y="22" width="16" height="12" rx="4" fill="#EBEBEB"/>
    <rect x="6" y="32" width="40" height="94" rx="12" fill="#F2F2F2"/>
    <rect x="9" y="52" width="34" height="55" rx="6" fill="white" opacity="0.85"/>
    <rect x="14" y="62" width="24" height="4" rx="2" fill="#D0D0D0"/>
    <rect x="14" y="70" width="18" height="2.5" rx="1" fill="#DEDEDE"/>
    <rect x="14" y="76" width="20" height="2.5" rx="1" fill="#DEDEDE"/>
    <ellipse cx="26" cy="126" rx="20" ry="5" fill="#DCDCDC" opacity="0.7"/>
  </svg>
);

const WaterBottle = () => (
  <svg width="46" height="124" viewBox="0 0 46 124" fill="none">
    <rect x="15" y="0" width="16" height="14" rx="5" fill="#1565C0"/>
    <rect x="17" y="13" width="12" height="14" rx="3" fill="#B3D9F5"/>
    <rect x="5" y="25" width="36" height="94" rx="14" fill="#C9E8F7" opacity="0.85"/>
    <rect x="5" y="55" width="36" height="64" rx="14" fill="#80C6E8" opacity="0.45"/>
    <rect x="10" y="30" width="8" height="52" rx="4" fill="white" opacity="0.32"/>
    <rect x="8" y="45" width="30" height="28" rx="3" fill="white" opacity="0.5"/>
    <rect x="13" y="52" width="20" height="3" rx="1" fill="#90C8E8" opacity="0.6"/>
    <rect x="15" y="59" width="16" height="2" rx="1" fill="#90C8E8" opacity="0.4"/>
  </svg>
);

const SnackBar = () => (
  <svg width="115" height="46" viewBox="0 0 115 46" fill="none">
    <rect x="6" y="5" width="103" height="36" rx="7" fill="#8B4513"/>
    <rect x="0" y="8" width="10" height="30" rx="5" fill="#A0522D"/>
    <rect x="105" y="8" width="10" height="30" rx="5" fill="#A0522D"/>
    <rect x="13" y="11" width="89" height="24" rx="4" fill="#7A3800" opacity="0.65"/>
    <rect x="13" y="19" width="89" height="8" fill="#D4A017" opacity="0.45"/>
    <rect x="22" y="14" width="44" height="4" rx="2" fill="white" opacity="0.35"/>
    <rect x="22" y="22" width="30" height="3" rx="1" fill="white" opacity="0.2"/>
  </svg>
);

const VitaminBottle = () => (
  <svg width="58" height="82" viewBox="0 0 58 82" fill="none">
    <rect x="9" y="0" width="40" height="20" rx="10" fill="#FF6B35"/>
    <rect x="5" y="15" width="48" height="63" rx="9" fill="#FF8C5A"/>
    <rect x="9" y="26" width="40" height="42" rx="6" fill="white" opacity="0.82"/>
    <rect x="15" y="34" width="28" height="5" rx="2" fill="#FF6B35" opacity="0.65"/>
    <rect x="18" y="43" width="22" height="3" rx="1" fill="#FFB085" opacity="0.6"/>
    <rect x="16" y="50" width="26" height="2.5" rx="1" fill="#FFB085" opacity="0.45"/>
    <rect x="16" y="56" width="20" height="2.5" rx="1" fill="#FFB085" opacity="0.4"/>
    <ellipse cx="29" cy="78" rx="24" ry="5" fill="#E05A25" opacity="0.35"/>
  </svg>
);

const KombuchaBottle = () => (
  <svg width="42" height="122" viewBox="0 0 42 122" fill="none">
    <rect x="14" y="0" width="14" height="13" rx="4" fill="#1B4332"/>
    <rect x="16" y="11" width="10" height="16" rx="3" fill="#40916C"/>
    <path d="M10 27 Q5 37 5 48 L5 102 Q5 112 21 112 Q37 112 37 102 L37 48 Q37 37 32 27 Z" fill="#52B788"/>
    <rect x="5" y="48" width="32" height="54" rx="2" fill="#40916C"/>
    <rect x="8" y="50" width="26" height="42" rx="4" fill="white" opacity="0.65"/>
    <rect x="13" y="58" width="16" height="4" rx="2" fill="#1B4332" opacity="0.55"/>
    <rect x="15" y="66" width="12" height="2.5" rx="1" fill="#52B788" opacity="0.5"/>
    <rect x="13" y="72" width="16" height="2" rx="1" fill="#52B788" opacity="0.4"/>
    <rect x="9" y="30" width="5" height="42" rx="2" fill="white" opacity="0.18"/>
  </svg>
);

const FoilPouch = () => (
  <svg width="72" height="92" viewBox="0 0 72 92" fill="none">
    <rect x="5" y="10" width="62" height="72" rx="6" fill="#B8B8B8"/>
    <rect x="5" y="10" width="20" height="72" rx="6" fill="white" opacity="0.14"/>
    <rect x="3" y="7" width="66" height="9" rx="5" fill="#989898"/>
    <rect x="3" y="76" width="66" height="9" rx="5" fill="#989898"/>
    <rect x="13" y="26" width="46" height="36" rx="5" fill="white" opacity="0.18"/>
    <rect x="20" y="35" width="32" height="4" rx="2" fill="white" opacity="0.28"/>
    <rect x="24" y="44" width="24" height="3" rx="1" fill="white" opacity="0.18"/>
    <rect x="5" y="22" width="8" height="52" rx="4" fill="white" opacity="0.1"/>
  </svg>
);

const SerumDropper = () => (
  <svg width="36" height="102" viewBox="0 0 36 102" fill="none">
    <ellipse cx="18" cy="9" rx="11" ry="9" fill="#7B6040"/>
    <rect x="15" y="16" width="6" height="10" fill="#6B5030"/>
    <rect x="11" y="24" width="14" height="9" rx="3" fill="#5A4020"/>
    <rect x="6" y="31" width="24" height="67" rx="9" fill="#C8966C" opacity="0.88"/>
    <rect x="6" y="56" width="24" height="42" rx="9" fill="#D4A87A" opacity="0.6"/>
    <rect x="8" y="37" width="20" height="38" rx="4" fill="white" opacity="0.55"/>
    <rect x="11" y="44" width="14" height="3" rx="1" fill="#A07040" opacity="0.5"/>
    <rect x="11" y="51" width="10" height="2" rx="1" fill="#A07040" opacity="0.35"/>
    <rect x="9" y="33" width="5" height="36" rx="2" fill="white" opacity="0.22"/>
  </svg>
);

const ChipsBag = () => (
  <svg width="68" height="88" viewBox="0 0 68 88" fill="none">
    <path d="M12 16 Q6 22 4 38 L4 66 Q6 80 16 84 L52 84 Q62 80 64 66 L64 38 Q62 22 56 16 Z" fill="#F5C518"/>
    <rect x="13" y="12" width="42" height="7" rx="3" fill="#D4A800" opacity="0.65"/>
    <rect x="11" y="78" width="46" height="7" rx="3" fill="#D4A800" opacity="0.65"/>
    <rect x="12" y="30" width="44" height="36" rx="5" fill="white" opacity="0.22"/>
    <ellipse cx="34" cy="46" rx="16" ry="10" fill="#CC8800" opacity="0.4"/>
    <rect x="14" y="22" width="10" height="46" rx="5" fill="white" opacity="0.13"/>
    <rect x="20" y="36" width="28" height="4" rx="2" fill="white" opacity="0.3"/>
    <rect x="22" y="44" width="24" height="3" rx="1" fill="white" opacity="0.2"/>
  </svg>
);

/* Positions: [tailwind classes, rotation, float-delay(s), scale, component] */
const HERO_PRODUCTS = [
  { cls: 'top-[4%]  left-[4%]',   rot: '-18deg', delay: 0.0, scale: 1.7, El: SnackBar       },
  { cls: 'top-[2%]  left-[26%]',  rot:  '7deg',  delay: 0.7, scale: 1.8, El: WaterBottle    },
  { cls: 'top-[3%]  right-[26%]', rot: '-6deg',  delay: 1.4, scale: 1.7, El: FoilPouch      },
  { cls: 'top-[4%]  right-[4%]',  rot: '17deg',  delay: 0.3, scale: 1.9, El: PumpBottle     },
  { cls: 'top-[22%] left-[2%]',   rot: '-10deg', delay: 1.1, scale: 1.6, El: MoisturizerJar },
  { cls: 'top-[22%] right-[2%]',  rot:  '-4deg', delay: 1.8, scale: 1.6, El: VitaminBottle  },
  { cls: 'top-[35%] left-[8%]',   rot:  '8deg',  delay: 0.5, scale: 1.7, El: SodaCan        },
  { cls: 'top-[35%] right-[8%]',  rot: '-12deg', delay: 2.0, scale: 1.6, El: ChipsBag       },
  { cls: 'top-[38%] left-[20%]',  rot: '11deg',  delay: 0.6, scale: 1.4, El: VitaminBottle  },
  { cls: 'top-[38%] right-[20%]', rot: '-8deg',  delay: 1.5, scale: 1.4, El: WaterBottle    },
  { cls: 'top-[62%] left-[4%]',   rot:  '6deg',  delay: 0.9, scale: 1.7, El: FoilPouch      },
  { cls: 'top-[66%] left-[18%]',  rot: '-7deg',  delay: 1.6, scale: 1.5, El: SerumDropper   },
  { cls: 'top-[68%] right-[18%]', rot:  '9deg',  delay: 1.2, scale: 1.6, El: KombuchaBottle },
  { cls: 'top-[63%] right-[4%]',  rot: '-15deg', delay: 0.4, scale: 1.6, El: SnackBar       },
];

/* ─── "How it works" step card ─── */
const HOW_STEPS = [
  {
    label: 'Signup',
    sub: 'Create your profile and let us customise your experience',
    img: '/step-signup.avif',
    imgPos: 'object-center',
  },
  {
    label: 'Receive',
    sub: 'Get your first samples delivered to your door',
    img: '/step-receive.avif',
    imgPos: 'object-center',
  },
  {
    label: 'Review',
    sub: 'Review the samples you received',
    img: '/step-review.avif',
    imgPos: 'object-top',
  },
  {
    label: 'Next Set',
    sub: 'Wait for the next set of samples',
    img: '/step-next-set.avif',
    imgPos: 'object-center',
  },
  {
    label: 'Refer',
    sub: 'Refer your friends and build our community',
    img: '/step-refer.avif',
    imgPos: 'object-center',
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

        {/* Scattered product illustrations — outer div handles position+rotation+scale, inner handles float */}
        {HERO_PRODUCTS.map(({ cls, rot, delay, scale, El }, i) => (
          <div key={i} className={`absolute drop-shadow-lg ${cls}`} style={{ transform: `rotate(${rot}) scale(${scale})` }}>
            <div className="float-animate" style={{ animationDelay: `${delay}s` }}>
              <El />
            </div>
          </div>
        ))}

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
        <div className="marquee-inner flex animate-marquee-left-fast whitespace-nowrap">
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
      <section id="how-it-works" className="py-24 bg-[#EFEFEF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-8xl font-black text-navy-700 lowercase mb-4">
              how it works
            </h2>
            <p className="text-navy-700/60 text-lg max-w-md mx-auto">
              Protecting what matters most with tailored sampling processes
            </p>
          </div>

          <div className="flex gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-5 md:overflow-visible">
            {HOW_STEPS.map((step) => (
              <div key={step.label} className="min-w-[220px] md:min-w-0 rounded-3xl overflow-hidden shadow-sm flex-shrink-0 flex flex-col" style={{ height: '400px' }}>
                {/* Image area — fills remaining space */}
                <div className="flex-1 overflow-hidden">
                  <img
                    src={step.img}
                    alt={step.label}
                    className={`w-full h-full object-cover ${step.imgPos}`}
                  />
                </div>
                {/* Navy label area — fixed height */}
                <div className="bg-navy-700 p-5 h-[148px] flex flex-col justify-center">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{step.label}</h3>
                      <p className="text-white/60 text-xs leading-snug">{step.sub}</p>
                    </div>
                    <Link to="/signup" className="w-9 h-9 rounded-full border-2 border-white/30 flex items-center justify-center shrink-0 ml-3 hover:bg-white/10 transition-colors">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </Link>
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
      <section id="signup" className="py-16 bg-[#EFEFEF]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-4 rounded-3xl overflow-hidden shadow-sm">
            {/* Left — photo */}
            <div className="min-h-[440px] overflow-hidden">
              <img
                src="/community-woman.avif"
                alt="Real people, real opinions"
                className="w-full h-full object-cover object-center"
              />
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
        {/* Decorative star — same asterisk as the logo */}
        <div className="absolute top-6 right-16 font-black text-lime-500 text-7xl leading-none select-none opacity-70">
          *
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
                <span className="font-black text-4xl text-white/90 leading-none">SampleSync</span>
                <span className="font-black text-lime-500 text-4xl leading-none">*</span>
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
              <p><a href="mailto:info@samplesync.com" className="text-white/60 hover:text-white text-sm underline transition-colors">info@samplesync.com</a></p>
              <p><Link to="/contact" className="text-white/60 hover:text-white text-sm underline transition-colors">Contact</Link></p>
              <p><Link to="/blogs"   className="text-white/60 hover:text-white text-sm underline transition-colors">Blogs</Link></p>
              <p><Link to="/news"    className="text-white/60 hover:text-white text-sm underline transition-colors">News</Link></p>
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
