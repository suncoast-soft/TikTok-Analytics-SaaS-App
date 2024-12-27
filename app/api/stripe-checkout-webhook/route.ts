import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types_db'
import { streamToString } from '@/utils/helpers'

export const dynamic = 'force-dynamic'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  throw new Error('MISSING NEXT_PUBLIC_SUPABASE_URL!')
}

if (!supabaseServiceRoleKey) {
  throw new Error('MISSING SUPABASE_SERVICE_ROLE_KEY!')
}

export async function POST(request: Request) {
  const headersObj = await headers()
  const sig = headersObj.get('stripe-signature')

  if (!stripeSecretKey) {
    return NextResponse.json(
      {
        message: `Missing stripeSecretKey`
      },
      { status: 400 }
    )
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2024-11-20.acacia',
    typescript: true
  })

  if (!sig) {
    return NextResponse.json(
      {
        message: `Missing signature`
      },
      { status: 400 }
    )
  }

  if (!request.body) {
    return NextResponse.json(
      {
        message: `Missing body`
      },
      { status: 400 }
    )
  }

  const rawBody = await streamToString(request.body)

  let event

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret!)
  } catch (err) {
    const error = err as Error
    return NextResponse.json(
      {
        message: `Webhook Error: ${error?.message}`
      },
      { status: 400 }
    )
  }

  const supabase = createClient<Database>(
    supabaseUrl as string,
    supabaseServiceRoleKey as string,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
      }
    }
  )

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data
        .object as Stripe.Checkout.Session
      const userId = checkoutSessionCompleted.client_reference_id?.toString()
      const subscriptionId = checkoutSessionCompleted.subscription?.toString()
      const customerId = checkoutSessionCompleted.customer?.toString()

      if (!userId || !subscriptionId || !customerId) {
        return NextResponse.json(
          {
            message: `Missing client_reference_id or subscriptionId or customerId`
          },
          { status: 400 }
        )
      }

      // Insert into Subscription
      const { error: subscriptionError } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: userId,
          subscription_id: subscriptionId
        })

      const { error: userError } = await supabase
        .from('users')
        .update({
          stripe_customer_id: customerId
        })
        .eq('id', userId)

      if (subscriptionError || userError) {
        return NextResponse.json(
          {
            message: `Error creating subscriptions: ${subscriptionError} or Error updating user: ${userError}`
          },
          {
            status: 400
          }
        )
      }

      return NextResponse.json(
        {
          message: 'success'
        },
        { status: 200 }
      )

    default:
      return NextResponse.json(
        {
          message: `Unhandled event type ${event.type}`
        },
        { status: 400 }
      )
  }
}
