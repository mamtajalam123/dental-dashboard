"use client";


import {
  useEffect,
  useMemo,
  useState,
} from "react";


import {
  SearchX,
} from "lucide-react";


import ServiceFilters from "./ServiceFilters";

import ServiceRow from "./ServiceRow";

import DeleteServiceModal from "./DeleteServiceModal";


import {
  serviceAPI
} from "@/app/services/service.api";


import {
  categoryAPI
} from "@/app/services/category.api";


import {
  Service
} from "@/app/types/service";


import {
  Category
} from "@/app/types/category";





interface Props {

  services?: Service[];

  loading:boolean;

  refresh:()=>void;

}





export default function ServiceTable({

  services = [],

  loading,

  refresh

}:Props){





const [categories,setCategories] =
useState<Category[]>([]);



const [search,setSearch] =
useState("");



const [categoryId,setCategoryId] =
useState(0);



const [status,setStatus] =
useState("All");



const [selectedService,setSelectedService] =
useState<Service|null>(null);



const [showDelete,setShowDelete] =
useState(false);









// =====================================
// LOAD CATEGORIES
// =====================================


useEffect(()=>{


const loadCategories = async()=>{


try{


const response =
await categoryAPI.getAll();



console.log(
"CATEGORY RESPONSE:",
response
);




const data =

Array.isArray(response)

?

response

:

response?.data

|| [];





setCategories(

data.filter(

(item:Category)=>

item.status==="Active"

)

);



}

catch(error){


console.error(

"CATEGORY LOAD ERROR:",
error

);


setCategories([]);


}


};



loadCategories();



},[]);











// =====================================
// FILTER
// =====================================


const filteredServices =

useMemo(()=>{


return (services || []).filter(

(service)=>{



const searchMatch =

service.name

?.toLowerCase()

.includes(

search.toLowerCase()

);





const categoryMatch =

categoryId===0

||

Number(service.categoryId)

===

Number(categoryId);





const statusMatch =

status==="All"

||

service.status===status;





return (

searchMatch &&

categoryMatch &&

statusMatch

);


}

);


},[

services,

search,

categoryId,

status

]);









// =====================================
// DELETE OPEN
// =====================================


const handleDeleteClick =

(service:Service)=>{


setSelectedService(service);


setShowDelete(true);


};









// =====================================
// DELETE SERVICE
// =====================================


const handleDelete = async()=>{


if(!selectedService?.id)

return;



try{


await serviceAPI.delete(

selectedService.id

);



refresh();



setShowDelete(false);



setSelectedService(null);



alert(
"Service deleted successfully"
);



}

catch(error){


console.error(

"DELETE SERVICE ERROR:",
error

);



alert(
"Delete failed"
);



}



};









// =====================================
// RESET FILTER
// =====================================


const handleReset = ()=>{


setSearch("");

setCategoryId(0);

setStatus("All");


};









if(loading){


return (

<div

className="

rounded-2xl

border

bg-white

p-10

text-center

"

>

Loading services...

</div>

);


}









return (

<div className="space-y-6">





<ServiceFilters


search={search}


categoryId={categoryId}


status={status}


categories={categories}


onSearchChange={setSearch}


onCategoryChange={setCategoryId}


onStatusChange={setStatus}


onReset={handleReset}


/>









<div

className="

overflow-hidden

rounded-2xl

border

border-slate-200

bg-white

shadow-sm

"

>


<div className="overflow-x-auto">


<table className="min-w-full">


<thead className="bg-slate-50">


<tr>


<th className="px-5 py-4 text-left">

Service

</th>



<th className="px-5 py-4 text-left">

Category

</th>



<th className="px-5 py-4 text-left">

Duration

</th>



<th className="px-5 py-4 text-left">

Status

</th>



<th className="px-5 py-4 text-left">

Action

</th>


</tr>


</thead>






<tbody>



{
filteredServices.length===0

?

<tr>


<td

colSpan={5}

className="py-16"

>


<div

className="

flex

flex-col

items-center

gap-3

"

>


<SearchX

size={48}

/>



<h3 className="text-lg font-semibold">

No Services Found

</h3>



<p className="text-slate-500">

Try changing the search or filters.

</p>



</div>


</td>


</tr>



:


filteredServices.map(

(service)=>(


<ServiceRow


key={service.id}


service={service}


onDelete={handleDeleteClick}


/>


)

)

}



</tbody>



</table>


</div>


</div>









<DeleteServiceModal


open={showDelete}


service={selectedService}


onClose={()=>{


setShowDelete(false);


setSelectedService(null);


}}


onConfirm={handleDelete}


/>





</div>


);


}