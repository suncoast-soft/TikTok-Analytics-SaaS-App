import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import Image from 'next/image'

interface FeatureCardProps {
  index: number
  image: string
  altText: string
  title: string
  description: string
  points: string[]
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  index,
  image,
  altText,
  title,
  description,
  points
}) => (
  <div className="mb-32">
    <div
      className={cn(
        'flex flex-col overflow-hidden my-10 gap-12',
        index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
      )}
    >
      <div className="w-full md:w-1/2 relative h-80 rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={altText}
          fill={true}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 644px"
        />
      </div>

      <div className="w-full md:w-1/2 p-2 space-y-4 flex flex-col justify-center">
        <div className="shadow border-l-4 border-secondary rounded-lg p-5">
          <h3 className="text-3xl font-extrabold mb-2">{title}</h3>
          <p className="text-lg leading-relaxed">{description}</p>
          <ul className="list-disc pl-5 text-base space-y-1">
            {points.map((point, index) => (
              <li key={index} className="opacity-80">
                {point}
              </li>
            ))}
          </ul>
          <div className="flex justify-end mt-4">
            <Button variant="outline">Start Free Trial</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default function FeaturesSection() {
  const features = [
    {
      image: '/images/features-businesses.jpg',
      altText: 'TikTok Shop',
      title: 'For TikTok Shop Businesses',
      description:
        'We help brands build and manage their Affiliate Reward Campaigns through detailed analytics software.',
      points: [
        'Create, manage, and optimize affiliate campaigns effortlessly.',
        'Access detailed insights into campaign performance and video reach.',
        'Directly integrate with your shop and affiliates’ accounts to maximize profitability.'
      ]
    },
    {
      image: '/images/features-affiliates.jpg',
      altText: 'Creators and Affiliates',
      title: 'For Creators and Affiliates',
      description:
        'Join the best Affiliate Reward Campaigns on TikTok Shop - new brand campaigns launching every week!',
      points: [
        'Connect and participate in exclusive brand campaigns.',
        'Monitor rewards and sales metrics live on your dashboard.',
        'Instantly join new campaigns with direct integration to your TikTok account.'
      ]
    },
    {
      image: '/images/features-brands.jpg',
      altText: 'Brand Management',
      title: 'For Brands and Creators',
      description:
        'We connect brands with creators to scale TikTok Shop Affiliate Reward Campaigns efficiently.',
      points: [
        'Launch new reward campaigns for businesses and find the best campaigns to join as an affiliate.',
        'Use Flicker to enhance your marketing strategy and reach.'
      ]
    }
  ]

  return (
    <section id="features" className="mt-28">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
        Our Features
      </h2>
      {features.map((feature, index) => (
        <FeatureCard key={index} index={index} {...feature} />
      ))}
    </section>
  )
}
