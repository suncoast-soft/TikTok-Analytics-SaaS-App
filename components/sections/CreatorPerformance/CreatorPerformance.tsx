// pages/creator-dashboard.tsx

import Image from 'next/image'
import React from 'react'

type Amount = {
  amount: string
  currency: string
}

type Range = {
  maximum_amount: number | string
  minimum_amount: number | string
  currency?: string
}

type Creator = {
  avatar: {
    url: string
  }
  avg_commission_rate: number
  avg_commission_rate_range: Range
  avg_ec_live_comment_count: number
  avg_ec_live_like_count: number
  avg_ec_live_share_count: number
  avg_ec_live_view_count: number
  avg_ec_video_comment_count: number
  avg_ec_video_like_count: number
  avg_ec_video_play_count: number
  avg_ec_video_share_count: number
  avg_gmv_per_buyer: Amount
  avg_gmv_per_buyer_range: Range
  bio_description: string
  brand_collaboration_count: number
  category_gmv_distribution: { category_id: string; value: string }[]
  category_ids: string[]
  content_gmv_distribution: { content_type: string; value: string }[]
  ec_live_count: number
  ec_live_engagement_rate: string
  ec_video_count: number
  follower_count: number
  gmv: Amount
  gmv_range: Range
  gpm: Amount
  gpm_range: Range
  live_gmv: Amount
  live_gpm: Amount
  live_gpm_range: Range
  nickname: string
  product_original_price_range: Range
  profile_tt_uri: string
  promoted_product_num: number
  selection_region: string
  top_collaborated_brand_ids: string[]
  units_sold: number
  units_sold_range: Range
  username: string
  video_gmv: Amount
  video_gpm: Amount
  video_gpm_range: Range
}

type Props = {
  creator: Creator
}

const mockData: Props = {
  creator: {
    avatar: {
      url: 'https://p16-sign-va.tiktokcdn.com/musically-maliva-obj/1594805258216454~c5_168x168.webp?lk3s=a5d48078&nonce=83807&refresh_token=0cdb4e8d860a94703af7914e109767d0&x-expires=1733673600&x-signature=FlRXSAprEPaVsf1Qp2aMw5ssiDg%3D&shp=a5d48078&shcp=39dffb78'
    },
    avg_commission_rate: 6000,
    avg_commission_rate_range: {
      maximum_amount: 7000,
      minimum_amount: 6000
    },
    avg_ec_live_comment_count: 23,
    avg_ec_live_like_count: 344,
    avg_ec_live_share_count: 3434,
    avg_ec_live_view_count: 4355,
    avg_ec_video_comment_count: 343,
    avg_ec_video_like_count: 324,
    avg_ec_video_play_count: 1234,
    avg_ec_video_share_count: 22,
    avg_gmv_per_buyer: {
      amount: '45.68',
      currency: 'USD'
    },
    avg_gmv_per_buyer_range: {
      currency: 'USD',
      maximum_amount: '1000.00',
      minimum_amount: '100.00'
    },
    bio_description: 'This is my personal introduction',
    brand_collaboration_count: 76,
    category_gmv_distribution: [
      {
        category_id: '66666',
        value: '0.3035'
      }
    ],
    category_ids: ['60001'],
    content_gmv_distribution: [
      {
        content_type: 'VIDEO',
        value: '0.3035'
      }
    ],
    ec_live_count: 12,
    ec_live_engagement_rate: '6000',
    ec_video_count: 34,
    follower_count: 2323,
    gmv: {
      amount: '3434.23',
      currency: 'USD'
    },
    gmv_range: {
      currency: 'USD',
      maximum_amount: '10000.00',
      minimum_amount: '1000.00'
    },
    gpm: {
      amount: '10.23',
      currency: 'USD'
    },
    gpm_range: {
      currency: 'USD',
      maximum_amount: '1000.00',
      minimum_amount: '100.00'
    },
    live_gmv: {
      amount: '3432.34',
      currency: 'USD'
    },
    live_gpm: {
      amount: '44.96',
      currency: 'USD'
    },
    live_gpm_range: {
      currency: 'USD',
      maximum_amount: '1000.00',
      minimum_amount: '100.00'
    },
    nickname: 'Dion',
    product_original_price_range: {
      currency: 'USD',
      maximum_amount: '343.23',
      minimum_amount: '2.59'
    },
    profile_tt_uri:
      'aweme://user/profile/7200669046446064666?sec_uid=MS4wLjABAAAAvkrSOIMxn2YpXW5qBFVHIbfQ11u2L1hamtgg3mbk5GRPpl1TrnKo5zzQe5T77YLw&from_scene=8&enter_from=scan',
    promoted_product_num: 311,
    selection_region: 'US',
    top_collaborated_brand_ids: ['8363021'],
    units_sold: 234,
    units_sold_range: {
      maximum_amount: 1000,
      minimum_amount: 100
    },
    username: 'dioab',
    video_gmv: {
      amount: '39232.34',
      currency: 'USD'
    },
    video_gpm: {
      amount: '28.89',
      currency: 'USD'
    },
    video_gpm_range: {
      currency: 'USD',
      maximum_amount: '1000.00',
      minimum_amount: '100.00'
    }
  }
}

const CreatorDashboard: React.FC<Props> = ({ creator }) => {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="flex items-center space-x-4 mb-6">
        <Image
          src={creator.avatar.url}
          width={80}
          height={80}
          alt="Creator Avatar"
          className="w-20 h-20 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold">{creator.nickname}</h2>
          <p className="text-sm text-slate-500">@{creator.username}</p>
          <p className="text-sm text-slate-500">{creator.bio_description}</p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-xl font-semibold">Performance Metrics</h3>
        <ul className="mt-3 space-y-2">
          <li>
            <strong>Followers:</strong> {creator.follower_count}
          </li>
          <li>
            <strong>Total Video Count:</strong> {creator.ec_video_count}
          </li>
          <li>
            <strong>Average Video Likes:</strong>{' '}
            {creator.avg_ec_video_like_count}
          </li>
          <li>
            <strong>Average Video Comments:</strong>{' '}
            {creator.avg_ec_video_comment_count}
          </li>
          <li>
            <strong>Average Video Plays:</strong>{' '}
            {creator.avg_ec_video_play_count}
          </li>
          <li>
            <strong>Average Video Shares:</strong>{' '}
            {creator.avg_ec_video_share_count}
          </li>
          <li>
            <strong>EC Live Count:</strong> {creator.ec_live_count}
          </li>
          <li>
            <strong>EC Live Engagement Rate:</strong>{' '}
            {creator.ec_live_engagement_rate}
          </li>
          <li>
            <strong>Live GMV:</strong> {creator.live_gmv.amount}{' '}
            {creator.live_gmv.currency}
          </li>
          <li>
            <strong>Live GPM:</strong> {creator.live_gpm.amount}{' '}
            {creator.live_gpm.currency}
          </li>
          <li>
            <strong>Video GMV:</strong> {creator.video_gmv.amount}{' '}
            {creator.video_gmv.currency}
          </li>
          <li>
            <strong>Video GPM:</strong> {creator.video_gpm.amount}{' '}
            {creator.video_gpm.currency}
          </li>
          <li>
            <strong>Average GMV per Buyer:</strong>{' '}
            {creator.avg_gmv_per_buyer.amount}{' '}
            {creator.avg_gmv_per_buyer.currency}
          </li>
          <li>
            <strong>GMV:</strong> {creator.gmv.amount} {creator.gmv.currency}
          </li>
          <li>
            <strong>GPM:</strong> {creator.gpm.amount} {creator.gpm.currency}
          </li>
          <li>
            <strong>Units Sold:</strong> {creator.units_sold}
          </li>
          <li>
            <strong>Promoted Products:</strong> {creator.promoted_product_num}
          </li>
          <li>
            <strong>Brand Collaborations:</strong>{' '}
            {creator.brand_collaboration_count}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default function Page() {
  return <CreatorDashboard {...mockData} />
}
