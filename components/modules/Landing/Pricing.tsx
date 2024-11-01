import StripePricingTable from '@/components/stripe/StripeTable'

export default function Pricing() {
  return (
    <section className="bg-primary text-white py-12 px-8 mb-16 rounded-lg shadow-lg relative">
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="white"
          strokeWidth="10"
          fill="none"
        />
      </svg>

      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-center mb-8">Pricing Plan</h2>
        <p className="text-center max-w-2xl mx-auto">
          Transparent & Competitive. Stay tuned for our upcoming pricing models
          that promise value and transparency.
        </p>

        <div className="pt-8 my-8 rounded bg-white">
          <StripePricingTable />
        </div>
      </div>
    </section>
  )
}
