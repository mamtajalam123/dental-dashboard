"use client";

import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";


import {
  teamDesignations as initialDesignations
} from "@/app/data/teamDesignations";


import AddDesignationModal from "./AddDesignationModal";
import EditDesignationModal from "./EditDesignationModal";
import DeleteDesignationModal from "./DeleteDesignationModal";



export default function DesignationTable(){



const [designations,setDesignations] =
useState(initialDesignations);



const [openAdd,setOpenAdd] =
useState(false);



const [editDesignation,setEditDesignation] =
useState<any>(null);



const [deleteDesignation,setDeleteDesignation] =
useState<any>(null);







// ADD

const addDesignation=(name:string)=>{


setDesignations((prev)=>[

...prev,

{

id:Date.now(),

name,

type:"designation",

status:"Active"

}

]);



setOpenAdd(false);


};







// UPDATE


const updateDesignation=(

id:number,

name:string

)=>{


setDesignations((prev)=>

prev.map((item)=>

item.id===id

?

{

...item,

name

}

:

item


)

);



setEditDesignation(null);


};







// DELETE


const confirmDelete=()=>{


if(!deleteDesignation)

return;



setDesignations((prev)=>

prev.filter(

(item)=>

item.id !== deleteDesignation.id

)

);



setDeleteDesignation(null);


};








return (


<div

className="
rounded-2xl
border
bg-white
p-6
"

>





{/* Header */}



<div

className="
mb-6
flex
items-center
justify-between
"

>



<div>


<h2

className="
text-xl
font-bold
text-slate-800
"

>

Team Designations

</h2>



<p

className="
text-sm
text-slate-500
"

>

Manage team roles and positions.

</p>


</div>







<button

onClick={()=>setOpenAdd(true)}

className="
flex
items-center
gap-2
rounded-xl
bg-blue-600
px-4
py-2
text-white
hover:bg-blue-700
"

>


<Plus size={18}/>

Add Designation


</button>



</div>









{/* Table */}



<div

className="
overflow-hidden
rounded-xl
border
"

>


<table className="w-full">



<thead

className="
bg-slate-100
"

>


<tr>


<th className="
px-5
py-3
text-left
">

Designation

</th>



<th className="
px-5
py-3
text-center
">

Status

</th>



<th className="
px-5
py-3
text-center
">

Action

</th>



</tr>


</thead>








<tbody>



{

designations.map((item)=>(



<tr

key={item.id}

className="
border-t
"

>



<td className="
px-5
py-4
font-medium
"

>

{item.name}

</td>








<td className="
px-5
py-4
text-center
"

>


<span

className="
rounded-full
bg-green-100
px-3
py-1
text-sm
text-green-700
"

>

{item.status}

</span>


</td>








<td

className="
px-5
py-4
"

>


<div

className="
flex
justify-center
gap-2
"

>



<button

onClick={()=>setEditDesignation(item)}

className="
rounded-lg
p-2
text-blue-600
hover:bg-blue-50
"

>

<Pencil size={18}/>

</button>








<button

onClick={()=>setDeleteDesignation(item)}

className="
rounded-lg
p-2
text-red-600
hover:bg-red-50
"

>


<Trash2 size={18}/>


</button>





</div>


</td>




</tr>



))


}



</tbody>



</table>



</div>








<AddDesignationModal

open={openAdd}

onClose={()=>setOpenAdd(false)}

onAdd={addDesignation}

/>







<EditDesignationModal

open={!!editDesignation}

designation={editDesignation}

onClose={()=>setEditDesignation(null)}

onUpdate={updateDesignation}

/>








<DeleteDesignationModal

open={!!deleteDesignation}

designation={deleteDesignation}

onClose={()=>setDeleteDesignation(null)}

onConfirm={confirmDelete}

/>






</div>



);



}