"use client";

import { useState } from "react";

import {
  serviceCategories
} from "@/app/data/serviceCategories";

import {
  teamDesignations
} from "@/app/data/teamDesignations";



export default function AppointmentForm(){


const [formData,setFormData] = useState({

patient:"",

phone:"",

email:"",

doctor:"",

treatment:"",

date:"",

time:"",

notes:""

});




const handleChange = (
e:React.ChangeEvent<
HTMLInputElement |
HTMLTextAreaElement |
HTMLSelectElement
>
)=>{


setFormData({

...formData,

[e.target.name]:e.target.value

});


};





const handleSubmit = (
e:React.FormEvent
)=>{


e.preventDefault();


console.log(formData);


// API later


};






return (

<form

onSubmit={handleSubmit}

className="
bg-white
rounded-2xl
border
shadow-sm
p-6
space-y-6
"

>


{/* Patient Information */}


<div>

<h2 className="
text-xl
font-semibold
">

Patient Information

</h2>


<p className="
text-sm
text-gray-500
">

Enter patient appointment details

</p>


</div>






<div className="
grid
md:grid-cols-2
gap-5
">



<input

name="patient"

value={formData.patient}

onChange={handleChange}

placeholder="Patient Name"

className="
border
rounded-xl
px-4
py-3
"

/>





<input

name="phone"

value={formData.phone}

onChange={handleChange}

placeholder="Phone Number"

className="
border
rounded-xl
px-4
py-3
"

/>






<input

name="email"

value={formData.email}

onChange={handleChange}

placeholder="Email Address"

className="
border
rounded-xl
px-4
py-3
"

/>








{/* Doctor Dynamic */}


<select

name="doctor"

value={formData.doctor}

onChange={handleChange}

className="
border
rounded-xl
px-4
py-3
"

>


<option value="">

Select Doctor

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










{/* Appointment Details */}


<div>


<h2 className="
text-xl
font-semibold
">

Appointment Details

</h2>


</div>





<div className="
grid
md:grid-cols-2
gap-5
">



<input

type="date"

name="date"

value={formData.date}

onChange={handleChange}

className="
border
rounded-xl
px-4
py-3
"

/>






<input

type="time"

name="time"

value={formData.time}

onChange={handleChange}

className="
border
rounded-xl
px-4
py-3
"

/>



</div>










{/* Treatment Dynamic */}



<select

name="treatment"

value={formData.treatment}

onChange={handleChange}

className="
w-full
border
rounded-xl
px-4
py-3
"

>


<option value="">

Select Treatment

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










<textarea

name="notes"

value={formData.notes}

onChange={handleChange}

rows={4}

placeholder="Additional notes..."

className="
w-full
border
rounded-xl
px-4
py-3
outline-none
"

/>








<button

type="submit"

className="
bg-blue-600
text-white
px-8
py-3
rounded-xl
font-semibold
hover:bg-blue-700
transition
"

>

Create Appointment

</button>





</form>


)

}