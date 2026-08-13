export type Appointment = {

  id:number;

  patientName:string;

  phone:string;

  email:string;

  treatment:string;

  doctor:string;

  date:string;

  time:string;

  status:
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled";


  payment:
  | "Pending"
  | "Paid"
  | "Partially Paid"
  | "Refunded";


  notes:string;

};