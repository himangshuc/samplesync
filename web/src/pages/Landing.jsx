import { Link } from 'react-router-dom';
import { ArrowRight, Package, Star, Truck, MessageSquare, BarChart3, CreditCard, CheckCircle } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-sage-50" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-brand-100/40 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-sage-100/40 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 text-sm font-medium mb-8">
              <Package className="w-4 h-4" />
              Product sampling, reimagined
            </div>
            <h1 className="text-5xl md:text-7xl font-display leading-[1.1] text-gray-900 mb-6">
              Try Before<br />
              <span className="text-brand-500">You Buy.</span><br />
              Love What<br />
              <span className="text-sage-600">You Try.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-light max-w-xl mb-10 leading-relaxed">
              Get curated product samples delivered to your door every two weeks.
              Share honest feedback. Help brands build better products.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup?role=user" className="btn-primary text-base !px-8 !py-4 gap-2">
                Start Sampling <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/signup?role=brand" className="btn-outline text-base !px-8 !py-4">
                I'm a Brand
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works — Users ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-500 text-lg">Simple for samplers. Powerful for brands.</p>
          </div>

          <div className="mb-20">
            <h3 className="text-sm uppercase tracking-widest text-brand-500 font-semibold mb-10 text-center">For Samplers</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: CheckCircle, title: 'Sign Up', desc: 'Create your profile with preferences, dietary needs, and delivery address.' },
                { icon: Truck, title: 'Receive Samples', desc: 'Get curated products delivered every 2 weeks based on your interests.' },
                { icon: MessageSquare, title: 'Share Feedback', desc: 'Review within 3 days to stay eligible for the next round of samples.' },
              ].map((step, i) => (
                <div key={i} className="card p-8 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-5">
                    <step.icon className="w-7 h-7 text-brand-500" />
                  </div>
                  <div className="text-xs font-bold text-brand-400 mb-2">STEP {i + 1}</div>
                  <h4 className="font-display text-xl mb-2">{step.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-widest text-sage-600 font-semibold mb-10 text-center">For Brands</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: Package, title: 'Create Campaign', desc: 'Set your target audience, product details, and pickup logistics.' },
                { icon: CreditCard, title: 'Make Payment', desc: 'Pay per sample. Simple, transparent pricing.' },
                { icon: Truck, title: 'We Handle Delivery', desc: 'Get products ready for pickup — we distribute to matched consumers.' },
                { icon: BarChart3, title: 'Get Insights', desc: 'Receive rich feedback reports within 2 weeks of distribution.' },
              ].map((step, i) => (
                <div key={i} className="card p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-sage-50 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-6 h-6 text-sage-600" />
                  </div>
                  <div className="text-xs font-bold text-sage-400 mb-2">STEP {i + 1}</div>
                  <h4 className="font-display text-lg mb-1">{step.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 text-center">
            {[
              { value: '50K+', label: 'Active Samplers' },
              { value: '200+', label: 'Brand Partners' },
              { value: '1.2M', label: 'Samples Delivered' },
              { value: '4.7★', label: 'Avg Feedback Rating' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-display text-brand-400 mb-2">{s.value}</div>
                <div className="text-gray-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-gradient-to-br from-brand-50 to-sage-50">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-display text-gray-900 mb-6">
            Ready to discover your next favorite product?
          </h2>
          <p className="text-gray-600 text-lg mb-10">Join thousands of samplers and brands already connected on SampleSync.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup?role=user" className="btn-primary text-base !px-8 !py-4 gap-2">
              Join as Sampler <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/signup?role=brand" className="btn-secondary text-base !px-8 !py-4">
              Launch a Campaign
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-white">SampleSync</span>
          </div>
          <p className="text-sm">&copy; {new Date().getFullYear()} SampleSync. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
