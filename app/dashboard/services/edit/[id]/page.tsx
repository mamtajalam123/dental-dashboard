"use client";


import {
  useEffect,
  useState,
} from "react";


import {
  useRouter,
  useParams,
} from "next/navigation";


import {
  ArrowLeft,
} from "lucide-react";


import ServiceForm, {
  ServiceFormData,
} from "@/app/components/services/ServiceForm";


import {
  serviceAPI,
} from "@/app/services/service.api";







export default function EditServicePage(){



const router = useRouter();


const params = useParams();


const id = Number(params.id);







const [
  loading,
  setLoading
] = useState(true);





const [
  service,
  setService
] = useState<ServiceFormData | null>(null);











// =====================================
// LOAD SERVICE
// =====================================


useEffect(()=>{


if(id){

loadService();

}


},[id]);











const loadService = async()=>{


try{


setLoading(true);





const response =
await serviceAPI.getById(id);






// =================================
// API RESPONSE HANDLE
// =================================


const data =


response?.data?.data

||

response?.data

||

response?.service

||

response;







console.log(
"EDIT SERVICE RESPONSE:",
data
);









setService({



name:


data.name || "",







categoryId:


Number(
data.categoryId
)

|| 

0,







duration:


data.duration || "",







// ✅ SHORT DESCRIPTION

shortDescription:


data.shortDescription

||

data.short_description

||

"",







description:


data.description || "",







image:


data.image || "",







status:


data.status || "Active",





});






}

catch(error:any){



console.error(

"LOAD SERVICE ERROR:",

error?.response?.data
||
error.message

);





alert(
"Failed to load service."
);





}

finally{


setLoading(false);


}



};














// =====================================
// UPDATE SERVICE
// =====================================


const handleUpdate = async(

formData:FormData

)=>{


try{



const response =

await serviceAPI.update(

id,

formData

);







console.log(

"UPDATE SERVICE RESPONSE:",

response

);







alert(
"Service updated successfully."
);







router.refresh();





router.push(
"/dashboard/services"
);





}

catch(error:any){



console.error(

"UPDATE SERVICE ERROR:",

error?.response?.data
||
error.message

);






alert(
"Failed to update service."
);




}



};












// =====================================
// LOADING
// =====================================


if(loading){



return (

<div
className="
flex
items-center
justify-center
py-20
"
>


<p
className="
text-lg
text-slate-500
"
>

Loading Service...

</p>


</div>

);



}











// =====================================
// NOT FOUND
// =====================================


if(!service){



return (

<div
className="
flex
items-center
justify-center
py-20
"
>


<p
className="
text-lg
text-red-500
"
>

Service not found.

</p>


</div>

);



}














return (



<div className="space-y-6">







{/* HEADER */}



<div

className="
flex
items-center
justify-between
"

>






<div>


<h1

className="
text-3xl
font-bold
text-slate-800
"

>

Edit Service

</h1>




<p

className="
mt-1
text-slate-500
"

>

Update service information.

</p>




</div>









<button


onClick={()=>


router.push(
"/dashboard/services"
)


}



className="
flex
items-center
gap-2
rounded-xl
border
border-slate-300
bg-white
px-5
py-2.5
text-sm
font-medium
text-slate-700
shadow-sm
hover:bg-slate-100
"

>


<ArrowLeft size={18}/>


Back


</button>







</div>













{/* SERVICE FORM */}



<ServiceForm



initialData={service}



onSubmit={handleUpdate}



submitLabel="Update Service"



/>








</div>



);



}