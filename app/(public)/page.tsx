import { ChartLineIcon, CogIcon, PlugIcon, RocketIcon } from 'lucide-react'
import HeroSection from '@/components/sections/Landing/Hero'
import TextColumnsSection from '@/components/sections/Landing/TextColumns'
import TextImageSection from '@/components/sections/Landing/TextImage'
import IconColumnsSection from '@/components/sections/Landing/IconColumns'
import CardColumnsSection from '@/components/sections/Landing/CardColumns'
import AccordionRowsSection from '@/components/sections/Landing/AccordionRows'
import ImageCTASection from '@/components/sections/Landing/ImageCTA'
import Pricing from '@/components/sections/Landing/Pricing'

export default async function HomePage() {
  return (
    <>
      <section className="mt-8 mb-8 px-2">
        <HeroSection
          title="Transform Your TikTok Shop Experience"
          subTitle="Connect, Analyze, and Thrive with Flicker’s Advanced Affiliate
          Campaign Management."
          showCTAs={true}
        />
      </section>

      <section className="mb-32">
        <TextColumnsSection
          columns={[
            {
              title: 'Our Mission',
              text: 'At Flicker, we empower brands and creators on TikTok by optimizing affiliate reward campaigns through seamless integration and real-time analytics.',
              icon: <RocketIcon />
            },
            {
              title: 'Our Vision',
              text: 'To be the leading platform that bridges the gap between brands and influencers, enhancing profitability and campaign effectiveness.',
              icon: <ChartLineIcon />
            }
          ]}
        />
      </section>

      <section id="features" className="mb-32">
        <TextImageSection
          header="Our Features"
          image="/images/features-businesses.jpg"
          title="For TikTok Shop Businesses"
          description="We help brands build and manage their Affiliate Reward Campaigns through detailed analytics software."
          features={[
            'Create, manage, and optimize affiliate campaigns effortlessly.',
            'Access detailed insights into campaign performance and video reach.',
            'Directly integrate with your shop and affiliates’ accounts to maximize profitability.'
          ]}
          ctaName="Start Free Trial"
          ctaLink="/creator/admin/auth/signup"
          reverse={false}
        />
      </section>

      <section className="mb-32">
        <TextImageSection
          image="/images/features-affiliates.jpg"
          title="For Creators and Affiliates"
          description="Join the best Affiliate Reward Campaigns on TikTok Shop - new brand campaigns launching every week!"
          features={[
            'Connect and participate in exclusive brand campaigns.',
            'Monitor rewards and sales metrics live on your dashboard.',
            'Instantly join new campaigns with direct integration to your TikTok account.'
          ]}
          ctaName="Start Free Trial"
          ctaLink="/creator/admin/auth/signup"
          reverse={true}
        />
      </section>

      <section className="mb-32">
        <TextImageSection
          image="/images/features-brands.jpg"
          title="For Brands and Creators"
          description="We connect brands with creators to scale TikTok Shop Affiliate Reward Campaigns efficiently."
          features={[
            'Launch new reward campaigns for businesses and find the best campaigns to join as an affiliate.',
            'Use Flicker to enhance your marketing strategy and reach.'
          ]}
          ctaName="Start Free Trial"
          ctaLink="/creator/admin/auth/signup"
          reverse={false}
        />
      </section>

      <section id="howitworks" className="mb-32 px-2">
        <IconColumnsSection
          header="How It Works"
          columns={[
            {
              icon: <PlugIcon />,
              title: 'Integration',
              text: 'Connect your TikTok account effortlessly to manage or join campaigns.',
              color: 'blue'
            },
            {
              icon: <ChartLineIcon />,
              title: 'Analysis',
              text: 'Access data that drives success through our intuitive platform.',
              color: 'green'
            },
            {
              icon: <CogIcon />,
              title: 'Optimization',
              text: 'Refine strategies using comprehensive analytics and reports.',
              color: 'purple'
            }
          ]}
        />
      </section>

      <section className="mb-32">
        <CardColumnsSection
          header="What Our Customers Say"
          columns={[
            {
              image: '/images/testimonial-person-1.jpg',
              name: 'Murrell Johnson',
              position: 'President, Klikz, Inc',
              text: 'Flicker has completely transformed how we engage with TikTok influencers. Their platform is incredibly user-friendly and has streamlined our workflow significantly. Thanks to Flicker, we have been able to boost our sales substantially by reaching a wider audience through effective influencer collaborations!'
            },
            {
              image: '/images/testimonial-person-2.jpg',
              name: 'John Doe',
              position: 'Marketing Manager, Websoft, LLC',
              text: 'Joining campaigns through Flicker has dramatically streamlined my creative collaborations. The process is intuitive, allowing me to connect effortlessly with talented creators. I appreciate their support throughout each campaign, making it easier than ever to achieve our marketing goals and expand our brand’s reach!'
            },
            {
              image: '/images/testimonial-person-3.jpg',
              name: 'Sarah Thompson',
              position: 'Customer Support Lead, Tech Innovations',
              text: 'The customer service at Flicker is outstanding! They are responsive, knowledgeable, and always willing to help. My inquiries are addressed promptly, making my experience seamless!'
            }
          ]}
        />
      </section>

      <section className="mb-32">
        <AccordionRowsSection
          header="FAQs"
          rows={[
            {
              title: 'How does Flicker integrate with TikTok Shop?',
              text: 'Through direct API connections, ensuring seamless data flow.'
            },
            {
              title: 'Can I monitor multiple campaigns at once?',
              text: 'Yes, our platform is designed to handle multiple campaigns efficiently.'
            },
            {
              title: 'Is the service free for businesses?',
              text: 'Yes, businesses can use our platform free of charge.'
            },
            {
              title: 'What features do creators get with the subscription?',
              text: 'Creators receive detailed analytics, performance tracking, and additional promotional tools.'
            },
            {
              title: 'How can I cancel my subscription?',
              text: 'You can cancel your subscription anytime through your account settings.'
            },
            {
              title:
                'Are there any limits on the number of links I can create?',
              text: 'No, there are no limits on the number of affiliate links you can create.'
            }
          ]}
        />
      </section>

      <section id="contactus" className="mb-32 px-2">
        <ImageCTASection
          image="/images/customer-service.jpg"
          title="Contact Us"
          subTitle="Have questions or need support?"
          ctaName="Contact Our Team"
          ctaLink="/contact-us"
          text="Stay updated with the latest news and features."
          icons={[
            {
              name: 'TikTok',
              link: 'https://tiktok.com/flicker',
              image: '/icons/tiktok-brands-solid.svg'
            },
            {
              name: 'Twitter',
              link: 'https://twitter.com/flicker',
              image: '/icons/x-twitter-brands-solid.svg'
            },
            {
              name: 'Youtube',
              link: 'https://youtube.com/flicker',
              image: '/icons/youtube-brands-solid.svg'
            },
            {
              name: 'Facebook',
              link: 'https://facebook.com/flicker',
              image: '/icons/facebook-brands-solid.svg'
            }
          ]}
        />
      </section>

      <Pricing />
    </>
  )
}
