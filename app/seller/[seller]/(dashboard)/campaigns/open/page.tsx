import { requestTikTokShopAPIClient } from '@/app/actions'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/utils/cn'
import { formatPrice } from '@/utils/helpers'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { SquareArrowOutUpRightIcon } from 'lucide-react'
import Link from 'next/link'

interface APIParams {
  [key: string]: string | number
}

const fetchSeller = async (seller: string | undefined, params?: APIParams) => {
  const data = await requestTikTokShopAPIClient(
    seller,
    '/authorization/202309/shops',
    params,
    'GET',
    ''
  )
  if (data.data && Array.isArray(data.data.shops)) {
    return data.data.shops[0]
  }
  return null
}

const fetchOpenCollaborations = async (
  seller: string | undefined,
  params?: APIParams
) => {
  const data = await requestTikTokShopAPIClient(
    seller,
    '/affiliate_seller/202409/open_collaborations/search',
    params,
    'POST',
    ''
  )
  return data?.data?.open_collaborations ?? []
}

const fetchProductDetail = async (
  seller: string | undefined,
  productId: string,
  params?: APIParams
) => {
  const data = await requestTikTokShopAPIClient(
    seller,
    `/product/202309/products/${productId}`,
    params,
    'GET',
    ''
  )
  return data.data
}

const OpenCollaboration = async ({
  seller,
  collaboration
}: {
  seller: string
  collaboration: any
}) => {
  const {
    current_commission,
    product,
    require_seller_approve_creator,
    status
  } = collaboration

  const productData = await fetchProductDetail(seller, product.id)
  const {
    category_chains,
    description,
    package_dimensions,
    package_weight,
    product_attributes,
    listing_quality_tier,
    is_cod_allowed,
    is_not_for_sale,
    is_pre_owned
  } = productData

  return (
    <div>
      <Card>
        <CardContent className="pt-6 space-y-2">
          <Image
            src={product.main_image_url}
            width={240}
            height={240}
            alt={product.title}
            className="object-contain"
          />

          <div className="font-bold text-lg mb-2">
            {product.title}
            <span
              className={cn(
                'inline-block rounded-md ml-2 px-3 py-1 text-sm font-semibold text-white mr-2',
                product.status === 'LIVE' ? 'bg-primary' : 'bg-yellow-600'
              )}
            >
              {product.status}
            </span>
          </div>

          <p className="text-slate-700 text-base">
            Original Price: {formatPrice(product.original_price.minimum_amount)}
          </p>

          <p className="text-slate-700 text-base">
            Commission Rate: {current_commission.rate / 100}%
          </p>

          <p className="text-slate-700 text-base">
            Require Seller Approval:{' '}
            {require_seller_approve_creator ? 'Yes' : 'No'}
          </p>

          <p className="text-slate-700 text-base">
            <span>Overall Status:</span>
            <span
              className={cn(
                'inline-block rounded-lg ml-2 px-3 py-1 text-sm font-semibold text-slate-700',
                status === 'NORMAL' ? 'bg-green-200' : 'bg-yellow-200'
              )}
            >
              {status}
            </span>
          </p>

          <div className="pt-4 flex gap-4">
            <Button variant="default">Join Campaign</Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="link">View Product Details</Button>
              </DialogTrigger>

              <DialogContent className="max-w-3xl p-14 max-h-[80vh] overflow-y-auto">
                <DialogTitle className="text-slate-800 leading-relaxed">
                  <span>{product.title}</span>
                  <Link
                    href={`https://shop.tiktok.com/view/product/${product.id}?region=US&locale=en`}
                    target="_blank"
                    className="no-underline"
                  >
                    <SquareArrowOutUpRightIcon size={16} className="ml-2" />
                  </Link>
                </DialogTitle>

                <p className="underline">
                  {category_chains
                    .map((chain: { local_name: string }) => chain.local_name)
                    .join(' > ')}
                </p>

                <div
                  dangerouslySetInnerHTML={{ __html: description }}
                  className="p-3 bg-slate-100"
                />

                <Table className="border">
                  <TableHeader className="bg-yellow-50">
                    <TableRow className="">
                      <TableHead className="">Category</TableHead>
                      <TableHead className="">Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Package Dimensions</TableCell>
                      <TableCell>
                        {`Height: ${package_dimensions.height}, Length: ${package_dimensions.length}, Width: ${package_dimensions.width} (${package_dimensions.unit})`}
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Package Weight</TableCell>
                      <TableCell>
                        {`${package_weight.value} ${package_weight.unit}`}
                      </TableCell>
                    </TableRow>

                    {product_attributes.map(
                      (attr: {
                        id: string
                        name: string
                        values: { name: string }[]
                      }) => (
                        <TableRow key={attr.id}>
                          <TableCell>{attr.name}</TableCell>
                          <TableCell>
                            {attr.values.map((value) => value.name)}
                          </TableCell>
                        </TableRow>
                      )
                    )}

                    <TableRow>
                      <TableCell>Listing Quality Tier</TableCell>
                      <TableCell>{listing_quality_tier}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>COD Allowed</TableCell>
                      <TableCell>{is_cod_allowed ? 'Yes' : 'No'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Not for Sale</TableCell>
                      <TableCell>{is_not_for_sale ? 'Yes' : 'No'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Pre-Owned</TableCell>
                      <TableCell>{is_pre_owned ? 'Yes' : 'No'}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default async function SellerOpenCollaborationProducts({
  params
}: {
  params: Promise<{ seller: string }>
}) {
  const sellerName = (await params).seller

  const seller = await fetchSeller(sellerName)

  const openCollaborations = await fetchOpenCollaborations(sellerName, {
    page_size: 100
  })

  return (
    <div className="container max-w-7xl">
      <section className="flex items-center gap-4 overflow-hidden px-6 mb-8">
        <Image
          src={seller.image ?? '/images/temp/locked.jpeg'}
          alt={seller.name}
          width={96}
          height={96}
          className="w-24 h-24 object-contain"
        />

        <div className="w-full">
          <h1 className="text-2xl font-bold">{seller.name}</h1>

          <p>
            (<span>Shop Code: </span>
            <strong>{seller.code}</strong>)
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {openCollaborations.map((collaboration: any, index: number) => (
          <OpenCollaboration
            key={index}
            seller={sellerName}
            collaboration={collaboration}
          />
        ))}
      </div>
    </div>
  )
}
