"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Edit,
  Trash2,
} from "lucide-react";

import { Team } from "@/app/types/team";


type TeamRowProps = {

  member: Team;

  onDelete: (
    member: Team
  ) => void;

};



export default function TeamRow({

  member,

  onDelete,

}: TeamRowProps) {



return (

<tr className="
border-t
border-slate-200
hover:bg-slate-50
">





{/* TEAM MEMBER */}

<td className="
px-5
py-4
">


<div className="
flex
items-center
gap-4
">


<div className="
relative
h-14
w-14
overflow-hidden
rounded-xl
border
bg-slate-100
">


{
member.image ? (

<Image
  src={member.image}
  alt={member.name}
  fill
  sizes="56px"
  className="object-cover"
/>

)

:

(
<div
className="
flex
h-full
w-full
items-center
justify-center
text-xs
text-slate-500
"
>
N/A
</div>
)

}



</div>





<div>


<h3 className="
font-semibold
text-slate-900
">

{member.name}

</h3>





{
member.email && (

<p className="
text-sm
text-slate-500
">

{member.email}

</p>

)
}





{
member.phone && (

<p className="
text-sm
text-slate-500
">

{member.phone}

</p>

)
}




</div>


</div>


</td>








{/* DESIGNATION */}

<td className="
px-5
py-4
">


<span>

{

member.designation ??

"Not Assigned"

}

</span>


</td>









{/* SPECIALIZATION */}

<td className="
px-5
py-4
">


{

member.specialization ||

"-"

}


</td>








{/* EXPERIENCE */}

<td className="
px-5
py-4
">


{

member.experience ||

"-"

}


</td>









{/* STATUS */}

<td className="
px-5
py-4
">


<span

className={`

rounded-full

px-3

py-1

text-xs

font-medium


${

member.status === "Active"

?

"bg-green-100 text-green-700"

:

"bg-red-100 text-red-700"

}

`}

>

{member.status}


</span>


</td>









{/* ACTION */}

<td className="
px-5
py-4
">


<div className="
flex
items-center
gap-2
">


<Link

href={`/dashboard/team/edit/${member.id}`}

className="
rounded-lg
border
p-2
text-blue-600
transition
hover:bg-blue-50
"

title="Edit"

>

<Edit size={18}/>


</Link>







<button

type="button"

onClick={() =>
onDelete(member)
}

className="
rounded-lg
border
p-2
text-red-600
transition
hover:bg-red-50
"

title="Delete"

>


<Trash2 size={18}/>


</button>




</div>


</td>





</tr>


);

}