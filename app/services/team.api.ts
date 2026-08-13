const API =
  `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/teams`;



export const teamAPI = {


  // ==========================
  // GET ALL TEAM
  // ==========================

  async getAll() {

    const res =
      await fetch(API);


    const json =
      await res.json();


    if(!res.ok){

      throw new Error(
        json.message ||
        "Failed to load team"
      );

    }


    return json.data ?? [];

  },




  // ==========================
  // GET SINGLE TEAM
  // ==========================

  async getById(
    id:number
  ) {


    const res =
      await fetch(
        `${API}/${id}`
      );


    const json =
      await res.json();



    if(!res.ok || !json.success){

      throw new Error(
        json.message ||
        "Team member not found"
      );

    }


    return json.data;


  },




  // ==========================
  // CREATE TEAM
  // ==========================

  async create(
    data:FormData
  ) {


    const res =
      await fetch(
        API,
        {
          method:"POST",

          body:data,

          // DO NOT ADD
          // Content-Type
          // browser will set multipart boundary

        }
      );



    const json =
      await res.json();



    if(!res.ok){

      throw new Error(
        json.message ||
        "Failed to create team"
      );

    }


    return json;


  },




  // ==========================
  // UPDATE TEAM
  // ==========================

  async update(
    id:number,
    data:FormData
  ) {


    const res =
      await fetch(
        `${API}/${id}`,
        {
          method:"PUT",

          body:data,

        }
      );



    const json =
      await res.json();



    if(!res.ok){

      throw new Error(
        json.message ||
        "Failed to update team"
      );

    }


    return json;


  },





  // ==========================
  // DELETE TEAM
  // ==========================

  async delete(
    id:number
  ){

    const res =
      await fetch(
        `${API}/${id}`,
        {
          method:"DELETE"
        }
      );



    const json =
      await res.json();



    if(!res.ok){

      throw new Error(
        json.message ||
        "Failed to delete team"
      );

    }


    return json;


  }


};