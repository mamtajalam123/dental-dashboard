export interface Category {
  id?: number;

  name: string;

  status: "Active" | "Inactive";

  createdAt?: string;

  updatedAt?: string;
}