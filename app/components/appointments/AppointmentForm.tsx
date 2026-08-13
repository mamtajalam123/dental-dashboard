"use client";

import { useEffect, useState } from "react";


import { categoryAPI } from "@/app/services/category.api";
import { teamAPI } from "@/app/services/team.api";

import { Category } from "@/app/types/category";
import { Team } from "@/app/types/team";

export interface AppointmentFormData {
  patientName: string;
  phone: string;
  email: string;
  doctor: string;
  treatment: string;
  appointmentDate: string;
  appointmentTime: string;
  message: string;
}

interface AppointmentFormProps {
  initialData?: AppointmentFormData;

  submitLabel?: string;

  onSubmit: (
    data: AppointmentFormData
  ) => Promise<void>;
}

export default function AppointmentForm({
  initialData,
  submitLabel = "Save Appointment",
  onSubmit,
}: AppointmentFormProps) {

  const emptyForm: AppointmentFormData = {
    patientName: "",
    phone: "",
    email: "",
    doctor: "",
    treatment: "",
    appointmentDate: "",
    appointmentTime: "",
    message: "",
  };

  const [form, setForm] =
    useState<AppointmentFormData>(
      initialData || emptyForm
    );

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [doctors, setDoctors] =
    useState<Team[]>([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    loadCategories();

    loadDoctors();

  }, []);

  useEffect(() => {

    if (initialData) {

      setForm(initialData);

    }

  }, [initialData]);

  const loadCategories = async () => {

    try {

      const data =
        await categoryAPI.getAll();

      setCategories(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(
        "Category Error",
        error
      );

    }

  };

  const loadDoctors = async () => {

    try {

      const data =
        await teamAPI.getAll();

      setDoctors(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(
        "Doctor Error",
        error
      );

    }

  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      await onSubmit(form);

      if (!initialData) {

        setForm(emptyForm);

      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const handleReset = () => {

    if (initialData) {

      setForm(initialData);

    } else {

      setForm(emptyForm);

    }

  };

  return (
    
    

    <form
    
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
    >

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Patient */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Patient Name
          </label>

          <input
            type="text"
            name="patientName"
            value={form.patientName}
            onChange={handleChange}
            required
            className="w-full rounded-xl border px-4 py-3"
          />

        </div>

        {/* Phone */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full rounded-xl border px-4 py-3"
          />

        </div>

        {/* Email */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border px-4 py-3"
          />

        </div>

        {/* Doctor */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Doctor
          </label>

          <select
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
            required
            className="w-full rounded-xl border px-4 py-3"
          >

            <option value="">
              Select Doctor
            </option>

            {doctors.map((doctor) => (

              <option
                key={doctor.id}
                value={doctor.name}
              >
                {doctor.name}
              </option>

            ))}

          </select>

        </div>

        {/* Treatment */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Treatment
          </label>

          <select
            name="treatment"
            value={form.treatment}
            onChange={handleChange}
            required
            className="w-full rounded-xl border px-4 py-3"
          >

            <option value="">
              Select Treatment
            </option>

            {categories.map((category) => (

              <option
                key={category.id}
                value={category.name}
              >
                {category.name}
              </option>

            ))}

          </select>

        </div>

        {/* Date */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Appointment Date
          </label>

          <input
            type="date"
            name="appointmentDate"
            value={form.appointmentDate}
            onChange={handleChange}
            required
            className="w-full rounded-xl border px-4 py-3"
          />

        </div>

        {/* Time */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Appointment Time
          </label>

          <input
            type="time"
            name="appointmentTime"
            value={form.appointmentTime}
            onChange={handleChange}
            required
            className="w-full rounded-xl border px-4 py-3"
          />

        </div>

      </div>

      {/* Message */}

      <div className="mt-6">

        <label className="mb-2 block text-sm font-medium">
          Message
        </label>

        <textarea
          rows={5}
          name="message"
          value={form.message}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-3"
        />

      </div>

      {/* Buttons */}

      <div className="mt-8 flex justify-end gap-4">

        <button
          type="button"
          onClick={handleReset}
          disabled={loading}
          className="rounded-xl border border-slate-300 px-6 py-3"
        >
          Reset
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : submitLabel}
        </button>

      </div>

    </form>

  );

}