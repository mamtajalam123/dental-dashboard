"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import { feedbackData } from "@/data/feedback";
import { Feedback } from "@/types/feedback";

import FeedbackFilters from "./FeedbackFilters";
import FeedbackActions from "./FeedbackActions";
import FeedbackStatus from "./FeedbackStatus";
import RatingStars from "./RatingStars";
import DeleteFeedbackModal from "./DeleteFeedbackModal";

const ITEMS_PER_PAGE = 10;

export default function FeedbackTable() {
  const [feedbacks, setFeedbacks] =
    useState<Feedback[]>(feedbackData);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");
  const [treatment, setTreatment] = useState("");

  const [page, setPage] = useState(1);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedFeedback, setSelectedFeedback] =
    useState<Feedback | null>(null);

  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter((item) => {
      const matchesSearch =
        search === "" ||
        item.patientName
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "" ||
        item.status === status;

      const matchesRating =
        rating === "" ||
        item.rating === Number(rating);

      const matchesTreatment =
        treatment === "" ||
        item.treatment
          .toLowerCase()
          .includes(treatment.toLowerCase());

      return (
        matchesSearch &&
        matchesStatus &&
        matchesRating &&
        matchesTreatment
      );
    });
  }, [
    feedbacks,
    search,
    status,
    rating,
    treatment,
  ]);

  const totalPages = Math.ceil(
    filteredFeedbacks.length / ITEMS_PER_PAGE
  );

  const paginatedFeedbacks =
    filteredFeedbacks.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
    );

  const handleDelete = (id: number) => {
    const item = feedbacks.find(
      (feedback) => feedback.id === id
    );

    if (!item) return;

    setSelectedFeedback(item);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedFeedback) return;

    setFeedbacks((prev) =>
      prev.filter(
        (item) =>
          item.id !== selectedFeedback.id
      )
    );

    setDeleteOpen(false);
    setSelectedFeedback(null);
  };

  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setRating("");
    setTreatment("");
    setPage(1);
  };

  return (
    <div className="space-y-6">

      <FeedbackFilters
        search={search}
        setSearch={(value) => {
          setSearch(value);
          setPage(1);
        }}
        status={status}
        setStatus={(value) => {
          setStatus(value);
          setPage(1);
        }}
        rating={rating}
        setRating={(value) => {
          setRating(value);
          setPage(1);
        }}
        treatment={treatment}
        setTreatment={(value) => {
          setTreatment(value);
          setPage(1);
        }}
        onClear={clearFilters}
      />

      {/* Table starts here */}
            <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="min-w-full">

            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200 text-left text-sm font-semibold text-slate-600">

                <th className="px-6 py-4">Patient</th>

                <th className="px-6 py-4">Treatment</th>

                <th className="px-6 py-4">Rating</th>

                <th className="px-6 py-4">Status</th>

                <th className="px-6 py-4">Date</th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {paginatedFeedbacks.length === 0 ? (

                <tr>
                  <td
                    colSpan={6}
                    className="py-14 text-center text-slate-500"
                  >
                    No feedback found.
                  </td>
                </tr>

              ) : (

                paginatedFeedbacks.map((feedback) => (

                  <tr
                    key={feedback.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >

                    {/* Patient */}

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-4">

                        <Image
                          src={feedback.patientImage}
                          alt={feedback.patientName}
                          width={52}
                          height={52}
                          className="rounded-full object-cover"
                        />

                        <div>

                          <h3 className="font-semibold text-slate-800">
                            {feedback.patientName}
                          </h3>

                          <p className="text-sm text-slate-500">
                            Patient
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Treatment */}

                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-700">
                        {feedback.treatment}
                      </span>
                    </td>

                    {/* Rating */}

                    <td className="px-6 py-4">
                      <RatingStars
                        rating={feedback.rating}
                      />
                    </td>

                    {/* Status */}

                    <td className="px-6 py-4">
                      <FeedbackStatus
                        status={feedback.status}
                      />
                    </td>

                    {/* Date */}

                    <td className="px-6 py-4 text-slate-600">
                      {feedback.date}
                    </td>

                    {/* Actions */}

                    <td className="px-6 py-4">

                      <FeedbackActions
                        id={feedback.id}
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

      {/* Mobile Cards */}
            <div className="grid gap-4 lg:hidden">
        {paginatedFeedbacks.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            No feedback found.
          </div>
        ) : (
          paginatedFeedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={feedback.patientImage}
                  alt={feedback.patientName}
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">
                    {feedback.patientName}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {feedback.treatment}
                  </p>

                  <div className="mt-2">
                    <RatingStars rating={feedback.rating} />
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <FeedbackStatus
                  status={feedback.status}
                />

                <span className="text-sm text-slate-500">
                  {feedback.date}
                </span>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-4">
                <FeedbackActions
                  id={feedback.id}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}

      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm md:flex-row">

          <p className="text-sm text-slate-600">
            Showing{" "}
            <span className="font-semibold">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>
            {" "}to{" "}
            <span className="font-semibold">
              {Math.min(
                page * ITEMS_PER_PAGE,
                filteredFeedbacks.length
              )}
            </span>
            {" "}of{" "}
            <span className="font-semibold">
              {filteredFeedbacks.length}
            </span>{" "}
            feedbacks
          </p>

          <div className="flex items-center gap-2">

            <button
              type="button"
              disabled={page === 1}
              onClick={() =>
                setPage((prev) =>
                  Math.max(prev - 1, 1)
                )
              }
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    setPage(index + 1)
                  }
                  className={`h-10 w-10 rounded-lg text-sm font-medium transition ${
                    page === index + 1
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}

            <button
              type="button"
              disabled={page === totalPages}
              onClick={() =>
                setPage((prev) =>
                  Math.min(prev + 1, totalPages)
                )
              }
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>

          </div>

        </div>
      )}

      {/* Delete Modal */}

      <DeleteFeedbackModal
        open={deleteOpen}
        patientName={
          selectedFeedback?.patientName ?? ""
        }
        onClose={() => {
          setDeleteOpen(false);
          setSelectedFeedback(null);
        }}
        onConfirm={confirmDelete}
      />
          </div>
  );
}