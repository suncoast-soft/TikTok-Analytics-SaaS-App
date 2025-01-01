'use client'

import { SelectSellerAction } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/utils/cn'
import { redirect } from 'next/navigation'

export default function SelectSeller({
  seller_name,
  status
}: {
  seller_name: string
  status: boolean
}) {
  function handleSellerSelect() {
    SelectSellerAction(seller_name)
    redirect(`/creator/sellers/${seller_name}/analytics`)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="text-base font-semibold">{seller_name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p
          className={cn(
            'font-medium mb-3',
            status ? 'text-primary' : 'text-gray-400'
          )}
        >
          {status ? 'Active' : 'Inactive'}
        </p>
        <Button disabled={!status} onClick={handleSellerSelect}>
          Enter Shop Brand
        </Button>
      </CardContent>
    </Card>
  )
}
