import ContactForm from '@/components/modules/AccountForms/ContactForm'
import FAQs from '@/components/modules/Landing/FAQs'
import PageHero from '@/components/modules/Landing/PageHero'

export default async function ContactUsPage() {
  return (
    <div className="container mx-auto p-8">
      <PageHero title="Contact Us" subtitle="Have questions or need support?" />

      <ContactForm />

      <FAQs />
    </div>
  )
}
