"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Edit,
  Trash2,
} from "lucide-react";

import { Team } from "@/app/types/team";



type TeamRowProps = {

  member: Team;

  onDelete: (
    member: Team
  ) => void;

};




// ==========================================
// IMAGE URL BUILDER
// ==========================================

const getImageUrl = (
  image?: string | null
) => {


  if(
    !image ||
    image.trim() === ""
  ){

    return null;

  }



  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api";



  const SERVER_URL =
    API_URL
      .replace("/api","")
      .replace(/\/+$/,"");



  let imagePath =
    image.trim();



  // already full url

  if(
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://")
  ){

    return imagePath;

  }



  // remove starting slash

  imagePath =
    imagePath.replace(
      /^\/+/,
      ""
    );



  /*
    DATABASE VALUE:

    team/image.png

    convert:

    uploads/team/image.png
  */


  if(
    imagePath.startsWith("team/")
  ){

    imagePath =
      `uploads/${imagePath}`;

  }



  else if(
    !imagePath.startsWith("uploads/")
  ){

    imagePath =
      `uploads/${imagePath}`;

  }




  const finalUrl =
    `${SERVER_URL}/${imagePath}`;



  console.log(
    "FINAL IMAGE URL:",
    finalUrl
  );



  return finalUrl;


};







export default function TeamRow({

 member,

 onDelete,

}:TeamRowProps){



const imageUrl =
getImageUrl(
 member.image
);




return (

<tr

className="
border-t
border-slate-200
hover:bg-slate-50
"

>



<td

className="
px-5
py-4
"

>


<div

className="
flex
items-center
gap-4
"

>



<div

className="
relative
h-14
w-14
overflow-hidden
rounded-xl
border
bg-slate-100
"

>


{

imageUrl ? (


<Image

src={imageUrl}

alt={member.name}

fill

sizes="56px"

className="
object-cover
"

unoptimized

/>


)

:

(

<div

className="
flex
h-full
w-full
items-center
justify-center
text-xs
text-slate-500
"

>

N/A

</div>

)


}



</div>







<div>


<h3

className="
font-semibold
text-slate-900
"

>

{member.name}

</h3>




{
member.email &&

<p

className="
text-sm
text-slate-500
"

>

{member.email}

</p>

}




{
member.phone &&

<p

className="
text-sm
text-slate-500
"

>

{member.phone}

</p>

}



</div>



</div>


</td>







<td

className="
px-5
py-4
"

>

{

member.designation ||

"Not Assigned"

}


</td>







<td

className="
px-5
py-4
"

>

{

member.specialization ||

"-"

}


</td>







<td

className="
px-5
py-4
"

>

{

member.experience ||

"-"

}


</td>








<td

className="
px-5
py-4
"

>


<span

className={`

rounded-full

px-3

py-1

text-xs

font-medium


${
member.status==="Active"

?

"bg-green-100 text-green-700"

:

"bg-red-100 text-red-700"

}

`}

>

{member.status}

</span>


</td>








<td

className="
px-5
py-4
"

>


<div

className="
flex
items-center
gap-2
"

>



<Link

href={`/dashboard/team/edit/${member.id}`}

className="
rounded-lg
border
p-2
text-blue-600
hover:bg-blue-50
"

>

<Edit size={18}/>

</Link>






<button

type="button"

onClick={()=>
onDelete(member)
}

className="
rounded-lg
border
p-2
text-red-600
hover:bg-red-50
"

>

<Trash2 size={18}/>


</button>



</div>


</td>




</tr>


);

}