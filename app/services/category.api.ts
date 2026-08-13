import * as categoryService from "./category.service";

import { Category } from "@/app/types/category";


export const categoryAPI = {


  // ==========================
  // GET ALL
  // ==========================

  getAll: async (): Promise<Category[]> => {

    try {

      return await categoryService.getCategories();

    } catch(error) {

      console.error(
        "Category API Error:",
        error
      );

      return [];

    }

  },



  // ==========================
  // GET BY ID
  // ==========================

  getById: async(
    id:number
  ) => {

    return await categoryService.getCategoryById(
      id
    );

  },



  // ==========================
  // CREATE
  // ==========================

  create: async(
    data:Partial<Category>
  ) => {

    return await categoryService.createCategory(
      data
    );

  },



  // ==========================
  // UPDATE
  // ==========================

  update: async(
    id:number,
    data:Partial<Category>
  ) => {

    return await categoryService.updateCategory(
      id,
      data
    );

  },



  // ==========================
  // DELETE
  // ==========================

  delete: async(
    id:number
  ) => {

    return await categoryService.deleteCategory(
      id
    );

  },


};