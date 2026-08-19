import axios from "axios";


export const api = axios.create({

  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000",

});




// Add JWT token automatically

api.interceptors.request.use(

(config)=>{


  if(typeof window !== "undefined"){


    const token =
      localStorage.getItem("token");


    if(token){

      config.headers.Authorization =
        `Bearer ${token}`;

    }

  }



  // Handle FormData automatically

  if(
    config.data instanceof FormData
  ){

    delete config.headers[
      "Content-Type"
    ];

  }
  else{

    config.headers[
      "Content-Type"
    ] =
    "application/json";

  }



  return config;


},


(error)=>{

  return Promise.reject(error);

}


);



export default api;