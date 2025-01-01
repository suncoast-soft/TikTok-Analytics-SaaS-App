'use client'

import { requestTikTokShopAPIClient } from '@/app/actions'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Loading from '@/components/modules/Loading'

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

export default function SellerHome({ seller }: { seller: string | undefined }) {
  const [isLoading, setIsLoading] = useState(false)
  const [sellerData, setSellerData] = useState<any>(null)

  const loadInitialData = async () => {
    setIsLoading(true)

    const data = await fetchSeller(seller)

    setSellerData(data)
    setIsLoading(false)
  }

  useEffect(() => {
    loadInitialData()
  }, [])

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
      <section className="max-w-3xl mx-auto bg-orange-50 p-4 rounded-lg shadow-lg transform hover:translate-y-1 transition flex flex-col md:flex-row gap-8 items-center">
        <div>
          <Image
            src={sellerData.image ?? '/logo-icon.png'}
            alt={sellerData.name}
            width={200}
            height={200}
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-4">{sellerData.name}</h1>

          <p>
            <span>Shop Code: </span>
            <span>{sellerData.code}</span>
          </p>

          <p>
            <span>Region: </span>
            <span>{sellerData.region}</span>
          </p>

          <p>
            <span>Type: </span>
            <span>{sellerData.seller_type}</span>
          </p>
        </div>
      </section>
    </div>
  )
}
