"use client";

import Link from "next/link";
import {
  Search,
  Plus,
  RotateCcw,
} from "lucide-react";

import { Designation } from "@/app/types/designation";


type TeamFiltersProps = {

  search: string;

  designationId: number;

  status: "All" | "Active" | "Inactive";

  designations: Designation[];

  onSearchChange: (
    value:string
  ) => void;


  onDesignationChange: (
    value:number
  ) => void;


  onStatusChange: (
    value:"All" | "Active" | "Inactive"
  ) => void;


  onReset:()=>void;


  loading?:boolean;

};



export default function TeamFilters({

  search,

  designationId,

  status,

  designations,

  onSearchChange,

  onDesignationChange,

  onStatusChange,

  onReset,

  loading=false,

}:TeamFiltersProps){


return (

<div
className="
rounded-2xl
border
border-slate-200
bg-white
p-5
shadow-sm
"
>


<div
className="
flex
flex-col
gap-4
lg:flex-row
lg:items-center
lg:justify-between
"
>



{/* FILTER AREA */}

<div
className="
grid
flex-1
gap-4
md:grid-cols-4
"
>




{/* SEARCH */}

<div
className="relative"
>


<Search

size={18}

className="
absolute
left-4
top-1/2
-translate-y-1/2
text-slate-400
"

/>



<input

type="text"

value={search}

disabled={loading}

onChange={(e)=>
onSearchChange(
e.target.value
)
}

placeholder="Search team member..."

className="
w-full
rounded-xl
border
border-slate-300
py-3
pl-11
pr-4
outline-none
focus:border-blue-600
disabled:bg-slate-100
"

/>


</div>





{/* DESIGNATION FILTER */}


<select


value={designationId}


disabled={loading}


onChange={(e)=>
onDesignationChange(
Number(e.target.value)
)
}


className="
rounded-xl
border
border-slate-300
bg-white
px-4
py-3
outline-none
focus:border-blue-600
disabled:bg-slate-100
"

>


<option value={0}>

All Designations

</option>



{

(designations ?? [])

.filter(
(item)=>
item.status==="Active"
)

.map(
(item)=>(


<option

key={item.id}

value={item.id}

>

{item.name}

</option>


)

)

}



</select>








{/* STATUS FILTER */}


<select


value={status}


disabled={loading}


onChange={(e)=>
onStatusChange(
e.target.value as
"All" |
"Active" |
"Inactive"
)
}


className="
rounded-xl
border
border-slate-300
bg-white
px-4
py-3
outline-none
focus:border-blue-600
disabled:bg-slate-100
"

>


<option value="All">

All Status

</option>



<option value="Active">

Active

</option>



<option value="Inactive">

Inactive

</option>


</select>







{/* RESET */}


<button


type="button"


disabled={loading}


onClick={onReset}


className="
flex
items-center
justify-center
gap-2
rounded-xl
bg-slate-100
px-4
py-3
font-medium
text-slate-700
transition
hover:bg-slate-200
disabled:opacity-50
"


>


<RotateCcw size={18}/>


Reset


</button>



</div>









{/* ADD BUTTON */}


<Link

href="/dashboard/team/add"

className="
inline-flex
items-center
justify-center
gap-2
rounded-xl
bg-blue-600
px-5
py-3
font-medium
text-white
transition
hover:bg-blue-700
"

>


<Plus size={18}/>


Add Team Member


</Link>



</div>


</div>


);


}