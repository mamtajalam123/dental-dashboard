"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import { Plus } from "lucide-react";

import FeedbackTable from "@/app/components/feedback/FeedbackTable";

import { feedbackAPI } from "@/app/services/feedback.api";

import type { Feedback } from "@/types/feedback";


export default function FeedbackPage() {


  // ==========================================
  // STATE
  // ==========================================

  const [feedbacks, setFeedbacks] =
    useState<Feedback[]>([]);


  const [loading, setLoading] =
    useState(true);


  const [error, setError] =
    useState("");



  // ==========================================
  // LOAD FEEDBACK
  // ==========================================

  const loadFeedback =
    useCallback(async () => {

      try {

        setLoading(true);

        setError("");


        console.log(
          "========== LOAD FEEDBACK =========="
        );


        const response =
          await feedbackAPI.getAll();



        console.log(
          "RAW API RESPONSE:",
          response
        );



        // ======================================
        // RESPONSE HANDLING
        // ======================================

        let feedbackData:any[] = [];


        if(Array.isArray(response)){

          feedbackData = response;

        }
        else if(
          response &&
          typeof response === "object" &&
          "data" in response
        ){

          feedbackData =
            Array.isArray(
              (response as any).data
            )
            ?
            (response as any).data
            :
            [];

        }



        console.log(
          "FINAL DATA:",
          feedbackData
        );



        // ======================================
        // NORMALIZE DATA
        // ======================================


        const normalizedFeedbacks:
          Feedback[] =

          feedbackData.map(
            (item:any)=>{


              const normalized:Feedback = {


                id:
                  Number(item.id),



                patientName:
                  item.patientName ??
                  "",



                // IMPORTANT CHANGE
                //
                // Backend:
                // patient_image AS patientImage
                //
                // Frontend:
                // patientImage


                patientImage:
                  item.patientImage ??
                  null,



                treatment:
                  item.treatment ??
                  "",



                rating:
                  Number(
                    item.rating
                  ) || 0,



                review:
                  item.review ??
                  "",



                status:
                  item.status ??
                  "Pending",



                date:
                  item.date ??
                  null,



                createdAt:
                  item.createdAt ??
                  undefined,



                updatedAt:
                  item.updatedAt ??
                  undefined,

              };



              console.log(
                "------------------------------"
              );


              console.log(
                "ID:",
                normalized.id
              );


              console.log(
                "PATIENT:",
                normalized.patientName
              );


              console.log(
                "IMAGE:",
                normalized.patientImage
              );


              console.log(
                "------------------------------"
              );



              return normalized;

            }
          );



        console.log(
          "TOTAL FEEDBACK:",
          normalizedFeedbacks.length
        );



        setFeedbacks(
          normalizedFeedbacks
        );



      }
      catch(error){


        console.error(
          "LOAD FEEDBACK ERROR:",
          error
        );



        setFeedbacks([]);



        setError(
          error instanceof Error
          ?
          error.message
          :
          "Failed to load feedback."
        );


      }
      finally{


        setLoading(false);


      }


    },[]);



  // ==========================================
  // INITIAL LOAD
  // ==========================================


  useEffect(()=>{

    loadFeedback();

  },[
    loadFeedback
  ]);




  // ==========================================
  // LOADING
  // ==========================================


  if(loading){

    return (

      <div className="
        flex
        min-h-[300px]
        items-center
        justify-center
      ">


        <div className="text-center">


          <div
            className="
              mx-auto
              mb-4
              h-10
              w-10
              animate-spin
              rounded-full
              border-4
              border-slate-200
              border-t-blue-600
            "
          />


          <p className="text-slate-500">
            Loading feedback...
          </p>


        </div>


      </div>

    );

  }




  // ==========================================
  // ERROR
  // ==========================================


  if(error){

    return (

      <div className="
        flex
        min-h-[300px]
        items-center
        justify-center
      ">


        <div className="
          w-full
          max-w-lg
          text-center
        ">


          <div className="
            rounded-2xl
            border
            border-red-200
            bg-red-50
            p-6
          ">


            <p className="
              font-medium
              text-red-700
            ">
              {error}
            </p>


          </div>



          <button

            type="button"

            onClick={loadFeedback}

            className="
              mt-4
              rounded-xl
              bg-slate-900
              px-5
              py-3
              text-sm
              font-medium
              text-white
              hover:bg-slate-800
            "

          >

            Try Again

          </button>


        </div>


      </div>

    );

  }




  // ==========================================
  // PAGE
  // ==========================================


  return (

    <div className="space-y-6">


      {/* HEADER */}


      <div className="
        flex
        flex-col
        justify-between
        gap-4
        md:flex-row
        md:items-center
      ">


        <div>


          <h1 className="
            text-3xl
            font-bold
            text-slate-900
          ">
            Feedback
          </h1>


          <p className="
            mt-1
            text-slate-500
          ">
            Manage patient reviews and testimonials.
          </p>


        </div>



        <Link

          href="/dashboard/feedback/add"

          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            px-5
            py-3
            font-medium
            text-white
            hover:bg-blue-700
          "

        >

          <Plus size={18}/>

          Add Feedback


        </Link>


      </div>




      {/* TABLE */}


      <FeedbackTable

        feedbacks={feedbacks}

        setFeedbacks={setFeedbacks}

      />



    </div>

  );


}