import { Appointment } from "@/types/appointment";


export const appointmentData: Appointment[] = [

  {
    id: 1,

    patientName: "Vikash Yadav",

    phone: "+91 9876543210",

    email: "vikash@gmail.com",

    treatment: "Dental Implant",

    doctor: "Chief Dentist",

    date: "2026-08-03",

    time: "10:30 AM",

    status: "Pending",

    payment: "Pending",

    notes:
      "Patient needs implant consultation.",

  },


  {
    id: 2,

    patientName: "Rahul Sharma",

    phone: "+91 9876543211",

    email: "rahul@gmail.com",

    treatment: "Root Canal",

    doctor: "General Dentist",

    date: "2026-08-04",

    time: "11:00 AM",

    status: "Confirmed",

    payment: "Paid",

    notes:
      "Follow up appointment.",

  },


  {
    id: 3,

    patientName: "Priya Das",

    phone: "+91 9876543212",

    email: "priya@gmail.com",

    treatment: "Teeth Whitening",

    doctor: "Cosmetic Dentist",

    date: "2026-08-05",

    time: "04:00 PM",

    status: "Completed",

    payment: "Paid",

    notes:
      "Completed successfully.",

  },


];