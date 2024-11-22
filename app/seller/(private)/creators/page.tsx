import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { requestTikTokShopAPI } from '@/utils/tiktok/utils'

interface Creator {
  avatar: { url: string }
  avg_ec_live_uv: number
  avg_ec_video_view_count: number
  category_ids: string[]
  follower_count: number
  gmv: { amount: string; currency: string }
  gmv_range: { currency: string; minimum_amount: string }
  nickname: string
  selection_region: string
  top_follower_demographics: {
    age_ranges: string[]
    major_gender: { gender: string; percentage: number }
  }
  units_sold_range: { minimum_amount: number }
  username: string
  video_gmv: { amount: string; currency: string }
}

interface CreatorListProps {
  creators: Creator[]
}

export default async function Creators() {
  const creatorsData = await requestTikTokShopAPI(
    '/affiliate_seller/202406/marketplace_creators/search',
    { page_size: 12 },
    'POST'
  )
  const creators = creatorsData?.data?.creators ?? []

  return (
    <>
      <h1>Search Creators</h1>

      <div className="p-4">
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
            {creators.map((creator: Creator, index: number) => (
              <TableRow key={index}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={creator.avatar.url}
                      alt={`${creator.nickname}'s avatar`}
                    />
                  </Avatar>
                </TableCell>
                <TableCell>
                  <p>{creator.nickname}</p>
                </TableCell>
                <TableCell>
                  <p>@{creator.username}</p>
                </TableCell>
                <TableCell>
                  <p>{creator.follower_count.toLocaleString()}</p>
                </TableCell>
                <TableCell>
                  <p>
                    {creator.gmv?.currency}{' '}
                    {parseFloat(creator.gmv?.amount).toLocaleString()}
                  </p>
                </TableCell>
                <TableCell>
                  <p>
                    {creator.video_gmv?.currency}{' '}
                    {parseFloat(creator.video_gmv?.amount).toLocaleString()}
                  </p>
                </TableCell>
                <TableCell>
                  <p>{creator.avg_ec_live_uv}</p>
                </TableCell>
                <TableCell>
                  <p>{creator.avg_ec_video_view_count.toLocaleString()}</p>
                </TableCell>
                <TableCell>
                  <p>{creator.selection_region}</p>
                </TableCell>
                <TableCell>
                  <p>
                    {creator.top_follower_demographics?.age_ranges
                      .map((range) =>
                        range.replace('AGE_RANGE_', '').replace(/_/g, '-')
                      )
                      .join(', ')}
                  </p>
                </TableCell>
                <TableCell>
                  <p>
                    {creator.top_follower_demographics?.major_gender.gender}
                  </p>
                </TableCell>
                <TableCell>
                  <p>
                    {(
                      creator.top_follower_demographics?.major_gender
                        .percentage / 100
                    ).toFixed(2)}
                    %
                  </p>
                </TableCell>
                <TableCell>
                  <p>{creator.category_ids.join(', ')}</p>
                </TableCell>
                <TableCell>
                  <p>
                    {creator.units_sold_range?.minimum_amount.toLocaleString()}
                  </p>
                </TableCell>
                <TableCell>
                  <p>
                    {creator.gmv_range?.currency}{' '}
                    {parseFloat(
                      creator.gmv_range?.minimum_amount
                    ).toLocaleString()}
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
