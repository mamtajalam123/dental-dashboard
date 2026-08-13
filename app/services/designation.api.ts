import * as designationService from "./designation.service";
import { Designation } from "@/types/designation";

export const designationAPI = {
  getAll: async () => {
    return await designationService.getDesignations();
  },

  getById: async (id: number) => {
    return await designationService.getDesignationById(id);
  },

  create: async (
    data: Partial<Designation>
  ) => {
    return await designationService.createDesignation(data);
  },

  update: async (
    id: number,
    data: Partial<Designation>
  ) => {
    return await designationService.updateDesignation(
      id,
      data
    );
  },

  delete: async (id: number) => {
    return await designationService.deleteDesignation(id);
  },
};