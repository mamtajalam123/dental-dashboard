"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  SearchX,
} from "lucide-react";


import TeamFilters from "./TeamFilters";
import TeamRow from "./TeamRow";
import TeamDeleteModal from "./TeamDeleteModal";


import {
  teamAPI,
} from "@/app/services/team.api";


import {
  designationAPI,
} from "@/app/services/designation.api";


import {
  Team,
} from "@/app/types/team";


import {
  Designation,
} from "@/app/types/designation";





export default function TeamTable(){


const [members,setMembers] =
useState<Team[]>([]);



const [designations,setDesignations] =
useState<Designation[]>([]);



const [loading,setLoading] =
useState(true);



const [loadingDesignations,setLoadingDesignations] =
useState(true);




const [search,setSearch] =
useState("");



const [designationId,setDesignationId] =
useState(0);



const [status,setStatus] =
useState<
"All" | "Active" | "Inactive"
>("All");




const [selectedMember,setSelectedMember] =
useState<Team | null>(null);



const [showDelete,setShowDelete] =
useState(false);







// =================================
// IMAGE URL
// =================================


const getImageUrl = (
image?:string|null
)=>{


if(!image)
return null;



if(
image.startsWith("http")
)
{
return image;
}



const SERVER_URL =
process.env.NEXT_PUBLIC_IMAGE_URL ||
"http://localhost:5000";



let path =
image.replace(/^\/+/,"");



if(
path.startsWith("team/")
)
{

path =
`uploads/${path}`;

}


if(
!path.startsWith("uploads/")
)
{

path =
`uploads/${path}`;

}



return `${SERVER_URL}/${path}`;


};









// =================================
// LOAD TEAM
// =================================


useEffect(()=>{

loadMembers();

},[]);





const loadMembers =
async()=>{


try{


setLoading(true);



const response =
await teamAPI.getAll();



console.log(
"TEAM API RESPONSE",
response
);



const data =

Array.isArray(response)

?

response

:

response?.data ?? [];





const formatted =
data.map(
(item:any)=>({


id:item.id,


name:item.name ?? "",



designationId:
Number(
item.designation_id ??
item.designationId ??
0
),



designation:
item.designation ??
item.designation_name ??
"Not Assigned",



specialization:
item.specialization ?? "",



experience:
item.experience ?? "",



email:
item.email ?? "",



phone:
item.phone ?? "",



bio:
item.bio ?? "",



image:
getImageUrl(
item.image
),



status:
item.status ?? "Active"



})
);





setMembers(
formatted
);



}
catch(error){


console.error(
"TEAM LOAD ERROR",
error
);


setMembers([]);

}
finally{


setLoading(false);


}


};









// =================================
// LOAD DESIGNATIONS
// =================================


useEffect(()=>{


loadDesignations();


},[]);





const loadDesignations =
async()=>{


try{


setLoadingDesignations(true);



const response =
await designationAPI.getAll();




const data =

Array.isArray(response)

?

response

:

response?.data ?? [];





setDesignations(

data.filter(
(item:Designation)=>
item.status==="Active"
)

);



}
catch(error){


console.error(
"DESIGNATION ERROR",
error
);



setDesignations([]);

}
finally{


setLoadingDesignations(false);


}


};











// =================================
// FILTER
// =================================


const filteredMembers =
useMemo(()=>{


return members.filter(
(member)=>{


const keyword =
search.toLowerCase();




const searchMatch =


member.name
.toLowerCase()
.includes(keyword)



||

(member.email ?? "")
.toLowerCase()
.includes(keyword)



||

(member.phone ?? "")
.includes(search);







const designationMatch =


designationId===0

?

true

:

Number(
member.designationId
)
=== designationId;






const statusMatch =


status==="All"

?

true

:

member.status===status;




return (

searchMatch &&

designationMatch &&

statusMatch

);


}

);


},[
members,
search,
designationId,
status
]);











// =================================
// DELETE
// =================================


const handleDeleteClick =
(member:Team)=>{


setSelectedMember(member);

setShowDelete(true);


};





const handleDelete =
async()=>{


if(!selectedMember?.id)
return;



try{


const response =
await teamAPI.delete(
selectedMember.id
);



if(
response?.success ||
response?.status===200
)
{

await loadMembers();

}



setShowDelete(false);

setSelectedMember(null);


}
catch(error){


console.error(
"DELETE ERROR",
error
);


alert(
"Delete failed"
);


}



};









// =================================
// RESET
// =================================


const handleReset=()=>{

setSearch("");

setDesignationId(0);

setStatus("All");

};









if(
loading ||
loadingDesignations
)
{


return (

<div className="
rounded-2xl
border
bg-white
p-10
text-center
">

Loading Team Members...

</div>

);

}









return (

<div className="space-y-6">





<TeamFilters


search={search}


designationId={designationId}


status={status}


designations={designations}


loading={
loading ||
loadingDesignations
}



onSearchChange={
setSearch
}



onDesignationChange={
setDesignationId
}



onStatusChange={
setStatus
}



onReset={
handleReset
}



/>








<div className="
overflow-hidden
rounded-2xl
border
bg-white
shadow-sm
">


<div className="overflow-x-auto">


<table className="min-w-full">



<thead className="bg-slate-50">


<tr>


<th className="px-5 py-4 text-left">
Team Member
</th>


<th className="px-5 py-4 text-left">
Designation
</th>


<th className="px-5 py-4 text-left">
Specialization
</th>


<th className="px-5 py-4 text-left">
Experience
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

filteredMembers.length===0

?


<tr>

<td
colSpan={6}
className="py-16"
>


<div className="
flex
flex-col
items-center
gap-3
">


<SearchX size={48}/>


<h3 className="font-semibold">

No Team Members Found

</h3>


</div>


</td>

</tr>


:


filteredMembers.map(
(member)=>(


<TeamRow

key={member.id}

member={member}

onDelete={
handleDeleteClick
}


/>


)

)

}


</tbody>



</table>


</div>


</div>







<TeamDeleteModal


open={showDelete}


member={selectedMember}



onClose={()=>{


setShowDelete(false);

setSelectedMember(null);


}}



onConfirm={
handleDelete
}


/>



</div>

);


}