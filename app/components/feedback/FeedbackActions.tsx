"use client";


import Link from "next/link";

import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";



interface FeedbackActionsProps {


  id:number;


  onDelete:(id:number)=>void;


}




export default function FeedbackActions({

  id,

  onDelete,

}:FeedbackActionsProps){



  return (

    <div
      className="
        flex
        items-center
        justify-center
        gap-2
      "
    >




      {/* View */}

      <Link

        href={`/dashboard/feedback/${id}`}

        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          border
          border-slate-200
          text-slate-600
          transition
          hover:bg-slate-100
        "

        title="View Feedback"

      >

        <Eye size={17}/>

      </Link>






      {/* Edit */}

      <Link

        href={`/dashboard/feedback/edit/${id}`}

        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          border
          border-blue-200
          text-blue-600
          transition
          hover:bg-blue-50
        "

        title="Edit Feedback"

      >

        <Pencil size={17}/>

      </Link>






      {/* Delete */}

      <button

        type="button"

        onClick={() =>
          onDelete(id)
        }

        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          border
          border-red-200
          text-red-600
          transition
          hover:bg-red-50
        "

        title="Delete Feedback"

      >

        <Trash2 size={17}/>

      </button>





    </div>

  );

}