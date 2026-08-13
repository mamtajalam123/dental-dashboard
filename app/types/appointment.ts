export interface Appointment {
  id: number;

  patientName: string;

  phone: string;

  email: string;

  doctor: string;

  treatment: string;

  appointmentDate: string;

  appointmentTime: string;

  message: string;

  status:
    | "Pending"
    | "Confirmed"
    | "Completed"
    | "Cancelled";

  payment:
    | "Pending"
    | "Paid";

  createdAt?: string;

  updatedAt?: string;
}