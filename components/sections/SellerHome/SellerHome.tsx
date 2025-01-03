'use client'

import { requestTikTokShopAPIClient } from '@/app/actions'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Loading from '@/components/modules/Loading'
import StarRating from '@/components/modules/Rating'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const fetchSeller = async (seller: string | undefined) => {
  const data = await requestTikTokShopAPIClient(
    seller,
    '/authorization/202309/shops',
    {},
    'GET',
    ''
  )
  if (data.data && Array.isArray(data.data.shops)) {
    return data.data.shops[0]
  }
  return null
}

export default function SellerHome({
  seller,
  user
}: {
  seller: string | undefined
  user: any
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [sellerData, setSellerData] = useState<any>(null)

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true)

      const data = await fetchSeller(seller)

      setSellerData(data)
      setIsLoading(false)
    }

    loadInitialData()
  }, [seller])

  if (isLoading) {
    return (
      <div className="container max-w-3xl py-20">
        <Loading />
      </div>
    )
  }

  if (!sellerData) {
    return <></>
  }

  return (
    <div className="container py-20">
      <section className="max-w-3xl mx-auto bg-orange-50 px-4 py-8 rounded-lg shadow-lg transform hover:translate-y-1 transition flex flex-col md:flex-row gap-8 overflow-hidden">
        <Image
          src={sellerData.image ?? '/logo-icon.png'}
          alt={sellerData.name}
          width={200}
          height={200}
        />

        <div className="w-full">
          <h1 className="text-2xl font-bold mb-4">{sellerData.name}</h1>

          <p>
            <span>Shop Code: </span>
            <strong>{sellerData.code}</strong>
          </p>

          <p>
            <span>Region: </span>
            <strong>{sellerData.region}</strong>
          </p>

          <p>
            <span>Type: </span>
            <strong>{sellerData.seller_type}</strong>
          </p>

          <div className="flex justify-between mt-6 gap-4">
            <StarRating score={4.6} />

            {!user ? (
              <Button variant="default" asChild>
                <Link
                  href={`/creator/admin/auth?seller=${seller}`}
                  className="no-underline"
                >
                  Creator Login
                </Link>
              </Button>
            ) : user.type === 'creator' ? (
              <Button variant="default" asChild>
                <Link
                  href={`/seller/${seller}/analytics/overview`}
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
        </div>
      </section>
    </div>
  )
}
