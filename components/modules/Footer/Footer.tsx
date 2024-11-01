import SubscriptionForm from '../AccountForms/SubscriptionForm'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="container mx-auto sm:grid grid-cols-2">
        <SubscriptionForm />

        <div>
          <div className="text-sm text-gray-400 mb-6 text-center sm:text-right">
            <a href="/privacy-policy" className="hover:text-white mx-2">
              Privacy Policy
            </a>{' '}
            |
            <a href="/terms-of-service" className="hover:text-white mx-2">
              Terms of Service
            </a>{' '}
            |
            <a href="/contact-us" className="hover:text-white mx-2">
              Help Center
            </a>
          </div>

          <div className="text-gray-500 text-center sm:text-right">
            <small>
              &copy; {new Date().getFullYear()} Flicker, Co. All rights
              reserved.
            </small>
          </div>
        </div>
      </div>
    </footer>
  )
}
