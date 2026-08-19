"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";


import {
  ArrowLeft,
  Pencil,
} from "lucide-react";


import {
  serviceAPI,
} from "@/app/services/service.api";


import {
  Service,
} from "@/app/types/service";






export default function ViewServicePage(){



const router = useRouter();


const params = useParams();


const id = Number(params.id);






const [service,setService] =
useState<Service | null>(null);



const [loading,setLoading] =
useState(true);





const [error,setError] =
useState("");








// =====================================
// LOAD SERVICE API
// =====================================


useEffect(()=>{


if(id){

loadService();

}


},[id]);








const loadService = async()=>{


try{


setLoading(true);


setError("");



const response =
await serviceAPI.getById(id);



console.log(
"VIEW SERVICE API RESPONSE:",
response
);





const data =


response?.data

||

response?.service

||

response;






setService(data);



}

catch(error:any){


console.error(

"LOAD SERVICE ERROR:",

error?.response?.data

||

error.message

);



setError(
"Failed to load service."
);



setService(null);



}

finally{


setLoading(false);


}



};











// =====================================
// IMAGE URL
// =====================================


const getImageUrl = (
image?:string
)=>{


if(!image){

return "/images/default-service.png";

}




if(
image.startsWith("http")
){

return image;

}





const API_URL =

process.env.NEXT_PUBLIC_IMAGE_URL

||

"http://localhost:5000";





return (

`${API_URL.replace(/\/$/,"")}/${

image.replace(/^\/+/,"")

}`

);



};













// =====================================
// LOADING
// =====================================


if(loading){


return (

<div className="
flex
justify-center
py-20
">


<p className="
text-lg
text-slate-500
">

Loading Service...

</p>


</div>

);


}









// =====================================
// ERROR
// =====================================


if(error || !service){


return (

<div className="
flex
justify-center
py-20
">


<p className="
text-lg
text-red-500
">

{
error ||
"Service Not Found"
}

</p>


</div>


);


}









return (

<div className="space-y-6">







{/* HEADER */}



<div className="
flex
items-center
justify-between
">





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
bg-white
px-5
py-3
text-slate-700
shadow-sm
hover:bg-slate-50
"


>


<ArrowLeft size={18}/>


Back


</button>







<button


onClick={()=>


router.push(
`/dashboard/services/${id}/edit`
)


}


className="
flex
items-center
gap-2
rounded-xl
bg-blue-600
px-5
py-3
text-white
hover:bg-blue-700
"


>


<Pencil size={18}/>


Edit


</button>






</div>














{/* SERVICE CARD */}



<div className="
rounded-2xl
border
bg-white
p-8
shadow-sm
">







{/* IMAGE */}


<div className="
mb-8
overflow-hidden
rounded-2xl
">


<img


src={
getImageUrl(
service.image
)
}


alt={
service.name
}


className="
h-80
w-full
object-cover
"


/>


</div>









<h1 className="
text-4xl
font-bold
text-slate-800
">


{
service.name
}


</h1>









{/* DETAILS */}


<div className="
mt-8
grid
gap-6
md:grid-cols-2
">







<div>

<h3 className="
font-semibold
text-slate-700
">

Category

</h3>


<p className="
mt-1
text-slate-600
">

{
service.categoryName ||
"-"
}

</p>


</div>








<div>

<h3 className="
font-semibold
text-slate-700
">

Category ID

</h3>


<p className="
mt-1
text-slate-600
">

{
service.categoryId ||
"-"
}

</p>


</div>









<div>

<h3 className="
font-semibold
text-slate-700
">

Duration

</h3>


<p className="
mt-1
text-slate-600
">

{
service.duration ||
"-"
}

</p>


</div>









<div>

<h3 className="
font-semibold
text-slate-700
">

Status

</h3>


<p className="
mt-1
text-slate-600
">

{
service.status ||
"-"
}

</p>


</div>









<div>

<h3 className="
font-semibold
text-slate-700
">

Slug

</h3>


<p className="
mt-1
text-slate-600
">

{
service.slug ||
"-"
}

</p>


</div>







<div>

<h3 className="
font-semibold
text-slate-700
">

Created At

</h3>


<p className="
mt-1
text-slate-600
">

{

service.created_at

?

new Date(
service.created_at
)
.toLocaleString()

:

"-"

}


</p>


</div>






</div>









{/* SHORT DESCRIPTION */}


<div className="
mt-10
">


<h3 className="
mb-3
font-semibold
text-slate-700
">

Short Description

</h3>


<p className="
leading-7
text-slate-600
">

{
service.shortDescription
||
"No short description available."
}

</p>


</div>









{/* DESCRIPTION */}


<div className="
mt-8
">


<h3 className="
mb-3
font-semibold
text-slate-700
">

Description

</h3>


<p className="
leading-8
text-slate-600
">


{
service.description
||
"No description available."
}


</p>


</div>







</div>






</div>

);

}