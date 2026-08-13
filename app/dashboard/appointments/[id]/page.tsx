"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { useParams, useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { appointmentAPI } from "@/app/services/appointment.api";

import { Appointment } from "@/app/types/appointment";

import AppointmentUpdatePanel 
from "@/app/components/appointments/AppointmentUpdatePanel";



export default function AppointmentDetailsPage() {


  const router = useRouter();

  const params = useParams();

  const id = Number(params.id);



  const [appointment, setAppointment] =
    useState<Appointment | null>(null);


  const [loading, setLoading] =
    useState(true);





  useEffect(() => {

    if (!id || isNaN(id)) {

      router.push(
        "/dashboard/appointments"
      );

      return;

    }


    loadAppointment();


  }, [id]);







  const loadAppointment = async () => {

    try {

      setLoading(true);


      const data =
        await appointmentAPI.getById(id);


      setAppointment(data);



    } catch(error) {


      console.error(error);


      router.push(
        "/dashboard/appointments"
      );


    } finally {

      setLoading(false);

    }

  };







  if (loading) {

    return (

      <div className="
        rounded-2xl
        border
        bg-white
        p-10
        text-center
      ">

        Loading Appointment...

      </div>

    );

  }







  if (!appointment) {

    return (

      <div className="
        rounded-2xl
        border
        bg-white
        p-10
        text-center
      ">

        Appointment not found.

      </div>

    );

  }






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

    <div className="space-y-6">



      {/* Header */}

      <div className="
        flex
        items-center
        justify-between
      ">


        <div>

          <h1 className="
            text-3xl
            font-bold
          ">

            Appointment Details

          </h1>


          <p className="text-slate-500">

            Appointment ID #{appointment.id}

          </p>


        </div>





        <div className="
          flex
          items-center
          gap-3
        ">


          <button

            onClick={() => router.back()}

            className="
              flex
              items-center
              gap-2
              rounded-lg
              border
              border-slate-300
              px-4
              py-2
              text-sm
              hover:bg-slate-100
            "

          >

            <ArrowLeft size={18}/>

            Back

          </button>





          <Link

            href={`/dashboard/appointments/edit/${appointment.id}`}

            className="
              rounded-lg
              bg-slate-900
              px-5
              py-2
              text-white
              hover:bg-slate-800
            "

          >

            Edit

          </Link>


        </div>


      </div>








      {/* Patient Information */}

      <div className="
        rounded-2xl
        border
        bg-white
        p-6
      ">


        <h2 className="
          mb-6
          text-xl
          font-semibold
        ">

          Patient Information

        </h2>



        <div className="
          grid
          gap-6
          md:grid-cols-2
        ">



          <div>

            <p className="text-sm text-slate-500">
              Patient Name
            </p>

            <p className="font-medium">
              {appointment.patientName}
            </p>

          </div>





          <div>

            <p className="text-sm text-slate-500">
              Phone
            </p>

            <p>
              {appointment.phone}
            </p>

          </div>





          <div>

            <p className="text-sm text-slate-500">
              Email
            </p>

            <p>
              {appointment.email || "-"}
            </p>

          </div>





          <div>

            <p className="text-sm text-slate-500">
              Doctor
            </p>

            <p>
              {appointment.doctor}
            </p>

          </div>



        </div>


      </div>









      {/* Appointment Information */}

      <div className="
        rounded-2xl
        border
        bg-white
        p-6
      ">


        <h2 className="
          mb-6
          text-xl
          font-semibold
        ">

          Appointment Information

        </h2>




        <div className="
          grid
          gap-6
          md:grid-cols-3
        ">



          <div>

            <p className="text-sm text-slate-500">
              Treatment
            </p>

            <p>
              {appointment.treatment}
            </p>

          </div>




          <div>

            <p className="text-sm text-slate-500">
              Appointment Date
            </p>

            <p>
              {appointment.appointmentDate}
            </p>

          </div>





          <div>

            <p className="text-sm text-slate-500">
              Appointment Time
            </p>

            <p>
              {appointment.appointmentTime}
            </p>

          </div>



        </div>


      </div>









      {/* Message */}

      <div className="
        rounded-2xl
        border
        bg-white
        p-6
      ">


        <h2 className="
          mb-4
          text-xl
          font-semibold
        ">

          Message

        </h2>



        <p className="
          leading-7
          text-slate-600
        ">

          {appointment.message || "-"}

        </p>


      </div>









      {/* Status */}

      <div className="
        rounded-2xl
        border
        bg-white
        p-6
      ">


        <h2 className="
          mb-4
          text-xl
          font-semibold
        ">

          Appointment Status

        </h2>




        <span
          className={`
            inline-flex
            rounded-full
            px-4
            py-2
            text-sm
            font-medium
            ${statusColor[appointment.status]}
          `}
        >

          {appointment.status}

        </span>


      </div>








      {/* Update Status & Payment */}

      <AppointmentUpdatePanel

        appointment={appointment}

        onUpdate={loadAppointment}

      />





    </div>

  );

}