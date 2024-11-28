import { useEffect, useState } from 'react'
import { requestTikTokShopAPIClient } from '@/app/actions'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import Link from 'next/link'

interface ProductDetail {
  brand: { id: string; name: string }
  description: string
  main_images: { thumb_urls: string[]; urls: string[] }[]
  category_chains: { local_name: string }[]
}

const fetchProductDetail = async (productId: string) => {
  const data = await requestTikTokShopAPIClient(
    `/product/202309/products/${productId}`,
    {},
    'GET',
    ''
  )
  return data.data
}

export default function ProductRow({ product }: { product: any }) {
  const [detail, setDetail] = useState<ProductDetail | null>(null)

  useEffect(() => {
    const loadProductDetail = async () => {
      try {
        const fetchedDetail = await fetchProductDetail(product.id)
        setDetail(fetchedDetail)
      } catch (error) {
        console.error('Failed to fetch product detail:', error)
      }
    }
    loadProductDetail()
  }, [product.id])

  if (!detail) {
    return (
      <TableRow>
        {[...Array(5)].map((_, index) => (
          <TableCell key={index}>
            <Skeleton className="mb-2 h-6 w-full" />
          </TableCell>
        ))}
      </TableRow>
    )
  }

  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger>
            {detail.main_images[0] && (
              <Image
                src={detail.main_images[0].thumb_urls[0]}
                width={100}
                height={100}
                alt={product.title}
              />
            )}
          </DialogTrigger>

          <DialogContent className="max-w-xl p-14">
            <Carousel className="w-full max-w-lg mx-auto">
              <CarouselContent>
                {detail.main_images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Image
                        src={image.urls[0]}
                        width={600}
                        height={600}
                        alt={product.title}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </DialogContent>
        </Dialog>
      </TableCell>

      <TableCell>
        <Link href={`/seller/products/${product.id}`} className="no-underline">
          <span className="text-blue-800 font-medium">{product.title}</span>
        </Link>
      </TableCell>
      <TableCell>{detail.brand.name}</TableCell>
      <TableCell>
        {detail.category_chains.map((chain) => chain.local_name).join(' > ')}
      </TableCell>
      <TableCell>{product.status}</TableCell>
    </TableRow>
  )
}
