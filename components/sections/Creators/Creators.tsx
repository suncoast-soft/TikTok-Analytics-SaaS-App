'use client'

import { useEffect, useState } from 'react'
import { requestTikTokShopAPIClient } from '@/app/actions'
import { Table, TableBody, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import Loading from '@/components/modules/Loading'
import { SearchIcon, XIcon } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import CreatorRow from './CreatorRow'
import CreatorFilter, { CreatorFilterClear } from './CreatorFilter'
import CreatorHead from './CreatorHead'
import formatData from './formatData'

interface APIParams {
  [key: string]: string | number
}

const fetchCreators = async (seller: string | undefined, params: APIParams) => {
  const data = await requestTikTokShopAPIClient(
    seller,
    '/affiliate_seller/202406/marketplace_creators/search',
    params,
    'POST',
    ''
  )

  if (data.data && Array.isArray(data.data.creators)) {
    return {
      creators: data.data.creators.map((creator: any) => formatData(creator)),
      next_page_token: data.data.next_page_token
    }
  } else {
    return {
      creators: []
    }
  }
}

export default function SellerCreators({
  seller
}: {
  seller: string | undefined
}) {
  const [creators, setCreators] = useState<any[]>([])
  const [nextPageToken, setNextPageToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [sortField, setSortField] = useState<string | null>('nickname')
  const [sortDirection, setSortDirection] = useState<boolean>(true)

  const [keyword, setKeyword] = useState<string>('')
  const [ageRange, setAgeRange] = useState<string>('')
  const [genderFilter, setGenderFilter] = useState<string>('')

  const loadInitialData = async () => {
    setIsLoading(true)

    const data = await fetchCreators(seller, { page_size: 20 })

    setCreators(data.creators || [])
    setNextPageToken(data.next_page_token || null)
    setIsLoading(false)
  }

  const handleSearch = async () => {
    setCreators([])
    setIsLoading(true)

    const data = await fetchCreators(seller, {
      page_size: 20,
      keyword
    })

    setCreators(data.creators || [])
    setIsLoading(false)
  }

  const handleFilterChange = async () => {
    setCreators([])
    setIsLoading(true)

    const data = await fetchCreators(seller, {
      page_size: 20,
      keyword,
      gender_distribution: genderFilter
    })

    setCreators(data.creators || [])
    setIsLoading(false)
  }

  const loadMoreCreators = async () => {
    if (!nextPageToken) return

    setIsLoading(true)
    const data = await fetchCreators(seller, {
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
      if (a[field] < b[field]) return ascending ? -1 : 1
      if (a[field] > b[field]) return ascending ? 1 : -1
      return 0
    })

    setCreators(sortedCreators)
  }

  useEffect(() => {
    loadInitialData()
  }, [])

  useEffect(() => {
    handleFilterChange()
  }, [ageRange, genderFilter])

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
          <Button variant="default" size="icon" onClick={handleSearch}>
            <SearchIcon />
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <Label>Follower Demographics:</Label>

          <CreatorFilter
            label="Select Gender"
            options={['MALE', 'FEMALE']}
            value={genderFilter}
            setValue={setGenderFilter}
            className="w-[200px]"
          />

          <CreatorFilter
            label="Select Age Range:"
            options={['18-24', '25-34', '35-44', '45-54', '55+']}
            value={ageRange}
            setValue={setAgeRange}
            className="w-[200px]"
          />
        </div>

        <div className="flex items-center gap-4 min-h-6">
          <Label>Selected Filters:</Label>

          {genderFilter && (
            <CreatorFilterClear
              label="Gender"
              value={genderFilter}
              setValue={setGenderFilter}
            />
          )}

          {ageRange && (
            <CreatorFilterClear
              label="Age Range"
              value={ageRange}
              setValue={setAgeRange}
            />
          )}
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <CreatorHead label="Avatar" />
              <CreatorHead
                label="Nickname"
                sort="nickname"
                setSort={handleSort}
                activeSort={sortField}
                sortDirection={sortDirection}
              />
              <CreatorHead label="Username" />
              <CreatorHead
                label="Followers"
                sort="follower_count"
                setSort={handleSort}
                activeSort={sortField}
                sortDirection={sortDirection}
              />
              <CreatorHead
                label="GMV"
                sort="gmv"
                setSort={handleSort}
                activeSort={sortField}
                sortDirection={sortDirection}
              />
              <CreatorHead label="Video GMV" />
              <CreatorHead label="Live UV" />
              <CreatorHead label="Video Views" />
              <CreatorHead label="Region" />
              <CreatorHead label="Age Ranges" />
              <CreatorHead label="Major Gender" />
              <CreatorHead label="Gender Percentage" />
              <CreatorHead label="Categories" />
              <CreatorHead label="Units Sold Min" />
              <CreatorHead label="GMV Range Min" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {creators.map((creator, index) => (
              <CreatorRow key={index} creator={creator} />
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
