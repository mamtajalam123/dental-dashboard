"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import { Plus, SearchX } from "lucide-react";

import AppointmentFilters from "./AppointmentFilters";
import AppointmentStats from "./AppointmentStatus";
import AppointmentRow from "./AppointmentRow";
import AppointmentPagination from "./AppointmentPagination";
import DeleteAppointmentModal from "./DeleteAppointmentModal";

import { appointmentAPI } from "@/app/services/appointment.api";
import { Appointment } from "@/app/types/appointment";

const ITEMS_PER_PAGE = 10;

export default function AppointmentTable() {

  // ===========================
  // DATA
  // ===========================

  const [appointments, setAppointments] =
    useState<Appointment[]>([]);

  const [loading, setLoading] =
    useState(true);

  // ===========================
  // FILTERS
  // ===========================

  const [search, setSearch] =
    useState("");

  const [treatment, setTreatment] =
    useState("All");

  const [doctor, setDoctor] =
    useState("All");

  const [status, setStatus] =
    useState("All");

  const [payment, setPayment] =
    useState("All");

  const [date, setDate] =
    useState("");

  const [sort, setSort] =
    useState("newest");

  // ===========================
  // PAGINATION
  // ===========================

  const [currentPage, setCurrentPage] =
    useState(1);

  // ===========================
  // DELETE
  // ===========================

  const [
    selectedAppointment,
    setSelectedAppointment,
  ] = useState<Appointment | null>(null);

  const [showDelete, setShowDelete] =
    useState(false);

  // ===========================
  // LOAD DATA
  // ===========================

  useEffect(() => {

    loadAppointments();

  }, []);

  const loadAppointments = async () => {

    try {

      setLoading(true);

      const data =
        await appointmentAPI.getAll();

      setAppointments(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(
        "Appointment Load Error:",
        error
      );

      setAppointments([]);

    } finally {

      setLoading(false);

    }

  };
    // ===========================
  // FILTER APPOINTMENTS
  // ===========================

  const filteredAppointments =
    useMemo(() => {

      let data = [...appointments];

      // Search

      if (search.trim()) {

        const keyword =
          search.toLowerCase();

        data = data.filter((item) =>

          item.patientName
            ?.toLowerCase()
            .includes(keyword)

          ||

          item.phone
            ?.toLowerCase()
            .includes(keyword)

          ||

          item.email
            ?.toLowerCase()
            .includes(keyword)

        );

      }

      // Treatment

      if (treatment !== "All") {

        data = data.filter(
          (item) =>
            item.treatment === treatment
        );

      }

      // Doctor

      if (doctor !== "All") {

        data = data.filter(
          (item) =>
            item.doctor === doctor
        );

      }

      // Status

      if (status !== "All") {

        data = data.filter(
          (item) =>
            item.status === status
        );

      }

      // Payment

      if (payment !== "All") {

        data = data.filter(
          (item) =>
            item.payment === payment
        );

      }

      // Date

      if (date) {

        data = data.filter(
          (item) =>
            item.appointmentDate === date
        );

      }

      // Sort

      data.sort((a, b) => {

        const first =
          new Date(
            a.appointmentDate
          ).getTime();

        const second =
          new Date(
            b.appointmentDate
          ).getTime();

        return sort === "newest"
          ? second - first
          : first - second;

      });

      return data;

    }, [
      appointments,
      search,
      treatment,
      doctor,
      status,
      payment,
      date,
      sort,
    ]);

  // ===========================
  // PAGINATION
  // ===========================

  const totalPages =
    Math.ceil(
      filteredAppointments.length /
      ITEMS_PER_PAGE
    );

  const paginatedAppointments =
    filteredAppointments.slice(

      (currentPage - 1) *
        ITEMS_PER_PAGE,

      currentPage *
        ITEMS_PER_PAGE

    );

  // ===========================
  // RESET FILTERS
  // ===========================

  const handleReset = () => {

    setSearch("");

    setTreatment("All");

    setDoctor("All");

    setStatus("All");

    setPayment("All");

    setDate("");

    setSort("newest");

    setCurrentPage(1);

  };

  // ===========================
  // DELETE
  // ===========================

  const handleDeleteClick = (
    appointment: Appointment
  ) => {

    setSelectedAppointment(
      appointment
    );

    setShowDelete(true);

  };

  const handleDelete =
    async () => {

      if (!selectedAppointment)
        return;

      try {

        await appointmentAPI.delete(
          selectedAppointment.id!
        );

        await loadAppointments();

        setShowDelete(false);

        setSelectedAppointment(
          null
        );

      } catch (error) {

        console.error(error);

      }

    };

  // ===========================
  // STATUS UPDATE
  // ===========================

const handleStatusChange = async (
  id:number,
  status:string
) => {

  try {

    await appointmentAPI.updateStatus(
      id,
      status
    );


    // Update UI immediately
    setAppointments((prev)=> 
      prev.map((appointment)=>

        appointment.id === id

          ? {
              ...appointment,
              status: status
            }

          : appointment

      )
    );


  } catch(error){

    console.error(
      "Status update failed:",
      error
    );

  }

};

  // ===========================
  // PAYMENT UPDATE
  // ===========================

  const handlePaymentChange =
    async (
      id: number,
      payment:
        | "Pending"
        | "Paid"
        | "Partially Paid"
        | "Refunded"
    ) => {

      try {

        await appointmentAPI.updatePayment(
          id,
          payment
        );

      

       

      } catch (error) {

        console.error(error);

      }

    };
    if (loading) {

  return (

    <div className="rounded-2xl border bg-white p-10 text-center">

      Loading appointments...

    </div>

  );

}

return (

  <div className="space-y-6">

    {/* ========================= */}
    {/* Header */}
    {/* ========================= */}

    <div className="flex items-center justify-between">

      <div>

        <h1 className="text-3xl font-bold">
          Appointments
        </h1>

        <p className="mt-1 text-slate-500">
          Manage all patient appointments.
        </p>

      </div>

      <Link
        href="/dashboard/appointments/add"
        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-800"
      >
        <Plus size={18} />
        Add Appointment
      </Link>

    </div>

    {/* ========================= */}
    {/* Statistics */}
    {/* ========================= */}

    <AppointmentStats
      appointments={appointments}
    />

    {/* ========================= */}
    {/* Filters */}
    {/* ========================= */}

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

      onClear={handleReset}

    />

    {/* ========================= */}
    {/* Table */}
    {/* ========================= */}

    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-50">

            <tr className="text-left text-sm font-semibold text-slate-700">

              <th className="px-5 py-4">
                Patient
              </th>

              <th className="px-5 py-4">
                Doctor
              </th>

              <th className="px-5 py-4">
                Treatment
              </th>

              <th className="px-5 py-4">
                Date & Time
              </th>

              <th className="px-5 py-4">
                Status
              </th>

              <th className="px-5 py-4">
                Payment
              </th>

              <th className="px-5 py-4 text-right">
                Action
              </th>

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
                    className="py-20"
                  >

                    <div className="flex flex-col items-center gap-3">

                      <SearchX
                        size={48}
                        className="text-slate-400"
                      />

                      <h3 className="text-lg font-semibold">

                        No appointments found

                      </h3>

                      <p className="text-sm text-slate-500">

                        Try changing the filters.

                      </p>

                    </div>

                  </td>

                </tr>

              )

              :

              paginatedAppointments.map(
                (appointment) => (

                  <AppointmentRow

                    key={appointment.id}

                    appointment={appointment}

                    onStatusChange={
                      handleStatusChange
                    }

                    onPaymentChange={
                      handlePaymentChange
                    }

                    onDelete={
                      handleDeleteClick
                    }

                  />

                )
              )

            }

          </tbody>

        </table>

      </div>

    </div>

    {/* ========================= */}
    {/* Pagination */}
    {/* ========================= */}

    {

      totalPages > 1 && (

      <AppointmentPagination
  currentPage={currentPage}
  totalPages={totalPages}
  totalItems={filteredAppointments.length}
  itemsPerPage={ITEMS_PER_PAGE}
  onPageChange={setCurrentPage}
/>

      )

    }

    {/* ========================= */}
    {/* Delete Modal */}
    {/* ========================= */}

  <DeleteAppointmentModal
        open={showDelete}
        appointment={selectedAppointment}
        onClose={() => {
          setShowDelete(false);
          setSelectedAppointment(null);
        }}
        onConfirm={handleDelete}
      />

  </div>

);
}