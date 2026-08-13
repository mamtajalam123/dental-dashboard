import { apiRequest } from "@/app/lib/api";
import { Feedback } from "@/types/feedback";

// ==========================================
// FEEDBACK API
// ==========================================

export const feedbackAPI = {
  // ==========================================
  // GET ALL FEEDBACK
  // GET /api/feedback
  // ==========================================

  getAll: async (): Promise<Feedback[]> => {
    return apiRequest<Feedback[]>("/api/feedback");
  },

  // ==========================================
  // GET FEEDBACK BY ID
  // GET /api/feedback/:id
  // ==========================================

  getById: async (id: number): Promise<Feedback> => {
    return apiRequest<Feedback>(`/api/feedback/${id}`);
  },

  // ==========================================
  // CREATE FEEDBACK
  // POST /api/feedback
  // ==========================================

  create: async (data: FormData): Promise<Feedback> => {
    return apiRequest<Feedback>("/api/feedback", {
      method: "POST",
      body: data,
    });
  },

  // ==========================================
  // UPDATE FEEDBACK
  // PUT /api/feedback/:id
  // ==========================================

  update: async (
    id: number,
    data: FormData
  ): Promise<Feedback> => {
    return apiRequest<Feedback>(
      `/api/feedback/${id}`,
      {
        method: "PUT",
        body: data,
      }
    );
  },

  // ==========================================
  // UPDATE FEEDBACK STATUS
  // PATCH /api/feedback/:id/status
  // ==========================================

  updateStatus: async (
    id: number,
    status: Feedback["status"]
  ): Promise<Feedback> => {
    return apiRequest<Feedback>(
      `/api/feedback/${id}/status`,
      {
        method: "PATCH",
        body: JSON.stringify({
          status,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },

  // ==========================================
  // DELETE FEEDBACK
  // DELETE /api/feedback/:id
  // ==========================================

  delete: async (id: number): Promise<void> => {
    await apiRequest(`/api/feedback/${id}`, {
      method: "DELETE",
    });
  },
};