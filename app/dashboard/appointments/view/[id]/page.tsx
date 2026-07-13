"use client";


import Link from "next/link";
import { useParams } from "next/navigation";


import {
  appointmentData
} from "@/data/appointment";
import AppointmentStatus from "@/app/components/appointments/AppointmentStatus";
import PaymentStatus from "@/app/components/appointments/PaymentStatus";





export default function ViewAppointmentPage(){


const params = useParams();


const id =
Number(params.id);




const appointment =
appointmentData.find(
(item)=>
item.id === id
);





if(!appointment){


return (

<div className="
rounded-2xl
bg-white
border
p-6
text-center
text-slate-500
">

Appointment not found.

</div>

);


}





return (

<div className="
space-y-6
">





{/* Header */}


<div className="
flex
flex-col
justify-between
gap-4
md:flex-row
md:items-center
">


<div>


<h1 className="
text-3xl
font-bold
text-slate-800
">

Appointment Details

</h1>


<p className="
text-slate-500
mt-2
">

View complete appointment information.

</p>


</div>





<div className="
flex
gap-3
">


<Link

href="/dashboard/appointments"

className="
rounded-xl
border
px-5
py-3
hover:bg-slate-100
"

>

Back

</Link>





<Link

href={`/dashboard/appointments/edit/${appointment.id}`}

className="
rounded-xl
bg-blue-600
px-5
py-3
text-white
hover:bg-blue-700
"

>

Edit

</Link>



</div>



</div>









{/* Patient Information */}


<div className="
rounded-2xl
border
bg-white
p-6
shadow-sm
">


<h2 className="
mb-5
text-xl
font-bold
text-slate-800
">

Patient Information

</h2>




<div className="
grid
gap-5
md:grid-cols-2
">



<div>

<p className="
text-sm
text-slate-500
">

Name

</p>


<h3 className="
font-semibold
">

{appointment.patientName}

</h3>


</div>





<div>

<p className="
text-sm
text-slate-500
">

Phone

</p>


<h3 className="
font-semibold
">

{appointment.phone}

</h3>


</div>





<div>

<p className="
text-sm
text-slate-500
">

Email

</p>


<h3 className="
font-semibold
">

{appointment.email}

</h3>


</div>



</div>



</div>









{/* Appointment Information */}



<div className="
rounded-2xl
border
bg-white
p-6
shadow-sm
">



<h2 className="
mb-5
text-xl
font-bold
">

Appointment Information

</h2>





<div className="
grid
gap-5
md:grid-cols-2
">



<div>

<p className="
text-sm
text-slate-500
">

Treatment

</p>


<h3 className="
font-semibold
">

{appointment.treatment}

</h3>


</div>





<div>

<p className="
text-sm
text-slate-500
">

Doctor

</p>


<h3 className="
font-semibold
">

{appointment.doctor}

</h3>


</div>





<div>

<p className="
text-sm
text-slate-500
">

Date

</p>


<h3 className="
font-semibold
">

{appointment.date}

</h3>


</div>





<div>

<p className="
text-sm
text-slate-500
">

Time

</p>


<h3 className="
font-semibold
">

{appointment.time}

</h3>


</div>




</div>


</div>









{/* Status */}


<div className="
rounded-2xl
border
bg-white
p-6
shadow-sm
">


<h2 className="
mb-5
text-xl
font-bold
">

Status Information

</h2>



<div className="
flex
gap-5
items-center
">


<div>


<p className="
mb-2
text-sm
text-slate-500
">

Appointment Status

</p>


<AppointmentStatus

status={
appointment.status
}

/>


</div>






<div>


<p className="
mb-2
text-sm
text-slate-500
">

Payment Status

</p>


<PaymentStatus

status={
appointment.payment
}

/>


</div>



</div>



</div>









{/* Notes */}



<div className="
rounded-2xl
border
bg-white
p-6
shadow-sm
">


<h2 className="
mb-4
text-xl
font-bold
">

Notes

</h2>



<p className="
text-slate-600
">

{
appointment.notes ||
"No notes available"
}

</p>


</div>







</div>

);


}