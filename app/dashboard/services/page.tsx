"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  Plus,
  Stethoscope,
  CheckCircle2,
  XCircle,
  Layers3,
} from "lucide-react";


import ServiceTable from "@/app/components/services/ServiceTable";


import {
  serviceAPI
} from "@/app/services/service.api";


import {
  Service
} from "@/app/types/service";







export default function ServicesPage(){



const [
 services,
 setServices
] = useState<Service[]>([]);




const [
 loading,
 setLoading
] = useState(true);







// =================================
// LOAD SERVICES
// =================================


const loadServices = async()=>{


try{


setLoading(true);



const response =
await serviceAPI.getAll();




console.log(
"FULL SERVICE RESPONSE:",
response
);





const serviceData =


Array.isArray(response)

?

response


:


Array.isArray(response?.data)

?

response.data


:


Array.isArray(response?.data?.data)

?

response.data.data


:


response?.services

||

[];






console.log(
"SERVICE LIST:",
serviceData
);





setServices(
serviceData
);



}

catch(error:any){



console.error(

"LOAD SERVICES ERROR:",

error?.response?.data

||

error.message

);



setServices([]);



}

finally{


setLoading(false);


}



};









useEffect(()=>{


loadServices();


},[]);









// =================================
// STATS
// =================================


const totalServices =
services.length;






const activeServices =

services.filter(

(item)=>

item.status
?.toLowerCase()
===
"active"

).length;








const inactiveServices =

services.filter(

(item)=>

item.status
?.toLowerCase()
===
"inactive"

).length;









const categories =


new Set(

services.map(

(item)=>

item.categoryName

)

.filter(Boolean)

).size;













return (


<div className="space-y-6">






{/* HEADER */}


<div

className="
flex
flex-col
gap-4
md:flex-row
md:items-center
md:justify-between
"

>


<div>


<h1

className="
text-3xl
font-bold
text-slate-900
"

>

Services

</h1>



<p

className="
mt-2
text-slate-500
"

>

Manage all dental clinic services.

</p>



</div>








<Link


href="/dashboard/services/add"


className="
inline-flex
items-center
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


<Plus size={20}/>


Add Service


</Link>






</div>













{/* STATS */}


<div

className="
grid
gap-5
sm:grid-cols-2
xl:grid-cols-4
"

>





<StatCard


title="Total Services"


value={

loading

?

"..."

:

totalServices

}


icon={


<Stethoscope

size={28}

className="text-blue-600"

/>


}


/>









<StatCard


title="Active"


value={

loading

?

"..."

:

activeServices

}


icon={


<CheckCircle2

size={28}

className="text-green-600"

/>


}


/>









<StatCard


title="Inactive"


value={

loading

?

"..."

:

inactiveServices

}


icon={


<XCircle

size={28}

className="text-red-600"

/>


}


/>









<StatCard


title="Categories"


value={

loading

?

"..."

:

categories

}


icon={


<Layers3

size={28}

className="text-purple-600"

/>


}


/>







</div>












{/* TABLE */}



<ServiceTable


services={services}


loading={loading}


refresh={loadServices}


/>









</div>


);

}












// =================================
// STAT CARD
// =================================


function StatCard({

title,

value,

icon


}:{

title:string;

value:string|number;

icon:React.ReactNode;

}){



return (

<div

className="
rounded-2xl
border
bg-white
p-6
shadow-sm
"

>


<div

className="
flex
items-center
justify-between
"

>


<div>


<p

className="
text-sm
text-slate-500
"

>

{title}

</p>




<h2

className="
mt-2
text-3xl
font-bold
"

>

{value}

</h2>



</div>





<div

className="
rounded-xl
bg-slate-100
p-3
"

>

{icon}

</div>





</div>


</div>


);


}