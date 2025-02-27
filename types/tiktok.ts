type CurrencyAmount = {
  amount: string;
  currency: string;
};

type SKU = {
  actual_commission_base: CurrencyAmount;
  actual_paid_commission: CurrencyAmount;
  actual_paid_shop_ads_commission: CurrencyAmount;
  campaign_id: string;
  commission_rate: string;
  content_id: string;
  content_type: 'LIVE' | string;
  creator_username: string;
  estimated_commission_base: CurrencyAmount;
  estimated_paid_commission: CurrencyAmount;
  estimated_paid_shop_ads_commission: CurrencyAmount;
  open_collaboration_id: string;
  price: CurrencyAmount;
  product_id: string;
  quantity: number;
  refunded_quantity: number;
  returned_quantity: number;
  shop_ads_commission_rate: string;
  target_collaboration_id: string;
};

type OrderStatus = 'COMPLETED' | string;

export type Order = {
  create_time: number;
  delivery_time: number;
  id: string;
  skus: SKU[];
  status: OrderStatus;
};

type GMVRange = {
  currency: string;
  maximum_amount: string;
  minimum_amount: string;
};

type MajorGenderDemographics = {
  gender: 'FEMALE' | 'MALE' | 'OTHER' | string;
  percentage: number;
};

type TopFollowerDemographics = {
  age_ranges: string[];
  major_gender: MajorGenderDemographics;
};

type UnitsSoldRange = {
  maximum_amount: number;
  minimum_amount: number;
};

type Avatar = {
  url: string;
};

export type Creator = {
  avatar: Avatar;
  avg_ec_live_uv: number;
  avg_ec_video_view_count: number;
  category_ids: string[];
  follower_count: number;
  gmv: CurrencyAmount;
  gmv_range: GMVRange;
  live_gmv: CurrencyAmount;
  nickname: string;
  selection_region: string;
  top_follower_demographics: TopFollowerDemographics;
  units_sold_range: UnitsSoldRange;
  username: string;
  video_gmv: CurrencyAmount;
};

type VideoProduct = {
  id: string;
  name: string;
};

export type Video = {
  click_through_rate: string;
  gmv: CurrencyAmount;
  id: string;
  products: VideoProduct[];
  sku_orders: number;
  title: string;
  units_sold: number;
  username: string;
  video_post_time: string;
  views: number;
};

type FreeSampleRule = {
  has_free_sample: boolean;
  is_sample_approval_exempt: boolean;
};

export type SellerCampaignOverview = {
  content_creator_count: number;
  creator_inivited_count: number;
  end_time: number;
  free_sample_rule: FreeSampleRule;
  id: string;
  message: string;
  name: string;
  product_count: number;
  showcase_creator_count: number;
  start_time: number;
  type: 'STANDARD' | 'TOP_CREATOR_PROGRAM' | string;
  update_time: number;
};

interface CampaignCreator {
  avatar: Avatar;
  collaboration_status: string;
  content_product_count: number;
  nickname: string;
  product_effective_status: string;
  selection_region: string;
  showcase_product_count: number;
  username: string;
}

interface Commission {
  currency: string;
  effective_time: string;
  maximum_amount: string;
  minimum_amount: string;
  rate: number;
}

interface OriginalPrice {
  currency: string;
  maximum_amount: string;
  minimum_amount: string;
}

export interface Product {
  collaboration_status: string;
  commission: Commission;
  commission_effective_status: string;
  id: string;
  main_image_url: string;
  original_price: OriginalPrice;
  status: string;
  title: string;
}

interface SellerContactInfo {
  email: string;
}

export interface SellerCampaignDetail {
  content_creator_count: number;
  creator_invited_count: number;
  creators: CampaignCreator[];
  end_time: number;
  free_sample_rule: FreeSampleRule;
  id: string;
  message: string;
  name: string;
  product_count: number;
  products: Product[];
  seller_contact_info: SellerContactInfo;
  showcase_creator_count: number;
  start_time: number;
  type: string;
  update_time: number;
}
