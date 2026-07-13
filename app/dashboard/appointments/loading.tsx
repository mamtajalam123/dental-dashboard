export default function Loading(){


return (

<div className="space-y-6">



{/* Header Skeleton */}

<div className="
flex
justify-between
items-center
">


<div className="space-y-3">


<div className="
h-8
w-48
bg-gray-200
rounded-lg
animate-pulse
"/>



<div className="
h-4
w-72
bg-gray-200
rounded-lg
animate-pulse
"/>



</div>




<div className="
h-12
w-44
bg-gray-200
rounded-xl
animate-pulse
"/>



</div>







{/* Filter Skeleton */}

<div className="
bg-white
border
rounded-2xl
p-5
flex
gap-4
">


<div className="
h-12
flex-1
bg-gray-200
rounded-xl
animate-pulse
"/>


<div className="
h-12
w-40
bg-gray-200
rounded-xl
animate-pulse
"/>


<div className="
h-12
w-40
bg-gray-200
rounded-xl
animate-pulse
"/>



</div>







{/* Table Skeleton */}

<div className="
bg-white
border
rounded-2xl
overflow-hidden
">


<div className="
h-14
bg-gray-100
"/>




{

Array.from({
length:6
}).map((_,index)=>(


<div

key={index}

className="
grid
grid-cols-6
gap-4
p-5
border-t
"


>


{

Array.from({
length:6
}).map((_,i)=>(


<div

key={i}

className="
h-5
bg-gray-200
rounded
animate-pulse
"

/>


))

}


</div>



))


}



</div>






</div>

)

}