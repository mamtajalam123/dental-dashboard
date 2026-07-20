"use client";

import { useRouter } from "next/navigation";

import { appointmentAPI } from "@/services/appointment.api";

export default function AddAppointmentPage() {

  const router = useRouter();


  const handleCreateAppointment = async (
    data: any
  ) => {

    try {

      const response =
        await appointmentAPI.create(data);


      if (response.success) {

        alert(
          "Appointment created successfully"
        );


        router.push(
          "/appointments"
        );

      } else {

        alert(
          response.message ||
          "Failed to create appointment"
        );

      }


    } catch(error) {

      console.error(
        "Create appointment error:",
        error
      );

      alert(
        "Something went wrong"
      );

    }

  };


  return (
    <div className="p-6">

      <div className="mb-6">

        <h1 className="text-2xl font-bold text-slate-800">
          Add Appointment
        </h1>

        <p className="text-sm text-slate-500">
          Create a new patient appointment
        </p>

      </div>


      <AppointmentForm
        onSubmit={
          handleCreateAppointment
        }
        submitLabel="Create Appointment"
      />


    </div>
  );
}