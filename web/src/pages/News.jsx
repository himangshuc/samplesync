const NEWS = [
  {
    date: 'Mar 20, 2026',
    category: 'Company',
    headline: 'SampleSync Reaches 5,000 Brand Partners Milestone',
    body: 'We\'re thrilled to announce that SampleSync has crossed 5,000 active brand partners, making us one of the fastest-growing product sampling platforms globally.',
  },
  {
    date: 'Mar 10, 2026',
    category: 'Product',
    headline: 'Introducing Real-Time Campaign Insights Dashboard',
    body: 'Brands can now track feedback sentiment, delivery rates, and reorder intent in real time — all in the brand dashboard.',
  },
  {
    date: 'Feb 25, 2026',
    category: 'Community',
    headline: 'One Million Samples Delivered',
    body: 'SampleSync has officially delivered over one million product samples to consumers across the country. Thank you to our incredible community.',
  },
  {
    date: 'Feb 14, 2026',
    category: 'Partnership',
    headline: 'SampleSync Partners with Leading FMCG Logistics Network',
    body: 'Our new logistics partnership cuts average delivery time from 10 days to under 5, giving brands faster feedback cycles.',
  },
  {
    date: 'Jan 30, 2026',
    category: 'Awards',
    headline: 'Named Top 10 MarTech Startup of 2026',
    body: 'SampleSync has been recognised by MarTech Weekly as one of the top 10 most innovative marketing technology startups of the year.',
  },
];

const CATEGORY_COLORS = {
  Company:     'bg-navy-700 text-white',
  Product:     'bg-lime-500 text-navy-700',
  Community:   'bg-purple-200 text-purple-900',
  Partnership: 'bg-yellow-200 text-yellow-900',
  Awards:      'bg-orange-200 text-orange-900',
};

export default function News() {
  return (
    <div className="min-h-screen bg-[#EFEFEF] py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black text-navy-700 mb-4">News</h1>
        <p className="text-navy-700/60 text-lg mb-16">
          The latest announcements, milestones, and updates from SampleSync.
        </p>

        <div className="space-y-5">
          {NEWS.map((item) => (
            <div key={item.headline} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${CATEGORY_COLORS[item.category] || 'bg-gray-200 text-gray-700'}`}>
                  {item.category}
                </span>
                <span className="text-navy-700/40 text-xs">{item.date}</span>
              </div>
              <h2 className="text-xl font-bold text-navy-700 mb-3 leading-snug">{item.headline}</h2>
              <p className="text-navy-700/55 text-sm leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
