import { apiRequest } from "@/app/lib/api";
import type { Gallery } from "../types/gallery";

// ==========================================
// GALLERY API
// ==========================================

export const galleryAPI = {
  // ========================================
  // GET ALL GALLERY
  // ========================================

  getAll: async (): Promise<Gallery[]> => {
    console.log(
      "========== GET ALL GALLERY =========="
    );

    const response = await apiRequest<Gallery[]>(
      "/api/gallery",
      {
        method: "GET",
      }
    );

    console.log(
      "GET ALL GALLERY RESPONSE:",
      response
    );

    return response;
  },

  // ========================================
  // GET GALLERY BY ID
  // ========================================

  getById: async (
    id: number
  ): Promise<Gallery> => {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error(
        "Invalid gallery ID."
      );
    }

    console.log(
      "========== GET GALLERY BY ID =========="
    );

    console.log(
      "GALLERY ID:",
      id
    );

    const response =
      await apiRequest<Gallery>(
        `/api/gallery/${id}`,
        {
          method: "GET",
        }
      );

    console.log(
      "GET GALLERY BY ID RESPONSE:",
      response
    );

    return response;
  },

  // ========================================
  // CREATE GALLERY
  // ========================================

  create: async (
    data: FormData
  ): Promise<Gallery> => {
    console.log(
      "========== CREATE GALLERY =========="
    );

    // Debug FormData
    for (const [
      key,
      value,
    ] of data.entries()) {
      console.log(
        `CREATE ${key}:`,
        value
      );
    }

    const response =
      await apiRequest<Gallery>(
        "/api/gallery",
        {
          method: "POST",

          // IMPORTANT:
          // Do NOT manually set
          // Content-Type.
          //
          // Browser automatically creates:
          // multipart/form-data;
          // boundary=...
          body: data,
        }
      );

    console.log(
      "CREATE GALLERY RESPONSE:",
      response
    );

    return response;
  },

  // ========================================
  // UPDATE GALLERY
  // ========================================

  update: async (
    id: number,
    data: FormData
  ): Promise<Gallery> => {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error(
        "Invalid gallery ID."
      );
    }

    console.log(
      "========== UPDATE GALLERY =========="
    );

    console.log(
      "GALLERY ID:",
      id
    );

    // ======================================
    // DEBUG FORM DATA
    // ======================================

    console.log(
      "========== UPDATE FORM DATA =========="
    );

    for (const [
      key,
      value,
    ] of data.entries()) {
      console.log(
        `UPDATE ${key}:`,
        value
      );
    }

    console.log(
      "======================================"
    );

    // ======================================
    // API REQUEST
    // ======================================

    const response =
      await apiRequest<Gallery>(
        `/api/gallery/${id}`,
        {
          method: "PUT",

          // IMPORTANT:
          // Do NOT add:
          //
          // headers: {
          //   "Content-Type":
          //     "multipart/form-data"
          // }
          //
          // The browser must set the
          // multipart boundary automatically.

          body: data,
        }
      );

    console.log(
      "========== UPDATE RESPONSE =========="
    );

    console.log(
      "RAW UPDATE RESPONSE:",
      response
    );

    console.log(
      "UPDATED CATEGORY:",
      (response as any)?.category
    );

    console.log(
      "UPDATED SERVICE ID:",
      (response as any)?.serviceId
    );

    console.log(
      "UPDATED SERVICE NAME:",
      (response as any)?.serviceName
    );

    console.log(
      "======================================"
    );

    return response;
  },

  // ========================================
  // DELETE GALLERY
  // ========================================

  delete: async (
    id: number
  ): Promise<void> => {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error(
        "Invalid gallery ID."
      );
    }

    console.log(
      "========== DELETE GALLERY =========="
    );

    console.log(
      "GALLERY ID:",
      id
    );

    await apiRequest<void>(
      `/api/gallery/${id}`,
      {
        method: "DELETE",
      }
    );

    console.log(
      "GALLERY DELETED:",
      id
    );
  },
};