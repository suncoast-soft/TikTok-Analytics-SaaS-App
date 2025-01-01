import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { TableCell, TableRow } from '@/components/ui/table'

interface FormattedCreatorData {
  avatar: string
  avg_ec_live_uv: number
  avg_ec_video_view_count: number
  categories: string[]
  follower_count: number
  gmv: string
  gmv_min: string
  live_gmv: string
  nickname: string
  selection_region: string
  age_ranges: string[]
  major_gender: string
  units_sold_min: number
  username: string
  video_gmv: string
}

export default function CreatorRow({
  creator
}: {
  creator: FormattedCreatorData
}) {
  return (
    <TableRow>
      <TableCell>
        <Avatar>
          <AvatarImage
            src={creator.avatar}
            alt={`${creator.nickname}'s avatar`}
          />
        </Avatar>
      </TableCell>
      <TableCell>{creator.nickname}</TableCell>
      <TableCell>@{creator.username}</TableCell>
      <TableCell>{creator.follower_count}</TableCell>
      <TableCell>{creator.gmv}</TableCell>
      <TableCell>{creator.video_gmv}</TableCell>
      <TableCell>{creator.avg_ec_live_uv}</TableCell>
      <TableCell>{creator.avg_ec_video_view_count}</TableCell>
      <TableCell>{creator.selection_region}</TableCell>
      <TableCell>
        {creator.age_ranges
          .map((range) => range.replace('AGE_RANGE_', '').replace(/_/g, '-'))
          .join(', ')}
      </TableCell>
      <TableCell>{creator.major_gender}</TableCell>
      <TableCell>{creator.categories.join(', ')}</TableCell>
      <TableCell>{creator.units_sold_min}</TableCell>
      <TableCell>{creator.gmv_min}</TableCell>
    </TableRow>
  )
}
