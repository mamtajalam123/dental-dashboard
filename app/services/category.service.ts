import { apiRequest } from "@/app/lib/api";

import { Category } from "@/app/types/category";



// ==========================================
// GET ALL CATEGORIES
// ==========================================

export async function getCategories(): Promise<Category[]> {

  const response =
    await apiRequest(
      "/api/service-categories"
    );


  const data =
    Array.isArray(response.data)
      ? response.data
      : [];



  return data.map(
    (item:any)=>({

      id: item.id,

      name: item.name,

      status: item.status,

      createdAt:
        item.created_at,

      updatedAt:
        item.updated_at,

    })
  );

}




// ==========================================
// GET CATEGORY BY ID
// ==========================================

export async function getCategoryById(
  id:number
):Promise<Category>{


  const response =
    await apiRequest(
      `/api/service-categories/${id}`
    );


  const item =
    response.data;



  return {

    id:item.id,

    name:item.name,

    status:item.status,

    createdAt:
      item.created_at,

    updatedAt:
      item.updated_at,

  };


}





// ==========================================
// CREATE CATEGORY
// ==========================================

export async function createCategory(
  data:Partial<Category>
){

  return await apiRequest(

    "/api/service-categories",

    {

      method:"POST",

      body:
        JSON.stringify(data),

      headers:{
        "Content-Type":
          "application/json",
      },

    }

  );

}





// ==========================================
// UPDATE CATEGORY
// ==========================================

export async function updateCategory(
  id:number,
  data:Partial<Category>
){

  return await apiRequest(

    `/api/service-categories/${id}`,

    {

      method:"PUT",

      body:
        JSON.stringify(data),

      headers:{
        "Content-Type":
          "application/json",
      },

    }

  );

}





// ==========================================
// DELETE CATEGORY
// ==========================================

export async function deleteCategory(
  id:number
){

  return await apiRequest(

    `/api/service-categories/${id}`,

    {

      method:"DELETE",

    }

  );

}