export default function ContactUs() {
  return (
    <section className="bg-secondary text-white py-12 px-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
      <div className="flex flex-col items-center md:flex-row md:items-start">
        <img
          src="contact_us_placeholder.jpg"
          alt="Contact Us"
          className="mb-6 w-32 h-32 object-cover rounded-full border-4 border-white md:mr-8"
        />
        <div className="text-center md:text-left">
          <p className="mb-6">
            Have questions or need support?{' '}
            <a href="#" className="underline">
              Contact Our Team
            </a>
          </p>
          <p>
            Stay updated with the latest news and features.{' '}
            <a href="#" className="underline">
              Social Media Links
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
