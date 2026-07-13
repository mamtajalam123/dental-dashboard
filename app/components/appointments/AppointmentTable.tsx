"use client";

import {
  useEffect,
  useMemo,
  useState
} from "react";

import Link from "next/link";

import {
  Plus
} from "lucide-react";


import {
  appointmentData
} from "@/data/appointment";


import {
  Appointment
} from "@/types/appointment";


import AppointmentFilters from "./AppointmentFilters";

import AppointmentStatus from "./AppointmentStatus";

import PaymentStatus from "./PaymentStatus";

import AppointmentActions from "./AppointmentActions";

import DeleteAppointmentModal from "./DeleteAppointmentModal";



const ITEMS_PER_PAGE = 10;



export default function AppointmentTable() {


const [appointments,setAppointments] =
useState<Appointment[]>(appointmentData);



const [search,setSearch] =
useState("");

const [treatment,setTreatment] =
useState("");

const [doctor,setDoctor] =
useState("");

const [status,setStatus] =
useState("");

const [payment,setPayment] =
useState("");

const [date,setDate] =
useState("");

const [sort,setSort] =
useState("newest");



const [page,setPage] =
useState(1);



const [
deleteOpen,
setDeleteOpen
]=useState(false);



const [
selectedAppointment,
setSelectedAppointment
]=useState<Appointment|null>(null);





// Reset pagination after filter change

useEffect(()=>{

setPage(1);

},[
search,
treatment,
doctor,
status,
payment,
date,
sort
]);





const filteredAppointments = useMemo(()=>{


let data=[...appointments];



if(search){

data=data.filter((item)=>

item.patientName
.toLowerCase()
.includes(
search.toLowerCase()
)

);

}



if(treatment){

data=data.filter((item)=>

item.treatment===treatment

);

}




if(doctor){

data=data.filter((item)=>

item.doctor===doctor

);

}




if(status){

data=data.filter((item)=>

item.status===status

);

}





if(payment){

data=data.filter((item)=>

item.payment===payment

);

}




if(date){

data=data.filter((item)=>

item.date===date

);

}





data.sort((a,b)=>{


if(sort==="newest"){

return b.id-a.id;

}


return a.id-b.id;


});



return data;



},[
appointments,
search,
treatment,
doctor,
status,
payment,
date,
sort
]);





const totalPages=Math.ceil(

filteredAppointments.length /
ITEMS_PER_PAGE

);



const paginatedAppointments =
filteredAppointments.slice(

(page-1)*ITEMS_PER_PAGE,

page*ITEMS_PER_PAGE

);





const clearFilters=()=>{


setSearch("");

setTreatment("");

setDoctor("");

setStatus("");

setPayment("");

setDate("");

setSort("newest");

setPage(1);


};

// Status Change

const handleStatusChange = (

id:number,

value:Appointment["status"]

)=>{


setAppointments((prev)=>

prev.map((item)=>

item.id===id

?

{

...item,

status:value

}

:

item

)

);


};





// Payment Change


const handlePaymentChange = (

id:number,

value:Appointment["payment"]

)=>{


setAppointments((prev)=>

prev.map((item)=>

item.id===id

?

{

...item,

payment:value

}

:

item

)

);


};







// Delete Open


const handleDelete = (

id:number

)=>{


const appointment =

appointments.find(

(item)=>

item.id===id

);



if(!appointment)

return;



setSelectedAppointment(appointment);


setDeleteOpen(true);


};







// Confirm Delete


const confirmDelete =()=>{


if(!selectedAppointment)

return;



setAppointments((prev)=>

prev.filter(

(item)=>

item.id !== selectedAppointment.id

)

);



setDeleteOpen(false);


setSelectedAppointment(null);



};







// Statistics


const totalAppointments =

appointments.length;



const pendingAppointments =

appointments.filter(

(item)=>

item.status==="Pending"

).length;



const confirmedAppointments =

appointments.filter(

(item)=>

item.status==="Confirmed"

).length;



const completedAppointments =

appointments.filter(

(item)=>

item.status==="Completed"

).length;






return (

<div className="space-y-6">





{/* Statistics */}



<div className="
grid
grid-cols-1
gap-6
sm:grid-cols-2
xl:grid-cols-4
">





<div className="
rounded-2xl
border
bg-white
p-6
shadow-sm
">


<p className="
text-sm
text-slate-500
">

Total Appointments

</p>


<h2 className="
mt-3
text-3xl
font-bold
">

{totalAppointments}

</h2>


</div>







<div className="
rounded-2xl
border
border-yellow-200
bg-yellow-50
p-6
">


<p className="
text-yellow-700
">

Pending

</p>


<h2 className="
mt-3
text-3xl
font-bold
text-yellow-700
">

{pendingAppointments}

</h2>


</div>







<div className="
rounded-2xl
border
border-blue-200
bg-blue-50
p-6
">


<p className="
text-blue-700
">

Confirmed

</p>


<h2 className="
mt-3
text-3xl
font-bold
text-blue-700
">

{confirmedAppointments}

</h2>


</div>








<div className="
rounded-2xl
border
border-green-200
bg-green-50
p-6
">


<p className="
text-green-700
">

Completed

</p>


<h2 className="
mt-3
text-3xl
font-bold
text-green-700
">

{completedAppointments}

</h2>


</div>




</div>





{/* Header */}



<div className="
flex
flex-col
justify-between
gap-4
md:flex-row
md:items-center
">


<div>

<h2 className="
text-2xl
font-bold
text-slate-800
">

Appointment List

</h2>



<p className="
mt-1
text-slate-500
">

Manage online and offline patient appointments.

</p>


</div>





<Link

href="/dashboard/appointments/add"

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


<Plus size={18}/>


Add Appointment


</Link>



</div>





{/* Filters */}



<AppointmentFilters

search={search}

setSearch={setSearch}

treatment={treatment}

setTreatment={setTreatment}

doctor={doctor}

setDoctor={setDoctor}

status={status}

setStatus={setStatus}

payment={payment}

setPayment={setPayment}

date={date}

setDate={setDate}

sort={sort}

setSort={setSort}

onClear={clearFilters}

/>
      {/* Table */}


      <div className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      ">


        <div className="overflow-x-auto">


          <table className="min-w-full">


            <thead className="bg-slate-100">


              <tr>


                {[
                  "Patient",
                  "Treatment",
                  "Doctor",
                  "Date",
                  "Status",
                  "Payment",
                  "Actions",
                ].map((head)=>(

                  <th
                    key={head}
                    className="
                    px-6
                    py-4
                    text-left
                    text-sm
                    font-semibold
                    text-slate-700
                    "
                  >

                    {head}

                  </th>

                ))}


              </tr>


            </thead>





            <tbody>


            {
              paginatedAppointments.length === 0

              ?

              (

                <tr>

                  <td

                  colSpan={7}

                  className="
                  px-6
                  py-16
                  text-center
                  text-slate-500
                  "

                  >

                    No appointments found.

                  </td>


                </tr>

              )


              :


              paginatedAppointments.map((appointment)=>(


                <tr

                key={appointment.id}

                className="
                border-t
                hover:bg-slate-50
                "

                >



                {/* Patient */}


                <td className="px-6 py-5">


                <h3 className="
                font-semibold
                text-slate-800
                ">

                {appointment.patientName}

                </h3>



                <p className="
                text-sm
                text-slate-500
                ">

                {appointment.phone}

                </p>



                <p className="
                text-sm
                text-slate-500
                ">

                {appointment.email}

                </p>


                </td>






                {/* Treatment */}


                <td className="px-6 py-5">


                <span className="
                font-medium
                ">

                {appointment.treatment}

                </span>


                </td>







                {/* Doctor */}


                <td className="px-6 py-5">


                {appointment.doctor}


                </td>







                {/* Date + Time */}


                <td className="px-6 py-5">


                <p>

                {appointment.date}

                </p>


                <p className="
                text-sm
                text-slate-500
                ">

                {appointment.time}

                </p>


                </td>








                {/* Status */}


                <td className="
                px-6
                py-5
                text-center
                ">


                <AppointmentStatus

                status={appointment.status}

                />


                </td>








                {/* Payment */}


                <td className="
                px-6
                py-5
                text-center
                ">


                <PaymentStatus

                status={appointment.payment}

                />


                </td>








                {/* Actions */}


                <td className="
                px-6
                py-5
                text-center
                ">


                <AppointmentActions


                id={appointment.id}


                phone={appointment.phone}


                email={appointment.email}


                status={appointment.status}


                payment={appointment.payment}



                onStatusChange={
                  handleStatusChange
                }



                onPaymentChange={
                  handlePaymentChange
                }



                onDelete={
                  handleDelete
                }



                />


                </td>






                </tr>


              ))


            }


            </tbody>


          </table>


        </div>


      </div>








      {/* Pagination */}



      {
        totalPages > 1 && (


        <div className="
        flex
        justify-center
        items-center
        gap-3
        ">


        <button

        disabled={page===1}

        onClick={()=>setPage(
          page-1
        )}

        className="
        rounded-lg
        border
        px-4
        py-2
        disabled:opacity-40
        "

        >

        Previous

        </button>





        <span className="
        rounded-lg
        bg-slate-100
        px-4
        py-2
        ">

        {page} / {totalPages}

        </span>






        <button

        disabled={page===totalPages}

        onClick={()=>setPage(
          page+1
        )}

        className="
        rounded-lg
        border
        px-4
        py-2
        disabled:opacity-40
        "

        >

        Next

        </button>



        </div>


        )

      }







      {/* Delete Modal */}



      {
        deleteOpen &&
        selectedAppointment &&

        (

        <DeleteAppointmentModal


        open={deleteOpen}


        appointment={
          selectedAppointment
        }



        onClose={()=>{

          setDeleteOpen(false);

          setSelectedAppointment(null);

        }}



        onConfirm={
          confirmDelete
        }



        />

        )

      }



    </div>

  );

}