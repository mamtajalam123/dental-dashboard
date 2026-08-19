"use client";


import {
  useState,
} from "react";


import {
  useRouter,
} from "next/navigation";


import {
  ArrowLeft,
} from "lucide-react";


import {
  AxiosError,
} from "axios";


import ServiceForm from "@/app/components/services/ServiceForm";


import {
  serviceAPI,
} from "@/app/services/service.api";





export default function AddServicePage(){



const router = useRouter();



const [
 loading,
 setLoading
] = useState(false);







// =====================================
// CREATE SERVICE
// =====================================


const handleCreateService = async(
  formData:FormData
)=>{


try{


setLoading(true);





const response =

await serviceAPI.create(
  formData
);





console.log(
"CREATE SERVICE RESPONSE:",
response
);





alert(
"Service created successfully."
);





router.refresh();



router.push(
"/dashboard/services"
);





}

catch(error){



const err =
error as AxiosError<any>;



console.error(
"CREATE SERVICE ERROR:",
err.response?.data
||
err.message
);





alert(

err.response?.data?.message
||
"Failed to create service."

);




}

finally{


setLoading(false);


}


};









return (


<div className="space-y-6">







{/* HEADER */}



<div className="
flex
items-center
justify-between
">





<div>


<h1 className="
text-3xl
font-bold
text-slate-800
">

Add Service

</h1>




<p className="
mt-2
text-slate-500
">

Create a new dental clinic service.

</p>



</div>









<button


onClick={()=>


router.push(
"/dashboard/services"
)


}


disabled={loading}


className="
flex
items-center
gap-2
rounded-xl
border
border-slate-300
bg-white
px-5
py-3
text-slate-700
shadow-sm
hover:bg-slate-100
disabled:opacity-50
"


>


<ArrowLeft size={18}/>


Back


</button>







</div>









{/* FORM */}



<ServiceForm


submitLabel={
loading
?
"Saving..."
:
"Save Service"
}


onSubmit={
handleCreateService
}


/>







</div>


);


}