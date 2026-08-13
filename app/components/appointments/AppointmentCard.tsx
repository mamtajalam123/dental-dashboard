"use client";

import {
  Phone,
  Calendar,
  Clock,
  UserRound,
} from "lucide-react";


interface AppointmentCardProps {

  patient: string;

  phone: string;

  doctor: string;

  date: string;

  time: string;

  status:
    | "Pending"
    | "Confirmed"
    | "Completed"
    | "Cancelled";

}



export default function AppointmentCard({

  patient,

  phone,

  doctor,

  date,

  time,

  status,

}: AppointmentCardProps) {



  const statusColor = {

    Pending:
      "bg-yellow-100 text-yellow-700",

    Confirmed:
      "bg-blue-100 text-blue-700",

    Completed:
      "bg-green-100 text-green-700",

    Cancelled:
      "bg-red-100 text-red-700",

  };



  return (

    <div
      className="
        bg-white
        rounded-2xl
        border
        border-slate-200
        shadow-sm
        p-5
        space-y-4
      "
    >


      {/* Header */}

      <div
        className="
          flex
          justify-between
          items-start
        "
      >


        <div>


          <h3
            className="
              font-semibold
              text-lg
              text-slate-900
            "
          >
            {patient || "-"}
          </h3>



          <div
            className="
              flex
              items-center
              gap-2
              text-sm
              text-gray-500
              mt-1
            "
          >

            <Phone size={14}/>

            {phone || "-"}

          </div>


        </div>



        {/* Status */}

        <span
          className={`
            px-3
            py-1
            rounded-full
            text-xs
            font-medium
            ${statusColor[status]}
          `}
        >

          {status}

        </span>


      </div>





      {/* Details */}

      <div
        className="
          space-y-3
          text-sm
          text-gray-600
        "
      >


        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <UserRound size={17}/>

          <span>
            {doctor || "-"}
          </span>

        </div>





        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <Calendar size={17}/>

          <span>
            {date || "-"}
          </span>

        </div>





        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <Clock size={17}/>

          <span>
            {time || "-"}
          </span>

        </div>


      </div>





      {/* Actions */}

      <div
        className="
          flex
          gap-3
          pt-3
          border-t
        "
      >


        <button
          className="
            flex-1
            border
            rounded-xl
            py-2
            text-sm
            font-medium
            hover:bg-gray-50
          "
        >

          View

        </button>





        <button
          className="
            flex-1
            bg-blue-600
            text-white
            rounded-xl
            py-2
            text-sm
            font-medium
            hover:bg-blue-700
          "
        >

          Edit

        </button>



      </div>



    </div>

  );

}