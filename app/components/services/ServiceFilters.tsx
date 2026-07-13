"use client";

import {
  Search,
  RotateCcw,
} from "lucide-react";


import {
  serviceCategories
} from "@/data/serviceCategories";



type ServiceFiltersProps = {

  search: string;

  category: string;

  status: string;


  onSearchChange: (
    value:string
  )=>void;


  onCategoryChange: (
    value:string
  )=>void;


  onStatusChange: (
    value:string
  )=>void;


  onReset:()=>void;

};





export default function ServiceFilters({

  search,

  category,

  status,

  onSearchChange,

  onCategoryChange,

  onStatusChange,

  onReset,

}:ServiceFiltersProps){



return (


<div className="
rounded-2xl
border
border-slate-200
bg-white
p-5
shadow-sm
">


<div className="
grid
gap-4
lg:grid-cols-4
">





{/* Search */}



<div className="
relative
">


<Search

size={18}

className="
absolute
left-3
top-1/2
-translate-y-1/2
text-slate-400
"

/>



<input


type="text"


value={search}


onChange={(e)=>
onSearchChange(
e.target.value
)
}


placeholder="
Search service...
"


className="
w-full
rounded-xl
border
border-slate-300
py-3
pl-10
pr-4
outline-none
focus:border-blue-500
"


/>


</div>








{/* Category */}



<select


value={category}


onChange={(e)=>

onCategoryChange(
e.target.value
)

}


className="
rounded-xl
border
border-slate-300
px-4
py-3
outline-none
focus:border-blue-500
"


>


<option value="">

All Categories

</option>



{

serviceCategories

.filter(
(item)=>
item.status==="Active"
)

.map((item)=>(


<option


key={item.id}


value={item.name}


>

{item.name}


</option>



))

}



</select>









{/* Status */}




<select


value={status}


onChange={(e)=>

onStatusChange(
e.target.value
)

}


className="
rounded-xl
border
border-slate-300
px-4
py-3
outline-none
focus:border-blue-500
"


>


<option value="">

All Status

</option>



<option value="Active">

Active

</option>



<option value="Inactive">

Inactive

</option>



</select>









{/* Reset */}



<button


type="button"


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
"


>


<RotateCcw size={18}/>


Reset Filters


</button>





</div>


</div>



);


}