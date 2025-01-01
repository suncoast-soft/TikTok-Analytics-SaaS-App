import SelectSeller from '@/components/modules/Creator/SelectSeller'
import { getSellers } from '@/utils/supabase/queries'
import { createClient } from '@/utils/supabase/server'

export default async function SelectSellersPage() {
  const supabase = await createClient()
  const sellers = await getSellers(supabase)

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Enter Seller Brand
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sellers.map((seller, index) => (
          <SelectSeller
            key={index}
            seller_name={seller.seller_name}
            status={seller.shop_cipher}
          />
        ))}
      </div>
    </div>
  )
}
