"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Image from "next/image";

import { Feedback } from "@/types/feedback";
import { Category } from "@/app/types/category";

import { feedbackAPI } from "@/app/services/feedback.api";
import { categoryAPI } from "@/app/services/category.api";

import FeedbackFilters from "./FeedbackFilters";
import FeedbackActions from "./FeedbackActions";
import FeedbackStatus from "./FeedbackStatus";
import RatingStars from "./RatingStars";
import DeleteFeedbackModal from "./DeleteFeedbackModal";

const ITEMS_PER_PAGE = 10;

const DEFAULT_IMAGE =
  "/images/default-user.png";

interface Props {
  feedbacks: Feedback[];

  setFeedbacks: React.Dispatch<
    React.SetStateAction<Feedback[]>
  >;
}

export default function FeedbackTable({
  feedbacks,
  setFeedbacks,
}: Props) {
  // =====================================================
  // FILTER STATES
  // =====================================================

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [rating, setRating] =
    useState("");

  const [treatment, setTreatment] =
    useState("");

  // =====================================================
  // CATEGORY / TREATMENT STATES
  // =====================================================

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [
    categoriesLoading,
    setCategoriesLoading,
  ] = useState(false);

  // =====================================================
  // PAGINATION
  // =====================================================

  const [page, setPage] =
    useState(1);

  // =====================================================
  // DELETE STATES
  // =====================================================

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [
    selectedFeedback,
    setSelectedFeedback,
  ] = useState<Feedback | null>(null);

  const [
    deleteLoading,
    setDeleteLoading,
  ] = useState(false);

  // =====================================================
  // LOAD CATEGORIES
  // =====================================================

  useEffect(() => {
    let mounted = true;

    const loadCategories =
      async () => {
        try {
          setCategoriesLoading(
            true
          );

          const response =
            await categoryAPI.getAll();

          if (!mounted) {
            return;
          }

          const data =
            Array.isArray(response)
              ? response
              : Array.isArray(
                    (
                      response as {
                        data?: Category[];
                      }
                    )?.data
                  )
                ? (
                    response as {
                      data: Category[];
                    }
                  ).data
                : [];

          setCategories(data);
        } catch (error) {
          console.error(
            "LOAD FEEDBACK CATEGORIES ERROR:",
            error
          );

          if (mounted) {
            setCategories([]);
          }
        } finally {
          if (mounted) {
            setCategoriesLoading(
              false
            );
          }
        }
      };

    loadCategories();

    return () => {
      mounted = false;
    };
  }, []);

  // =====================================================
  // PATIENT IMAGE URL
  // =====================================================

  const getImageUrl = (
    image?: string | null
  ): string => {
    // -----------------------------------------------
    // No image
    // -----------------------------------------------

    if (
      !image ||
      !image.trim()
    ) {
      return DEFAULT_IMAGE;
    }

    const imagePath =
      image.trim();

    // -----------------------------------------------
    // Already complete URL
    // -----------------------------------------------

    if (
      imagePath.startsWith(
        "http://"
      ) ||
      imagePath.startsWith(
        "https://"
      ) ||
      imagePath.startsWith(
        "blob:"
      ) ||
      imagePath.startsWith(
        "data:"
      )
    ) {
      console.log(
        "========== PATIENT IMAGE =========="
      );

      console.log(
        "IMAGE FROM API:",
        image
      );

      console.log(
        "FINAL IMAGE URL:",
        imagePath
      );

      console.log(
        "==================================="
      );

      return imagePath;
    }

    // -----------------------------------------------
    // API BASE URL
    // -----------------------------------------------

    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:5000";

    // -----------------------------------------------
    // Clean API URL
    // -----------------------------------------------

    const serverUrl =
      apiUrl
        .replace(/\/+$/, "")
        .replace(/\/api$/, "");

    // -----------------------------------------------
    // Clean image path
    // -----------------------------------------------

    let cleanImagePath =
      imagePath.replace(
        /^\/+/,
        ""
      );

    // -----------------------------------------------
    // If database accidentally stores /api/
    // remove it for static uploaded files.
    //
    // Example:
    // /api/uploads/feedback/a.jpg
    //
    // becomes:
    // uploads/feedback/a.jpg
    // -----------------------------------------------

    cleanImagePath =
      cleanImagePath.replace(
        /^api\//,
        ""
      );

    // -----------------------------------------------
    // Final URL
    // -----------------------------------------------

    const finalUrl =
      `${serverUrl}/${cleanImagePath}`;

    // -----------------------------------------------
    // DEBUG
    // -----------------------------------------------

    console.log(
      "========== PATIENT IMAGE =========="
    );

    console.log(
      "IMAGE FROM API:",
      image
    );

    console.log(
      "API URL:",
      apiUrl
    );

    console.log(
      "SERVER URL:",
      serverUrl
    );

    console.log(
      "CLEAN IMAGE PATH:",
      cleanImagePath
    );

    console.log(
      "FINAL IMAGE URL:",
      finalUrl
    );

    console.log(
      "==================================="
    );

    return finalUrl;
  };

  // =====================================================
  // FILTER FEEDBACKS
  // =====================================================

  const filteredFeedbacks =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLowerCase();

      const normalizedTreatment =
        treatment
          .trim()
          .toLowerCase();

      return feedbacks.filter(
        (item) => {
          const patientName =
            String(
              item.patientName ?? ""
            )
              .trim()
              .toLowerCase();

          const treatmentName =
            String(
              item.treatment ?? ""
            )
              .trim()
              .toLowerCase();

          const searchMatch =
            normalizedSearch === "" ||
            patientName.includes(
              normalizedSearch
            ) ||
            treatmentName.includes(
              normalizedSearch
            );

          const statusMatch =
            status === "" ||
            String(
              item.status ?? ""
            ) === status;

          const ratingMatch =
            rating === "" ||
            Number(
              item.rating
            ) === Number(rating);

          const treatmentMatch =
            normalizedTreatment ===
              "" ||
            treatmentName ===
              normalizedTreatment;

          return (
            searchMatch &&
            statusMatch &&
            ratingMatch &&
            treatmentMatch
          );
        }
      );
    }, [
      feedbacks,
      search,
      status,
      rating,
      treatment,
    ]);

  // =====================================================
  // TOTAL PAGES
  // =====================================================

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredFeedbacks.length /
          ITEMS_PER_PAGE
      )
    );

  // =====================================================
  // KEEP PAGE VALID
  // =====================================================

  useEffect(() => {
    if (
      page > totalPages
    ) {
      setPage(totalPages);
    }
  }, [
    page,
    totalPages,
  ]);

  // =====================================================
  // PAGINATED DATA
  // =====================================================

  const paginatedFeedbacks =
    useMemo(() => {
      const start =
        (page - 1) *
        ITEMS_PER_PAGE;

      const end =
        start +
        ITEMS_PER_PAGE;

      return filteredFeedbacks.slice(
        start,
        end
      );
    }, [
      filteredFeedbacks,
      page,
    ]);

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = (
    id: number
  ) => {
    const feedback =
      feedbacks.find(
        (item) =>
          item.id === id
      );

    if (!feedback) {
      return;
    }

    setSelectedFeedback(
      feedback
    );

    setDeleteOpen(true);
  };

  // =====================================================
  // CONFIRM DELETE
  // =====================================================

  const confirmDelete =
    async () => {
      if (
        !selectedFeedback ||
        deleteLoading
      ) {
        return;
      }

      try {
        setDeleteLoading(
          true
        );

        await feedbackAPI.delete(
          selectedFeedback.id
        );

        setFeedbacks(
          (previous) =>
            previous.filter(
              (item) =>
                item.id !==
                selectedFeedback.id
            )
        );

        setDeleteOpen(false);

        setSelectedFeedback(
          null
        );
      } catch (error) {
        console.error(
          "DELETE FEEDBACK ERROR:",
          error
        );

        alert(
          error instanceof Error
            ? error.message
            : "Failed to delete feedback."
        );
      } finally {
        setDeleteLoading(
          false
        );
      }
    };

  // =====================================================
  // STATUS UPDATE
  // =====================================================

  const handleStatusUpdate = (
    id: number,
    newStatus: Feedback["status"]
  ) => {
    setFeedbacks(
      (previous) =>
        previous.map(
          (item) =>
            item.id === id
              ? {
                  ...item,
                  status:
                    newStatus,
                }
              : item
        )
    );
  };

  // =====================================================
  // CLEAR FILTERS
  // =====================================================

  const handleClearFilters =
    () => {
      setSearch("");
      setStatus("");
      setRating("");
      setTreatment("");
      setPage(1);
    };

  // =====================================================
  // FILTER HANDLERS
  // =====================================================

  const handleSearchChange = (
    value: string
  ) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusFilterChange =
    (value: string) => {
      setStatus(value);
      setPage(1);
    };

  const handleRatingChange = (
    value: string
  ) => {
    setRating(value);
    setPage(1);
  };

  const handleTreatmentChange =
    (value: string) => {
      setTreatment(value);
      setPage(1);
    };

  // =====================================================
  // PAGE CHANGE
  // =====================================================

  const handlePageChange = (
    newPage: number
  ) => {
    if (
      newPage < 1 ||
      newPage > totalPages
    ) {
      return;
    }

    setPage(newPage);
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="space-y-6">

      {/* =================================================
          FILTERS
      ================================================= */}

      <FeedbackFilters
        search={search}
        setSearch={
          handleSearchChange
        }
        status={status}
        setStatus={
          handleStatusFilterChange
        }
        rating={rating}
        setRating={
          handleRatingChange
        }
        treatment={treatment}
        setTreatment={
          handleTreatmentChange
        }
        onClear={
          handleClearFilters
        }
        categories={
          categories
        }
        categoriesLoading={
          categoriesLoading
        }
      />

      {/* =================================================
          TABLE
      ================================================= */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px] text-left">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-5 py-4 text-sm font-semibold text-slate-700">
                  Patient
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-slate-700">
                  Treatment
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-slate-700">
                  Rating
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-slate-700">
                  Status
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-slate-700">
                  Date
                </th>

                <th className="px-5 py-4 text-sm font-semibold text-slate-700">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {paginatedFeedbacks.length ===
              0 ? (

                <tr>

                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center"
                  >

                    <div className="text-slate-500">

                      <p className="text-lg font-medium">
                        No feedback found
                      </p>

                      <p className="mt-1 text-sm">
                        Try changing your
                        filters or search.
                      </p>

                    </div>

                  </td>

                </tr>

              ) : (

                paginatedFeedbacks.map(
                  (feedback) => {

                    // =====================================
                    // IMAGE URL
                    // =====================================

                    const patientImage =
                      getImageUrl(
                        feedback.patientImage
                      );

                    return (
                      <tr
                        key={
                          feedback.id
                        }
                        className="border-t border-slate-200 transition hover:bg-slate-50"
                      >

                        {/* =================================
                            PATIENT
                        ================================= */}

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-3">

                            <Image
                              src={
                                patientImage
                              }
                              alt={
                                feedback.patientName ||
                                "Patient"
                              }
                              width={50}
                              height={50}
                              className="h-12 w-12 rounded-full object-cover"
                              unoptimized
                              onError={(
                                event
                              ) => {
                                const image =
                                  event.currentTarget;

                                if (
                                  image.src.includes(
                                    DEFAULT_IMAGE
                                  )
                                ) {
                                  return;
                                }

                                image.src =
                                  DEFAULT_IMAGE;
                              }}
                            />

                            <div>

                              <p className="font-semibold text-slate-900">
                                {
                                  feedback.patientName ||
                                  "-"
                                }
                              </p>

                              <p className="text-sm text-slate-500">
                                Patient
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* =================================
                            TREATMENT
                        ================================= */}

                        <td className="px-5 py-4">

                          <span className="text-sm text-slate-700">
                            {
                              feedback.treatment ||
                              "-"
                            }
                          </span>

                        </td>

                        {/* =================================
                            RATING
                        ================================= */}

                        <td className="px-5 py-4">

                          <RatingStars
                            rating={
                              Number(
                                feedback.rating
                              ) || 0
                            }
                          />

                        </td>

                        {/* =================================
                            STATUS
                        ================================= */}

                        <td className="px-5 py-4">

                          <FeedbackStatus
                            id={
                              feedback.id
                            }
                            status={
                              feedback.status
                            }
                            onUpdate={(
                              newStatus
                            ) =>
                              handleStatusUpdate(
                                feedback.id,
                                newStatus
                              )
                            }
                          />

                        </td>

                        {/* =================================
                            DATE
                        ================================= */}

                        <td className="px-5 py-4">

                          <span className="text-sm text-slate-600">
                            {
                              feedback.date ||
                              "-"
                            }
                          </span>

                        </td>

                        {/* =================================
                            ACTIONS
                        ================================= */}

                        <td className="px-5 py-4">

                          <FeedbackActions
                            id={
                              feedback.id
                            }
                            onDelete={
                              handleDelete
                            }
                          />

                        </td>

                      </tr>
                    );
                  }
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =================================================
          PAGINATION
      ================================================= */}

      {filteredFeedbacks.length >
        0 && (

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">

          <p className="text-sm text-slate-500">

            Showing{" "}

            <span className="font-medium text-slate-700">
              {(page - 1) *
                ITEMS_PER_PAGE +
                1}
            </span>

            {" "}to{" "}

            <span className="font-medium text-slate-700">
              {Math.min(
                page *
                  ITEMS_PER_PAGE,
                filteredFeedbacks.length
              )}
            </span>

            {" "}of{" "}

            <span className="font-medium text-slate-700">
              {
                filteredFeedbacks.length
              }
            </span>

            {" "}feedbacks

          </p>

          {totalPages > 1 && (

            <div className="flex items-center gap-2">

              {/* PREVIOUS */}

              <button
                type="button"
                disabled={
                  page === 1
                }
                onClick={() =>
                  handlePageChange(
                    page - 1
                  )
                }
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              {/* PAGE NUMBERS */}

              <div className="flex items-center gap-1">

                {Array.from(
                  {
                    length:
                      totalPages,
                  },
                  (
                    _,
                    index
                  ) => {

                    const pageNumber =
                      index + 1;

                    return (
                      <button
                        key={
                          pageNumber
                        }
                        type="button"
                        onClick={() =>
                          handlePageChange(
                            pageNumber
                          )
                        }
                        className={`min-w-10 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                          page ===
                          pageNumber
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {
                          pageNumber
                        }
                      </button>
                    );
                  }
                )}

              </div>

              {/* NEXT */}

              <button
                type="button"
                disabled={
                  page ===
                  totalPages
                }
                onClick={() =>
                  handlePageChange(
                    page + 1
                  )
                }
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>

            </div>

          )}

        </div>

      )}

      {/* =================================================
          DELETE MODAL
      ================================================= */}

      <DeleteFeedbackModal
        open={deleteOpen}
        patientName={
          selectedFeedback?.patientName ??
          ""
        }
        onClose={() => {
          if (
            !deleteLoading
          ) {
            setDeleteOpen(
              false
            );

            setSelectedFeedback(
              null
            );
          }
        }}
        onConfirm={
          confirmDelete
        }
      />

    </div>
  );
}