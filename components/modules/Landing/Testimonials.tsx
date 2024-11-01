import { SmileIcon } from 'lucide-react'

export default function Testimonials() {
  return (
    <section className="mb-16 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">
        What Our Customers Say
      </h2>
      <div className="grid md:grid-cols-2 gap-8 space-y-8 md:space-y-0">
        <blockquote className="bg-gray-100 p-6 pl-20 rounded-lg shadow-md transform hover:-translate-x-1 hover:translate-y-1 transition relative">
          <p className="italic">
            "Flicker has transformed how we engage with TikTok influencers,
            boosting our sales significantly!"
          </p>
          <footer className="mt-4 text-right">— Happy Brand Owner</footer>
          <SmileIcon className="absolute top-4 left-4 w-12 h-12 rounded-full border-2 border-white" />
        </blockquote>
        <blockquote className="bg-gray-100 p-6 pl-20 rounded-lg shadow-md transform hover:translate-x-1 hover:-translate-y-1 transition relative">
          <p className="italic">
            "Joining campaigns through Flicker has streamlined my creative
            collaborations!"
          </p>
          <footer className="mt-4 text-right">— Satisfied Creator</footer>
          <SmileIcon className="absolute top-4 left-4 w-12 h-12 rounded-full border-2 border-white" />
        </blockquote>
      </div>
    </section>
  )
}
