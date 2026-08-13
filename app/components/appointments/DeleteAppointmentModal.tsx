"use client";

interface DeleteAppointmentModalProps {

  open: boolean;

  loading: boolean;

  onClose: () => void;

  onConfirm: () => void;

}



export default function DeleteAppointmentModal({

  open,

  loading,

  onClose,

  onConfirm,

}: DeleteAppointmentModalProps) {


  if(!open) return null;



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


        <h2
          className="
            text-xl
            font-semibold
            text-slate-900
          "
        >

          Delete Appointment

        </h2>




        <p
          className="
            mt-3
            text-sm
            text-slate-600
          "
        >

          Are you sure you want to delete this appointment?
          This action cannot be undone.

        </p>





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

            disabled={loading}

            className="
              rounded-lg
              border
              px-4
              py-2
              text-sm
              hover:bg-slate-100
            "

          >

            Cancel

          </button>





          <button

            onClick={onConfirm}

            disabled={loading}

            className="
              rounded-lg
              bg-red-600
              px-4
              py-2
              text-sm
              text-white
              hover:bg-red-700
            "

          >

            {
              loading
              ? "Deleting..."
              : "Delete"
            }


          </button>




        </div>



      </div>


    </div>

  );

}