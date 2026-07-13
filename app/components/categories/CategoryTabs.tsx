"use client";


import {
useState
} from "react";
import ServiceCategoryTable from "./ServiceCategoryTable";
import DesignationTable from "./DesignationTable";






export default function CategoryTabs(){


const [tab,setTab]=useState<
"service"|"designation"
>("service");



return (

<div>


<div className="
flex
gap-3
mb-6
">


<button

onClick={()=>setTab("service")}

className={`
px-5
py-3
rounded-xl
${
tab==="service"
?
"bg-blue-600 text-white"
:
"bg-slate-100"
}
`}
>

Service Categories

</button>



<button

onClick={()=>setTab("designation")}

className={`
px-5
py-3
rounded-xl
${
tab==="designation"
?
"bg-blue-600 text-white"
:
"bg-slate-100"
}
`}
>

Team Designations

</button>


</div>



{
tab==="service"
?
<ServiceCategoryTable/>
:
<DesignationTable/>
}


</div>

)

}