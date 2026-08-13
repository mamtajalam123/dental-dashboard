export interface Designation {
  id: number;

  name: string;

  status: "Active" | "Inactive";

  createdAt?: string;

  updatedAt?: string;
}