import { SmileIcon } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    image: '/images/testimonial-person-1.jpg',
    name: 'Murrell Johnson',
    position: 'President, Klikz, Inc',
    text: 'Flicker has transformed how we engage with TikTok influencers, boosting our sales significantly!'
  },
  {
    image: '/images/testimonial-person-2.jpg',
    name: 'John Doe',
    position: 'Marketing Manager, Websoft, LLC',
    text: 'Joining campaigns through Flicker has streamlined my creative collaborations!'
  }
]

export default function Testimonials() {
  return (
    <section className="mb-16 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">
        What Our Customers Say
      </h2>
      <div className="grid md:grid-cols-2 gap-8 space-y-8 md:space-y-0">
        {testimonials.map((testimonial, index) => (
          <blockquote className="bg-yellow-50/40 p-6 pl-28 rounded-lg shadow transform hover:-translate-x-1 hover:translate-y-1 transition relative">
            <p className="italic">"{testimonial.text}"</p>

            <footer className="mt-4 text-right">— {testimonial.name}</footer>
            <p className="text-xs text-right text-slate-400">
              {testimonial.position}
            </p>

            <div className="absolute top-4 left-4 w-20 h-20 rounded-full border-2 border-white overflow-hidden">
              <Image
                src={testimonial.image}
                fill={true}
                alt={testimonial.name}
                className="object-cover"
              />
            </div>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
