export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      campaigns: {
        Row: {
          campaign_id: string | null
          created_at: string
          details: Json | null
          end_time: number | null
          free_sample_rule: boolean | null
          id: number
          message: string | null
          name: string | null
          rewards: Json | null
          seller_id: string | null
          start_time: number | null
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string
          details?: Json | null
          end_time?: number | null
          free_sample_rule?: boolean | null
          id?: number
          message?: string | null
          name?: string | null
          rewards?: Json | null
          seller_id?: string | null
          start_time?: number | null
        }
        Update: {
          campaign_id?: string | null
          created_at?: string
          details?: Json | null
          end_time?: number | null
          free_sample_rule?: boolean | null
          id?: number
          message?: string | null
          name?: string | null
          rewards?: Json | null
          seller_id?: string | null
          start_time?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          campaign_id: string | null
          commission_base: number | null
          create_time: number | null
          creator_username: string | null
          id: number
          order_id: string | null
          paid_commission: number | null
          product_id: string | null
          quantity: number | null
          status: string | null
          video_id: string | null
        }
        Insert: {
          campaign_id?: string | null
          commission_base?: number | null
          create_time?: number | null
          creator_username?: string | null
          id?: number
          order_id?: string | null
          paid_commission?: number | null
          product_id?: string | null
          quantity?: number | null
          status?: string | null
          video_id?: string | null
        }
        Update: {
          campaign_id?: string | null
          commission_base?: number | null
          create_time?: number | null
          creator_username?: string | null
          id?: number
          order_id?: string | null
          paid_commission?: number | null
          product_id?: string | null
          quantity?: number | null
          status?: string | null
          video_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["campaign_id"]
          },
        ]
      }
      users: {
        Row: {
          access_token: string | null
          access_token_expire_at: number | null
          creator_username: string | null
          id: string
          refresh_token: string | null
          refresh_token_expire_at: number | null
          seller_id: string | null
          seller_name: string | null
          shop_cipher: string | null
          type: string | null
        }
        Insert: {
          access_token?: string | null
          access_token_expire_at?: number | null
          creator_username?: string | null
          id: string
          refresh_token?: string | null
          refresh_token_expire_at?: number | null
          seller_id?: string | null
          seller_name?: string | null
          shop_cipher?: string | null
          type?: string | null
        }
        Update: {
          access_token?: string | null
          access_token_expire_at?: number | null
          creator_username?: string | null
          id?: string
          refresh_token?: string | null
          refresh_token_expire_at?: number | null
          seller_id?: string | null
          seller_name?: string | null
          shop_cipher?: string | null
          type?: string | null
        }
        Relationships: []
      }
      videos: {
        Row: {
          click_through_rate: number | null
          creator_username: string | null
          gmv: number | null
          id: number
          post_time: string | null
          product_id: string | null
          seller_id: string | null
          sku_orders: number | null
          title: string | null
          units_sold: number | null
          video_id: string | null
          views: number | null
        }
        Insert: {
          click_through_rate?: number | null
          creator_username?: string | null
          gmv?: number | null
          id?: number
          post_time?: string | null
          product_id?: string | null
          seller_id?: string | null
          sku_orders?: number | null
          title?: string | null
          units_sold?: number | null
          video_id?: string | null
          views?: number | null
        }
        Update: {
          click_through_rate?: number | null
          creator_username?: string | null
          gmv?: number | null
          id?: number
          post_time?: string | null
          product_id?: string | null
          seller_id?: string | null
          sku_orders?: number | null
          title?: string | null
          units_sold?: number | null
          video_id?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "videos_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_type: "creator" | "seller"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

