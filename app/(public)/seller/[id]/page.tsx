import AuthForms from '@/components/modules/AuthForms'
import ContactUs from '@/components/modules/Landing/ContactUs'
import FAQs from '@/components/modules/Landing/FAQs'
import FeaturesSection from '@/components/modules/Landing/Features'
import FormHero from '@/components/modules/Landing/FormHero'
import HowItWorks from '@/components/modules/Landing/HowItWorks'
import Testimonials from '@/components/modules/Landing/Testimonials'

export default async function Seller(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params
  return (
    <div className="container mx-auto p-8">
      <FormHero
        title={
          params.id === 'forgot_password'
            ? 'Reset Password'
            : params.id === 'update_password'
              ? 'Update Password'
              : params.id === 'signup'
                ? 'Become a Partner'
                : 'Sign In Partner Portal'
        }
        subtitle="For TikTok Shop Businesses"
        form={<AuthForms params={params} type="seller" />}
      />

      <FeaturesSection />

      <HowItWorks />

      <Testimonials />

      <FAQs />

      <ContactUs />
    </div>
  )
}
