import { requestTikTokShopAPIClient } from '@/app/actions'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'
import Image from 'next/image'
import { formatPrice } from '@/utils/helpers'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

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
        status: 'ENDED'
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

const mock__sellerAffiliateOrders = {
  code: 0,
  data: {
    next_page_token: 'WzE2OTUxMTY2NTQ2OTMsNTc2NDczNDg5ODYxNDEyMDI1XQ==',
    orders: [
      {
        create_time: 1722420186,
        delivery_time: 1723748656,
        id: '579125529499110202',
        skus: [
          {
            actual_commission_base: {
              amount: '50',
              currency: 'USD'
            },
            actual_paid_commission: {
              amount: '10',
              currency: 'USD'
            },
            actual_paid_shop_ads_commission: {
              amount: '20',
              currency: 'USD'
            },
            campaign_id: '73661290629',
            commission_rate: '1000',
            content_id: '7493990579714164574',
            content_type: 'LIVE',
            creator_username: 'abc123',
            estimated_commission_base: {
              amount: '1',
              currency: 'USD'
            },
            estimated_paid_commission: {
              amount: '20',
              currency: 'USD'
            },
            estimated_paid_shop_ads_commission: {
              amount: '1',
              currency: 'USD'
            },
            open_collaboration_id: '73661290629',
            price: {
              amount: '1',
              currency: 'USD'
            },
            product_id: '1729503179457070324',
            quantity: 1,
            refunded_quantity: 1,
            returned_quantity: 1,
            shop_ads_commission_rate: '5',
            target_collaboration_id: '7441611127140075307'
          }
        ],
        status: '"COMPLETED" '
      }
    ],
    total_count: 10000
  },
  message: 'Success',
  request_id: '202203070749000101890810281E8C70B7'
}

const mock__creatorProfile = {
  code: 0,
  data: {
    avatar: {
      height: 100,
      url: 'https://p16-sign.tiktokcdn-us.com/tos-useast5-avt-0068-tx/d76b8cc1b598de90ad5048df46e672b3~c5_100x100.webp?x-expires=1691895600&x-signature=oAT9KOL7aCN3Did9U%2FoKEsbBDj0%3D',
      width: 100
    },
    creator_user_id: '7495383576032499210',
    permissions: [
      'LIVE_STREAM_PERMISSION',
      'SELF_SALE_PERMISSION',
      'ADD_AFFILIATE_PERMISSION'
    ],
    register_region: 'US',
    selection_region: 'US',
    seller_type: 'LOCAL',
    user_type: 'TIKTOK_SHOP_OFFICIAL_ACCOUNT',
    username: 'abc123'
  },
  message: 'Success',
  request_id: '202203070749000101890810281E8C70B7'
}

const milestones = [
  { gmv: 1000, reward: 'iPhone 15', image: '/images/temp/iPhone.png' },
  { gmv: 3000, reward: 'iPad', image: '/images/temp/iPad.png' },
  { gmv: 10000, reward: 'MacBook', image: '/images/temp/macBook.png' },
  { gmv: 20000, reward: 'iMac Pro', image: '/images/temp/iMac.png' }
]

interface Milestone {
  gmv: number
  reward: string
  image: string
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

const getLatestCompletedMilestone = (
  milestones: Milestone[],
  currentMilestone: number
) => {
  const completedMilestones = milestones.filter(
    (milestone) => currentMilestone >= milestone.gmv
  )
  completedMilestones.sort((a, b) => b.gmv - a.gmv)
  return completedMilestones.length > 0 ? completedMilestones[0] : null
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
  const { name, start_time, end_time } = collaborationData

  const latestCompletedMilestone = getLatestCompletedMilestone(
    milestones,
    totalSalesGMV
  )

  const orders = mock__sellerAffiliateOrders.data.orders.filter(
    (order) =>
      order.skus[0].creator_username === mock__creatorProfile.data.username &&
      order.skus[0].target_collaboration_id === collaboration.id
  )

  console.log(orders)

  return (
    <Card>
      <CardContent>
        <CardHeader>
          <CardTitle>
            <span>{name}</span>
            <span className="text-base ml-3 px-1.5 rounded-sm bg-secondary text-white">
              {collaboration.status}
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <p>
                <span>{format(start_time * 1000, 'MM/dd/yy')}</span> -{' '}
                <span>{format(end_time * 1000, 'MM/dd/yy')}</span>
              </p>
            </div>

            <div className="md:col-span-1">
              <p>
                <strong className="text-slate-700">Total GMV: </strong>
                <span>{formatPrice(totalSalesGMV)}</span>
              </p>
              <p>
                <strong className="text-slate-700">Commission: </strong>
                <span>{formatPrice(totalCommissionAmount)}</span>
              </p>
            </div>

            <div className="md:col-span-1">
              <p>124 Orders</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" size="sm" className="p-0">
                    View Orders
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl p-14 max-h-[80vh] overflow-y-auto">
                  <DialogTitle className="text-slate-800 leading-relaxed">
                    Orders
                  </DialogTitle>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Delivered</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Commission Earned</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order, index) => (
                        <TableRow key={index}>
                          <TableCell>{order.id}</TableCell>
                          <TableCell>
                            {format(order.create_time * 1000, 'MM/dd/yyyy')}
                          </TableCell>
                          <TableCell>
                            {format(order.delivery_time * 1000, 'MM/dd/yyyy')}
                          </TableCell>
                          <TableCell>{order.status}</TableCell>
                          <TableCell>
                            {order.skus.map((sku) => (
                              <p key={sku.product_id}>
                                {sku.quantity} x{' '}
                                {formatPrice(
                                  parseFloat(sku.actual_paid_commission.amount)
                                )}
                              </p>
                            ))}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </DialogContent>
              </Dialog>
            </div>

            <div className="md:col-span-1">
              {latestCompletedMilestone ? (
                <div>
                  <h4 className="text-lg font-bold mb-4">Reward Earned</h4>
                  <div className="text-center">
                    <Image
                      src={latestCompletedMilestone.image}
                      width={64}
                      height={64}
                      alt={latestCompletedMilestone.reward}
                      className="w-16 h-16 object-contain"
                    />
                    <p className="w-16 text-xs text-gray-600">
                      ({latestCompletedMilestone.reward})
                    </p>
                  </div>
                </div>
              ) : (
                <span>No Reward Earned</span>
              )}
            </div>
          </div>
        </CardContent>
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
