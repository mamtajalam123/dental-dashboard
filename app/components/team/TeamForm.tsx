"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Save,
  Upload,
  X,
} from "lucide-react";
import { teamDesignations } from "@/app/data/teamDesignations";




export type TeamFormData = {

  name: string;

  designation: string;

  specialization: string;

  experience: string;

  email: string;

  phone: string;

  bio: string;

  image: string;

  status: "Active" | "Inactive";

};



type TeamFormProps = {

  initialData?: TeamFormData;

  submitLabel?: string;

  onSubmit: (data: TeamFormData) => void;

};





const experiences = [

  "1 Year",
  "2 Years",
  "3 Years",
  "5 Years",
  "8 Years",
  "10 Years",
  "12 Years",
  "15+ Years",

];





const defaultData: TeamFormData = {

  name: "",

  designation: "",

  specialization: "",

  experience: "",

  email: "",

  phone: "",

  bio: "",

  image: "",

  status: "Active",

};





export default function TeamForm({

  initialData = defaultData,

  submitLabel = "Save Team Member",

  onSubmit,

}: TeamFormProps) {



const [formData,setFormData] =

useState<TeamFormData>(initialData);



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







const handleImage = (

e:React.ChangeEvent<HTMLInputElement>

)=>{


const file = e.target.files?.[0];


if(!file)
return;



const url = URL.createObjectURL(file);



setPreview(url);



setFormData({

...formData,

image:file.name,

});


};







const handleSubmit = (

e:React.FormEvent

)=>{


e.preventDefault();



if(

!formData.name ||

!formData.designation ||

!formData.email ||

!formData.phone

){


alert(
"Please fill all required fields."
);


return;


}



onSubmit(formData);


};







const handleReset = ()=>{


setFormData(defaultData);


setPreview("");


};







return (


<form

onSubmit={handleSubmit}

className="space-y-6"

>





{/* Information */}



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

Team Member Information

</h2>





<div

className="
grid
gap-5
md:grid-cols-2
"

>





{/* Name */}


<div>


<label className="
mb-2
block
font-medium
">

Full Name *

</label>



<input


type="text"


name="name"


value={formData.name}


onChange={handleChange}


placeholder="Dr. Sultan Ahmed"


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









{/* Designation From Categories */}


<div>


<label className="
mb-2
block
font-medium
">

Designation *

</label>



<select


name="designation"


value={formData.designation}


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

Select Designation

</option>




{

teamDesignations.map((item)=>(


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









{/* Specialization */}


<div>


<label className="
mb-2
block
font-medium
">

Specialization

</label>



<input


type="text"


name="specialization"


value={formData.specialization}


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









{/* Experience */}


<div>


<label className="
mb-2
block
font-medium
">

Experience

</label>




<select


name="experience"


value={formData.experience}


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

Select Experience

</option>



{

experiences.map((item)=>(


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









{/* Email */}


<div>


<label className="
mb-2
block
font-medium
">

Email *

</label>


<input


type="email"


name="email"


value={formData.email}


onChange={handleChange}


placeholder="doctor@gmail.com"


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









{/* Phone */}


<div>


<label className="
mb-2
block
font-medium
">

Phone *

</label>


<input


type="tel"


name="phone"


value={formData.phone}


onChange={handleChange}


placeholder="+91 9876543210"


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









{/* Status */}


<div className="md:col-span-2">


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









{/* Bio */}


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

Biography

</h2>



<textarea


rows={6}


name="bio"


value={formData.bio}


onChange={handleChange}


placeholder="Write a short biography..."


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









{/* Image */}


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

Profile Photo

</h2>



<label

className="
flex
cursor-pointer
items-center
justify-center
gap-3
rounded-xl
border-2
border-dashed
border-slate-300
p-8
hover:border-blue-600
"

>


<Upload size={22}/>


<span>

Upload Image

</span>



<input


type="file"


hidden


accept="image/*"


onChange={handleImage}


/>


</label>





{

preview && (


<div className="relative mt-6 w-52">


<Image

src={preview}

alt="Preview"

width={200}

height={200}

className="
rounded-xl
border
object-cover
"

/>



<button

type="button"

onClick={()=>{


setPreview("");


setFormData({

...formData,

image:""

});


}}

className="
absolute
-right-2
-top-2
rounded-full
bg-red-600
p-1
text-white
"

>


<X size={14}/>


</button>



</div>


)

}



</div>









{/* Buttons */}



<div className="
flex
justify-end
gap-3
">


<button

type="button"

onClick={handleReset}

className="
rounded-xl
border
border-slate-300
px-6
py-3
hover:bg-slate-100
"

>

Reset

</button>





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