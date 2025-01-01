import Image from 'next/image'
import Link from 'next/link'

const socials = [
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
]

export default function ContactUs() {
  return (
    <section
      id="contactus"
      className="bg-secondary text-black py-12 px-8 rounded-lg shadow-lg"
    >
      <div className="flex flex-col items-center md:flex-row md:justify-center md:items-center">
        <div className="w-60 h-60 mb-8 md:mb-0 md:mr-16 relative">
          <Image
            src="/images/customer-service.jpg"
            alt="Contact Us"
            fill={true}
            className="object-cover rounded-full border-4 border-white"
          />
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold mb-8">Contact Us</h2>

          <p className="mb-6">
            Have questions or need support?{' '}
            <a href="/contact-us" className="border-b border-black font-medium">
              Contact Our Team
            </a>
          </p>

          <p>Stay updated with the latest news and features.</p>

          <div className="flex flex-row justify-center md:justify-start gap-3 my-4">
            {socials.map((social, index) => (
              <Link
                key={index}
                href={social.link}
                target="_blank"
                className="no-underline bg-primary/15 hover:bg-primary/30 rounded-full p-2"
              >
                <Image
                  src={social.image}
                  alt={social.name}
                  width={24}
                  height={24}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
