"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

import { Category } from "@/types/category";


interface EditDesignationModalProps {

  open:boolean;

  designation:Category | null;

  onClose:()=>void;

  onUpdate:(id:number, name:string)=>void;

}



export default function EditDesignationModal({

  open,

  designation,

  onClose,

  onUpdate,

}:EditDesignationModalProps){


  const [name,setName] = useState("");



  useEffect(()=>{

    if(designation){

      setName(designation.name);

    }

  },[designation]);




  if(!open || !designation)
    return null;




  const handleUpdate = ()=>{


    if(!name.trim())
      return;


    onUpdate(
      designation.id,
      name
    );


    onClose();


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

            Edit Designation

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






        {/* Input */}


        <div className="mt-6">


          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-slate-700
            "
          >

            Designation Name

          </label>



          <input

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
              focus:border-blue-500
            "

          />


        </div>







        {/* Buttons */}


        <div
          className="
            mt-6
            flex
            justify-end
            gap-3
          "
        >


          <button

            onClick={onClose}

            className="
              rounded-xl
              border
              px-5
              py-2.5
              text-slate-700
            "

          >

            Cancel

          </button>






          <button

            onClick={handleUpdate}

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



      </div>


    </div>

  );

}