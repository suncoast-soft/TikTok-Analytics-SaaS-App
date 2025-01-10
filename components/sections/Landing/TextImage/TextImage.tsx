import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/button'

interface SectionProps {
  header?: string
  image: string
  title: string
  description: string
  features: string[]
  ctaName: string
  ctaLink: string
  reverse: boolean
}

export default function TextImageSection({
  header,
  image,
  title,
  description,
  features,
  ctaName,
  ctaLink,
  reverse
}: SectionProps) {
  return (
    <>
      {header && (
        <h2 className="text-4xl font-extrabold text-center text-slate-900 mb-12">
          {header}
        </h2>
      )}

      <div
        className={cn(
          'container flex flex-col gap-12 items-center',
          reverse ? 'md:flex-row-reverse' : 'md:flex-row'
        )}
      >
        <Image
          src={image}
          width={1792}
          height={1024}
          alt={title}
          className="w-full md:w-1/2 h-48 md:h-80 object-contain"
        />

        <div className="w-full md:w-1/2 p-2">
          <div className="shadow border-l-4 space-y-4 bg-white border-secondary rounded-lg p-5">
            <h3 className="text-2xl font-bold mb-2">{title}</h3>

            <p className="text-lg leading-relaxed mb-4">{description}</p>

            <ul className="list-disc pl-5 text-base space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="opacity-80">
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex justify-end mt-4">
              <Button variant="outline" asChild>
                <Link href={ctaLink} className="no-underline">
                  {ctaName}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
