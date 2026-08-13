import { apiRequest } from "@/app/lib/api";
import { Appointment } from "@/app/types/appointment";

// ==============================
// Map Backend -> Frontend
// ==============================

const mapAppointment = (item: any): Appointment => ({
  id: item.id,

  patientName:
    item.patient_name ??
    item.patientName ??
    "",

  phone:
    item.phone ??
    "",

  email:
    item.email ??
    "",

  doctor:
    item.doctor ??
    "",

  treatment:
    item.treatment ??
    "",

  appointmentDate:
    item.appointment_date ??
    item.appointmentDate ??
    "",

  appointmentTime:
    item.appointment_time ??
    item.appointmentTime ??
    "",

  message:
    item.message ??
    "",

  status:
    item.status ??
    "Pending",

  payment:
    item.payment ??
    "Pending",
});

// ==============================
// GET ALL
// ==============================

export async function getAppointments(): Promise<Appointment[]> {

  const response = await apiRequest("/api/appointments");

  const data = Array.isArray(response)
    ? response
    : response.data ?? [];

  return data.map(mapAppointment);
}

// ==============================
// GET BY ID
// ==============================

export async function getAppointmentById(
  id: number
): Promise<Appointment> {

  const response = await apiRequest(
    `/api/appointments/${id}`
  );

  return mapAppointment(
    response.data ?? response
  );
}

// ==============================
// CREATE
// ==============================

export async function createAppointment(
  data: Partial<Appointment>
) {

  return await apiRequest(
    "/api/appointments",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );

}

// ==============================
// UPDATE
// ==============================

export async function updateAppointment(
  id: number,
  data: Partial<Appointment>
) {

  return await apiRequest(
    `/api/appointments/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );

}

// ==============================
// UPDATE STATUS
// ==============================

export async function updateAppointmentStatus(
  id: number,
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled"
) {

  return await apiRequest(
    `/api/appointments/${id}/status`,
    {
      method: "PATCH",
      body: JSON.stringify({
        status,
      }),
    }
  );

}

// ==============================
// UPDATE PAYMENT
// ==============================

export async function updateAppointmentPayment(
  id: number,
  payment: "Pending" | "Paid"
) {

  return await apiRequest(
    `/api/appointments/${id}/payment`,
    {
      method: "PATCH",
      body: JSON.stringify({
        payment,
      }),
    }
  );

}

// ==============================
// DELETE
// ==============================

export async function deleteAppointment(
  id: number
) {

  return await apiRequest(
    `/api/appointments/${id}`,
    {
      method: "DELETE",
    }
  );

}