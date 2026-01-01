import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-black text-xl tracking-tighter">AppLaunchCheck.</div>
          <Link href="/audit" className="text-sm font-bold text-gray-600 hover:text-black">
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-bold mb-8 border border-green-100">
            Updated for 2025 Store Guidelines
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-8 tracking-tight">
            Stop App Store Rejections <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Before They Happen.</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Get a comprehensive readiness audit for your iOS & Android app in 5 minutes. Checks against 50+ official guidelines. No AI hallucinations, just hard rules.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/audit" 
              className="px-8 py-4 bg-slate-900 text-white text-lg font-bold rounded-xl hover:bg-black transition-all hover:scale-105 shadow-xl shadow-slate-200"
            >
              Check My App Free
            </Link>
            <p className="text-sm text-slate-400">No credit card required</p>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">The "In Review" status shouldn't be a gamble.</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Wasted Time", emoji: "❌", desc: "Waiting 48 hours just to get rejected for a missing Privacy Policy link." },
              { title: "Legal Headaches", emoji: "⚖️", desc: "GDPR, CCPA, Data Safety... one mistake can lead to app suspension." },
              { title: "Missed Deadlines", emoji: "📉", desc: "Rejection emails on launch day destroy your marketing momentum." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-slate-400 text-sm">
        <p>&copy; 2025 AppLaunchCheck. Built for Indie Hackers.</p>
      </footer>
    </main>
  );
}