"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Image from "next/image";

import type {
  Feedback,
} from "@/types/feedback";

import type {
  Category,
} from "@/app/types/category";

import {
  feedbackAPI,
} from "@/app/services/feedback.api";

import {
  categoryAPI,
} from "@/app/services/category.api";


import FeedbackFilters from "./FeedbackFilters";
import FeedbackActions from "./FeedbackActions";
import FeedbackStatus from "./FeedbackStatus";
import RatingStars from "./RatingStars";
import DeleteFeedbackModal from "./DeleteFeedbackModal";


// =====================================================
// CONSTANTS
// =====================================================

const ITEMS_PER_PAGE = 10;


const DEFAULT_IMAGE =
  "/images/default-user.png";


// =====================================================
// PROPS
// =====================================================

interface Props {

  feedbacks: Feedback[];

  setFeedbacks: React.Dispatch<
    React.SetStateAction<Feedback[]>
  >;

}


// =====================================================
// COMPONENT
// =====================================================

export default function FeedbackTable({

  feedbacks,

  setFeedbacks,

}: Props) {



  // =====================================================
  // FILTER STATES
  // =====================================================


  const [
    search,
    setSearch,
  ] = useState("");


  const [
    status,
    setStatus,
  ] = useState("");


  const [
    rating,
    setRating,
  ] = useState("");


  const [
    treatment,
    setTreatment,
  ] = useState("");



  // =====================================================
  // CATEGORY STATES
  // =====================================================


  const [
    categories,
    setCategories,
  ] = useState<Category[]>([]);



  const [
    categoriesLoading,
    setCategoriesLoading,
  ] = useState(false);



  // =====================================================
  // PAGINATION
  // =====================================================


  const [
    page,
    setPage,
  ] = useState(1);



  // =====================================================
  // DELETE STATES
  // =====================================================


  const [
    deleteOpen,
    setDeleteOpen,
  ] = useState(false);



  const [
    selectedFeedback,
    setSelectedFeedback,
  ] = useState<Feedback | null>(
    null
  );



  const [
    deleteLoading,
    setDeleteLoading,
  ] = useState(false);




  // =====================================================
  // LOAD CATEGORIES
  // =====================================================


  useEffect(()=>{


    let mounted = true;



    const loadCategories =
      async()=>{


        try{


          setCategoriesLoading(true);



          const response =
            await categoryAPI.getAll();



          if(!mounted){
            return;
          }



          const data =
            Array.isArray(response)

            ?

            response

            :

            Array.isArray(
              (
                response as {
                  data?:Category[];
                }
              )?.data
            )

            ?

            (
              response as {
                data:Category[];
              }
            ).data

            :

            [];



          setCategories(data);



        }
        catch(error){


          console.error(
            "CATEGORY LOAD ERROR:",
            error
          );


          if(mounted){

            setCategories([]);

          }


        }
        finally{


          if(mounted){

            setCategoriesLoading(false);

          }


        }


      };



      loadCategories();



      return()=>{

        mounted=false;

      };


  },[]);






  // =====================================================
  // IMAGE URL HANDLER
  // =====================================================


  const getImageUrl = (
    image?:string|null
  ):string=>{


    if(
      !image ||
      !image.trim()
    ){

      return DEFAULT_IMAGE;

    }



    const imagePath =
      image.trim();



    // Already full URL

    if(
      imagePath.startsWith(
        "http://"
      )
      ||
      imagePath.startsWith(
        "https://"
      )
      ||
      imagePath.startsWith(
        "blob:"
      )
      ||
      imagePath.startsWith(
        "data:"
      )
    ){

      return imagePath;

    }




    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL
      ||
      "http://localhost:5000/api";




    const serverUrl =
      apiUrl
      .replace(
        /\/+$/,
        ""
      )
      .replace(
        /\/api$/,
        ""
      );




    let cleanPath =
      imagePath.replace(
        /^\/+/,
        ""
      );



    cleanPath =
      cleanPath.replace(
        /^api\//,
        ""
      );



    return `${serverUrl}/${cleanPath}`;


  };
  // =====================================================
  // FILTER FEEDBACKS
  // =====================================================

  const filteredFeedbacks =
    useMemo(() => {


      const searchValue =
        search
          .trim()
          .toLowerCase();



      const treatmentValue =
        treatment
          .trim()
          .toLowerCase();



      return feedbacks.filter(
        (item)=>{


          const patientName =
            String(
              item.patientName ?? ""
            )
            .toLowerCase();



          const treatmentName =
            String(
              item.treatment ?? ""
            )
            .toLowerCase();




          const searchMatch =
            searchValue === ""

            ||

            patientName.includes(
              searchValue
            )

            ||

            treatmentName.includes(
              searchValue
            );




          const statusMatch =
            status === ""

            ||

            item.status === status;




          const ratingMatch =
            rating === ""

            ||

            Number(item.rating)
            ===
            Number(rating);




          const treatmentMatch =
            treatmentValue === ""

            ||

            treatmentName ===
            treatmentValue;



          return (
            searchMatch
            &&
            statusMatch
            &&
            ratingMatch
            &&
            treatmentMatch
          );

        }
      );


    },[
      feedbacks,
      search,
      status,
      rating,
      treatment,
    ]);





  // =====================================================
  // TOTAL PAGES
  // =====================================================


  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredFeedbacks.length /
        ITEMS_PER_PAGE
      )
    );





  // =====================================================
  // KEEP PAGE VALID
  // =====================================================


  useEffect(()=>{


    if(page > totalPages){

      setPage(totalPages);

    }


  },[
    page,
    totalPages
  ]);






  // =====================================================
  // PAGINATION DATA
  // =====================================================


  const paginatedFeedbacks =
    useMemo(()=>{


      const start =
        (page - 1)
        *
        ITEMS_PER_PAGE;



      return filteredFeedbacks.slice(
        start,
        start + ITEMS_PER_PAGE
      );


    },[
      filteredFeedbacks,
      page
    ]);






  // =====================================================
  // DELETE OPEN
  // =====================================================


  const handleDelete =
    (
      id:number
    )=>{


      const feedback =
        feedbacks.find(
          item =>
          item.id === id
        );



      if(!feedback){

        return;

      }



      setSelectedFeedback(
        feedback
      );


      setDeleteOpen(true);


    };







  // =====================================================
  // CONFIRM DELETE
  // =====================================================


  const confirmDelete =
    async()=>{


      if(
        !selectedFeedback
        ||
        deleteLoading
      ){

        return;

      }



      try{


        setDeleteLoading(true);



        await feedbackAPI.delete(
          selectedFeedback.id
        );



        setFeedbacks(
          previous =>
          previous.filter(
            item =>
            item.id !==
            selectedFeedback.id
          )
        );



        setDeleteOpen(false);



        setSelectedFeedback(
          null
        );


      }
      catch(error){


        console.error(
          "DELETE FEEDBACK ERROR:",
          error
        );


        alert(
          error instanceof Error
          ?
          error.message
          :
          "Delete failed"
        );


      }
      finally{


        setDeleteLoading(false);


      }


    };







  // =====================================================
  // STATUS UPDATE
  // =====================================================


  const handleStatusUpdate =
    async(
      id:number,
      newStatus:Feedback["status"]
    )=>{


      try{


        // API UPDATE

        await feedbackAPI.updateStatus(
          id,
          newStatus
        );



        // UPDATE UI

        setFeedbacks(
          previous =>
          previous.map(
            item =>
            item.id === id

            ?

            {
              ...item,
              status:newStatus,
            }

            :

            item
          )
        );


      }
      catch(error){


        console.error(
          "STATUS UPDATE ERROR:",
          error
        );


        alert(
          "Failed to update status"
        );


      }


    };







  // =====================================================
  // CLEAR FILTERS
  // =====================================================


  const handleClearFilters =
    ()=>{


      setSearch("");

      setStatus("");

      setRating("");

      setTreatment("");

      setPage(1);


    };







  // =====================================================
  // FILTER HANDLERS
  // =====================================================


  const handleSearchChange =
    (
      value:string
    )=>{

      setSearch(value);

      setPage(1);

    };



  const handleStatusFilterChange =
    (
      value:string
    )=>{

      setStatus(value);

      setPage(1);

    };



  const handleRatingChange =
    (
      value:string
    )=>{

      setRating(value);

      setPage(1);

    };



  const handleTreatmentChange =
    (
      value:string
    )=>{

      setTreatment(value);

      setPage(1);

    };






  // =====================================================
  // PAGE CHANGE
  // =====================================================


  const handlePageChange =
    (
      newPage:number
    )=>{


      if(
        newPage < 1
        ||
        newPage > totalPages
      ){

        return;

      }


      setPage(newPage);


    };
      // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="space-y-6">


      {/* =================================================
          FILTERS
      ================================================= */}


      <FeedbackFilters

        search={search}

        setSearch={
          handleSearchChange
        }

        status={status}

        setStatus={
          handleStatusFilterChange
        }

        rating={rating}

        setRating={
          handleRatingChange
        }

        treatment={treatment}

        setTreatment={
          handleTreatmentChange
        }

        onClear={
          handleClearFilters
        }

        categories={
          categories
        }

        categoriesLoading={
          categoriesLoading
        }

      />





      {/* =================================================
          TABLE
      ================================================= */}


      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >


        <div className="overflow-x-auto">


          <table
            className="
              w-full
              min-w-[1000px]
              text-left
            "
          >


            <thead
              className="
                bg-slate-50
              "
            >


              <tr>


                <th className="px-5 py-4 text-sm font-semibold text-slate-700">
                  Patient
                </th>


                <th className="px-5 py-4 text-sm font-semibold text-slate-700">
                  Treatment
                </th>


                <th className="px-5 py-4 text-sm font-semibold text-slate-700">
                  Rating
                </th>


                <th className="px-5 py-4 text-sm font-semibold text-slate-700">
                  Status
                </th>


                <th className="px-5 py-4 text-sm font-semibold text-slate-700">
                  Date
                </th>


                <th className="px-5 py-4 text-sm font-semibold text-slate-700">
                  Actions
                </th>


              </tr>


            </thead>





            <tbody>


              {
                paginatedFeedbacks.length === 0

                ?


                (
                  <tr>

                    <td
                      colSpan={6}
                      className="
                        px-5
                        py-12
                        text-center
                      "
                    >

                      <p
                        className="
                          text-lg
                          font-medium
                          text-slate-600
                        "
                      >
                        No feedback found
                      </p>


                    </td>

                  </tr>
                )


                :


                paginatedFeedbacks.map(
                  (
                    feedback
                  )=>{


                    const patientImage =
                      getImageUrl(
                        feedback.patientImage ?? null
                      );



                    return (

                      <tr
                        key={
                          feedback.id
                        }
                        className="
                          border-t
                          border-slate-200
                          hover:bg-slate-50
                        "
                      >




                        {/* PATIENT */}


                        <td className="px-5 py-4">


                          <div
                            className="
                              flex
                              items-center
                              gap-3
                            "
                          >


                            <Image

                              src={
                                patientImage
                              }

                              alt={
                                feedback.patientName
                                ||
                                "Patient"
                              }

                              width={50}

                              height={50}

                              className="
                                h-12
                                w-12
                                rounded-full
                                object-cover
                              "

                              unoptimized

                            />



                            <div>


                              <p
                                className="
                                  font-semibold
                                  text-slate-900
                                "
                              >

                                {
                                  feedback.patientName
                                  ||
                                  "-"
                                }

                              </p>


                              <p
                                className="
                                  text-sm
                                  text-slate-500
                                "
                              >
                                Patient
                              </p>


                            </div>


                          </div>


                        </td>







                        {/* TREATMENT */}


                        <td className="px-5 py-4">


                          <span
                            className="
                              text-sm
                              text-slate-700
                            "
                          >

                            {
                              feedback.treatment
                              ||
                              "-"
                            }

                          </span>


                        </td>






                        {/* RATING */}


                        <td className="px-5 py-4">


                          <RatingStars

                            rating={
                              Number(
                                feedback.rating
                              )
                              ||
                              0
                            }

                          />


                        </td>







                        {/* STATUS */}


                        <td className="px-5 py-4">


                          <FeedbackStatus

                            id={
                              feedback.id
                            }

                            status={
                              feedback.status
                            }

                            onUpdate={
                              (
                                newStatus
                              )=>

                              handleStatusUpdate(
                                feedback.id,
                                newStatus
                              )

                            }

                          />


                        </td>







                        {/* DATE */}


                        <td className="px-5 py-4">


                          <span
                            className="
                              text-sm
                              text-slate-600
                            "
                          >

                            {
                              feedback.date
                              ||
                              "-"
                            }

                          </span>


                        </td>







                        {/* ACTION */}


                        <td className="px-5 py-4">


                          <FeedbackActions

                            id={
                              feedback.id
                            }

                            onDelete={
                              handleDelete
                            }

                          />


                        </td>




                      </tr>


                    );


                  }

                )

              }



            </tbody>


          </table>


        </div>


      </div>






      {/* =================================================
          PAGINATION
      ================================================= */}


      {
        filteredFeedbacks.length > 0 && (


        <div
          className="
            flex
            flex-col
            items-center
            justify-between
            gap-4
            sm:flex-row
          "
        >


          <p
            className="
              text-sm
              text-slate-500
            "
          >

            Showing

            {" "}

            {

              (page - 1)
              *
              ITEMS_PER_PAGE
              +
              1

            }


            {" "}to{" "}


            {

              Math.min(
                page *
                ITEMS_PER_PAGE,
                filteredFeedbacks.length
              )

            }


            {" "}of{" "}


            {
              filteredFeedbacks.length
            }


            {" "}feedbacks


          </p>





          {
            totalPages > 1 && (

            <div
              className="
                flex
                items-center
                gap-2
              "
            >



              <button

                disabled={
                  page === 1
                }

                onClick={()=>
                  handlePageChange(
                    page - 1
                  )
                }

                className="
                  rounded-lg
                  border
                  px-4
                  py-2
                  disabled:opacity-50
                "
              >

                Previous

              </button>






              {
                Array.from(
                  {
                    length:
                    totalPages
                  }
                )
                .map(
                  (
                    _,
                    index
                  )=>{


                    const pageNumber =
                      index + 1;


                    return (

                      <button

                        key={
                          pageNumber
                        }

                        onClick={()=>
                          handlePageChange(
                            pageNumber
                          )
                        }

                        className={`
                          rounded-lg
                          border
                          px-3
                          py-2

                          ${
                            page === pageNumber

                            ?

                            "bg-blue-600 text-white"

                            :

                            ""
                          }

                        `}

                      >

                        {
                          pageNumber
                        }


                      </button>


                    );


                  }
                )

              }






              <button

                disabled={
                  page === totalPages
                }

                onClick={()=>
                  handlePageChange(
                    page + 1
                  )
                }

                className="
                  rounded-lg
                  border
                  px-4
                  py-2
                  disabled:opacity-50
                "

              >

                Next

              </button>



            </div>

            )
          }


        </div>


        )

      }







      {/* =================================================
          DELETE MODAL
      ================================================= */}



      <DeleteFeedbackModal


        open={
          deleteOpen
        }


        patientName={
          selectedFeedback?.patientName
          ??
          ""
        }


        onClose={()=>{


          if(
            !deleteLoading
          ){

            setDeleteOpen(false);

            setSelectedFeedback(null);

          }


        }}



        onConfirm={
          confirmDelete
        }


      />




    </div>

  );

}