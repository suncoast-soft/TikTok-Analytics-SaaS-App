import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface SectionProps {
  title: string
  subTitle: string
  showCTAs: boolean
}

export default function HeroSection({
  title,
  subTitle,
  showCTAs
}: SectionProps) {
  return (
    <div className="container py-16 relative text-center bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-lg">
      <svg
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polygon fill="#FFF" points="0,100 100,0 100,100" />
      </svg>

      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-in fade-in-80">
          {title}
        </h1>

        <p className="mb-6 text-lg md:text-xl max-w-xl mx-auto">{subTitle}</p>

        {showCTAs && (
          <div className="space-x-4">
            <Button variant="white" asChild>
              <Link
                href="/creator/admin/auth/password_signin"
                className="no-underline"
              >
                Login
              </Link>
            </Button>

            <Button variant="glassy" asChild>
              <Link href="/creator/admin/auth/signup" className="no-underline">
                Start Free Trial
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
