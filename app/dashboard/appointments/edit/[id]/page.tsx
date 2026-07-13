"use client";


import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";


import AppointmentForm from "@/app/components/appointments/AppointmentForm";

import {
  appointmentData
} from "@/data/appointment";


import {
  Appointment
} from "@/types/appointment";




export default function EditAppointmentPage(){



const router = useRouter();


const params = useParams();


const id =
Number(params.id);




const [appointment,setAppointment] =
useState<Appointment | null>(null);





useEffect(()=>{


const data =
appointmentData.find(
(item)=>
item.id === id
);



if(data){

setAppointment(data);

}



},[id]);







const handleSubmit = (
data:any
)=>{


if(!appointment)
return;



const index =
appointmentData.findIndex(
(item)=>
item.id === id
);





appointmentData[index] = {


...appointment,


patientName:
data.patient,


phone:
data.phone,


email:
data.email,


doctor:
data.doctor,


treatment:
data.reason,


date:
data.date,


time:
data.time,


notes:
data.notes,


};





alert(
"Appointment Updated Successfully"
);



router.push(
"/dashboard/appointments"
);



};







if(!appointment){


return (

<div className="
rounded-xl
bg-white
p-6
">

Loading appointment...


</div>

);


}








const initialData = {


patient:
appointment.patientName,


phone:
appointment.phone,


email:
appointment.email,


doctor:
appointment.doctor,


date:
appointment.date,


time:
appointment.time,


reason:
appointment.treatment,


notes:
appointment.notes || "",


};








return (

<div className="
space-y-6
">


<div>


<h1 className="
text-3xl
font-bold
text-slate-800
">

Edit Appointment

</h1>


<p className="
mt-2
text-slate-500
">

Update patient appointment details.

</p>


</div>






<AppointmentForm


initialData={initialData as any}


onSubmit={
handleSubmit
}


submitLabel="
Update Appointment
"


/>





</div>


);


}