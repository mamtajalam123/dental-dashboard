"use client";


import {
  useRouter,
} from "next/navigation";


import {
  ArrowLeft,
} from "lucide-react";


import Link from "next/link";


import FeedbackForm, {
  FeedbackFormData,
} from "@/app/components/feedback/FeedbackForm";


import {
  feedbackAPI,
} from "@/app/services/feedback.api";





export default function AddFeedbackPage(){



const router =
  useRouter();





// ==================================================
// SUBMIT
// ==================================================


const handleSubmit =
async(
  data:FeedbackFormData
)=>{


try{


console.log(
  "========== CREATE FEEDBACK =========="
);





// ================================================
// CREATE FORMDATA
// ================================================


const formData =
new FormData();





formData.append(
  "patientName",
  data.patientName
);




formData.append(
  "treatment",
  data.treatment
);




formData.append(
  "rating",
  String(data.rating)
);




formData.append(
  "review",
  data.review
);




formData.append(
  "status",
  data.status
);




formData.append(
  "date",
  data.date
);






// ================================================
// IMAGE
// IMPORTANT
//
// Backend:
// uploadFeedback.single("patientImage")
//
// So field name MUST be:
// patientImage
// ================================================


if(
  data.patientImage
){


  
formData.append(
  "patientImage",
  data.patientImage
);


}







// DEBUG FORM DATA


console.log(
  "========== FORM DATA =========="
);


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







// ================================================
// API CALL
// ================================================


await feedbackAPI.create(
  formData
);






console.log(
  "Feedback created successfully"
);





router.push(
  "/dashboard/feedback"
);




}
catch(error){


console.error(
  "CREATE FEEDBACK ERROR:",
  error
);


throw error;


}



};








return (

<div className="
space-y-6
">





{/* HEADER */}

<div className="
flex
items-center
gap-4
">


<Link

href="/dashboard/feedback"

className="
flex
items-center
gap-2
rounded-xl
border
px-4
py-2
text-sm
hover:bg-slate-100
"

>

<ArrowLeft size={18}/>

Back

</Link>




<div>

<h1 className="
text-3xl
font-bold
text-slate-900
">

Add Feedback

</h1>


<p className="
text-slate-500
mt-1
">

Create patient testimonial.

</p>


</div>



</div>







{/* FORM */}


<div className="
rounded-2xl
bg-white
p-6
shadow
">


<FeedbackForm

onSubmit={
  handleSubmit
}

submitLabel="
Create Feedback
"

/>


</div>





</div>


);



}