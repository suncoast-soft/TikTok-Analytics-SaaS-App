'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import Loading from '@/components/modules/Loading'
import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { requestTikTokShopAPIClient } from '@/app/actions'
import ProductRow from './ProductRow'

interface Inventory {
  quantity: number
  warehouse_id: string
}

interface Price {
  currency: string
  tax_exclusive_price: string
}

interface SKU {
  id: string
  inventory: Inventory[]
  price: Price
  seller_sku: string
  sales_attributes: { name: string; value_name: string }[]
}

interface Product {
  create_time: number
  id: string
  recommended_categories: string[]
  sales_regions: string[]
  skus: SKU[]
  status: string
  title: string
  update_time: number
}

interface APIParams {
  [key: string]: string | number
}

const fetchProducts = async (seller: string | undefined, params: APIParams) => {
  const data = await requestTikTokShopAPIClient(
    seller,
    '/product/202309/products/search',
    params,
    'POST',
    ''
  )
  return data?.data
}

export default function ProductList({
  seller
}: {
  seller: string | undefined
}) {
  const [products, setProducts] = useState<Product[]>([])
  const [nextPageToken, setNextPageToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [keyword, setKeyword] = useState<string>('')

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true)
      const data = await fetchProducts(seller, {
        status: 'ACTIVATE',
        page_size: 10
      })
      setProducts(data?.products || [])
      setNextPageToken(data?.next_page_token || null)
      setIsLoading(false)
    }

    loadInitialData()
  }, [seller])

  const handleSearch = async () => {
    setIsLoading(true)
    const data = await fetchProducts(seller, {
      status: 'ACTIVATE',
      page_size: 10,
      keyword
    })
    setProducts(data?.products || [])
    setIsLoading(false)
  }

  const loadMoreProducts = async () => {
    if (!nextPageToken) return

    setIsLoading(true)
    const data = await fetchProducts(seller, {
      status: 'ACTIVATE',
      page_size: 10,
      page_token: nextPageToken
    })

    setProducts((prev) => [...prev, ...(data?.products || [])])
    setNextPageToken(data?.next_page_token || null)
    setIsLoading(false)
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-slate-800 mb-8 px-4">
        Product Listings
      </h1>

      <div className="bg-white shadow-sm rounded-md border p-4 mb-8">
        <div className="flex items-center gap-1">
          <Input
            type="text"
            placeholder="Search products"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full max-w-sm"
          />
          <Button variant="default" size="icon" onClick={handleSearch}>
            <SearchIcon />
          </Button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product, index) => (
              <ProductRow key={index} product={product} seller={seller} />
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
          <Button onClick={loadMoreProducts} variant="default">
            Load More
          </Button>
        </div>
      )}
    </>
  )
}
