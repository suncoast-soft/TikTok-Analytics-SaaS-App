import HeroSection from '@/components/sections/Landing/Hero'
import ContactForm from '@/components/modules/Forms/ContactForm'

export default async function ContactUsPage() {
  return (
    <>
      <section className="mt-8 mb-24 px-2">
        <HeroSection
          title="Contact Us"
          subTitle="Have questions or need support?"
          showCTAs={false}
        />
      </section>

      <section className="mb-32 px-2">
        <ContactForm />
      </section>
    </>
  )
}
