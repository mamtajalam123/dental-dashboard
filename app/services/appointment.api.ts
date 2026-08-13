import * as appointmentService from "./appointment.service";

import { Appointment } from "@/app/types/appointment";


export const appointmentAPI = {


  // ==========================
  // GET ALL APPOINTMENTS
  // ==========================

  async getAll(): Promise<Appointment[]> {

    return await appointmentService.getAppointments();

  },



  // ==========================
  // GET APPOINTMENT BY ID
  // ==========================

  async getById(
    id: number
  ): Promise<Appointment> {

    return await appointmentService.getAppointmentById(
      id
    );

  },



  // ==========================
  // CREATE APPOINTMENT
  // ==========================

  async create(
    data: Partial<Appointment>
  ) {

    return await appointmentService.createAppointment(
      data
    );

  },



  // ==========================
  // UPDATE APPOINTMENT
  // ==========================

  async update(
    id: number,
    data: Partial<Appointment>
  ) {

    return await appointmentService.updateAppointment(
      id,
      data
    );

  },



  // ==========================
  // DELETE APPOINTMENT
  // ==========================

  async delete(
    id: number
  ) {

    return await appointmentService.deleteAppointment(
      id
    );

  },



  // ==========================
  // UPDATE STATUS
  // ==========================

  async updateStatus(
    id: number,
    status:
      | "Pending"
      | "Confirmed"
      | "Completed"
      | "Cancelled"
  ) {

    return await appointmentService.updateAppointmentStatus(
      id,
      status
    );

  },



  // ==========================
  // UPDATE PAYMENT
  // ==========================

  async updatePayment(
    id: number,
    payment:
      | "Pending"
      | "Paid"
  ) {

    return await appointmentService.updateAppointmentPayment(
      id,
      payment
    );

  },


};