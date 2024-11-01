import Image from 'next/image'

export default function ContactUs() {
  return (
    <section className="bg-secondary text-white py-12 px-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>

      <div className="flex flex-col items-center md:flex-row md:justify-center md:items-center">
        <div className="w-48 h-48 mb-8 md:mb-0 md:mr-16 relative">
          <Image
            src="/images/customer-service.jpg"
            alt="Contact Us"
            fill={true}
            className="object-cover rounded-full border-4 border-white"
          />
        </div>

        <div className="text-center md:text-left">
          <p className="mb-6">
            Have questions or need support?{' '}
            <a href="#" className="no-underline border-b font-medium">
              Contact Our Team
            </a>
          </p>
          <p>
            Stay updated with the latest news and features.{' '}
            <a href="#" className="no-underline border-b font-medium">
              Social Media Links
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
