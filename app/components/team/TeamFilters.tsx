"use client";


import Link from "next/link";

import {
  Search,
  Plus,
} from "lucide-react";


import {
  teamDesignations
} from "@/app/data/teamDesignations";





type TeamFiltersProps = {

  search:string;

  designation:string;

  status:string;


  onSearchChange:(
    value:string
  )=>void;


  onDesignationChange:(
    value:string
  )=>void;


  onStatusChange:(
    value:string
  )=>void;

};







export default function TeamFilters({

  search,

  designation,

  status,

  onSearchChange,

  onDesignationChange,

  onStatusChange,

}:TeamFiltersProps){



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
flex
flex-col
gap-4
lg:flex-row
lg:items-center
lg:justify-between
">





{/* Filters */}


<div className="
grid
flex-1
gap-4
md:grid-cols-3
">







{/* Search */}



<div className="
relative
">


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


onChange={(e)=>

onSearchChange(
e.target.value
)

}


placeholder="
Search team member...
"


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
"


/>


</div>









{/* Designation */}




<select


value={designation}


onChange={(e)=>

onDesignationChange(
e.target.value
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
"


>


<option value="">

All Designations

</option>




{

teamDesignations

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
bg-white
px-4
py-3
outline-none
focus:border-blue-600
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





</div>









{/* Add Button */}



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