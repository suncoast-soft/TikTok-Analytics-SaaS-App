'use client'

import { requestTikTokShopAPIClient } from '@/app/actions'
import useSWR from 'swr'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { TableCell, TableRow } from '@/components/ui/table'

interface APIParams {
  [key: string]: string | number
}
const fetcher = async (
  func: any,
  api_path: string,
  params: APIParams = {},
  method: string = 'GET',
  body: string = ''
) => {
  return func(api_path, params, method, body)
}

interface Creator {
  avatar: { url: string }
  avg_ec_live_uv: number
  avg_ec_video_view_count: number
  category_ids: string[]
  follower_count: number
  gmv: { amount: string; currency: string }
  gmv_range: { currency: string; minimum_amount: string }
  nickname: string
  selection_region: string
  top_follower_demographics: {
    age_ranges: string[]
    major_gender: { gender: string; percentage: number }
  }
  units_sold_range: { minimum_amount: number }
  username: string
  video_gmv: { amount: string; currency: string }
}

export default function Creators() {
  const { data, error, isLoading } = useSWR(
    [
      requestTikTokShopAPIClient,
      '/affiliate_seller/202406/marketplace_creators/search',
      { page_size: 20 },
      'POST',
      ''
    ],
    ([func, api_path, params, method, body]) =>
      fetcher(func, api_path, params, method, body)
  )

  const { creators } = data?.data ?? { creators: [] }

  return creators.map((creator: Creator, index: number) => (
    <TableRow key={index}>
      <TableCell>
        <Avatar>
          <AvatarImage
            src={creator.avatar.url}
            alt={`${creator.nickname}'s avatar`}
          />
        </Avatar>
      </TableCell>
      <TableCell>
        <p>{creator.nickname}</p>
      </TableCell>
      <TableCell>
        <p>@{creator.username}</p>
      </TableCell>
      <TableCell>
        <p>{creator.follower_count.toLocaleString()}</p>
      </TableCell>
      <TableCell>
        <p>
          {creator.gmv?.currency}{' '}
          {parseFloat(creator.gmv?.amount).toLocaleString()}
        </p>
      </TableCell>
      <TableCell>
        <p>
          {creator.video_gmv?.currency}{' '}
          {parseFloat(creator.video_gmv?.amount).toLocaleString()}
        </p>
      </TableCell>
      <TableCell>
        <p>{creator.avg_ec_live_uv}</p>
      </TableCell>
      <TableCell>
        <p>{creator.avg_ec_video_view_count.toLocaleString()}</p>
      </TableCell>
      <TableCell>
        <p>{creator.selection_region}</p>
      </TableCell>
      <TableCell>
        <p>
          {creator.top_follower_demographics?.age_ranges
            .map((range) => range.replace('AGE_RANGE_', '').replace(/_/g, '-'))
            .join(', ')}
        </p>
      </TableCell>
      <TableCell>
        <p>{creator.top_follower_demographics?.major_gender.gender}</p>
      </TableCell>
      <TableCell>
        <p>
          {(
            creator.top_follower_demographics?.major_gender.percentage / 100
          ).toFixed(2)}
          %
        </p>
      </TableCell>
      <TableCell>
        <p>{creator.category_ids.join(', ')}</p>
      </TableCell>
      <TableCell>
        <p>{creator.units_sold_range?.minimum_amount.toLocaleString()}</p>
      </TableCell>
      <TableCell>
        <p>
          {creator.gmv_range?.currency}{' '}
          {parseFloat(creator.gmv_range?.minimum_amount).toLocaleString()}
        </p>
      </TableCell>
    </TableRow>
  ))
}
