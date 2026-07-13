export type GalleryStatus =
  | "Active"
  | "Inactive";

export type GalleryCategory =
  | "Clinic"
  | "Treatment"
  | "Equipment"
  | "Before & After";

export interface GalleryItem {
  id: number;

  title: string;

  image: string;

  category: GalleryCategory;

  status: GalleryStatus;

  description: string;

  createdAt: string;
}