import { requestTikTokShopAPIClient } from '@/app/actions'
import { Card } from '@/components/ui/card'
import Image from 'next/image'

import { cn } from '@/utils/cn'
import Link from 'next/link'

const mock__showcaseProducts = {
  code: 0,
  data: {
    next_page_token: 'V231as2V0PTAK',
    products: [
      {
        collaboration: {
          id: '7441611127140075307',
          partner: {
            id: '',
            name: ''
          },
          type: 'TARGET'
        },
        commission: {
          rate: 1500,
          reward_rate: 500
        },
        detail_link:
          'https://shop.tiktok.com/view/product/1729848391237080016?region=US&local=en',
        id: '1729848391237080016',
        main_images: [
          {
            heigth: 100,
            url: 'https://p16-oec-ttp.tiktokcdn-us.com/tos-useast5-i-omjb5zjo8w-tx/91862108eead43c7a9321186de4da0db~tplv-omjb5zjo8w-origin-webp.webp?from=4182867060',
            width: 100
          }
        ],
        price: {
          original_price: {
            currency: 'USD',
            maximum_amount: '100.00',
            minimum_amount: '12.21'
          },
          platform_discount_price: {
            currency: 'USD',
            maximum_amount: '100.00',
            minimum_amount: '12.21'
          },
          seller_discount_price: {
            currency: 'USD',
            maximum_amount: '100.00',
            minimum_amount: '12.21'
          }
        },
        sale_regions: ['US'],
        shop: {
          name: 'SANDBOX7433497795430745898'
        },
        source: 'AFFILIATE',
        status: {
          added_status: 'ADDED',
          inventory_status: 'IN_STOCK',
          is_hidden: false,
          review_status: 'APPROVED'
        },
        third_party_link:
          'https://storename.myshopify.com/products/gold-bracelet-engraved-with-diamonds',
        title:
          'Locked Unisex Permanent Friendship Bracelets with Special Clasp - Perfect Date Night Gift for Anniversary and Birthday'
      }
    ],
    total_count: 15
  },
  message: 'Success',
  request_id: '202203070749000101890810281E8C70B7'
}

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

const ShowcaseProduct = ({ product }: { product: any }) => {
  const {
    collaboration,
    commission,
    detail_link,
    main_images,
    price,
    shop,
    status,
    title
  } = product

  return (
    <Card>
      <div className="flex flex-col lg:flex-row">
        <Image
          src={main_images[0].url}
          width={240}
          height={240}
          alt={title}
          className="object-contain"
        />

        <div className="p-6">
          <h2 className="text-2xl font-bold text-slate-800">{title}</h2>

          <p className="text-slate-500 mt-2">by {shop.name}</p>

          <div className="mt-4">
            <span className="text-slate-600 text-sm">Price:</span>
            <span className="text-xl font-semibold text-green-600 ml-2">
              ${price.original_price.minimum_amount} - $
              {price.original_price.maximum_amount}
            </span>
          </div>

          <div className="mt-2">
            <span className="text-slate-600 text-sm">Commission:</span>
            <span className="text-xl font-semibold text-green-600 ml-2">
              {commission.rate / 100}%
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-2">
              <span
                className={cn(
                  'text-sm px-2 py-1 rounded',
                  status.review_status === 'APPROVED'
                    ? 'bg-secondary/30 text-primary'
                    : 'bg-red-200 text-red-800'
                )}
              >
                {status.review_status}
              </span>

              <span
                className={cn(
                  'text-sm px-2 py-1 rounded',
                  status.added_status === 'ADDED'
                    ? 'bg-secondary/30 text-primary'
                    : 'bg-red-200 text-red-800'
                )}
              >
                {status.added_status}
              </span>

              <span
                className={cn(
                  'text-sm px-2 py-1 rounded',
                  status.inventory_status === 'IN_STOCK'
                    ? 'bg-secondary/30 text-primary'
                    : 'bg-red-200 text-red-800'
                )}
              >
                {status.inventory_status}
              </span>
            </div>

            <span className="text-sm text-slate-800 bg-slate-100 rounded px-2 py-1">
              #{collaboration.id} ({collaboration.type})
            </span>
          </div>

          <div className="mt-6 space-x-4">
            <Link
              href={detail_link}
              target="_blank"
              className="inline-block bg-blue-500 text-white text-sm px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            >
              View Details
            </Link>
            <Link
              href={detail_link}
              target="_blank"
              className="inline-block bg-slate-500 text-white text-sm px-4 py-2 rounded-lg shadow-md hover:bg-slate-600 transition duration-300"
            >
              Visit Store
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}

type Params = Promise<{ seller: string }>

export default async function SellerActiveCampaignsPage({
  params
}: {
  params: Params
}) {
  const seller = await fetchSeller((await params).seller)
  const showcaseProducts = mock__showcaseProducts.data.products.filter(
    (product: any) => product.shop.name === seller.name
  )

  return (
    <div className="container max-w-7xl">
      <section className="flex items-center gap-4 overflow-hidden px-6 mb-8">
        <Image
          src={seller.image ?? '/images/temp/locked.jpeg'}
          alt={seller.name}
          width={96}
          height={96}
          className="w-24 h-24 object-contain"
        />

        <div className="w-full">
          <h1 className="text-2xl font-bold">{seller.name}</h1>

          <p>
            (<span>Shop Code: </span>
            <strong>{seller.code}</strong>)
          </p>
        </div>
      </section>

      {showcaseProducts.map((showcaseProduct, index) => (
        <div key={index} className="mb-8">
          <ShowcaseProduct product={showcaseProduct} />
        </div>
      ))}
    </div>
  )
}
