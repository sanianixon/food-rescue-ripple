export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      delivery_tracking: {
        Row: {
          actual_arrival: string | null
          created_at: string | null
          current_latitude: number | null
          current_longitude: number | null
          delivery_image_url: string | null
          delivery_notes: string | null
          destination_latitude: number | null
          destination_longitude: number | null
          donation_id: string
          estimated_arrival: string | null
          id: string
          updated_at: string | null
          volunteer_id: string
        }
        Insert: {
          actual_arrival?: string | null
          created_at?: string | null
          current_latitude?: number | null
          current_longitude?: number | null
          delivery_image_url?: string | null
          delivery_notes?: string | null
          destination_latitude?: number | null
          destination_longitude?: number | null
          donation_id: string
          estimated_arrival?: string | null
          id?: string
          updated_at?: string | null
          volunteer_id: string
        }
        Update: {
          actual_arrival?: string | null
          created_at?: string | null
          current_latitude?: number | null
          current_longitude?: number | null
          delivery_image_url?: string | null
          delivery_notes?: string | null
          destination_latitude?: number | null
          destination_longitude?: number | null
          donation_id?: string
          estimated_arrival?: string | null
          id?: string
          updated_at?: string | null
          volunteer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "delivery_tracking_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "food_donations"
            referencedColumns: ["id"]
          },
        ]
      }
      food_allergens: {
        Row: {
          allergen: string
          created_at: string | null
          donation_id: string
          id: string
        }
        Insert: {
          allergen: string
          created_at?: string | null
          donation_id: string
          id?: string
        }
        Update: {
          allergen?: string
          created_at?: string | null
          donation_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "food_allergens_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "food_donations"
            referencedColumns: ["id"]
          },
        ]
      }
      food_donations: {
        Row: {
          accepted_by: string | null
          created_at: string | null
          cuisine_type: string | null
          expiry_date: string | null
          food_type: string
          id: string
          image_url: string | null
          is_dairy_free: boolean | null
          is_gluten_free: boolean | null
          is_halal: boolean | null
          is_vegan: boolean | null
          is_vegetarian: boolean | null
          location: string
          main_ingredients: string[] | null
          notes: string | null
          pickup_time: string
          prep_date: string | null
          quantity: string
          quantity_numeric: number | null
          staff_id: string
          status: Database["public"]["Enums"]["delivery_status"] | null
          updated_at: string | null
          urgency: Database["public"]["Enums"]["urgency_level"] | null
        }
        Insert: {
          accepted_by?: string | null
          created_at?: string | null
          cuisine_type?: string | null
          expiry_date?: string | null
          food_type: string
          id?: string
          image_url?: string | null
          is_dairy_free?: boolean | null
          is_gluten_free?: boolean | null
          is_halal?: boolean | null
          is_vegan?: boolean | null
          is_vegetarian?: boolean | null
          location: string
          main_ingredients?: string[] | null
          notes?: string | null
          pickup_time: string
          prep_date?: string | null
          quantity: string
          quantity_numeric?: number | null
          staff_id: string
          status?: Database["public"]["Enums"]["delivery_status"] | null
          updated_at?: string | null
          urgency?: Database["public"]["Enums"]["urgency_level"] | null
        }
        Update: {
          accepted_by?: string | null
          created_at?: string | null
          cuisine_type?: string | null
          expiry_date?: string | null
          food_type?: string
          id?: string
          image_url?: string | null
          is_dairy_free?: boolean | null
          is_gluten_free?: boolean | null
          is_halal?: boolean | null
          is_vegan?: boolean | null
          is_vegetarian?: boolean | null
          location?: string
          main_ingredients?: string[] | null
          notes?: string | null
          pickup_time?: string
          prep_date?: string | null
          quantity?: string
          quantity_numeric?: number | null
          staff_id?: string
          status?: Database["public"]["Enums"]["delivery_status"] | null
          updated_at?: string | null
          urgency?: Database["public"]["Enums"]["urgency_level"] | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          donation_id: string | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          donation_id?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          donation_id?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "food_donations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string
          id: string
          organization: string | null
          phone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          full_name: string
          id?: string
          organization?: string | null
          phone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          full_name?: string
          id?: string
          organization?: string | null
          phone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "staff" | "volunteer" | "ngo"
      delivery_status:
        | "pending"
        | "accepted"
        | "in_transit"
        | "delivered"
        | "cancelled"
      urgency_level: "low" | "medium" | "high"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "staff", "volunteer", "ngo"],
      delivery_status: [
        "pending",
        "accepted",
        "in_transit",
        "delivered",
        "cancelled",
      ],
      urgency_level: ["low", "medium", "high"],
    },
  },
} as const
