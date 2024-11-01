import LogoBlack from '@/components/icons/LogoBlack';
import LogoBlue from '@/components/icons/LogoBlue';
import ContactUs from '@/components/modules/Landing/ContactUs';
import FAQs from '@/components/modules/Landing/FAQs';
import Features from '@/components/modules/Landing/Features';
import HomeHero from '@/components/modules/Landing/HomeHero';
import HowItWorks from '@/components/modules/Landing/HowItWorks';
import Pricing from '@/components/modules/Landing/Pricing';
import Testimonials from '@/components/modules/Landing/Testimonials';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function PricingPage() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user) {
    return redirect('/dashboard');
  }

  return (
    <>
      <div className="container mx-auto p-8">
        <HomeHero />

        <Features />

        <HowItWorks />

        <Testimonials />

        <Pricing />

        <FAQs />

        <ContactUs />
      </div>
    </>
  );
}
