"use client";

import { useRouter } from "next/navigation";

import TeamForm from "@/app/components/team/TeamForm";
import { teamAPI } from "@/app/services/team.api";


export default function AddTeamPage() {

  const router = useRouter();



  const handleCreate = async (
    formData: FormData
  ) => {

    try {


      // ============================
      // DEBUG FORM DATA
      // ============================

      console.log(
        "TEAM FORM SUBMIT DATA"
      );


      formData.forEach(
        (value, key) => {

          console.log(
            key,
            value
          );

        }
      );



      // ============================
      // API CALL
      // ============================

      const response =
        await teamAPI.create(
          formData
        );



      console.log(
        "CREATE TEAM RESPONSE",
        response
      );



      if(
        !response ||
        !response.success
      ){

        throw new Error(
          response?.message ||
          "Failed to create team member"
        );

      }



      alert(
        "Team member created successfully"
      );



      router.push(
        "/dashboard/team"
      );



    }
    catch(error:any){


      console.error(
        "TEAM CREATE ERROR:",
        error
      );


      alert(
        error.message ||
        "Failed to create team member"
      );


      throw error;


    }

  };




  return (

    <TeamForm

      onSubmit={
        handleCreate
      }

    />

  );

}