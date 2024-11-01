import { ChartLineIcon, RocketIcon } from 'lucide-react';

export default function HomeHero() {
  return (
    <>
      <section className="relative text-center py-16 bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-lg mb-16 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polygon fill="#FFF" points="0,100 100,0 100,100" />
        </svg>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-in fade-in-80">
            Transform Your TikTok Shop Experience
          </h1>
          <p className="mb-6 text-lg md:text-xl max-w-xl mx-auto">
            Connect, Analyze, and Thrive with Flicker’s Advanced Affiliate
            Campaign Management.
          </p>

          <div className="space-x-4">
            <button className="px-8 py-3 bg-white text-primary font-semibold rounded-md shadow hover:bg-gray-100 transition transform hover:scale-105 animate-pulse">
              Log In
            </button>

            <button className="relative inline-block font-medium group">
              <span className="absolute inset-0 transition-transform transform translate-x-1 translate-y-1 bg-primary group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 border-2 border-black"></span>
              <span className="relative block text-white bg-opacity-5 backdrop-blur-md bg-black px-8 py-3 transition-colors duration-300 ease group-hover:bg-opacity-30">
                Glassy Button
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-orange-50 p-8 rounded-lg shadow-lg transform hover:translate-y-1 transition relative">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p>
            At Flicker, we empower brands and creators on TikTok by optimizing
            affiliate reward campaigns through seamless integration and
            real-time analytics.
          </p>
          <RocketIcon className="w-8 h-8 absolute top-4 right-4" />
        </div>
        <div className="bg-orange-50 p-8 rounded-lg shadow-lg transform hover:translate-y-1 transition relative">
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p>
            To be the leading platform that bridges the gap between brands and
            influencers, enhancing profitability and campaign effectiveness.
          </p>
          <ChartLineIcon className="w-8 h-8 absolute top-4 right-4" />
        </div>
      </section>
    </>
  );
}
