import AuthForms from '@/components/modules/AuthForms'
import ContactUs from '@/components/sections/Landing/ContactUs'
import FAQs from '@/components/sections/Landing/FAQs'
import FeaturesSection from '@/components/sections/Landing/Features'
import FormHero from '@/components/sections/Landing/FormHero'
import HowItWorks from '@/components/sections/Landing/HowItWorks'
import Testimonials from '@/components/sections/Landing/Testimonials'

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
                ? 'Sign Up'
                : 'Sign In'
        }
        subtitle="For TikTok Creators"
        form={<AuthForms params={params} type="creator" />}
      />

      <FeaturesSection />

      <HowItWorks />

      <Testimonials />

      <FAQs />

      <ContactUs />
    </div>
  )
}
