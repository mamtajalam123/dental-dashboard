import { apiRequest } from "@/app/lib/api";
import { Service } from "@/app/types/service";


// ======================================================
// SERVICE API
// ======================================================

export const serviceAPI = {

  // ====================================================
  // GET ALL SERVICES
  // GET /api/services
  // ====================================================

  getAll: async (): Promise<Service[]> => {

    const response = await apiRequest(
      "/api/services",
      {
        method: "GET",
      }
    );

    const data =
      response?.data ?? response;

    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((item: any) => ({
      id: item.id,

      name:
        item.name ?? "",

      categoryId:
        item.category_id ??
        item.categoryId ??
        null,

      categoryName:
        item.categoryName ??
        item.category_name ??
        "",

      duration:
        item.duration ?? "",

      description:
        item.description ?? "",

      image:
        item.image ?? null,

      status:
        item.status ?? "Active",

      createdAt:
        item.created_at ??
        item.createdAt ??
        null,

      updatedAt:
        item.updated_at ??
        item.updatedAt ??
        null,
    }));
  },


  // ====================================================
  // GET SERVICE BY ID
  // GET /api/services/:id
  // ====================================================

  getById: async (
    id: number
  ): Promise<Service> => {

    const response =
      await apiRequest(
        `/api/services/${id}`,
        {
          method: "GET",
        }
      );

    const item =
      response?.data ?? response;

    if (!item) {
      throw new Error(
        "Service not found"
      );
    }

    return {
      id: item.id,

      name:
        item.name ?? "",

      categoryId:
        item.category_id ??
        item.categoryId ??
        null,

      categoryName:
        item.categoryName ??
        item.category_name ??
        "",

      duration:
        item.duration ?? "",

      description:
        item.description ?? "",

      image:
        item.image ?? null,

      status:
        item.status ?? "Active",

      createdAt:
        item.created_at ??
        item.createdAt ??
        null,

      updatedAt:
        item.updated_at ??
        item.updatedAt ??
        null,
    };
  },


  // ====================================================
  // CREATE SERVICE
  // POST /api/services
  // ====================================================

  create: async (
    formData: FormData
  ) => {

    return await apiRequest(
      "/api/services",
      {
        method: "POST",
        body: formData,
      }
    );
  },


  // ====================================================
  // UPDATE SERVICE
  // PUT /api/services/:id
  // ====================================================

  update: async (
    id: number,
    formData: FormData
  ) => {

    return await apiRequest(
      `/api/services/${id}`,
      {
        method: "PUT",
        body: formData,
      }
    );
  },


  // ====================================================
  // DELETE SERVICE
  // DELETE /api/services/:id
  // ====================================================

  delete: async (
    id: number
  ) => {

    return await apiRequest(
      `/api/services/${id}`,
      {
        method: "DELETE",
      }
    );
  },

};