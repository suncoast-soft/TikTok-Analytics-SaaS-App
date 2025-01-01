import ContactUs from '@/components/sections/Landing/ContactUs'
import FAQs from '@/components/sections/Landing/FAQs'
import Features from '@/components/sections/Landing/Features'
import HomeHero from '@/components/sections/Landing/HomeHero'
import HowItWorks from '@/components/sections/Landing/HowItWorks'
import Testimonials from '@/components/sections/Landing/Testimonials'

export default async function HomePage() {
  return (
    <div className="container mx-auto p-8">
      <HomeHero />

      <Features />

      <HowItWorks />

      <Testimonials />

      {/* <Pricing /> */}

      <FAQs />

      <ContactUs />
    </div>
  )
}
