import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const POSTS = [
  {
    tag: 'Product Sampling',
    title: 'Why Product Sampling Is the Highest-ROI Marketing Channel in 2025',
    excerpt: 'Brands that invest in direct-to-consumer sampling see up to 3× higher conversion rates than digital ads alone. Here\'s why.',
    date: 'Mar 15, 2026',
    readTime: '5 min read',
    bg: 'bg-purple-100',
  },
  {
    tag: 'For Brands',
    title: 'How to Choose the Right Samplers for Your Product Launch',
    excerpt: 'Demographic matching, dietary preferences, and household size all play a role. Our algorithm does the heavy lifting.',
    date: 'Mar 8, 2026',
    readTime: '4 min read',
    bg: 'bg-yellow-100',
  },
  {
    tag: 'Community',
    title: 'Meet the Samplers: Stories from Our Community',
    excerpt: 'From discovering a new skincare routine to finding the perfect protein bar — real stories from real people.',
    date: 'Feb 28, 2026',
    readTime: '6 min read',
    bg: 'bg-lime-100',
  },
  {
    tag: 'Industry',
    title: 'The Rise of Experiential Marketing in FMCG',
    excerpt: 'Fast-moving consumer goods brands are pivoting from mass advertising to personalised sampling. Here\'s the data.',
    date: 'Feb 20, 2026',
    readTime: '7 min read',
    bg: 'bg-blue-100',
  },
  {
    tag: 'Tips',
    title: '5 Tips to Write Feedback That Brands Actually Use',
    excerpt: 'Good feedback is specific, honest, and timely. Learn how to make your reviews count for the brands you help.',
    date: 'Feb 12, 2026',
    readTime: '3 min read',
    bg: 'bg-orange-100',
  },
  {
    tag: 'For Brands',
    title: 'Understanding Your SampleSync Insights Report',
    excerpt: 'Sentiment scores, demographic breakdowns, and reorder intent — a guide to reading your campaign results.',
    date: 'Feb 5, 2026',
    readTime: '5 min read',
    bg: 'bg-pink-100',
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
          {POSTS.map((post) => (
            <article key={post.title} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className={`${post.bg} h-44 flex items-end p-6`}>
                <span className="text-xs font-bold text-navy-700/60 uppercase tracking-widest">{post.tag}</span>
              </div>
              <div className="p-7 flex flex-col flex-1">
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
          ))}
        </div>
      </div>
    </div>
  );
}
