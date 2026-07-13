"use client";

import { useRouter } from "next/navigation";



import { Appointment } from "@/types/appointment";

import { appointmentData } from "@/data/appointment";
import AppointmentForm from "@/app/components/appointments/AppointmentForm";


export default function AddAppointmentPage() {


  const router = useRouter();



  const handleSubmit = (
    data:any
  ) => {



    const newAppointment: Appointment = {


      id:
        Date.now(),


      patientName:
        data.patient,


      phone:
        data.phone,


      email:
        data.email,


      doctor:
        data.doctor,


      treatment:
        data.reason,


      date:
        data.date,


      time:
        data.time,


      notes:
        data.notes,


      status:
        "Pending",


      payment:
        "Pending",


    };



    // Temporary local data push

    appointmentData.push(
      newAppointment
    );



    alert(
      "Appointment Created Successfully"
    );



    router.push(
      "/dashboard/appointments"
    );


  };





  return (


    <div className="
    space-y-6
    ">



      <div>


        <h1 className="
        text-3xl
        font-bold
        text-slate-800
        ">

          Add Appointment

        </h1>



        <p className="
        mt-2
        text-slate-500
        ">

          Create a new patient appointment.

        </p>


      </div>





      <AppointmentForm

        onSubmit={
          handleSubmit
        }

        submitLabel="
        Create Appointment
        "

      />



    </div>


  );

}