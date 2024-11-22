import Creators from '@/components/modules/Seller/Creators'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

export default async function CreatorsPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-slate-800 mb-8 px-4">
        Search Creators
      </h1>

      <div className="bg-white shadow-sm rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Avatar</TableHead>
              <TableHead>Nickname</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Followers</TableHead>
              <TableHead>GMV</TableHead>
              <TableHead>Video GMV</TableHead>
              <TableHead>Live UV</TableHead>
              <TableHead>Video Views</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Age Ranges</TableHead>
              <TableHead>Major Gender</TableHead>
              <TableHead>Gender Percentage</TableHead>
              <TableHead>Categories</TableHead>
              <TableHead>Units Sold Min</TableHead>
              <TableHead>GMV Range Min</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <Creators />
          </TableBody>
        </Table>
      </div>
    </>
  )
}
