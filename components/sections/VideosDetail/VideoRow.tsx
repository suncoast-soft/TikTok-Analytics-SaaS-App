import { useEffect, useState } from 'react'
import { requestTikTokShopAPIClient } from '@/app/actions'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'
import Image from 'next/image'
import { Dialog } from '@/components/ui/dialog'
import Link from 'next/link'
import { ExternalLinkIcon, FileVideo2Icon } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

interface ProductDetail {
  id: string
  title: string
  brand: { id: string; name: string }
  description: string
  main_images: { thumb_urls: string[]; urls: string[] }[]
  category_chains: { local_name: string }[]
}

interface VideoDetail {
  name: string
  thumb: string
  video: string
}

const fetchProductDetail = async (
  seller: string | undefined,
  productId: string
) => {
  const data = await requestTikTokShopAPIClient(
    seller,
    `/product/202309/products/${productId}`,
    {},
    'GET',
    ''
  )
  return data.data
}

const fetchVideoDetail = async () => {
  return {
    name: 'API access pending',
    thumb: '',
    video:
      'https://v16m.tiktokcdn-us.com/50c3cd74cf2511927cae10b1c885dd0c/675308f9/video/tos/useast8/tos-useast8-pve-0068-tx2/ockIifOENMiBOCigAeqAvfiFiIAjhGm2c9vSZI/'
  }
}

export default function VideoRow({
  seller,
  video
}: {
  seller: string | undefined
  video: any
}) {
  const videoId = video.id
  const productId = video.products?.[0]?.id

  const [videoDetail, setVideoDetail] = useState<VideoDetail | null>(null)
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null)

  useEffect(() => {
    const loadVideoDetail = async () => {
      try {
        const fetchedVideoDetail = await fetchVideoDetail()
        setVideoDetail(fetchedVideoDetail)

        const fetchedProductDetail = await fetchProductDetail(seller, productId)
        setProductDetail(fetchedProductDetail)
      } catch (error) {
        console.error('Failed to fetch product detail:', error)
      }
    }
    loadVideoDetail()
  }, [videoId, productId, seller])

  if (!videoDetail || !productDetail) {
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
          <Link
            href={videoDetail.video}
            target="_blank"
            className="no-underline flex gap-2"
          >
            <FileVideo2Icon />
            <span>{videoDetail.name}</span>
            <ExternalLinkIcon size={15} />
          </Link>
        </Dialog>
      </TableCell>

      <TableCell>
        {productDetail.main_images[0] && (
          <Tooltip delayDuration={500}>
            <TooltipTrigger>
              <Link
                href={`/creator/sellers/${seller}/products/${productDetail.id}`}
                className="no-underline"
              >
                <Image
                  src={productDetail.main_images[0].thumb_urls[0]}
                  width={60}
                  height={60}
                  alt={productDetail.title}
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-72">{productDetail.title}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </TableCell>
      <TableCell>${video.gmv.amount ?? '0.00'}</TableCell>
      <TableCell>{video.sku_orders ?? 0}</TableCell>
      <TableCell>{video.units_sold ?? 0}</TableCell>
      <TableCell>{video.views ?? 0}</TableCell>
    </TableRow>
  )
}
