
export interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  status: "New" | "Read" | "Replied";
  created_at?: string;
  updated_at?: string;
}
