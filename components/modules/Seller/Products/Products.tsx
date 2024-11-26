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
import { requestTikTokShopAPIClient } from '@/app/actions'

// Types for Product and Detail responses
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

interface ProductDetail {
  brand: { id: string; name: string }
  description: string
  main_images: { urls: string[] }[]
  category_chains: { local_name: string }[]
}

const fetchProducts = async (params: any) => {
  const data = await requestTikTokShopAPIClient(
    '/product/202309/products/search',
    params,
    'POST',
    ''
  )
  return data.data
}

const fetchProductDetail = async (productId: string, params: any) => {
  const data = await requestTikTokShopAPIClient(
    `/product/202309/products/${productId}`,
    params,
    'GET',
    ''
  )
  return data.data
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [productDetails, setProductDetails] = useState<{
    [key: string]: ProductDetail
  }>({})
  const [nextPageToken, setNextPageToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [keyword, setKeyword] = useState<string>('')

  // Load initial product data
  const loadInitialData = async () => {
    setIsLoading(true)
    const data = await fetchProducts({ page_size: 10 })
    setProducts(data.products || [])
    setNextPageToken(data.next_page_token || null)
    setIsLoading(false)
  }

  // Fetch details for a specific product
  const loadProductDetail = async (productId: string) => {
    if (!productDetails[productId]) {
      const detailData = await fetchProductDetail(productId, {})
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        [productId]: detailData.data
      }))
    }
  }

  // Handle search functionality
  const handleSearch = async () => {
    setIsLoading(true)
    const data = await fetchProducts({
      page_size: 10,
      keyword
    })
    setProducts(data.products || [])
    setIsLoading(false)
  }

  // Load more products for pagination
  const loadMoreProducts = async () => {
    if (!nextPageToken) return

    setIsLoading(true)
    const data = await fetchProducts({
      page_size: 10,
      page_token: nextPageToken
    })

    setProducts((prev) => [...prev, ...(data.products || [])])
    setNextPageToken(data.next_page_token || null)
    setIsLoading(false)
  }

  useEffect(() => {
    loadInitialData()
  }, [])

  return (
    <>
      <h1 className="text-2xl font-bold text-slate-800 mb-8 px-4">
        Product Listings
      </h1>

      <div className="bg-white shadow-sm rounded-md border p-4 mb-8">
        <div className="flex items-center gap-1 border-b pb-4 mb-4">
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
              <TableHead>Brand</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>SKUs & Colors</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const detail = productDetails[product.id]

              return (
                <TableRow key={product.id}>
                  <TableCell>
                    {detail && detail.main_images[0] && (
                      <img
                        src={detail.main_images[0].urls[0]}
                        alt={product.title}
                        width="50"
                      />
                    )}
                  </TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>
                    {detail ? detail.brand.name : 'Loading...'}
                  </TableCell>
                  <TableCell>
                    {detail
                      ? detail.category_chains
                          .map((chain) => chain.local_name)
                          .join(' > ')
                      : 'Loading...'}
                  </TableCell>
                  <TableCell>{product.status}</TableCell>
                  <TableCell>
                    {detail ? detail.description : 'Loading...'}
                  </TableCell>
                  <TableCell>
                    {product.skus.map((sku, index) => (
                      <div key={index}>
                        <p>SKU: {sku.seller_sku}</p>
                        <p>Color: {sku.sales_attributes[0].value_name}</p>
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              )
            })}
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
