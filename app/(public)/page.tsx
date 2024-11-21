import ContactUs from '@/components/modules/Landing/ContactUs'
import FAQs from '@/components/modules/Landing/FAQs'
import Features from '@/components/modules/Landing/Features'
import HomeHero from '@/components/modules/Landing/HomeHero'
import HowItWorks from '@/components/modules/Landing/HowItWorks'
import Pricing from '@/components/modules/Landing/Pricing'
import Testimonials from '@/components/modules/Landing/Testimonials'

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
