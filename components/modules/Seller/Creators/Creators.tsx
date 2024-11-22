'use client'

import { useEffect, useState } from 'react'
import { requestTikTokShopAPIClient } from '@/app/actions'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import Loading from '../../Loading'
import { Button } from '@/components/ui/button'

interface APIParams {
  [key: string]: string | number
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

const fetchCreators = async (params: APIParams) => {
  const data = await requestTikTokShopAPIClient(
    '/affiliate_seller/202406/marketplace_creators/search',
    params,
    'POST',
    ''
  )
  return data.data
}

export default function Creators() {
  const [creators, setCreators] = useState<Creator[]>([])
  const [nextPageToken, setNextPageToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<boolean>(true) // true for ascending

  const loadInitialData = async () => {
    setIsLoading(true)
    const data = await fetchCreators({ page_size: 20 })
    setCreators(data.creators || [])
    setNextPageToken(data.next_page_token || null)
    setIsLoading(false)
  }

  const loadMoreCreators = async () => {
    if (!nextPageToken) return

    setIsLoading(true)
    const data = await fetchCreators({
      page_size: 20,
      page_token: nextPageToken
    })

    setCreators((prev) => [...prev, ...(data.creators || [])])
    setNextPageToken(data.next_page_token || null)
    setIsLoading(false)
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(!sortDirection)
    } else {
      setSortField(field)
      setSortDirection(true)
    }
    sortCreators(field, sortDirection)
  }

  const sortCreators = (field: string, ascending: boolean) => {
    const sortedCreators = [...creators].sort((a, b) => {
      let valueA: any
      let valueB: any

      switch (field) {
        case 'nickname':
          valueA = a.nickname
          valueB = b.nickname
          break
        case 'follower_count':
          valueA = a.follower_count
          valueB = b.follower_count
          break
        case 'gmv':
          valueA = parseFloat(a.gmv.amount)
          valueB = parseFloat(b.gmv.amount)
          break
        default:
          return 0
      }

      if (valueA < valueB) return ascending ? -1 : 1
      if (valueA > valueB) return ascending ? 1 : -1
      return 0
    })

    setCreators(sortedCreators)
  }

  useEffect(() => {
    loadInitialData()
  }, [])

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead onClick={() => handleSort('nickname')}>
              Nickname
            </TableHead>
            <TableHead>Username</TableHead>
            <TableHead onClick={() => handleSort('follower_count')}>
              Followers
            </TableHead>
            <TableHead onClick={() => handleSort('gmv')}>GMV</TableHead>
            <TableHead>Video GMV</TableHead>
            <TableHead>Live UV</TableHead>
            <TableHead>Video Views</TableHead>
            <TableHead>Region</TableHead>
            <TableHead>Age Ranges</TableHead>
            <TableHead>Major Gender</TableHead>
            <TableHead>Gender Percentage</TableHead>
            <TableHead>Categories</TableHead>
            <TableHead>Units Sold Min</TableHead>
            <TableHead>GMV Range Min</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {creators.map((creator, index) => (
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
                    .map((range) =>
                      range.replace('AGE_RANGE_', '').replace(/_/g, '-')
                    )
                    .join(', ')}
                </p>
              </TableCell>
              <TableCell>
                <p>{creator.top_follower_demographics?.major_gender.gender}</p>
              </TableCell>
              <TableCell>
                <p>
                  {(
                    creator.top_follower_demographics?.major_gender.percentage /
                    100
                  ).toFixed(2)}
                  %
                </p>
              </TableCell>
              <TableCell>
                <p>{creator.category_ids.join(', ')}</p>
              </TableCell>
              <TableCell>
                <p>
                  {creator.units_sold_range?.minimum_amount.toLocaleString()}
                </p>
              </TableCell>
              <TableCell>
                <p>
                  {creator.gmv_range?.currency}{' '}
                  {parseFloat(
                    creator.gmv_range?.minimum_amount
                  ).toLocaleString()}
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isLoading && (
        <div className="p-4">
          <Loading />
        </div>
      )}

      {!isLoading && nextPageToken && (
        <div className="text-center p-12">
          <Button onClick={loadMoreCreators} variant="default">
            Load More
          </Button>
        </div>
      )}
    </>
  )
}
