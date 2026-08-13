"use client";


import {
useQuery,
useMutation,
useQueryClient

} from "@tanstack/react-query";


import {

getAppointments,
deleteAppointment,
updateAppointmentStatus,
updateAppointmentPayment

} from "../services/appointment.service";



export function useAppointments(){


const queryClient =
useQueryClient();



const appointments =
useQuery({

queryKey:["appointments"],

queryFn:getAppointments

});





const deleteMutation =
useMutation({

mutationFn:deleteAppointment,


onSuccess:()=>{

queryClient.invalidateQueries({

queryKey:["appointments"]

});

}

});





const statusMutation =
useMutation({

mutationFn:
({
id,
status
}:{
id:number;
status:string;

})=>
updateAppointmentStatus(
id,
status
),


onSuccess:()=>{

queryClient.invalidateQueries({

queryKey:["appointments"]

});

}

});





const paymentMutation =
useMutation({

mutationFn:
({
id,
payment

}:{
id:number;
payment:string;

})=>
updateAppointmentPayment(
id,
payment
),


onSuccess:()=>{

queryClient.invalidateQueries({

queryKey:["appointments"]

});

}

});





return {


appointments,


deleteAppointment:
deleteMutation.mutate,


updateStatus:
statusMutation.mutate,


updatePayment:
paymentMutation.mutate



};


}