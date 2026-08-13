"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

import { categoryAPI } from "@/app/services/category.api";
import { Category } from "@/types/category";


export type ServiceFormData = {

  name: string;

  categoryId: number;

  duration: string;

  description: string;

  image?: string;

  status: "Active" | "Inactive";

};


type ServiceFormProps = {

  initialData?: ServiceFormData;

  onSubmit: (
    data: FormData
  ) => Promise<void> | void;


  submitLabel?: string;

};



const durations = [

  "15 Minutes",
  "30 Minutes",
  "45 Minutes",
  "60 Minutes",
  "90 Minutes",
  "120 Minutes",

];



const defaultData: ServiceFormData = {

  name: "",

  categoryId: 0,

  duration: "",

  description: "",

  image: "",

  status: "Active",

};



export default function ServiceForm({

  initialData = defaultData,

  onSubmit,

  submitLabel = "Save Service",

}: ServiceFormProps) {



  const [formData,setFormData] =
    useState<ServiceFormData>(
      initialData
    );



  const [categories,setCategories] =
    useState<Category[]>([]);



  const [loadingCategories,setLoadingCategories] =
    useState(true);



  const [loading,setLoading] =
    useState(false);



  const [imageFile,setImageFile] =
    useState<File | null>(null);



  const [preview,setPreview] =
    useState("");





  // ==============================
  // Edit Data
  // ==============================

  useEffect(()=>{

    setFormData(initialData);

    if(initialData.image){

      setPreview(
        initialData.image
      );

    }

  },[initialData]);






  // ==============================
  // Load Categories
  // ==============================


  useEffect(()=>{

    loadCategories();

  },[]);




  const loadCategories = async()=>{

    try{

      setLoadingCategories(true);


      const data =
        await categoryAPI.getAll();



      setCategories(

        data.filter(
          item =>
            item.status==="Active"
        )

      );


    }
    catch(error){

      console.error(
        "Category Error:",
        error
      );

    }
    finally{

      setLoadingCategories(false);

    }

  };






  // ==============================
  // Input Change
  // ==============================


  const handleChange = (

    e:React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >

  )=>{


    const {
      name,
      value
    } = e.target;



    setFormData(prev=>({

      ...prev,


      [name]:

        name==="categoryId"

        ? Number(value)

        : value,


    }));


  };






  // ==============================
  // Image Change
  // ==============================


  const handleImageChange = (

    e:React.ChangeEvent<HTMLInputElement>

  )=>{


    const file =
      e.target.files?.[0];


    if(!file)
      return;



    setImageFile(file);



    setPreview(
      URL.createObjectURL(file)
    );


  };






  // ==============================
  // Submit
  // ==============================


  const handleSubmit = async(

    e:React.FormEvent

  )=>{


    e.preventDefault();



    if(

      !formData.name.trim()

      ||

      !formData.categoryId

      ||

      !formData.duration

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



      data.append(
        "description",
        formData.description
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

      console.error(error);


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



<div className="rounded-2xl border bg-white p-6 shadow-sm">


<h2 className="mb-6 text-xl font-semibold">

Service Information

</h2>



<div className="grid gap-5 md:grid-cols-2">



{/* Name */}

<div>

<label className="mb-2 block font-medium">

Service Name *

</label>


<input

type="text"

name="name"

value={formData.name}

onChange={handleChange}

disabled={loading}

className="w-full rounded-xl border px-4 py-3"

/>

</div>





{/* Category */}


<div>


<label className="mb-2 block font-medium">

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

className="w-full rounded-xl border px-4 py-3"

>


<option value={0}>

Select Category

</option>



{

categories.map(category=>(

<option

key={category.id}

value={category.id}

>

{category.name}

</option>

))

}


</select>


</div>







{/* Duration */}

<div>


<label className="mb-2 block font-medium">

Duration *

</label>


<select

name="duration"

value={formData.duration}

onChange={handleChange}

className="w-full rounded-xl border px-4 py-3"

>


<option value="">

Select Duration

</option>



{

durations.map(item=>(

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


<label className="mb-2 block font-medium">

Status

</label>


<select

name="status"

value={formData.status}

onChange={handleChange}

className="w-full rounded-xl border px-4 py-3"

>


<option value="Active">

Active

</option>


<option value="Inactive">

Inactive

</option>


</select>


</div>






{/* Description */}

<div className="md:col-span-2">


<label className="mb-2 block font-medium">

Description

</label>


<textarea

name="description"

rows={5}

value={formData.description}

onChange={handleChange}

className="w-full rounded-xl border px-4 py-3"

/>


</div>






{/* Image */}

<div className="md:col-span-2">


<label className="mb-2 block font-medium">

Service Image

</label>


<input

type="file"

accept="image/*"

onChange={handleImageChange}

className="w-full rounded-xl border px-4 py-3"

/>


</div>





{/* Preview */}


{

preview &&

<div className="md:col-span-2">


<img

src={preview}

alt="preview"

className="h-56 w-full rounded-xl object-cover"

/>


</div>


}



</div>


</div>






<div className="flex justify-end">


<button

disabled={loading}

className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white"

>


<Save size={18}/>


{

loading

? "Saving..."

: submitLabel

}


</button>


</div>



</form>

);


}