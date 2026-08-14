"use client";


import {
  useRouter,
} from "next/navigation";


import TeamForm from "@/app/components/team/TeamForm";


import {
  teamAPI,
} from "@/app/services/team.api";





export default function AddTeamPage(){



const router =
useRouter();






// =====================================
// CREATE TEAM
// =====================================


const handleCreate =
async(
  formData:FormData
)=>{


try{



console.log(
"========== CREATE TEAM =========="
);




// DEBUG

for(
const [
key,
value
]
of formData.entries()
){


console.log(
key,
value
);


}






const response =
await teamAPI.create(
formData
);





console.log(
"CREATE TEAM RESPONSE:",
response
);






// if API returns full response

if(
response?.success === false
){

throw new Error(
response.message ||
"Team creation failed"
);

}





alert(
"Team member created successfully"
);





router.push(
"/dashboard/team"
);





}
catch(error:any){



console.error(
"CREATE TEAM ERROR:",
error
);



alert(
error.message ||
"Failed to create team member"
);



}



};







return (

<div
className="
space-y-6
"
>


<div>

<h1
className="
text-3xl
font-bold
text-slate-900
"
>

Add Team Member

</h1>


<p
className="
mt-2
text-slate-500
"
>

Create new doctor or staff member.

</p>


</div>





<div
className="
rounded-2xl
bg-white
p-6
shadow
"
>


<TeamForm

onSubmit={
handleCreate
}

submitLabel="
Create Team Member
"

/>


</div>



</div>


);


}