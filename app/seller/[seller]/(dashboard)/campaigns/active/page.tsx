import { requestTikTokShopAPIClient } from '@/app/actions'
import MilestoneBar from '@/components/modules/MilestoneBar'
import { Card, CardContent } from '@/components/ui/card'
import { differenceInDays, format } from 'date-fns'
import Image from 'next/image'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { formatPrice } from '@/utils/helpers'

const mock__creatorTargetCollaborations = {
  code: 0,
  data: {
    next_page_token: 'b2Zmc2V0PTAK',
    target_collaborations: [
      {
        id: '7441611127140075307',
        name: 'Lockedshop Testing',
        products: [
          {
            commission: {
              amount: '161.5',
              currency: 'USD',
              rate: 1500
            },
            id: '1729848391237080016',
            main_image_url:
              'https://p16-oec-ttp.tiktokcdn-us.com/tos-useast5-i-omjb5zjo8w-tx/91862108eead43c7a9321186de4da0db~tplv-omjb5zjo8w-origin-webp.webp?from=4182867060',
            title:
              'Locked Unisex Permanent Friendship Bracelets with Special Clasp - Perfect Date Night Gift for Anniversary and Birthday'
          },
          {
            commission: {
              amount: '341.25',
              currency: 'USD',
              rate: 1500
            },
            id: '1729848288769184720',
            main_image_url:
              'https://p19-oec-ttp.tiktokcdn-us.com/tos-useast5-i-omjb5zjo8w-tx/97975aeeafe648fe8075d35f596ca491~tplv-omjb5zjo8w-origin-webp.webp?from=4182867060',
            title:
              'Locked Unisex Permanent Couples Bracelets with Special Clasp - Perfect Date Night Gift for Anniversary and Birthday'
          }
        ],
        status: 'LIVE'
      }
    ],
    total_count: 1
  },
  message: 'Success',
  request_id: '202203070749000101890810281E8C70B7'
}

const mock__sellerTargetCollaboration = {
  code: 0,
  data: {
    target_collaboration: {
      content_creator_count: 1,
      creator_invited_count: 4,
      creators: [
        {
          avatar: {
            url: 'https://p19-sign.tiktokcdn-us.com/tos-useast5-avt-0068-tx/b15cc55e097461d671666bbb75ab2de7~c5_168x168.webp?lk3s=a5d48078&nonce=1780&refresh_token=788dc1af4851c06d1a0f950d422f5f4f&x-expires=1736100000&x-signature=psLXSR2pRJMBF3F%2Bff5XUSlhNqo%3D&shp=a5d48078&shcp=39dffb78'
          },
          collaboration_status: 'NORMAL',
          content_product_count: 0,
          nickname: 'Ymd_8831',
          product_effective_status: 'EFFECTIVE_ALL',
          selection_region: 'US',
          showcase_product_count: 0,
          username: 'ymd_ttp_8831'
        },
        {
          avatar: {
            url: 'https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/1594805258216454~c5_168x168.webp?lk3s=a5d48078&nonce=72851&refresh_token=989abac4d3e22c513c9131f4d875be04&x-expires=1736100000&x-signature=YnehiC20b7aOQOdJ38dIgfS8EuU%3D&shp=a5d48078&shcp=39dffb78'
          },
          collaboration_status: 'NORMAL',
          content_product_count: 4,
          nickname: 'test_us_showcase3',
          product_effective_status: 'EFFECTIVE_ALL',
          selection_region: 'US',
          showcase_product_count: 2,
          username: 'test_us_showcase3'
        },
        {
          avatar: {
            url: 'https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/1594805258216454~c5_168x168.webp?lk3s=a5d48078&nonce=99517&refresh_token=b316e14dac69ca06cada1ebe5b71587a&x-expires=1736100000&x-signature=YnehiC20b7aOQOdJ38dIgfS8EuU%3D&shp=a5d48078&shcp=39dffb78'
          },
          collaboration_status: 'NORMAL',
          content_product_count: 0,
          nickname: 'test571147_us_215',
          product_effective_status: 'EFFECTIVE_ALL',
          selection_region: 'US',
          showcase_product_count: 0,
          username: 'test571147_us_215'
        },
        {
          avatar: {
            url: 'https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/1594805258216454~c5_168x168.webp?lk3s=a5d48078&nonce=26001&refresh_token=5b03593b90b10a08f0719a79d66fb366&x-expires=1736100000&x-signature=YnehiC20b7aOQOdJ38dIgfS8EuU%3D&shp=a5d48078&shcp=39dffb78'
          },
          collaboration_status: 'NORMAL',
          content_product_count: 0,
          nickname: 'test',
          product_effective_status: 'EFFECTIVE_ALL',
          selection_region: 'US',
          showcase_product_count: 0,
          username: 'test58251'
        }
      ],
      end_time: 1738483199,
      free_sample_rule: {
        has_free_sample: true,
        is_sample_approval_exempt: true
      },
      id: '7441611127140075307',
      message: '',
      name: 'Lockedshop Testing',
      product_count: 2,
      products: [
        {
          collaboration_status: 'NORMAL',
          commission: {
            currency: 'USD',
            effective_time: '1732635132',
            maximum_amount: '1.5',
            minimum_amount: '1.5',
            rate: 1500
          },
          commission_effective_status: 'EFFECTIVE_ALL',
          id: '1729848391237080016',
          main_image_url:
            'https://p16-oec-ttp.tiktokcdn-us.com/tos-useast5-i-omjb5zjo8w-tx/91862108eead43c7a9321186de4da0db~tplv-omjb5zjo8w-origin-webp.webp?from=4182867060',
          original_price: {
            currency: 'USD',
            maximum_amount: '10',
            minimum_amount: '10'
          },
          status: 'LIVE',
          title:
            'Locked Unisex Permanent Friendship Bracelets with Special Clasp - Perfect Date Night Gift for Anniversary and Birthday'
        },
        {
          collaboration_status: 'NORMAL',
          commission: {
            currency: 'USD',
            effective_time: '1732635132',
            maximum_amount: '1.5',
            minimum_amount: '1.5',
            rate: 1500
          },
          commission_effective_status: 'EFFECTIVE_ALL',
          id: '1729848288769184720',
          main_image_url:
            'https://p19-oec-ttp.tiktokcdn-us.com/tos-useast5-i-omjb5zjo8w-tx/97975aeeafe648fe8075d35f596ca491~tplv-omjb5zjo8w-origin-webp.webp?from=4182867060',
          original_price: {
            currency: 'USD',
            maximum_amount: '10',
            minimum_amount: '10'
          },
          status: 'LIVE',
          title:
            'Locked Unisex Permanent Couples Bracelets with Special Clasp - Perfect Date Night Gift for Anniversary and Birthday'
        }
      ],
      seller_contact_info: {
        email: 'murrell@goflicker.co'
      },
      showcase_creator_count: 1,
      start_time: 1732635132,
      type: 'STANDARD',
      update_time: 1732635133
    }
  },
  message: 'Success',
  request_id: '20250103181731834A69E381BC37005D10'
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

const Collaboration = ({ collaboration }: { collaboration: any }) => {
  const totalCommissionAmount = collaboration.products.reduce(
    (sum: number, product: any) => sum + parseFloat(product.commission.amount),
    0
  )

  const totalSalesGMV = collaboration.products.reduce(
    (sum: number, product: any) => {
      const salesGMV =
        parseFloat(product.commission.amount) /
        (product.commission.rate / 10000)
      return sum + salesGMV
    },
    0
  )

  const collaborationData =
    mock__sellerTargetCollaboration.data.target_collaboration
  const {
    name,
    start_time,
    end_time,
    products: sellerProducts,
    seller_contact_info,
    free_sample_rule
  } = collaborationData

  const creatorProducts = collaboration.products

  const products = creatorProducts.map((creatorProduct: any) => {
    const sellerProduct = sellerProducts.find(
      (sp) => sp.id === creatorProduct.id
    )
    return {
      ...creatorProduct,
      original_price: sellerProduct?.original_price,
      status: sellerProduct?.status,
      commission_effective_status: sellerProduct?.commission_effective_status
    }
  })

  const milestones = [
    { gmv: 1000, reward: 'iPhone 15', image: '/images/temp/iPhone.png' },
    { gmv: 3000, reward: 'iPad', image: '/images/temp/iPad.png' },
    { gmv: 10000, reward: 'MacBook', image: '/images/temp/macBook.png' },
    { gmv: 20000, reward: 'iMac Pro', image: '/images/temp/iMac.png' }
  ]

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 space-y-3 py-10">
            <h3 className="text-xl font-bold text-slate-700">
              <span>{name}</span>
              <span className="text-base ml-3 px-1.5 rounded-sm bg-secondary text-white font-bold">
                {collaboration.status}
              </span>
              <br />
              <span className="text-sm font-normal">Seller Contact: </span>
              <span className="text-sm font-medium underline">
                {seller_contact_info.email}
              </span>
            </h3>
            <p>
              <span>{format(start_time * 1000, 'MM/dd/yy')}</span> -{' '}
              <span>{format(end_time * 1000, 'MM/dd/yy')}</span>
              <br />
              <span className="text-sm font-medium px-1">
                Ends in {differenceInDays(end_time * 1000, new Date())} days
              </span>
            </p>
            <hr />
            <p>
              <strong className="text-slate-700">Total GMV: </strong>
              <span>{formatPrice(totalSalesGMV)}</span>
            </p>
            <p>
              <strong className="text-slate-700">Commission: </strong>
              <span>{formatPrice(totalCommissionAmount)}</span>
            </p>
            <hr />
            <p>
              <strong className="text-slate-700">Free Sample: </strong>
              <span>{free_sample_rule?.has_free_sample ? 'Yes' : 'No'}</span>
            </p>
          </div>

          <div className="md:col-span-3">
            <MilestoneBar
              milestones={milestones}
              currentMilestone={totalSalesGMV}
            />

            <div className="mt-6">
              {products.map((product: any, index: number) => (
                <div key={index} className="mb-4 p-3 border border-orange-500">
                  <div className="flex flex-col md:flex-row gap-4">
                    <Dialog>
                      <DialogTrigger className="min-w-36">
                        <Image
                          src={product.main_image_url}
                          width={144}
                          height={144}
                          alt={product.title}
                        />
                      </DialogTrigger>

                      <DialogContent className="max-w-xl p-14">
                        <DialogTitle>{product.title}</DialogTitle>
                        <Image
                          src={product.main_image_url}
                          width={600}
                          height={600}
                          alt={product.title}
                        />
                      </DialogContent>
                    </Dialog>

                    <div>
                      <p className="text-lg font-semibold mb-4">
                        {product.title}
                      </p>

                      <Table className="bg-orange-50/10">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="px-4 py-2">
                              Commission Rate
                            </TableHead>
                            <TableHead className="px-4 py-2">
                              Commission Amount
                            </TableHead>
                            <TableHead className="px-4 py-2">
                              Original Price
                            </TableHead>
                            <TableHead className="px-4 py-2">
                              Product Status
                            </TableHead>
                            <TableHead className="px-4 py-2">
                              Commission Effective Status
                            </TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          <TableRow
                            key={`${product.id}-row2`}
                            className="border-t"
                          >
                            <TableCell className="border px-4 py-2">
                              {product.commission.rate / 100}%
                            </TableCell>
                            <TableCell className="border px-4 py-2">
                              ${product.commission.amount}{' '}
                              {product.commission.currency}
                            </TableCell>
                            <TableCell className="border px-4 py-2">
                              ${product.original_price.minimum_amount}{' '}
                              {product.original_price.currency}
                            </TableCell>
                            <TableCell
                              className={`border px-4 py-2 ${product.status === 'LIVE' ? 'text-blue-500' : 'text-red-500'}`}
                            >
                              {product.status}
                            </TableCell>
                            <TableCell className={`border px-4 py-2`}>
                              {product.commission_effective_status}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
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

  const targetCollaborations =
    mock__creatorTargetCollaborations.data.target_collaborations

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

      {targetCollaborations.map((collaboration, index) => (
        <div key={index} className="mb-8">
          <Collaboration collaboration={collaboration} />
        </div>
      ))}
    </div>
  )
}
