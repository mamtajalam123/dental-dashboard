"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Save,
  Upload,
  X,
} from "lucide-react";

import { serviceCategories } from "@/data/serviceCategories";


export type ServiceFormData = {

  name:string;

  category:string;

  duration:string;

  description:string;

  image:string;

  status:"Active" | "Inactive";

};


type ServiceFormProps = {

  initialData?:ServiceFormData;

  onSubmit:(data:ServiceFormData)=>void;

  submitLabel?:string;

};





const durations = [

  "15 Minutes",
  "30 Minutes",
  "45 Minutes",
  "60 Minutes",
  "90 Minutes",
  "120 Minutes",

];





const defaultData:ServiceFormData = {

  name:"",
  category:"",
  duration:"",
  description:"",
  image:"",
  status:"Active",

};





export default function ServiceForm({

  initialData = defaultData,

  onSubmit,

  submitLabel="Save Service",

}:ServiceFormProps){



const [formData,setFormData] =
useState<ServiceFormData>(initialData);



const [preview,setPreview] =
useState(initialData.image);






const handleChange = (

e:React.ChangeEvent<
HTMLInputElement |
HTMLTextAreaElement |
HTMLSelectElement

>

)=>{


setFormData({

...formData,

[e.target.name]:e.target.value,

});


};







const handleSubmit = (

e:React.FormEvent

)=>{


e.preventDefault();



if(
!formData.name ||
!formData.category ||
!formData.duration
){

alert("Please fill all required fields.");

return;

}



onSubmit(formData);


};







return (


<form
onSubmit={handleSubmit}
className="space-y-6"
>



<div
className="
rounded-2xl
border
border-slate-200
bg-white
p-6
shadow-sm
"
>


<h2
className="
mb-6
text-xl
font-semibold
"
>

Service Information

</h2>




<div
className="
grid
gap-5
md:grid-cols-2
"
>





{/* Service Name */}


<div>


<label className="
mb-2
block
font-medium
">

Service Name *

</label>



<input

type="text"

name="name"

value={formData.name}

onChange={handleChange}

placeholder="Dental Implant"

className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
outline-none
focus:border-blue-600
"

/>


</div>









{/* Category Connected */}


<div>


<label className="
mb-2
block
font-medium
">

Category *

</label>



<select


name="category"


value={formData.category}


onChange={handleChange}


className="
w-full
rounded-xl
border
border-slate-300
bg-white
px-4
py-3
outline-none
focus:border-blue-600
"

>


<option value="">

Select Category

</option>




{

serviceCategories.map((item)=>(


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









{/* Duration */}


<div>


<label className="
mb-2
block
font-medium
">

Duration *

</label>



<select

name="duration"

value={formData.duration}

onChange={handleChange}

className="
w-full
rounded-xl
border
border-slate-300
bg-white
px-4
py-3
outline-none
focus:border-blue-600
"

>


<option value="">

Select Duration

</option>



{

durations.map((item)=>(


<option

key={item}

value={item}

>

{item}

</option>


))


}



</select>


</div>









{/* Status */}


<div>


<label className="
mb-2
block
font-medium
">

Status

</label>



<select

name="status"

value={formData.status}

onChange={handleChange}

className="
w-full
rounded-xl
border
border-slate-300
bg-white
px-4
py-3
outline-none
focus:border-blue-600
"

>


<option value="Active">

Active

</option>


<option value="Inactive">

Inactive

</option>


</select>



</div>



</div>


</div>







{/* Description */}


<div
className="
rounded-2xl
border
border-slate-200
bg-white
p-6
shadow-sm
"
>


<h2 className="
mb-5
text-xl
font-semibold
">

Description

</h2>



<textarea

rows={5}

name="description"

value={formData.description}

onChange={handleChange}

placeholder="Write service description..."

className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
outline-none
focus:border-blue-600
"

/>



</div>







{/* Buttons */}


<div className="
flex
justify-end
gap-3
">


<button

type="submit"

className="
flex
items-center
gap-2
rounded-xl
bg-blue-600
px-6
py-3
font-medium
text-white
hover:bg-blue-700
"

>


<Save size={18}/>

{submitLabel}


</button>



</div>




</form>


);


}