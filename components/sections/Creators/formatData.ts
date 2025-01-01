interface CreatorAPIResponse {
  avatar: {
    url: string
  }
  avg_ec_live_uv: number
  avg_ec_video_view_count: number
  category_ids: string[]
  follower_count: number
  gmv: {
    amount: string
    currency: string
  }
  gmv_range: {
    currency: string
    minimum_amount: string
  }
  live_gmv: {
    amount: string
    currency: string
  }
  nickname: string
  selection_region: string
  top_follower_demographics: {
    age_ranges: string[]
    major_gender: {
      gender: string
      percentage: number
    }
  }
  units_sold_range: {
    minimum_amount: number
  }
  username: string
  video_gmv: {
    amount: string
    currency: string
  }
}

export default function formatData(creator: CreatorAPIResponse) {
  return {
    avatar: creator.avatar?.url || '',
    avg_ec_live_uv: creator.avg_ec_live_uv ?? '',
    avg_ec_video_view_count: creator.avg_ec_video_view_count ?? '',
    categories: creator.category_ids || [],
    follower_count: creator.follower_count ?? '',
    gmv: `${creator.gmv?.currency || ''} ${creator.gmv?.amount || ''}`,
    gmv_min: `${creator.gmv_range?.currency || ''} ${creator.gmv_range?.minimum_amount || ''}`,
    live_gmv: `${creator.live_gmv?.currency || ''} ${creator.live_gmv?.amount || ''}`,
    nickname: creator.nickname || '',
    selection_region: creator.selection_region || '',
    age_ranges: creator.top_follower_demographics?.age_ranges || [],
    major_gender: creator.top_follower_demographics?.major_gender
      ? `${creator.top_follower_demographics.major_gender.gender || ''} (${creator.top_follower_demographics.major_gender.percentage || ''}%)`
      : '',
    units_sold_min: creator.units_sold_range?.minimum_amount ?? '',
    username: creator.username || '',
    video_gmv: `${creator.video_gmv?.currency || ''} ${creator.video_gmv?.amount || ''}`
  }
}
