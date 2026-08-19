import api from "./api";


export const serviceAPI = {


  // ==========================
  // CREATE SERVICE
  // ==========================

  create: async(
    data: FormData
  ) => {

    const response =
      await api.post(
        "/api/services",
        data
      );

    return response.data;

  },




  // ==========================
  // UPDATE SERVICE
  // ==========================

  update: async(
    id:number,
    data:FormData
  ) => {


    const response =
      await api.put(
        `/api/services/${id}`,
        data
      );


    return response.data;

  },




  // ==========================
  // GET ALL SERVICES
  // ==========================

  getAll: async()=>{


    const response =
      await api.get(
        "/api/services"
      );


    return response.data;


  },




  // ==========================
  // GET SERVICE BY ID
  // ==========================

  getById: async(
    id:number
  )=>{


    const response =
      await api.get(
        `/api/services/${id}`
      );


    return response.data;


  },





  // ==========================
  // DELETE SERVICE
  // ==========================

  delete: async(
    id:number
  )=>{


    const response =
      await api.delete(
        `/api/services/${id}`
      );


    return response.data;


  }



};