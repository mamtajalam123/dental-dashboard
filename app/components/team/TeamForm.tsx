"use client";

import {
  useEffect,
  useState,
} from "react";

import Image from "next/image";

import {
  Save,
  Upload,
  X,
} from "lucide-react";

import { designationAPI } from "@/app/services/designation.api";
import { Designation } from "@/app/types/designation";


export type TeamFormData = {

  id?: number;

  name:string;

  designationId:number;

  specialization:string;

  experience:string;

  email:string;

  phone:string;

  bio:string;

  image?:string | null;

  status:"Active" | "Inactive";

};



type TeamFormProps = {

  initialData?:TeamFormData;

  submitLabel?:string;

  onSubmit:
  (
    data:FormData
  )=>Promise<void>;

};



const experiences=[

"1 Year",
"2 Years",
"3 Years",
"5 Years",
"8 Years",
"10 Years",
"12 Years",
"15+ Years"

];



const defaultData:TeamFormData={

name:"",

designationId:0,

specialization:"",

experience:"",

email:"",

phone:"",

bio:"",

image:null,

status:"Active"

};



export default function TeamForm({

initialData,

submitLabel="Save Team Member",

onSubmit

}:TeamFormProps){



const [formData,setFormData]=
useState<TeamFormData>({
...defaultData,
...initialData
});



const [designations,setDesignations]=
useState<Designation[]>([]);



const [loading,setLoading]=
useState(false);



const [loadingDesignations,setLoadingDesignations]=
useState(true);



const [imageFile,setImageFile]=
useState<File|null>(null);



const [preview,setPreview]=
useState<string>("");



// ================================
// EDIT DATA LOAD
// ================================


useEffect(()=>{


setFormData({

...defaultData,

...initialData

});


if(initialData?.image){

setPreview(initialData.image);

}
else{

setPreview("");

}


},[initialData]);




// ================================
// LOAD DESIGNATIONS
// ================================


useEffect(()=>{

loadDesignations();

},[]);



const loadDesignations=async()=>{


try{


setLoadingDesignations(true);


const response =
await designationAPI.getAll();



const data =

Array.isArray(response)

?
response

:

response.data ?? [];



setDesignations(

data.filter(
(item:Designation)=>
item.status==="Active"
)

);



}
catch(error){

console.error(
"Designation Load Error",
error
);


}
finally{

setLoadingDesignations(false);

}


};





// ================================
// INPUT CHANGE
// ================================


const handleChange=(

e:
React.ChangeEvent<
HTMLInputElement |
HTMLTextAreaElement |
HTMLSelectElement
>

)=>{


const {
name,
value
}=e.target;



setFormData(prev=>({

...prev,


[name]:

name==="designationId"

?

Number(value)

:

value


}));



};





// ================================
// IMAGE
// ================================


const handleImageChange=(

e:
React.ChangeEvent<HTMLInputElement>

)=>{


const file =
e.target.files?.[0];


if(!file)
return;



setImageFile(file);



const url =
URL.createObjectURL(file);



setPreview(url);



};





// ================================
// SUBMIT
// ================================


const handleSubmit=async(

e:React.FormEvent

)=>{


e.preventDefault();



if(

!formData.name ||

formData.designationId===0 ||

!formData.email ||

!formData.phone

){


alert(
"Please fill required fields"
);


return;

}



try{


setLoading(true);



const payload =
new FormData();



payload.append(
"name",
formData.name
);



payload.append(
"designationId",
String(
formData.designationId
)
);



payload.append(
"specialization",
formData.specialization
);



payload.append(
"experience",
formData.experience
);



payload.append(
"email",
formData.email
);



payload.append(
"phone",
formData.phone
);



payload.append(
"bio",
formData.bio
);



payload.append(
"status",
formData.status
);



if(imageFile){

payload.append(
"image",
imageFile
);

}



console.log(
 "TEAM FORM DATA",
 Object.fromEntries(payload)
);



await onSubmit(payload);



}
catch(error){


console.error(
"TEAM SAVE ERROR",
error
);


throw error;


}
finally{


setLoading(false);


}


};





// ================================
// RESET
// ================================


const handleReset=()=>{


setFormData({

...defaultData,

...initialData

});


setImageFile(null);



setPreview(
initialData?.image ?? ""
);


};





return (

<form
onSubmit={handleSubmit}
className="space-y-6"
>


<div className="rounded-2xl border bg-white p-6">


<h2 className="mb-6 text-xl font-semibold">

Team Member Information

</h2>



<div className="grid gap-5 md:grid-cols-2">



<input

name="name"

value={formData.name}

onChange={handleChange}

placeholder="Full Name"

className="rounded-xl border px-4 py-3"

/>





<select

name="designationId"

value={formData.designationId}

onChange={handleChange}

disabled={loadingDesignations}

className="rounded-xl border px-4 py-3"

>


<option value={0}>
Select Designation
</option>



{

designations.map(item=>(


<option

key={item.id}

value={item.id}

>

{item.name}

</option>


))

}


</select>





<input

name="specialization"

value={formData.specialization}

onChange={handleChange}

placeholder="Specialization"

className="rounded-xl border px-4 py-3"

/>





<select

name="experience"

value={formData.experience}

onChange={handleChange}

className="rounded-xl border px-4 py-3"

>


<option value="">
Experience
</option>


{

experiences.map(item=>(

<option key={item}>
{item}
</option>

))

}


</select>





<input

name="email"

value={formData.email}

onChange={handleChange}

placeholder="Email"

className="rounded-xl border px-4 py-3"

/>





<input

name="phone"

value={formData.phone}

onChange={handleChange}

placeholder="Phone"

className="rounded-xl border px-4 py-3"

/>





<select

name="status"

value={formData.status}

onChange={handleChange}

className="rounded-xl border px-4 py-3"

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





<div className="rounded-2xl border bg-white p-6">


<textarea

name="bio"

rows={5}

value={formData.bio}

onChange={handleChange}

placeholder="Biography"

className="w-full rounded-xl border px-4 py-3"

/>


</div>






<div className="rounded-2xl border bg-white p-6">


<label className="flex cursor-pointer gap-3">


<Upload/>

Upload Image


<input

type="file"

hidden

accept="image/*"

onChange={handleImageChange}

/>


</label>




{

preview &&

<div className="relative mt-5 h-40 w-40">


<Image

src={preview}

alt="preview"

fill

sizes="160px"

className="rounded-xl object-cover"

/>



<button

type="button"

onClick={()=>{

setPreview("");

setImageFile(null);

}}

className="absolute right-1 top-1 rounded-full bg-red-600 p-1 text-white"

>


<X size={14}/>


</button>


</div>

}



</div>





<div className="flex justify-end gap-3">


<button

type="button"

onClick={handleReset}

className="rounded-xl border px-6 py-3"

>

Reset

</button>




<button

disabled={loading}

className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white"

>


<Save size={18}/>


{
loading
?
"Saving..."
:
submitLabel
}


</button>



</div>




</form>

);


}