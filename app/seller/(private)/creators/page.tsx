import Creators from '@/components/modules/Seller/Creators'

export default async function CreatorsPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-slate-800 mb-8 px-4">
        Search Creators
      </h1>

      <div className="bg-white shadow-sm rounded-md border overflow-x-auto">
        <Creators />
      </div>
    </>
  )
}
