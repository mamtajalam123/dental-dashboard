"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Save,
} from "lucide-react";


import {
  categoryAPI
} from "@/app/services/category.api";


import {
  Category
} from "@/types/category";



// =====================================
// SERVICE FORM TYPE
// =====================================

export type ServiceFormData = {

  name:string;

  categoryId:number;

  duration:string;

  shortDescription:string;

  description:string;

  image?:string;

  status:
    | "Active"
    | "Inactive";

};




// =====================================
// PROPS
// =====================================

type ServiceFormProps = {


  initialData?:ServiceFormData;


  onSubmit:
  (
    data:FormData
  )=>Promise<void>|void;



  submitLabel?:string;


};





// =====================================
// DURATIONS
// =====================================

const durations = [

"15 Minutes",
"30 Minutes",
"45 Minutes",
"60 Minutes",
"90 Minutes",
"120 Minutes",

];





// =====================================
// DEFAULT DATA
// =====================================

const defaultData:ServiceFormData = {


name:"",


categoryId:0,


duration:"",


shortDescription:"",


description:"",


image:"",


status:"Active",


};








export default function ServiceForm({

initialData = defaultData,

onSubmit,

submitLabel="Save Service",

}:ServiceFormProps){





// =====================================
// STATE
// =====================================


const [formData,setFormData] =
useState<ServiceFormData>({

...defaultData,

...initialData,

});




const [categories,setCategories] =
useState<Category[]>([]);



const [loadingCategories,setLoadingCategories] =
useState(false);



const [loading,setLoading] =
useState(false);



const [imageFile,setImageFile] =
useState<File|null>(null);



const [preview,setPreview] =
useState(
initialData?.image || ""
);
// =====================================
// EDIT DATA UPDATE
// =====================================


useEffect(()=>{


setFormData({

...defaultData,

...initialData,


name:
initialData?.name || "",


categoryId:
initialData?.categoryId || 0,


duration:
initialData?.duration || "",


shortDescription:
initialData?.shortDescription || "",


description:
initialData?.description || "",


image:
initialData?.image || "",


status:
initialData?.status || "Active",


});



if(initialData?.image){

setPreview(
initialData.image
);

}
else{

setPreview("");

}


},[initialData]);





// =====================================
// LOAD CATEGORIES
// =====================================


useEffect(()=>{

loadCategories();

},[]);






const loadCategories = async()=>{


try{


setLoadingCategories(true);



const response =
await categoryAPI.getAll();



const data =

Array.isArray(response)

?

response

:

response?.data

||

response?.categories

||

[];





setCategories(

data.filter(
(item:Category)=>
item.status==="Active"
)

);



}

catch(error){


console.error(
"Category Load Error:",
error
);


setCategories([]);


}

finally{


setLoadingCategories(false);


}


};







// =====================================
// INPUT CHANGE
// =====================================


const handleChange = (

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





setFormData(

(prev)=>({

...prev,


[name]:

name==="categoryId"

?

Number(value)

:

value,


})

);


};









// =====================================
// IMAGE CHANGE
// =====================================


const handleImageChange = (

e:
React.ChangeEvent<HTMLInputElement>

)=>{


const file =
e.target.files?.[0];



if(!file)

return;





if(
!file.type.startsWith("image/")
){

alert(
"Please select image file"
);

return;

}





setImageFile(file);




setPreview(

URL.createObjectURL(file)

);



};











// =====================================
// SUBMIT
// =====================================


const handleSubmit = async(

e:
React.FormEvent

)=>{


e.preventDefault();






if(

!formData.name?.trim()

||

!formData.categoryId

||

!formData.duration?.trim()

){


alert(
"Please fill required fields"
);


return;


}





try{


setLoading(true);




const data =
new FormData();





data.append(

"name",

formData.name

);






data.append(

"categoryId",

String(
formData.categoryId
)

);






data.append(

"duration",

formData.duration

);





// SHORT DESCRIPTION

data.append(

"shortDescription",

formData.shortDescription || ""

);








// FULL DESCRIPTION

data.append(

"description",

formData.description || ""

);






data.append(

"status",

formData.status

);






if(imageFile){


data.append(

"image",

imageFile

);


}





await onSubmit(data);



}

catch(error){


console.error(

"Submit Service Error:",

error

);


alert(
"Failed to save service"
);



}

finally{


setLoading(false);


}


};
return (

<form
onSubmit={handleSubmit}
className="space-y-6"
>


<div className="
rounded-2xl
border
bg-white
p-6
shadow-sm
">


<h2 className="
mb-6
text-xl
font-semibold
text-slate-800
">

Service Information

</h2>




<div className="
grid
gap-5
md:grid-cols-2
">





{/* Service Name */}

<div>


<label className="
mb-2
block
font-medium
text-slate-700
">

Service Name *

</label>



<input

type="text"

name="name"

value={formData.name || ""}

onChange={handleChange}

disabled={loading}

placeholder="Enter service name"

className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
outline-none
focus:border-blue-500
"

/>


</div>








{/* Category */}

<div>


<label className="
mb-2
block
font-medium
text-slate-700
">

Category *

</label>



<select


name="categoryId"


value={formData.categoryId}


onChange={handleChange}


disabled={
loading ||
loadingCategories
}


className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
outline-none
focus:border-blue-500
"


>


<option value={0}>

Select Category

</option>



{

categories.map(

(category)=>(


<option

key={category.id}

value={category.id}

>

{category.name}

</option>


)

)

}


</select>


</div>









{/* Duration */}

<div>


<label className="
mb-2
block
font-medium
text-slate-700
">

Duration *

</label>



<select


name="duration"


value={formData.duration || ""}


onChange={handleChange}


disabled={loading}


className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
outline-none
focus:border-blue-500
"

>


<option value="">

Select Duration

</option>



{

durations.map(

(item)=>(


<option

key={item}

value={item}

>

{item}

</option>


)

)

}


</select>


</div>









{/* Status */}

<div>


<label className="
mb-2
block
font-medium
text-slate-700
">

Status

</label>



<select


name="status"


value={formData.status}


onChange={handleChange}


disabled={loading}


className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
outline-none
focus:border-blue-500
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









{/* Short Description */}

<div className="md:col-span-2">


<label className="
mb-2
block
font-medium
text-slate-700
">

Short Description

</label>



<textarea


name="shortDescription"


rows={3}


value={
formData.shortDescription || ""
}


onChange={handleChange}


disabled={loading}


placeholder="Enter short service description"


className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
outline-none
focus:border-blue-500
"


/>


</div>









{/* Description */}

<div className="md:col-span-2">


<label className="
mb-2
block
font-medium
text-slate-700
">

Description

</label>



<textarea


name="description"


rows={6}


value={
formData.description || ""
}


onChange={handleChange}


disabled={loading}


placeholder="Enter detailed service description"


className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
outline-none
focus:border-blue-500
"


/>


</div>









{/* Image */}

<div className="md:col-span-2">


<label className="
mb-2
block
font-medium
text-slate-700
">

Service Image

</label>



<input


type="file"


accept="image/*"


onChange={handleImageChange}


disabled={loading}


className="
w-full
rounded-xl
border
border-slate-300
px-4
py-3
"


/>


</div>









{/* Preview */}

{

preview &&

<div className="md:col-span-2">


<img


src={preview}


alt="Service Preview"


className="
h-56
w-full
rounded-xl
object-cover
"


/>


</div>


}





</div>


</div>









{/* Submit Button */}


<div className="
flex
justify-end
">


<button


type="submit"


disabled={loading}


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
transition
hover:bg-blue-700
disabled:cursor-not-allowed
disabled:opacity-60
"


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