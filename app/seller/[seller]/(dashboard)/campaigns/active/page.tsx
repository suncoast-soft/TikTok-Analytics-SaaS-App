import MilestoneBar from '@/components/modules/MilestoneBar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/utils/cn'
import { CheckIcon, LockIcon } from 'lucide-react'
import Image from 'next/image'

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
              amount: '121.25',
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
              amount: '241.50',
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

const Collaboration = ({ collaboration }: { collaboration: any }) => {
  const collaborationData =
    mock__sellerTargetCollaboration.data.target_collaboration

  const { name, creators, products, seller_contact_info, free_sample_rule } =
    collaborationData

  const milestones = [
    { gmv: 1000, reward: 'iPhone 15', image: '/images/temp/iPhone.png' },
    { gmv: 10000, reward: 'iPad', image: '/images/temp/iPad.png' },
    { gmv: 25000, reward: 'MacBook', image: '/images/temp/macBook.png' },
    { gmv: 50000, reward: 'iMac Pro', image: '/images/temp/iMac.png' }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardContent>
          <MilestoneBar milestones={milestones} currentMilestone={13000} />
        </CardContent>
      </CardHeader>
    </Card>
  )
}

export default function SellerActiveCampaignsPage() {
  const targetCollaborations =
    mock__creatorTargetCollaborations.data.target_collaborations

  return (
    <div>
      {targetCollaborations.map((collaboration, index) => (
        <div key={index}>
          <Collaboration collaboration={collaboration} />
        </div>
      ))}
    </div>
  )
}
