import { api } from "../lib/api";
import type { Gallery } from "../types/gallery";

// ==========================================
// GET ALL GALLERY
// ==========================================

export const getGallery = async (): Promise<Gallery[]> => {
  const response = await api.get<Gallery[]>("/gallery");
  return response.data;
};

// ==========================================
// GET GALLERY BY ID
// ==========================================

export const getGalleryById = async (
  id: number
): Promise<Gallery> => {
  const response = await api.get<Gallery>(`/gallery/${id}`);
  return response.data;
};

// ==========================================
// CREATE GALLERY
// ==========================================

export const createGallery = async (
  data: FormData
): Promise<Gallery> => {
  const response = await api.post<Gallery>(
    "/gallery",
    data
  );

  return response.data;
};

// ==========================================
// UPDATE GALLERY
// ==========================================

export const updateGallery = async (
  id: number,
  data: FormData
): Promise<Gallery> => {
  const response = await api.put<Gallery>(
    `/gallery/${id}`,
    data
  );

  return response.data;
};

// ==========================================
// DELETE GALLERY
// ==========================================

export const deleteGallery = async (
  id: number
): Promise<void> => {
  await api.delete(`/gallery/${id}`);
};

// ==========================================
// UPDATE STATUS
// ==========================================

export const updateGalleryStatus = async (
  id: number,
  status: "Active" | "Inactive"
): Promise<Gallery> => {
  const response = await api.patch<Gallery>(
    `/gallery/${id}/status`,
    { status }
  );

  return response.data;
};