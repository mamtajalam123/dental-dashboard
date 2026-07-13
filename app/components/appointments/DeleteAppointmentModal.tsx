"use client";

import { X, Trash2 } from "lucide-react";
import { Appointment } from "@/types/appointment";


interface DeleteAppointmentModalProps {

  open:boolean;

  appointment:Appointment;

  onClose:()=>void;

  onConfirm:()=>void;

}



export default function DeleteAppointmentModal({

  open,

  appointment,

  onClose,

  onConfirm,

}:DeleteAppointmentModalProps){



  if(!open)
    return null;



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


          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-red-100
              "
            >

              <Trash2
                size={22}
                className="text-red-600"
              />

            </div>



            <h2
              className="
                text-xl
                font-bold
                text-slate-800
              "
            >

              Delete Appointment

            </h2>


          </div>





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








        {/* Content */}


        <div className="mt-6">


          <p className="text-slate-600">

            Are you sure you want to delete appointment of:

          </p>



          <div
            className="
              mt-4
              rounded-xl
              bg-slate-50
              p-4
            "
          >


            <h3
              className="
                font-semibold
                text-slate-800
              "
            >

              {appointment.patientName}

            </h3>



            <p className="text-sm text-slate-500">

              {appointment.treatment}

            </p>



            <p className="text-sm text-slate-500">

              {appointment.date}

            </p>



          </div>



        </div>








        {/* Footer Buttons */}


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
              font-medium
              text-slate-700
              hover:bg-slate-50
            "

          >

            Cancel

          </button>






          <button

            onClick={onConfirm}

            className="
              rounded-xl
              bg-red-600
              px-5
              py-2.5
              font-medium
              text-white
              hover:bg-red-700
            "

          >

            Delete

          </button>



        </div>



      </div>



    </div>


  );


}