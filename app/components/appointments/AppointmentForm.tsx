"use client";

import { useState } from "react";

interface AppointmentFormProps {
  initialData?: {
    patientName?: string;
    phone?: string;
    email?: string;
    doctor?: string;
    treatment?: string;
    appointmentDate?: string;
    appointmentTime?: string;
    message?: string;
  };

  onSubmit: (
    data: any
  ) => void | Promise<void>;

  submitLabel?: string;
}

export default function AppointmentForm({
  initialData,
  onSubmit,
  submitLabel = "Save Appointment",
}: AppointmentFormProps) {

  const [form, setForm] = useState({
    patientName: initialData?.patientName || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    doctor: initialData?.doctor || "",
    treatment: initialData?.treatment || "",
    appointmentDate:
      initialData?.appointmentDate || "",
    appointmentTime:
      initialData?.appointmentTime || "",
    message:
      initialData?.message || "",
  });


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {

    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  };


  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      await onSubmit(form);

    } catch(error){

      console.error(
        "Appointment submit error:",
        error
      );

    }

  };


  const handleReset = () => {

    setForm({
      patientName: "",
      phone: "",
      email: "",
      doctor: "",
      treatment: "",
      appointmentDate: "",
      appointmentTime: "",
      message: "",
    });

  };


  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
    >

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">


        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Patient Name
          </label>

          <input
            type="text"
            name="patientName"
            value={form.patientName}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
            placeholder="Enter patient name"
          />
        </div>



        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
            placeholder="Enter phone number"
          />
        </div>



        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
            placeholder="Enter email"
          />
        </div>



        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Doctor
          </label>

          <select
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            <option value="">
              Select Doctor
            </option>

            <option>
              Dr. Sultan
            </option>

            <option>
              Dr. Ahmed
            </option>

            <option>
              Dr. Khan
            </option>

          </select>

        </div>



        <div>
          <label className="mb-2 block text-sm-medium text-slate-700">
            Treatment
          </label>

          <select
            name="treatment"
            value={form.treatment}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >

            <option value="">
              Select Treatment
            </option>

            <option>
              Dental Cleaning
            </option>

            <option>
              Root Canal
            </option>

            <option>
              Dental Implant
            </option>

            <option>
              Teeth Whitening
            </option>

            <option>
              Braces
            </option>

            <option>
              Consultation
            </option>

          </select>

        </div>



        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Appointment Date
          </label>

          <input
            type="date"
            name="appointmentDate"
            value={form.appointmentDate}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />

        </div>



        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Appointment Time
          </label>

          <input
            type="time"
            name="appointmentTime"
            value={form.appointmentTime}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          />

        </div>


      </div>


      <div className="mt-6">

        <label className="mb-2 block text-sm font-medium text-slate-700">
          Message
        </label>

        <textarea
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
          placeholder="Additional notes..."
        />

      </div>



      <div className="mt-8 flex justify-end gap-4">


        <button
          type="button"
          onClick={handleReset}
          className="rounded-xl border border-slate-300 px-6 py-3"
        >
          Reset
        </button>


        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
        >
          {submitLabel}
        </button>


      </div>


    </form>
  );
}