import Image from 'next/image'
import Link from 'next/link'

interface IconProps {
  name: string
  link: string
  image: string
}

interface SectionProps {
  image: string
  title: string
  subTitle: string
  ctaName: string
  ctaLink: string
  text: string
  icons: IconProps[]
}

export default function ImageCTASection({
  image,
  title,
  subTitle,
  ctaName,
  ctaLink,
  text,
  icons
}: SectionProps) {
  return (
    <div className="container max-w-5xl bg-secondary px-8 py-12 rounded shadow flex flex-col items-center md:flex-row md:justify-center md:items-center gap-8 md:gap-16">
      <Image
        src={image}
        alt={title}
        width={480}
        height={480}
        className="w-60 h-60 object-cover rounded-full border-4 border-white"
      />

      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold mb-8">{title}</h2>

        <p className="mb-6">
          {subTitle}{' '}
          <Link href={ctaLink} className="border-b border-black font-medium">
            {ctaName}
          </Link>
        </p>

        <p>{text}</p>

        <div className="flex flex-row justify-center md:justify-start gap-3 my-4">
          {icons.map((icon, index) => (
            <Link
              key={index}
              href={icon.link}
              target="_blank"
              className="no-underline bg-primary/15 hover:bg-primary/30 rounded-full p-2"
            >
              <Image src={icon.image} alt={icon.name} width={24} height={24} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
