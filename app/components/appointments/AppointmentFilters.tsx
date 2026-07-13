"use client";

import { Search, RotateCcw } from "lucide-react";

import {
  serviceCategories
} from "@/data/serviceCategories";

import {
  teamDesignations
} from "@/app/data/teamDesignations";


type Props = {
  search: string;
  setSearch: (value: string) => void;

  treatment: string;
  setTreatment: (value: string) => void;

  doctor: string;
  setDoctor: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  payment: string;
  setPayment: (value: string) => void;

  date: string;
  setDate: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;

  onClear: () => void;
};



export default function AppointmentFilters({

  search,

  setSearch,

  treatment,

  setTreatment,

  doctor,

  setDoctor,

  status,

  setStatus,

  payment,

  setPayment,

  date,

  setDate,

  sort,

  setSort,

  onClear,

}: Props) {


return (

<div className="
rounded-2xl
border
border-slate-200
bg-white
p-6
shadow-sm
">


<div className="
grid
gap-5
md:grid-cols-2
xl:grid-cols-4
">



{/* Search */}


<div>


<label className="
mb-2
block
text-sm
font-semibold
text-slate-700
">

Search Patient

</label>



<div className="relative">


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

placeholder="Patient name..."

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

className="
h-11
w-full
rounded-xl
border
border-slate-300
pl-10
pr-4
outline-none
focus:border-blue-500
"

/>



</div>


</div>









{/* Treatment */}


<div>


<label className="
mb-2
block
text-sm
font-semibold
text-slate-700
">

Treatment

</label>



<select

value={treatment}

onChange={(e)=>
setTreatment(e.target.value)
}

className="
h-11
w-full
rounded-xl
border
border-slate-300
px-4
outline-none
focus:border-blue-500
"

>


<option value="">

All Treatments

</option>



{

serviceCategories

.filter(
(item)=>item.status==="Active"
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


</div>









{/* Doctor */}


<div>


<label className="
mb-2
block
text-sm
font-semibold
text-slate-700
">

Doctor

</label>



<select

value={doctor}

onChange={(e)=>
setDoctor(e.target.value)
}

className="
h-11
w-full
rounded-xl
border
border-slate-300
px-4
outline-none
focus:border-blue-500
"

>


<option value="">

All Doctors

</option>



{

teamDesignations

.filter(
(item)=>item.status==="Active"
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


</div>









{/* Date */}


<div>


<label className="
mb-2
block
text-sm
font-semibold
text-slate-700
">

Appointment Date

</label>



<input

type="date"

value={date}

onChange={(e)=>
setDate(e.target.value)
}

className="
h-11
w-full
rounded-xl
border
border-slate-300
px-4
outline-none
focus:border-blue-500
"

/>


</div>









{/* Status */}


<div>


<label className="
mb-2
block
text-sm
font-semibold
text-slate-700
">

Status

</label>



<select

value={status}

onChange={(e)=>
setStatus(e.target.value)
}

className="
h-11
w-full
rounded-xl
border
border-slate-300
px-4
outline-none
focus:border-blue-500
"

>


<option value="">

All Status

</option>


<option>
Pending
</option>

<option>
Confirmed
</option>

<option>
Completed
</option>

<option>
Cancelled
</option>

<option>
Rejected
</option>

<option>
No Show
</option>


</select>


</div>









{/* Payment */}


<div>


<label className="
mb-2
block
text-sm
font-semibold
text-slate-700
">

Payment

</label>



<select

value={payment}

onChange={(e)=>
setPayment(e.target.value)
}

className="
h-11
w-full
rounded-xl
border
border-slate-300
px-4
outline-none
focus:border-blue-500
"

>


<option value="">

All Payments

</option>


<option>
Pending
</option>

<option>
Paid
</option>

<option>
Partially Paid
</option>

<option>
Refunded
</option>


</select>


</div>









{/* Sort */}


<div>


<label className="
mb-2
block
text-sm
font-semibold
text-slate-700
">

Sort

</label>



<select

value={sort}

onChange={(e)=>
setSort(e.target.value)
}

className="
h-11
w-full
rounded-xl
border
border-slate-300
px-4
outline-none
focus:border-blue-500
"

>


<option value="newest">

Newest First

</option>


<option value="oldest">

Oldest First

</option>


</select>


</div>









{/* Clear */}


<div className="
flex
items-end
">


<button

type="button"

onClick={onClear}

className="
flex
h-11
w-full
items-center
justify-center
gap-2
rounded-xl
border
border-slate-300
font-medium
hover:bg-slate-100
"

>


<RotateCcw size={18}/>

Clear Filters


</button>


</div>





</div>


</div>


);


}