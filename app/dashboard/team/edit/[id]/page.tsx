"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  ArrowLeft,
} from "lucide-react";


import TeamForm, {
  TeamFormData,
} from "@/app/components/team/TeamForm";


import {
  teamAPI,
} from "@/app/services/team.api";





export default function EditTeamPage(){


const router = useRouter();


const params = useParams();


const id = Number(
  params.id
);




const [
  loading,
  setLoading
]=useState(true);



const [
  initialData,
  setInitialData
]=useState<TeamFormData | null>(
  null
);






// =====================================
// LOAD TEAM
// =====================================


useEffect(()=>{


if(!isNaN(id)){

  loadTeamMember();

}


},[id]);







const loadTeamMember = async()=>{


try{


setLoading(true);



const response =
await teamAPI.getById(id);



console.log(
"EDIT TEAM RESPONSE",
response
);




// handle API response

const member =
response.data ?? response;



if(!member){

throw new Error(
"Team member not found"
);

}




setInitialData({



id:
member.id,



name:
member.name ?? "",



designationId:
Number(
member.designation_id ??
member.designationId ??
0
),



specialization:
member.specialization ?? "",



experience:
member.experience ?? "",



email:
member.email ?? "",



phone:
member.phone ?? "",



bio:
member.bio ?? "",



image:
member.image ?? null,



status:
member.status ?? "Active",


});





}
catch(error){


console.error(
"LOAD TEAM ERROR",
error
);



alert(
"Team member not found"
);



router.push(
"/dashboard/team"
);



}
finally{


setLoading(false);


}


};










// =====================================
// UPDATE
// =====================================


const handleSubmit = async(

data:FormData

)=>{


try{



console.log(
"UPDATE TEAM DATA"
);


data.forEach(
(value,key)=>{

console.log(
key,
value
);

}

);





const response =
await teamAPI.update(
id,
data
);





console.log(
"UPDATE RESPONSE",
response
);






if(
!response.success
){

throw new Error(
response.message ||
"Update failed"
);

}





alert(
"Team updated successfully"
);



router.push(
"/dashboard/team"
);



}
catch(error:any){


console.error(
"UPDATE TEAM ERROR",
error
);



alert(
error.message ||
"Failed to update team"
);



}



};








if(loading){


return (

<div className="
rounded-xl
border
bg-white
p-10
text-center
">

Loading team member...

</div>

);


}






if(!initialData){


return (

<div className="
rounded-xl
border
bg-white
p-10
">

Team member not found

</div>

);


}








return (

<div className="space-y-6">





{/* HEADER */}

<div className="
flex
items-center
gap-3
">



<Link

href="/dashboard/team"

className="
rounded-lg
border
p-2
hover:bg-slate-100
"

>

<ArrowLeft
size={18}
/>

</Link>





<div>


<h1 className="
text-3xl
font-bold
text-slate-900
">

Edit Team Member

</h1>


<p className="
text-slate-500
">

Update team information

</p>


</div>



</div>







<TeamForm


initialData={
initialData
}



submitLabel="
Update Team Member
"



onSubmit={
handleSubmit
}



/>






</div>

);


}