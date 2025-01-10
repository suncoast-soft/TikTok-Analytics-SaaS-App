import { ChartLineIcon, CogIcon, PlugIcon } from 'lucide-react'

export default function HowItWorks() {
  return (
    <section
      id="howitworks"
      className="bg-white py-16 px-8 mb-16 rounded-lg shadow-md"
    >
      <h2 className="text-4xl font-extrabold text-center mb-12 text-slate-800">
        How It Works
      </h2>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:w-3/4 mx-auto">
        {/* Step 1 */}
        <div className="flex flex-col items-center mb-10 md:mb-0 mx-6">
          <div className="w-16 h-16 mb-6 bg-blue-200 text-blue-600 rounded-full flex items-center justify-center">
            <PlugIcon />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-slate-700">
            Integration
          </h3>
          <p className="text-center max-w-xs text-slate-600">
            Connect your TikTok account effortlessly to manage or join
            campaigns.
          </p>
        </div>

        {/* Connector Line */}
        <svg height="20" width="30" className="hidden md:block mx-6">
          <line
            x1="0"
            y1="10"
            x2="30"
            y2="10"
            style={{ stroke: '#3182CE', strokeWidth: 2 }}
          />
        </svg>

        {/* Step 2 */}
        <div className="flex flex-col items-center mb-10 md:mb-0 mx-6">
          <div className="w-16 h-16 mb-6 bg-green-200 text-green-600 rounded-full flex items-center justify-center">
            <ChartLineIcon />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-slate-700">
            Analysis
          </h3>
          <p className="text-center max-w-xs text-slate-600">
            Access data that drives success through our intuitive platform.
          </p>
        </div>

        {/* Connector Line */}
        <svg height="20" width="30" className="hidden md:block mx-6">
          <line
            x1="0"
            y1="10"
            x2="30"
            y2="10"
            style={{ stroke: '#48BB78', strokeWidth: 2 }}
          />
        </svg>

        {/* Step 3 */}
        <div className="flex flex-col items-center mx-6">
          <div className="w-16 h-16 mb-6 bg-purple-200 text-purple-600 rounded-full flex items-center justify-center">
            <CogIcon />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-slate-700">
            Optimization
          </h3>
          <p className="text-center max-w-xs text-slate-600">
            Refine strategies using comprehensive analytics and reports.
          </p>
        </div>
      </div>
    </section>
  )
}
