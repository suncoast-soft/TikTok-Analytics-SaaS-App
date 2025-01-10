import Link from 'next/link'
import SubscriptionForm from '../../modules/Forms/SubscriptionForm'

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-12 mt-16">
      <div className="container mx-auto sm:grid grid-cols-2">
        <SubscriptionForm />

        <div>
          <div className="text-sm text-slate-400 mb-6 text-center sm:text-right">
            <a href="/privacy-policy" className="hover:text-white mx-2">
              Privacy Policy
            </a>{' '}
            |
            <a href="/terms-of-service" className="hover:text-white mx-2">
              Terms of Service
            </a>{' '}
            |
            <Link
              href="/seller/admin/auth/signup"
              className="hover:text-white mx-2"
            >
              Become a partner
            </Link>
          </div>

          <div className="text-slate-500 text-center sm:text-right">
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
