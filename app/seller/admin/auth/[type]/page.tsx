import Auth from '@/components/sections/Auth'
import ContactUs from '@/components/sections/Landing/ContactUs'
import FAQs from '@/components/sections/Landing/FAQs'
import FeaturesSection from '@/components/sections/Landing/Features'
import FormHero from '@/components/sections/Landing/FormHero'
import HowItWorks from '@/components/sections/Landing/HowItWorks'
import Testimonials from '@/components/sections/Landing/Testimonials'

export default async function Seller(props: {
  params: Promise<{ type: string }>
}) {
  const params = await props.params
  return (
    <div className="container mx-auto p-8">
      <FormHero
        title={
          params.type === 'forgot_password'
            ? 'Reset Password'
            : params.type === 'update_password'
              ? 'Update Password'
              : params.type === 'signup'
                ? 'Become a Partner'
                : 'Sign In Partner Portal'
        }
        subtitle="For TikTok Shop Businesses"
        form={<Auth params={params} type="seller" />}
      />

      <FeaturesSection />

      <HowItWorks />

      <Testimonials />

      <FAQs />

      <ContactUs />
    </div>
  )
}
