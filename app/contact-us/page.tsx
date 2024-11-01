import ContactForm from '@/components/modules/AccountForms/ContactForm'
import ContactUs from '@/components/modules/Landing/ContactUs'
import FAQs from '@/components/modules/Landing/FAQs'
import Features from '@/components/modules/Landing/Features'
import HowItWorks from '@/components/modules/Landing/HowItWorks'
import PageHero from '@/components/modules/Landing/PageHero'
import Pricing from '@/components/modules/Landing/Pricing'
import Testimonials from '@/components/modules/Landing/Testimonials'

export default async function PricingPage() {
  return (
    <>
      <div className="container mx-auto p-8">
        <PageHero
          title="Contact Us"
          subtitle="Have questions or need support?"
        />

        <ContactForm />

        <FAQs />
      </div>
    </>
  )
}
