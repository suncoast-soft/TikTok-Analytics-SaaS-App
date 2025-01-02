'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import Loading from '@/components/modules/Loading'
import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { requestTikTokShopAPIClient } from '@/app/actions'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import Link from 'next/link'

interface Category {
  id: string
  is_leaf: boolean
  local_name: string
  parent_id: string
}

interface Commission {
  amount: string
  currency: string
  rate: number
}

interface Price {
  currency: string
  maximum_amount: string
  minimum_amount: string
}

interface Shop {
  name: string
}

interface Product {
  category_chains: Category[]
  commission: Commission
  detail_link: string
  has_inventory: boolean
  id: string
  main_image_url: string
  original_price: Price
  sale_region: string
  sales_price: Price
  shop: Shop
  title: string
  units_sold: number
}

interface APIParams {
  [key: string]: string | number
}

const fetchProducts = async (
  seller: string | undefined,
  params: APIParams,
  body?: any
) => {
  const data = await requestTikTokShopAPIClient(
    seller,
    '/affiliate_seller/202405/open_collaborations/products/search',
    params,
    'POST',
    body
  )
  return data?.data
}

export default function CollaborationProducts({
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
        sort_field: 'units_sold',
        page_size: 20,
        sort_order: 'DESC'
      })
      setProducts(data?.products || [])
      setNextPageToken(data?.next_page_token || null)
      setIsLoading(false)
    }

    loadInitialData()
  }, [seller])

  const handleSearch = async () => {
    setIsLoading(true)
    const data = await fetchProducts(
      seller,
      {
        sort_field: 'units_sold',
        page_size: 20,
        sort_order: 'DESC'
      },
      {
        title_keywords: [keyword]
      }
    )
    setProducts(data?.products || [])
    setIsLoading(false)
  }

  const loadMoreProducts = async () => {
    if (!nextPageToken) return

    setIsLoading(true)
    const data = await fetchProducts(seller, {
      sort_field: 'units_sold',
      page_size: 20,
      sort_order: 'DESC',
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
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Units Sold</TableHead>
              <TableHead>Shop Name</TableHead>
              <TableHead className="min-w-24">Detail Link</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Dialog>
                    <DialogTrigger>
                      <Image
                        src={product.main_image_url}
                        width={100}
                        height={100}
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
                </TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>
                  {product.category_chains
                    .map((chain: any) => chain.local_name)
                    .join(' > ')}
                </TableCell>
                <TableCell>
                  ${parseFloat(product.sales_price.minimum_amount).toFixed(2)}
                </TableCell>
                <TableCell>
                  ${parseFloat(product.commission.amount).toFixed(2)}
                </TableCell>
                <TableCell>{product.units_sold.toLocaleString()}</TableCell>
                <TableCell>{product.shop.name}</TableCell>
                <TableCell>
                  <Link
                    href={product.detail_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary no-underline"
                  >
                    View on TikTok
                  </Link>
                </TableCell>
                <TableCell></TableCell>
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
          <Button onClick={loadMoreProducts} variant="default">
            Load More
          </Button>
        </div>
      )}
    </>
  )
}
