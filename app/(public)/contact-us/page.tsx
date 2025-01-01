import ContactForm from '@/components/modules/Forms/ContactForm'
import FAQs from '@/components/sections/Landing/FAQs'
import PageHero from '@/components/sections/Landing/PageHero'

export default async function ContactUsPage() {
  return (
    <div className="container mx-auto p-8">
      <PageHero title="Contact Us" subtitle="Have questions or need support?" />

      <ContactForm />

      <FAQs />
    </div>
  )
}
