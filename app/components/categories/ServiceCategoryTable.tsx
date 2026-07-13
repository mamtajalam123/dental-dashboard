"use client";

import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  serviceCategories as initialCategories
} from "@/data/serviceCategories";


import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";



export default function ServiceCategoryTable(){


const [categories,setCategories] =
useState(initialCategories);



const [openAdd,setOpenAdd] =
useState(false);



const [editCategory,setEditCategory] =
useState<any>(null);



const [deleteCategory,setDeleteCategory] =
useState<any>(null);






// ADD

const addCategory=(name:string)=>{


setCategories((prev)=>[

...prev,

{

id:Date.now(),

name,

type:"service",

status:"Active"

}

]);


setOpenAdd(false);


};







// UPDATE

const updateCategory=(

id:number,

name:string

)=>{


setCategories((prev)=>

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



setEditCategory(null);


};







// DELETE


const confirmDelete=()=>{


if(!deleteCategory)
return;



setCategories((prev)=>

prev.filter(

(item)=>

item.id !== deleteCategory.id

)

);



setDeleteCategory(null);


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

Service Categories

</h2>



<p className="
text-sm
text-slate-500
">

Manage service categories

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

Add Category


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



<thead className="bg-slate-100">


<tr>


<th className="
px-5
py-3
text-left
">

Category

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

categories.map((item)=>(


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
">

{item.name}

</td>






<td className="
px-5
py-4
text-center
">


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








<td className="
px-5
py-4
"

>


<div className="
flex
justify-center
gap-2
">


<button

onClick={()=>setEditCategory(item)}

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

onClick={()=>setDeleteCategory(item)}

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









<AddCategoryModal

open={openAdd}

onClose={()=>setOpenAdd(false)}

onAdd={addCategory}

/>






<EditCategoryModal

open={!!editCategory}

category={editCategory}

onClose={()=>setEditCategory(null)}

onUpdate={updateCategory}

/>






<DeleteCategoryModal

open={!!deleteCategory}

category={deleteCategory}

onClose={()=>setDeleteCategory(null)}

onConfirm={confirmDelete}

/>





</div>


);


}