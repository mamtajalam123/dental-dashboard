import AppointmentStatus from "@/app/components/appointments/AppointmentStatus";
import Link from "next/link";



export default async function AppointmentDetailsPage({

params,

}:{

params:{
id:string
}

}){


const appointment = {


id:params.id,

patient:"Rahul Sharma",

phone:"9876543210",

email:"rahul@gmail.com",

doctor:"Dr. Sultan",

date:"10 July 2026",

time:"10:30 AM",

reason:"Root Canal Treatment",

notes:
"Patient complained about tooth pain. X-ray required before treatment.",

status:"Confirmed"


};




return (

<div className="space-y-6">



{/* Header */}

<div className="
flex
justify-between
items-center
">


<div>

<h1 className="
text-3xl
font-bold
">

Appointment Details

</h1>


<p className="
text-gray-500
">

Appointment ID: #{appointment.id}

</p>


</div>




<div className="
flex
gap-3
">


<Link

href={`/appointments/${appointment.id}/edit`}

className="
px-5
py-3
rounded-xl
bg-blue-600
text-white
font-semibold
hover:bg-blue-700
"

>

Edit

</Link>




<button

className="
px-5
py-3
rounded-xl
bg-red-600
text-white
font-semibold
hover:bg-red-700
"

>

Delete

</button>



</div>



</div>






{/* Main Grid */}

<div className="
grid
lg:grid-cols-3
gap-6
">





{/* Patient Card */}

<div className="
lg:col-span-2
bg-white
border
rounded-2xl
shadow-sm
p-6
">


<h2 className="
text-xl
font-semibold
mb-5
">

Patient Information

</h2>



<div className="
grid
md:grid-cols-2
gap-5
">


<div>

<p className="
text-sm
text-gray-500
">

Name

</p>

<p className="
font-medium
">

{appointment.patient}

</p>

</div>





<div>

<p className="
text-sm
text-gray-500
">

Phone

</p>

<p className="
font-medium
">

{appointment.phone}

</p>

</div>





<div>

<p className="
text-sm
text-gray-500
">

Email

</p>

<p className="
font-medium
">

{appointment.email}

</p>

</div>




<div>

<p className="
text-sm
text-gray-500
">

Doctor

</p>

<p className="
font-medium
">

{appointment.doctor}

</p>

</div>



</div>



</div>







{/* Status Card */}

<div className="
bg-white
border
rounded-2xl
shadow-sm
p-6
">


<h2 className="
text-xl
font-semibold
mb-5
">

Status

</h2>



<AppointmentStatus

status={appointment.status as any}

/>


</div>






</div>







{/* Appointment Information */}

<div className="
bg-white
border
rounded-2xl
shadow-sm
p-6
">


<h2 className="
text-xl
font-semibold
mb-5
">

Appointment Information

</h2>



<div className="
grid
md:grid-cols-3
gap-5
">



<div>

<p className="
text-sm
text-gray-500
">

Date

</p>

<p className="font-medium">

{appointment.date}

</p>

</div>




<div>

<p className="
text-sm
text-gray-500
">

Time

</p>

<p className="font-medium">

{appointment.time}

</p>

</div>




<div>

<p className="
text-sm
text-gray-500
">

Treatment

</p>

<p className="font-medium">

{appointment.reason}

</p>

</div>



</div>



</div>








{/* Notes */}

<div className="
bg-white
border
rounded-2xl
shadow-sm
p-6
">


<h2 className="
text-xl
font-semibold
mb-3
">

Doctor Notes

</h2>


<p className="
text-gray-600
leading-relaxed
">

{appointment.notes}

</p>



</div>




</div>

)

}