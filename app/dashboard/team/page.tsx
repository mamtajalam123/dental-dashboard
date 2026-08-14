"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Users,
  UserCheck,
  UserX,
  Stethoscope,
} from "lucide-react";

import TeamTable from "@/app/components/team/TeamTable";

import {
  teamAPI,
} from "@/app/services/team.api";

import {
  Team,
} from "@/app/types/team";





export default function TeamPage(){


const [members,setMembers] =
useState<Team[]>([]);


const [loading,setLoading] =
useState(true);





// =====================================
// LOAD TEAM MEMBERS
// =====================================


const loadTeams = async()=>{

try{


setLoading(true);



const response =
await teamAPI.getAll();



console.log(
"TEAM API RESPONSE:",
response
);





const data =

Array.isArray(response)

?

response

:

response?.data ?? [];





const formattedData =
data.map((item:any)=>({

id:item.id,

name:item.name,

designationId:
item.designation_id ??
item.designationId,


designation:
item.designation ??
"Not Assigned",


specialization:
item.specialization ?? "",


experience:
item.experience ?? "",


email:
item.email ?? "",


phone:
item.phone ?? "",


image:
item.image ?? null,


bio:
item.bio ?? "",


status:
item.status ?? "Active",


}));





setMembers(
formattedData
);



}
catch(error){


console.error(
"TEAM LOAD ERROR:",
error
);


setMembers([]);


}
finally{


setLoading(false);


}


};






useEffect(()=>{


loadTeams();


},[]);








// =====================================
// STATISTICS
// =====================================


const totalMembers =
members.length;



const activeMembers =
members.filter(
(item)=>
item.status==="Active"
).length;



const inactiveMembers =
members.filter(
(item)=>
item.status==="Inactive"
).length;





const doctors =
members.filter(
(item)=>{

const designation =
item.designation?.toLowerCase() || "";


return (

designation.includes("dentist")

||

designation.includes("orthodontist")

||

designation.includes("surgeon")

);

}

).length;








if(loading){


return (

<div className="p-6 text-slate-500">

Loading team members...

</div>

);


}







return (

<div className="space-y-6">





{/* HEADER */}


<div>


<h1 className="text-3xl font-bold text-slate-900">

Team Management

</h1>



<p className="mt-2 text-slate-500">

Manage doctors, assistants,
receptionists and clinic staff.

</p>


</div>









{/* STATISTICS */}


<div className="
grid
gap-5
sm:grid-cols-2
xl:grid-cols-4
">





<StatCard

title="Total Members"

value={totalMembers}

icon={
<Users size={28}/>
}

color="bg-blue-100 text-blue-600"

/>







<StatCard

title="Active"

value={activeMembers}

icon={
<UserCheck size={28}/>
}

color="bg-green-100 text-green-600"

/>







<StatCard

title="Inactive"

value={inactiveMembers}

icon={
<UserX size={28}/>
}

color="bg-red-100 text-red-600"

/>







<StatCard

title="Doctors"

value={doctors}

icon={
<Stethoscope size={28}/>
}

color="bg-violet-100 text-violet-600"

/>






</div>










{/* TABLE */}


<TeamTable

members={members}

refresh={loadTeams}

/>





</div>


);

}









// =====================================
// STAT CARD
// =====================================


function StatCard({

title,

value,

icon,

color,


}:{

title:string;

value:number;

icon:React.ReactNode;

color:string;


}){


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
flex
items-center
justify-between
">


<div>


<p className="text-sm text-slate-500">

{title}

</p>



<h2 className="
mt-2
text-3xl
font-bold
">

{value}

</h2>


</div>





<div className={`
rounded-xl
p-3
${color}
`}>

{icon}

</div>





</div>


</div>

);


}