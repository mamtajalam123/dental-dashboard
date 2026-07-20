"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { appointmentAPI } from "@/app/lib/api";
import { Appointment } from "@/types/appointment";

import AppointmentFilters from "./AppointmentFilters";
import AppointmentStatus from "./AppointmentStatus";
import PaymentStatus from "./PaymentStatus";
import AppointmentActions from "./AppointmentActions";
import DeleteAppointmentModal from "./DeleteAppointmentModal";
import AppointmentTableLoading from "./AppointmentTableLoading";

const ITEMS_PER_PAGE = 10;

export default function AppointmentTable() {
  const [appointments, setAppointments] =
    useState<Appointment[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [treatment, setTreatment] =
    useState("");

  const [doctor, setDoctor] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [payment, setPayment] =
    useState("");

  const [date, setDate] =
    useState("");

  const [sort, setSort] =
    useState("newest");

  const [page, setPage] =
    useState(1);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [
    selectedAppointment,
    setSelectedAppointment,
  ] = useState<Appointment | null>(null);

  // Load appointments from API
  const loadAppointments = async () => {
    try {
      setLoading(true);

      const response =
        await appointmentAPI.getAll();

      setAppointments(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // First Load
  useEffect(() => {
    loadAppointments();
  }, []);

  // Reset pagination on filter change
  useEffect(() => {
    setPage(1);
  }, [
    search,
    treatment,
    doctor,
    status,
    payment,
    date,
    sort,
  ]);

  // Filter appointments
  const filteredAppointments =
    useMemo(() => {
      let data = [...appointments];

      if (search) {
        data = data.filter((item) =>
          item.patientName
            .toLowerCase()
            .includes(search.toLowerCase())
        );
      }

      if (treatment) {
        data = data.filter(
          (item) =>
            item.treatment === treatment
        );
      }

      if (doctor) {
        data = data.filter(
          (item) =>
            item.doctor === doctor
        );
      }

      if (status) {
        data = data.filter(
          (item) =>
            item.status === status
        );
      }

      if (payment) {
        data = data.filter(
          (item) =>
            item.payment === payment
        );
      }

      if (date) {
        data = data.filter(
          (item) =>
            item.appointmentDate === date
        );
      }

      data.sort((a, b) => {
        if (sort === "newest") {
          return (b.id ?? 0) - (a.id ?? 0);
        }

        return (a.id ?? 0) - (b.id ?? 0);
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

  const totalPages = Math.ceil(
    filteredAppointments.length /
      ITEMS_PER_PAGE
  );

  const paginatedAppointments =
    filteredAppointments.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
    );

  const clearFilters = () => {
    setSearch("");
    setTreatment("");
    setDoctor("");
    setStatus("");
    setPayment("");
    setDate("");
    setSort("newest");
    setPage(1);
  };
    // Update Appointment Status
  const handleStatusChange = async (
    id: number,
    value: Appointment["status"]
  ) => {
    try {
      await appointmentAPI.updateStatus(
        id,
        value!
      );

      await loadAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  // Update Payment Status
  const handlePaymentChange = async (
    id: number,
    value: Appointment["payment"]
  ) => {
    try {
      await appointmentAPI.updatePayment(
        id,
        value!
      );

      await loadAppointments();
    } catch (error) {
      console.error(error);
    }
  };

  // Open Delete Modal
  const handleDelete = (id: number) => {
    const appointment =
      appointments.find(
        (item) => item.id === id
      );

    if (!appointment) return;

    setSelectedAppointment(appointment);

    setDeleteOpen(true);
  };

  // Delete Appointment
  const confirmDelete = async () => {
    if (!selectedAppointment) return;

    try {
      await appointmentAPI.delete(
        selectedAppointment.id!
      );

      await loadAppointments();

      setDeleteOpen(false);

      setSelectedAppointment(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Statistics
  const totalAppointments =
    appointments.length;

  const pendingAppointments =
    appointments.filter(
      (item) =>
        item.status === "Pending"
    ).length;

  const confirmedAppointments =
    appointments.filter(
      (item) =>
        item.status === "Confirmed"
    ).length;

  const completedAppointments =
    appointments.filter(
      (item) =>
        item.status === "Completed"
    ).length;

  // Loading Skeleton
  if (loading) {
    return <AppointmentTableLoading />;
  }

  return (
    <div className="space-y-6">

      {/* Statistics */}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Appointments
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            {totalAppointments}
          </h2>
        </div>

        <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
          <p className="text-yellow-700">
            Pending
          </p>

          <h2 className="mt-3 text-3xl font-bold text-yellow-700">
            {pendingAppointments}
          </h2>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <p className="text-blue-700">
            Confirmed
          </p>

          <h2 className="mt-3 text-3xl font-bold text-blue-700">
            {confirmedAppointments}
          </h2>
        </div>

        <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
          <p className="text-green-700">
            Completed
          </p>

          <h2 className="mt-3 text-3xl font-bold text-green-700">
            {completedAppointments}
          </h2>
        </div>

      </div>

      {/* Header */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Appointment List
          </h2>

          <p className="mt-1 text-slate-500">
            Manage online and offline patient appointments.
          </p>
        </div>

        <Link
          href="/dashboard/appointments/add"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
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

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Patient
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Treatment
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Doctor
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Appointment
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                  Payment
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {paginatedAppointments.length === 0 ? (

                <tr>

                  <td
                    colSpan={7}
                    className="px-6 py-16 text-center text-slate-500"
                  >
                    No appointments found.
                  </td>

                </tr>

              ) : (

                paginatedAppointments.map((appointment) => (

                  <tr
                    key={appointment.id}
                    className="border-t border-slate-200 transition hover:bg-slate-50"
                  >

                    {/* Patient */}

                    <td className="px-6 py-5">

                      <div>

                        <h3 className="font-semibold text-slate-800">
                          {appointment.patientName}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {appointment.phone}
                        </p>

                        <p className="text-sm text-slate-500">
                          {appointment.email}
                        </p>

                      </div>

                    </td>

                    {/* Treatment */}

                    <td className="px-6 py-5">

                      <span className="font-medium text-slate-700">
                        {appointment.treatment}
                      </span>

                    </td>

                    {/* Doctor */}

                    <td className="px-6 py-5">

                      <span className="text-slate-700">
                        {appointment.doctor}
                      </span>

                    </td>

                    {/* Appointment Date */}

                    <td className="px-6 py-5">

                      <div>

                        <p className="font-medium text-slate-700">
                          {appointment.appointmentDate}
                        </p>

                        <p className="text-sm text-slate-500">
                          {appointment.appointmentTime || "--"}
                        </p>

                      </div>

                    </td>

                    {/* Status */}

                    <td className="px-6 py-5 text-center">

                      <AppointmentStatus
                        status={appointment.status}
                      />

                    </td>

                    {/* Payment */}

                    <td className="px-6 py-5 text-center">

                      <PaymentStatus
                        status={appointment.payment}
                      />

                    </td>

                    {/* Actions */}

                    <td className="px-6 py-5 text-center">

                      <AppointmentActions
                        id={appointment.id!}
                        phone={appointment.phone}
                        email={appointment.email ?? ""}
                        status={appointment.status}
                        payment={appointment.payment}
                        onStatusChange={handleStatusChange}
                        onPaymentChange={handlePaymentChange}
                        onDelete={handleDelete}
                      />

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>
            {/* Pagination */}

      {totalPages > 1 && (
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-6 py-4">

          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            -
            <span className="font-semibold">
              {" "}
              {Math.min(
                page * ITEMS_PER_PAGE,
                filteredAppointments.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-semibold">
              {filteredAppointments.length}
            </span>{" "}
            appointments
          </p>

          <div className="flex items-center gap-2">

            <button
              onClick={() =>
                setPage((prev) =>
                  Math.max(prev - 1, 1)
                )
              }
              disabled={page === 1}
              className="
                rounded-lg
                border
                border-slate-300
                px-4
                py-2
                text-sm
                transition
                hover:bg-slate-100
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Previous
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setPage(index + 1)
                  }
                  className={`
                    h-10
                    w-10
                    rounded-lg
                    text-sm
                    font-semibold
                    transition
                    ${
                      page === index + 1
                        ? "bg-blue-600 text-white"
                        : "border border-slate-300 hover:bg-slate-100"
                    }
                  `}
                >
                  {index + 1}
                </button>
              )
            )}

            <button
              onClick={() =>
                setPage((prev) =>
                  Math.min(prev + 1, totalPages)
                )
              }
              disabled={page === totalPages}
              className="
                rounded-lg
                border
                border-slate-300
                px-4
                py-2
                text-sm
                transition
                hover:bg-slate-100
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Next
            </button>

          </div>

        </div>
      )}

      {/* Delete Modal */}

      <DeleteAppointmentModal
        open={deleteOpen}
        appointment={selectedAppointment}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedAppointment(null);
        }}
        onConfirm={confirmDelete}
      />

    </div>
  );
}