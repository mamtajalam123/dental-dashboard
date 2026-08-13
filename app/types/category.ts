export interface Category {
  id?: number;

  name: string;

  description?: string;

  status?: "Active" | "Inactive";

  created_at?: string;

  updated_at?: string;
}