import { apiRequest } from "@/app/lib/api";
import { Service } from "@/app/types/service";


// ==============================
// GET ALL SERVICES
// ==============================

export async function getServices(): Promise<Service[]> {

  const response =
    await apiRequest("/api/services");


  return response.data.map(
    (item:any) => ({

      id:item.id,

      name:item.name,


      categoryId:
        item.category_id,


      categoryName:
        item.categoryName ||
        item.category_name,


      duration:
        item.duration,


      description:
        item.description,


      image:
        item.image ?? "",


      status:
        item.status,


      createdAt:
        item.created_at,


      updatedAt:
        item.updated_at,

    })
  );

}




// ==============================
// GET SERVICE BY ID
// ==============================

export async function getServiceById(
  id:number
):Promise<Service>{


  const response =
    await apiRequest(
      `/api/services/${id}`
    );


  const item =
    response.data;



  return {

    id:item.id,

    name:item.name,


    categoryId:
      item.category_id,


    categoryName:
      item.categoryName ||
      item.category_name,


    duration:
      item.duration,


    description:
      item.description,


    image:
      item.image ?? "",


    status:
      item.status,


    createdAt:
      item.created_at,


    updatedAt:
      item.updated_at,

  };

}




// ==============================
// CREATE SERVICE
// ==============================

export async function createService(
  data:FormData
){

  return await apiRequest(
    "/api/services",
    {
      method:"POST",
      body:data,
    }
  );

}





// ==============================
// UPDATE SERVICE
// ==============================

export async function updateService(
  id:number,
  data:FormData
){

  return await apiRequest(
    `/api/services/${id}`,
    {
      method:"PUT",
      body:data,
    }
  );

}





// ==============================
// DELETE SERVICE
// ==============================

export async function deleteService(
  id:number
){

  return await apiRequest(
    `/api/services/${id}`,
    {
      method:"DELETE",
    }
  );

}