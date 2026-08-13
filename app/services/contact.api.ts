import { apiRequest } from "@/app/lib/api";
import { Contact } from "@/app/types/contact";

export const contactAPI = {
  // ==========================================
  // GET ALL CONTACTS
  // ==========================================

  getAll: async (): Promise<Contact[]> => {
    return apiRequest<Contact[]>("/api/contacts");
  },

  // ==========================================
  // GET CONTACT BY ID
  // ==========================================

  getById: async (id: number): Promise<Contact> => {
    return apiRequest<Contact>(`/api/contacts/${id}`);
  },

  // ==========================================
  // UPDATE STATUS
  // ==========================================

  updateStatus: async (
    id: number,
    status: Contact["status"]
  ): Promise<Contact> => {
    return apiRequest<Contact>(
      `/api/contacts/${id}/status`,
      {
        method: "PATCH",
        body: JSON.stringify({
          status,
        }),
      }
    );
  },

  // ==========================================
  // DELETE
  // ==========================================

  delete: async (id: number): Promise<void> => {
    return apiRequest<void>(
      `/api/contacts/${id}`,
      {
        method: "DELETE",
      }
    );
  },
};