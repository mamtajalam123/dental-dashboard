"use client";

import { useState } from "react";
import { X } from "lucide-react";


interface AddDesignationModalProps {

  open:boolean;

  onClose:()=>void;

  onAdd:(name:string)=>void;

}



export default function AddDesignationModal({

  open,

  onClose,

  onAdd,

}:AddDesignationModalProps){


  const [name,setName] = useState("");



  if(!open)
    return null;




  const handleSubmit=()=>{


    if(!name.trim())
      return;


    onAdd(name);


    setName("");


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

            Add Designation

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

            placeholder="
              Enter designation
            "

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
            "

          >

            Cancel

          </button>




          <button

            onClick={handleSubmit}

            className="
              rounded-xl
              bg-blue-600
              px-5
              py-2.5
              text-white
            "

          >

            Save

          </button>



        </div>



      </div>


    </div>

  );


}