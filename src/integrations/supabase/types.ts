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
      chapters: {
        Row: {
          admin_id: string | null
          country: string
          created_at: string | null
          id: string
          location: string
          member_count: number | null
          name: string
          updated_at: string | null
        }
        Insert: {
          admin_id?: string | null
          country: string
          created_at?: string | null
          id?: string
          location: string
          member_count?: number | null
          name: string
          updated_at?: string | null
        }
        Update: {
          admin_id?: string | null
          country?: string
          created_at?: string | null
          id?: string
          location?: string
          member_count?: number | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chapters_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      claims: {
        Row: {
          claim_amount: number
          claim_number: string
          created_at: string | null
          description: string
          id: string
          incident_date: string
          policy_id: string
          profile_id: string
          status: Database["public"]["Enums"]["claim_status"] | null
          supporting_documents: Json | null
          updated_at: string | null
          verified_at: string | null
          verified_by: string | null
          verifier_notes: string | null
        }
        Insert: {
          claim_amount: number
          claim_number: string
          created_at?: string | null
          description: string
          id?: string
          incident_date: string
          policy_id: string
          profile_id: string
          status?: Database["public"]["Enums"]["claim_status"] | null
          supporting_documents?: Json | null
          updated_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
          verifier_notes?: string | null
        }
        Update: {
          claim_amount?: number
          claim_number?: string
          created_at?: string | null
          description?: string
          id?: string
          incident_date?: string
          policy_id?: string
          profile_id?: string
          status?: Database["public"]["Enums"]["claim_status"] | null
          supporting_documents?: Json | null
          updated_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
          verifier_notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "claims_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "claims_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "claims_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          memo: string | null
          metadata: Json | null
          pi_payment_id: string | null
          policy_id: string | null
          profile_id: string
          status: Database["public"]["Enums"]["payment_status"] | null
          tx_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          memo?: string | null
          metadata?: Json | null
          pi_payment_id?: string | null
          policy_id?: string | null
          profile_id: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          tx_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          memo?: string | null
          metadata?: Json | null
          pi_payment_id?: string | null
          policy_id?: string | null
          profile_id?: string
          status?: Database["public"]["Enums"]["payment_status"] | null
          tx_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_policy_id_fkey"
            columns: ["policy_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      policies: {
        Row: {
          beneficiary_name: string | null
          beneficiary_relationship: string | null
          chapter_id: string | null
          coverage_amount: number
          created_at: string | null
          end_date: string | null
          id: string
          monthly_premium: number
          policy_number: string
          profile_id: string
          start_date: string
          status: Database["public"]["Enums"]["policy_status"] | null
          updated_at: string | null
        }
        Insert: {
          beneficiary_name?: string | null
          beneficiary_relationship?: string | null
          chapter_id?: string | null
          coverage_amount: number
          created_at?: string | null
          end_date?: string | null
          id?: string
          monthly_premium: number
          policy_number: string
          profile_id: string
          start_date?: string
          status?: Database["public"]["Enums"]["policy_status"] | null
          updated_at?: string | null
        }
        Update: {
          beneficiary_name?: string | null
          beneficiary_relationship?: string | null
          chapter_id?: string | null
          coverage_amount?: number
          created_at?: string | null
          end_date?: string | null
          id?: string
          monthly_premium?: number
          policy_number?: string
          profile_id?: string
          start_date?: string
          status?: Database["public"]["Enums"]["policy_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "policies_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "policies_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          display_name: string | null
          email: string | null
          id: string
          phone: string | null
          pi_uid: string | null
          pi_username: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
          phone?: string | null
          pi_uid?: string | null
          pi_username?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
          phone?: string | null
          pi_uid?: string | null
          pi_username?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      verifiers: {
        Row: {
          chapter_id: string
          created_at: string | null
          id: string
          is_active: boolean | null
          profile_id: string
          updated_at: string | null
          verified_claims_count: number | null
        }
        Insert: {
          chapter_id: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          profile_id: string
          updated_at?: string | null
          verified_claims_count?: number | null
        }
        Update: {
          chapter_id?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          profile_id?: string
          updated_at?: string | null
          verified_claims_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "verifiers_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verifiers_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_claim_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_policy_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      claim_status:
        | "pending"
        | "under_review"
        | "approved"
        | "rejected"
        | "paid"
      payment_status:
        | "pending"
        | "approved"
        | "completed"
        | "cancelled"
        | "failed"
      policy_status: "active" | "expired" | "cancelled" | "suspended"
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
      claim_status: ["pending", "under_review", "approved", "rejected", "paid"],
      payment_status: [
        "pending",
        "approved",
        "completed",
        "cancelled",
        "failed",
      ],
      policy_status: ["active", "expired", "cancelled", "suspended"],
    },
  },
} as const
