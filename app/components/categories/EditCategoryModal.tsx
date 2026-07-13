"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";


type Category = {

  id:number;

  name:string;

  type:string;

  status:string;

};



type EditCategoryModalProps = {

  open:boolean;

  category:Category | null;

  onClose:()=>void;

  onUpdate:(

    id:number,

    name:string

  )=>void;

};





export default function EditCategoryModal({

  open,

  category,

  onClose,

  onUpdate,

}:EditCategoryModalProps){



const [name,setName] =
useState("");






useEffect(()=>{


if(category){

setName(category.name);

}


},[category]);








if(!open || !category)

return null;








const handleSubmit=(

e:React.FormEvent

)=>{


e.preventDefault();



if(!name.trim()){

alert("Please enter category name");

return;

}



onUpdate(

category.id,

name

);



};








return (

<div

className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/40
px-4
"

>


<div

className="
w-full
max-w-md
rounded-2xl
bg-white
p-6
shadow-xl
"

>





{/* Header */}


<div

className="
mb-5
flex
items-center
justify-between
"

>


<h2

className="
text-xl
font-bold
text-slate-800
"

>

Edit Service Category

</h2>





<button

onClick={onClose}

className="
rounded-lg
p-2
hover:bg-slate-100
"

>

<X size={20}/>

</button>



</div>








<form

onSubmit={handleSubmit}

>



<label

className="
mb-2
block
font-medium
"

>

Category Name

</label>





<input


type="text"


value={name}


onChange={(e)=>
setName(e.target.value)
}


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







<div

className="
mt-6
flex
justify-end
gap-3
"

>



<button

type="button"

onClick={onClose}

className="
rounded-xl
border
border-slate-300
px-5
py-2.5
hover:bg-slate-50
"

>

Cancel

</button>







<button

type="submit"

className="
rounded-xl
bg-blue-600
px-5
py-2.5
text-white
hover:bg-blue-700
"

>

Update

</button>





</div>




</form>






</div>



</div>


);


}