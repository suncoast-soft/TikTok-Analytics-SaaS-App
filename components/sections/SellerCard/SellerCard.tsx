import Image from 'next/image'
import StarRating from '@/components/modules/Rating'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function SellerHome({
  seller,
  user,
  cta
}: {
  seller: any
  user: any
  cta?: boolean
}) {
  return (
    <div className="container max-w-3xl mx-auto py-20">
      <section className="bg-orange-50 px-4 py-8 rounded-lg shadow-lg transform hover:translate-y-1 transition flex flex-col md:flex-row gap-8 overflow-hidden">
        <Image
          src={seller.image ?? '/images/temp/locked.jpeg'}
          alt={seller.name}
          width={200}
          height={200}
        />

        <div className="w-full">
          <h1 className="text-2xl font-bold mb-4">{seller.name}</h1>

          <p>
            <span>Shop Code: </span>
            <strong>{seller.code}</strong>
          </p>

          <p>
            <span>Region: </span>
            <strong>{seller.region}</strong>
          </p>

          <p>
            <span>Type: </span>
            <strong>{seller.seller_type}</strong>
          </p>

          {cta && (
            <div className="flex justify-between items-center mt-6 gap-4">
              <StarRating score={4.6} />

              {!user ? (
                <Button variant="default" asChild>
                  <Link
                    href={`/creator/admin/auth?seller=${seller.name}`}
                    className="no-underline"
                  >
                    Creator Login
                  </Link>
                </Button>
              ) : user.type === 'creator' ? (
                <Button variant="default" asChild>
                  <Link
                    href={`/seller/${seller}/campaigns/active`}
                    className="no-underline"
                  >
                    View Affiliates
                  </Link>
                </Button>
              ) : (
                <div className="text-right">
                  <Button variant="default" disabled className="mb-2">
                    Creator Login
                  </Button>
                  <p>
                    <small>Access is restricted to creators only.</small>
                  </p>
                  <p>
                    <small>Please log out and log in as a creator.</small>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
