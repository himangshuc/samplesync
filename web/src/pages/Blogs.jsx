import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

/* ─── Blog card SVG illustrations ─── */
const IllustrationROI = () => (
  <svg viewBox="0 0 320 176" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="320" height="176" fill="#EDE9FE"/>
    {/* Rising bar chart */}
    <rect x="40" y="110" width="32" height="40" rx="4" fill="#7C3AED" opacity="0.35"/>
    <rect x="86" y="86" width="32" height="64" rx="4" fill="#7C3AED" opacity="0.5"/>
    <rect x="132" y="58" width="32" height="92" rx="4" fill="#7C3AED" opacity="0.65"/>
    <rect x="178" y="30" width="32" height="120" rx="4" fill="#7C3AED" opacity="0.85"/>
    <rect x="224" y="14" width="32" height="136" rx="4" fill="#7C3AED"/>
    {/* Upward arrow */}
    <path d="M260 20 L280 8 L280 24" stroke="#5B21B6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <line x1="280" y1="8" x2="240" y2="48" stroke="#5B21B6" strokeWidth="2.5" strokeLinecap="round"/>
    {/* 3x label */}
    <rect x="196" y="34" width="48" height="22" rx="11" fill="white" opacity="0.9"/>
    <text x="220" y="49" textAnchor="middle" fill="#7C3AED" fontSize="11" fontWeight="800">3× ROI</text>
    {/* Base line */}
    <line x1="30" y1="152" x2="280" y2="152" stroke="#7C3AED" strokeWidth="1.5" opacity="0.3"/>
  </svg>
);

const IllustrationSamplers = () => (
  <svg viewBox="0 0 320 176" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="320" height="176" fill="#FEF9C3"/>
    {/* Bullseye */}
    <circle cx="160" cy="88" r="72" fill="#FDE047" opacity="0.3"/>
    <circle cx="160" cy="88" r="52" fill="#FDE047" opacity="0.4"/>
    <circle cx="160" cy="88" r="32" fill="#CA8A04" opacity="0.5"/>
    <circle cx="160" cy="88" r="14" fill="#CA8A04" opacity="0.9"/>
    {/* People pins around target */}
    {[[-60, -50], [60, -50], [-70, 10], [70, 10], [0, -75]].map(([dx, dy], i) => (
      <g key={i} transform={`translate(${160 + dx} ${88 + dy})`}>
        <circle cx="0" cy="-10" r="7" fill="#1B2B4B" opacity="0.7"/>
        <ellipse cx="0" cy="6" rx="9" ry="7" fill="#1B2B4B" opacity="0.5"/>
      </g>
    ))}
    {/* Arrow hitting bullseye */}
    <line x1="240" y1="20" x2="172" y2="78" stroke="#CA8A04" strokeWidth="2.5" strokeLinecap="round"/>
    <polygon points="160,88 170,70 180,78" fill="#CA8A04"/>
  </svg>
);

const IllustrationCommunity = () => (
  <svg viewBox="0 0 320 176" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="320" height="176" fill="#DCFCE7"/>
    {/* Speech bubbles */}
    <rect x="30" y="30" width="120" height="60" rx="14" fill="#16A34A" opacity="0.25"/>
    <polygon points="50,90 50,106 70,90" fill="#16A34A" opacity="0.25"/>
    <rect x="170" y="60" width="120" height="60" rx="14" fill="#16A34A" opacity="0.45"/>
    <polygon points="270,120 270,136 250,120" fill="#16A34A" opacity="0.45"/>
    {/* Smiley lines inside bubbles */}
    <circle cx="72" cy="57" r="8" fill="#16A34A" opacity="0.6"/>
    <circle cx="100" cy="57" r="8" fill="#16A34A" opacity="0.6"/>
    <path d="M68 70 Q90 82 120 70" stroke="#16A34A" strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round"/>
    {/* Stars */}
    {[[220, 78],[248, 72],[268, 88]].map(([x,y],i) => (
      <text key={i} x={x} y={y} fontSize="16" fill="#15803D" opacity="0.7">★</text>
    ))}
    {/* Small dots */}
    <circle cx="60" cy="140" r="6" fill="#86EFAC" opacity="0.6"/>
    <circle cx="160" cy="148" r="4" fill="#86EFAC" opacity="0.5"/>
    <circle cx="264" cy="144" r="5" fill="#86EFAC" opacity="0.6"/>
  </svg>
);

const IllustrationFMCG = () => (
  <svg viewBox="0 0 320 176" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="320" height="176" fill="#DBEAFE"/>
    {/* Line chart rising */}
    <polyline
      points="30,140 70,120 110,105 150,80 190,55 230,35 270,18"
      stroke="#2563EB" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"
    />
    {/* Area fill */}
    <polygon
      points="30,140 70,120 110,105 150,80 190,55 230,35 270,18 270,155 30,155"
      fill="#2563EB" opacity="0.12"
    />
    {/* Data points */}
    {[[70,120],[110,105],[150,80],[190,55],[230,35],[270,18]].map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r="5" fill="#2563EB" opacity="0.8"/>
    ))}
    {/* Grid lines */}
    {[155,120,85,50].map((y,i) => (
      <line key={i} x1="25" y1={y} x2="285" y2={y} stroke="#2563EB" strokeWidth="0.8" opacity="0.2"/>
    ))}
    {/* "Rise" label */}
    <rect x="200" y="22" width="72" height="22" rx="11" fill="white" opacity="0.9"/>
    <text x="236" y="37" textAnchor="middle" fill="#2563EB" fontSize="11" fontWeight="700">+142%</text>
  </svg>
);

const IllustrationTips = () => (
  <svg viewBox="0 0 320 176" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="320" height="176" fill="#FFEDD5"/>
    {/* Notepad */}
    <rect x="80" y="24" width="160" height="130" rx="10" fill="white" opacity="0.8"/>
    <rect x="80" y="24" width="160" height="24" rx="10" fill="#EA580C" opacity="0.7"/>
    <rect x="80" y="36" width="160" height="12" fill="#EA580C" opacity="0.7"/>
    {/* Checklist rows */}
    {[0,1,2,3,4].map(i => (
      <g key={i}>
        <rect x="100" y={68 + i*18} width="12" height="12" rx="3" fill={i < 3 ? '#EA580C' : '#FDBA74'} opacity="0.8"/>
        {i < 3 && <polyline points={`101,${74+i*18} 104,${78+i*18} 111,${70+i*18}`} stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>}
        <rect x="120" y={70 + i*18} width={i % 2 === 0 ? 100 : 70} height="7" rx="3" fill="#EA580C" opacity={0.25 + i * 0.05}/>
      </g>
    ))}
    {/* Stars scattered */}
    {[[240,36],[268,56],[252,104]].map(([x,y],i) => (
      <text key={i} x={x} y={y} fontSize="18" fill="#EA580C" opacity="0.55">★</text>
    ))}
  </svg>
);

const IllustrationInsights = () => (
  <svg viewBox="0 0 320 176" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="320" height="176" fill="#FCE7F3"/>
    {/* Donut chart */}
    <circle cx="140" cy="90" r="58" fill="none" stroke="#DB2777" strokeWidth="22" opacity="0.2" strokeDasharray="365" strokeDashoffset="0"/>
    <circle cx="140" cy="90" r="58" fill="none" stroke="#DB2777" strokeWidth="22" opacity="0.5" strokeDasharray="220" strokeDashoffset="0"/>
    <circle cx="140" cy="90" r="58" fill="none" stroke="#DB2777" strokeWidth="22" opacity="0.8" strokeDasharray="130" strokeDashoffset="0"/>
    <circle cx="140" cy="90" r="38" fill="#FCE7F3"/>
    <text x="140" y="86" textAnchor="middle" fill="#9D174D" fontSize="18" fontWeight="800">85%</text>
    <text x="140" y="101" textAnchor="middle" fill="#DB2777" fontSize="9" opacity="0.7">satisfaction</text>
    {/* Legend items */}
    <rect x="220" y="50" width="10" height="10" rx="2" fill="#DB2777" opacity="0.8"/>
    <rect x="220" y="68" width="10" height="10" rx="2" fill="#DB2777" opacity="0.5"/>
    <rect x="220" y="86" width="10" height="10" rx="2" fill="#DB2777" opacity="0.2"/>
    <rect x="234" y="52" width="56" height="6" rx="3" fill="#DB2777" opacity="0.35"/>
    <rect x="234" y="70" width="42" height="6" rx="3" fill="#DB2777" opacity="0.25"/>
    <rect x="234" y="88" width="50" height="6" rx="3" fill="#DB2777" opacity="0.2"/>
    {/* Decorative sparkle */}
    <text x="266" y="130" fontSize="22" fill="#DB2777" opacity="0.4">✦</text>
  </svg>
);

const ILLUSTRATIONS = [IllustrationROI, IllustrationSamplers, IllustrationCommunity, IllustrationFMCG, IllustrationTips, IllustrationInsights];

const POSTS = [
  {
    tag: 'Product Sampling',
    title: 'Why Product Sampling Is the Highest-ROI Marketing Channel in 2025',
    excerpt: 'Brands that invest in direct-to-consumer sampling see up to 3× higher conversion rates than digital ads alone. Here\'s why.',
    date: 'Mar 15, 2026',
    readTime: '5 min read',
  },
  {
    tag: 'For Brands',
    title: 'How to Choose the Right Samplers for Your Product Launch',
    excerpt: 'Demographic matching, dietary preferences, and household size all play a role. Our algorithm does the heavy lifting.',
    date: 'Mar 8, 2026',
    readTime: '4 min read',
  },
  {
    tag: 'Community',
    title: 'Meet the Samplers: Stories from Our Community',
    excerpt: 'From discovering a new skincare routine to finding the perfect protein bar — real stories from real people.',
    date: 'Feb 28, 2026',
    readTime: '6 min read',
  },
  {
    tag: 'Industry',
    title: 'The Rise of Experiential Marketing in FMCG',
    excerpt: 'Fast-moving consumer goods brands are pivoting from mass advertising to personalised sampling. Here\'s the data.',
    date: 'Feb 20, 2026',
    readTime: '7 min read',
  },
  {
    tag: 'Tips',
    title: '5 Tips to Write Feedback That Brands Actually Use',
    excerpt: 'Good feedback is specific, honest, and timely. Learn how to make your reviews count for the brands you help.',
    date: 'Feb 12, 2026',
    readTime: '3 min read',
  },
  {
    tag: 'For Brands',
    title: 'Understanding Your SampleSync Insights Report',
    excerpt: 'Sentiment scores, demographic breakdowns, and reorder intent — a guide to reading your campaign results.',
    date: 'Feb 5, 2026',
    readTime: '5 min read',
  },
];

export default function Blogs() {
  return (
    <div className="min-h-screen bg-[#EFEFEF] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black text-navy-700 mb-4">Blogs</h1>
        <p className="text-navy-700/60 text-lg mb-16 max-w-xl">
          Insights on product sampling, experiential marketing, and building better brands.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {POSTS.map((post, idx) => {
            const Illustration = ILLUSTRATIONS[idx];
            return (
              <article key={post.title} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="h-44 overflow-hidden">
                  <Illustration />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <span className="text-xs font-bold text-navy-700/60 uppercase tracking-widest mb-3">{post.tag}</span>
                  <h2 className="text-lg font-bold text-navy-700 mb-3 leading-snug">{post.title}</h2>
                  <p className="text-navy-700/50 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-navy-700/40 text-xs">{post.date} · {post.readTime}</span>
                    <button className="w-8 h-8 rounded-full bg-navy-700 flex items-center justify-center">
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
