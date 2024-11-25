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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import Loading from '@/components/modules/Loading'
import { SearchIcon } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

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

export default function CreatorsPage() {
  const [creators, setCreators] = useState<Creator[]>([])
  const [nextPageToken, setNextPageToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<boolean>(true)

  // State for search and filters
  const [keyword, setKeyword] = useState<string>('')
  const [ageRanges, setAgeRanges] = useState<string[]>([])
  const [genderFilter, setGenderFilter] = useState<string>('')
  const [followerCountMin, setFollowerCountMin] = useState<number>(0)
  const [followerCountMax, setFollowerCountMax] = useState<number>(-1)

  const changeFollowersMinMaxRange = (value: string) => {
    switch (value) {
      case 'all':
        setFollowerCountMin(0)
        setFollowerCountMax(-1)
        break
      case '1-100k':
        setFollowerCountMin(1)
        setFollowerCountMax(100000)
        break
      case '100k-500k':
        setFollowerCountMin(100000)
        setFollowerCountMax(500000)
        break
      case '500k-1m':
        setFollowerCountMin(500000)
        setFollowerCountMax(1000000)
        break
      case '1m-5m':
        setFollowerCountMin(1000000)
        setFollowerCountMax(5000000)
        break
      case '5m-10m':
        setFollowerCountMin(5000000)
        setFollowerCountMax(10000000)
        break
      case '>10m':
        setFollowerCountMin(10000000)
        setFollowerCountMax(-1)
        break
      default:
        setFollowerCountMin(0)
        setFollowerCountMax(-1)
    }
  }

  const loadInitialData = async () => {
    setIsLoading(true)
    const data = await fetchCreators({ page_size: 20 })
    setCreators(data.creators || [])
    setNextPageToken(data.next_page_token || null)
    setIsLoading(false)
  }

  // Update filtering parameters on any filter change
  const handleFilterChange = async () => {
    setIsLoading(true)
    const data = await fetchCreators({
      page_size: 20,
      keyword,
      follower_age_ranges: ageRanges.join(','),
      gender_distribution: genderFilter,
      count_ge: followerCountMin,
      count_le: followerCountMax
    })
    setCreators(data.creators || [])
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
      <h1 className="text-2xl font-bold text-slate-800 mb-8 px-4">
        Search Creators
      </h1>

      <div className="bg-white shadow-sm rounded-md border p-4 mb-8">
        <div className="flex items-center gap-1 border-b pb-4 mb-4">
          <Input
            type="text"
            placeholder="Search by keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full max-w-sm"
          />
          <Button variant="default" size="icon" onClick={handleFilterChange}>
            <SearchIcon />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Label>Follower Demographics:</Label>

          <Select onValueChange={(value) => setAgeRanges(Array.from(value))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Age:" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Age range</SelectLabel>
                <SelectItem value="18-24">18-24</SelectItem>
                <SelectItem value="25-34">25-34</SelectItem>
                <SelectItem value="35-44">35-44</SelectItem>
                <SelectItem value="45-54">45-54</SelectItem>
                <SelectItem value="55+">55+</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setGenderFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Gender:" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Gender</SelectLabel>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => changeFollowersMinMaxRange(value)}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select Followers Range:" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Range</SelectLabel>
                <SelectItem value="1-100k">1-100k</SelectItem>
                <SelectItem value="100k-500k">100k-500k</SelectItem>
                <SelectItem value="500k-1m">500k-1m</SelectItem>
                <SelectItem value="1m-5m">1m-5m</SelectItem>
                <SelectItem value="5m-10m">5m-10m</SelectItem>
                <SelectItem value=">10m">&gt;10m</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-md border overflow-x-auto">
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
                  <p>
                    {creator.top_follower_demographics?.major_gender.gender}
                  </p>
                </TableCell>
                <TableCell>
                  <p>
                    {(
                      creator.top_follower_demographics?.major_gender
                        .percentage / 100
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
      </div>

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
