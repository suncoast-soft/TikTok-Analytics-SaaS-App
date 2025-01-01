'use client'

import React, { useEffect } from 'react'
import { User } from '@supabase/supabase-js'

interface StripePricingTableProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  'pricing-table-id': string
  'publishable-key': string
}

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': StripePricingTableProps
    }
  }
}

const StripePricingTable = ({ user }: { user: User }) => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://js.stripe.com/v3/pricing-table.js'
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="flex flex-1 flex-col w-full">
      <stripe-pricing-table
        pricing-table-id={process.env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID || ''}
        publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''}
        client-reference-id={user.id}
        customer-email={user.email}
      ></stripe-pricing-table>
    </div>
  )
}

export default StripePricingTable
