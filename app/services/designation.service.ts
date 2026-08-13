import { apiRequest } from "@/app/lib/api";
import { Designation } from "@/types/designation";

// ==============================
// GET ALL DESIGNATIONS
// ==============================
export async function getDesignations(): Promise<Designation[]> {
  const response = await apiRequest(
    "/api/designations"
  );

  return response.data.map((item: any) => ({
    id: item.id,
    name: item.name,
    status: item.status,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  }));
}

// ==============================
// GET DESIGNATION BY ID
// ==============================
export async function getDesignationById(
  id: number
): Promise<Designation> {
  const response = await apiRequest(
    `/api/designations/${id}`
  );

  const item = response.data;

  return {
    id: item.id,
    name: item.name,
    status: item.status,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  };
}

// ==============================
// CREATE DESIGNATION
// ==============================
export async function createDesignation(
  data: Partial<Designation>
) {
  return await apiRequest(
    "/api/designations",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

// ==============================
// UPDATE DESIGNATION
// ==============================
export async function updateDesignation(
  id: number,
  data: Partial<Designation>
) {
  return await apiRequest(
    `/api/designations/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );
}

// ==============================
// DELETE DESIGNATION
// ==============================
export async function deleteDesignation(
  id: number
) {
  return await apiRequest(
    `/api/designations/${id}`,
    {
      method: "DELETE",
    }
  );
}