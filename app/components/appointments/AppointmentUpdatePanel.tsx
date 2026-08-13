"use client";

import { useState } from "react";

import { appointmentAPI } from "@/app/services/appointment.api";

import { Appointment } from "@/app/types/appointment";


interface Props {

  appointment: Appointment;

  onUpdate: () => void;

}



export default function AppointmentUpdatePanel({

  appointment,

  onUpdate,

}: Props) {


  const [status,setStatus] =
    useState(appointment.status);


  const [payment,setPayment] =
    useState(appointment.payment);


  const [loading,setLoading] =
    useState(false);





  const updateStatus = async () => {

    try {

      setLoading(true);


      await appointmentAPI.updateStatus(
        appointment.id,
        status
      );


      onUpdate();


    } catch(error){

      console.error(error);

    } finally {

      setLoading(false);

    }

  };






  const updatePayment = async () => {


    try {


      setLoading(true);



      await appointmentAPI.updatePayment(

        appointment.id,

        payment

      );



      onUpdate();



    } catch(error){


      console.error(error);


    } finally {


      setLoading(false);


    }


  };





  return (

    <div
      className="
        rounded-2xl
        border
        bg-white
        p-6
        space-y-6
      "
    >



      <h2 className="
        text-xl
        font-semibold
      ">

        Update Appointment

      </h2>





      {/* Status */}


      <div>


        <label className="
          mb-2
          block
          text-sm
          text-slate-500
        ">

          Appointment Status

        </label>



        <div className="
          flex
          gap-3
        ">


          <select

            value={status}

            onChange={(e)=>
              setStatus(
                e.target.value as Appointment["status"]
              )
            }

            className="
              flex-1
              rounded-lg
              border
              px-3
              py-2
            "

          >


            <option value="Pending">
              Pending
            </option>


            <option value="Confirmed">
              Confirmed
            </option>


            <option value="Completed">
              Completed
            </option>


            <option value="Cancelled">
              Cancelled
            </option>


          </select>




          <button

            onClick={updateStatus}

            disabled={loading}

            className="
              rounded-lg
              bg-blue-600
              px-5
              text-white
              hover:bg-blue-700
            "

          >

            Save

          </button>


        </div>


      </div>








      {/* Payment */}



      <div>


        <label className="
          mb-2
          block
          text-sm
          text-slate-500
        ">

          Payment Status

        </label>



        <div className="
          flex
          gap-3
        ">



          <select

            value={payment}

            onChange={(e)=>
              setPayment(e.target.value)
            }

            className="
              flex-1
              rounded-lg
              border
              px-3
              py-2
            "

          >


            <option value="Pending">
              Pending
            </option>


            <option value="Paid">
              Paid
            </option>


            <option value="Partially Paid">
              Partially Paid
            </option>


            <option value="Refunded">
              Refunded
            </option>


          </select>




          <button

            onClick={updatePayment}

            disabled={loading}

            className="
              rounded-lg
              bg-green-600
              px-5
              text-white
              hover:bg-green-700
            "

          >

            Save

          </button>



        </div>


      </div>





    </div>

  );

}