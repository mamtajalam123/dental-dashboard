export interface Gallery {
  id: number;

  title: string;

  category?: string | null;

  serviceId?: number | null;

  serviceName?: string | null;

  description?: string | null;

  image?: string | null;

  type?: string | null;

  status: "Active" | "Inactive";

  created_at?: string | null;

  updated_at?: string | null;
}