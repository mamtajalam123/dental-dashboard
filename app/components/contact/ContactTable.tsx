"use client";

import { useEffect, useMemo, useState } from "react";

import { Contact } from "@/app/types/contact";
import { contactAPI } from "@/app/services/contact.api";

import ContactStats from "./ContactStats";
import ContactFilters from "./ContactFilters";
import ContactStatus from "./ContactStatus";
import ContactActions from "./ContactActions";
import DeleteContactModal from "./DeleteContactModal";
import ArchiveContactModal from "./ArchiveContactModal";

const ITEMS_PER_PAGE = 8;

export default function ContactTable() {
  // ==========================================
  // CONTACTS
  // ==========================================

  const [contacts, setContacts] = useState<Contact[]>([]);

  // ==========================================
  // LOADING / ERROR
  // ==========================================

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FILTERS
  // ==========================================

  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);

  // ==========================================
  // MODALS
  // ==========================================

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [archiveOpen, setArchiveOpen] = useState(false);

  const [selectedContact, setSelectedContact] =
    useState<Contact | null>(null);

  // ==========================================
  // LOAD CONTACTS
  // ==========================================

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("=================================");
      console.log("LOADING CONTACTS");
      console.log("=================================");

      const data = await contactAPI.getAll();

      console.log("CONTACT API RESPONSE:", data);

      setContacts(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "CONTACT LOAD ERROR:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load contact messages."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    loadContacts();
  }, []);

  // ==========================================
  // FILTER CONTACTS
  // ==========================================

  const filteredContacts = useMemo(() => {
    let data = contacts.filter((item) => {
      const searchText =
        search.toLowerCase().trim();

      const matchesSearch =
        searchText === "" ||
        item.name
          .toLowerCase()
          .includes(searchText) ||
        item.email
          .toLowerCase()
          .includes(searchText) ||
        item.phone
          ?.toLowerCase()
          .includes(searchText);

      const matchesSubject =
        subject === "" ||
        item.subject === subject;

      const matchesStatus =
        status === "" ||
        item.status === status;

      return (
        matchesSearch &&
        matchesSubject &&
        matchesStatus
      );
    });

    // ========================================
    // SORT
    // ========================================

    data.sort((a, b) => {
      if (sort === "newest") {
        return (
          new Date(
            b.created_at ?? 0
          ).getTime() -
          new Date(
            a.created_at ?? 0
          ).getTime()
        );
      }

      return (
        new Date(
          a.created_at ?? 0
        ).getTime() -
        new Date(
          b.created_at ?? 0
        ).getTime()
      );
    });

    return data;
  }, [
    contacts,
    search,
    subject,
    status,
    sort,
  ]);

  // ==========================================
  // PAGINATION
  // ==========================================

  const totalPages = Math.ceil(
    filteredContacts.length /
      ITEMS_PER_PAGE
  );

  const paginatedContacts =
    filteredContacts.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
    );

  // ==========================================
  // STATS
  // ==========================================

  const total = contacts.length;

  const newCount = contacts.filter(
    (item) =>
      item.status === "New"
  ).length;

  const repliedCount = contacts.filter(
    (item) =>
      item.status === "Replied"
  ).length;



  // ==========================================
  // DELETE OPEN
  // ==========================================

  const handleDelete = (id: number) => {
    const item = contacts.find(
      (contact) =>
        contact.id === id
    );

    if (!item) {
      return;
    }

    setSelectedContact(item);
    setDeleteOpen(true);
  };

  // ==========================================
  // ARCHIVE OPEN
  // ==========================================

  const handleArchive = (id: number) => {
    const item = contacts.find(
      (contact) =>
        contact.id === id
    );

    if (!item) {
      return;
    }

    setSelectedContact(item);
    setArchiveOpen(true);
  };

  // ==========================================
  // CONFIRM DELETE
  // ==========================================

  const confirmDelete = async () => {
    if (!selectedContact) {
      return;
    }

    try {
      await contactAPI.delete(
        selectedContact.id
      );

      setContacts((previous) =>
        previous.filter(
          (item) =>
            item.id !==
            selectedContact.id
        )
      );

      setDeleteOpen(false);
      setSelectedContact(null);

      alert(
        "Contact deleted successfully."
      );
    } catch (error) {
      console.error(
        "DELETE CONTACT ERROR:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete contact."
      );
    }
  };

  // ==========================================
  // CONFIRM ARCHIVE
  // ==========================================

  const confirmArchive = async () => {
    if (!selectedContact) {
      return;
    }

    try {
      const newStatus =
        selectedContact.status ===
        "Read"
          ? "New"
          : "Read";

      const updated =
        await contactAPI.updateStatus(
          selectedContact.id,
          newStatus
        );

      setContacts((previous) =>
        previous.map((item) =>
          item.id ===
          selectedContact.id
            ? {
                ...item,
                ...(updated ?? {}),
                status: newStatus,
              }
            : item
        )
      );

      setArchiveOpen(false);
      setSelectedContact(null);

      alert(
        newStatus === "Read"
          ? "Contact marked as read."
          : "Contact marked as new."
      );
    } catch (error) {
      console.error(
        "UPDATE CONTACT STATUS ERROR:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update contact status."
      );
    }
  };

  // ==========================================
  // CLEAR FILTERS
  // ==========================================

  const clearFilters = () => {
    setSearch("");
    setSubject("");
    setStatus("");
    setSort("newest");
    setPage(1);
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="text-slate-500">
            Loading contact messages...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="space-y-4">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="font-medium text-red-700">
            {error}
          </p>
        </div>

        <button
          type="button"
          onClick={loadContacts}
          className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          Try Again
        </button>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="space-y-6">

      {/* ======================================
          STATS
      ======================================= */}

    <ContactStats
  total={total}
  newCount={newCount}
  repliedCount={repliedCount}
/>

      {/* ======================================
          FILTERS
      ======================================= */}

      <ContactFilters
        search={search}
        setSearch={(value) => {
          setSearch(value);
          setPage(1);
        }}
        subject={subject}
        setSubject={(value) => {
          setSubject(value);
          setPage(1);
        }}
        status={status}
        setStatus={(value) => {
          setStatus(value);
          setPage(1);
        }}
        sort={sort}
        setSort={(value) => {
          setSort(value);
          setPage(1);
        }}
        onClear={clearFilters}
      />

      {/* ======================================
          TABLE
      ======================================= */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-100">
              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Patient
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Subject
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Phone
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Date
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {paginatedContacts.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-16 text-center"
                  >
                    <h3 className="text-xl font-semibold text-slate-700">
                      No Contact Messages Found
                    </h3>

                    <p className="mt-2 text-slate-500">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedContacts.map(
                  (item) => (
                    <tr
                      key={item.id}
                      className="border-t border-slate-200 hover:bg-slate-50"
                    >

                      {/* PATIENT */}

                      <td className="px-6 py-5">
                        <div>

                          <h4 className="font-semibold text-slate-800">
                            {item.name}
                          </h4>

                          <p className="mt-1 text-sm text-slate-500">
                            {item.message.length >
                            60
                              ? `${item.message.slice(
                                  0,
                                  60
                                )}...`
                              : item.message}
                          </p>

                        </div>
                      </td>

                      {/* SUBJECT */}

                      <td className="px-6 py-5">

                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                          {item.subject ??
                            "General"}
                        </span>

                      </td>

                      {/* EMAIL */}

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {item.email}
                      </td>

                      {/* PHONE */}

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {item.phone ??
                          "—"}
                      </td>

                      {/* DATE */}

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {item.created_at
                          ? new Date(
                              item.created_at
                            ).toLocaleDateString()
                          : "—"}
                      </td>

                      {/* STATUS */}

                      <td className="px-6 py-5 text-center">

                        <ContactStatus
                          status={
                            item.status
                          }
                        />

                      </td>

                      {/* ACTIONS */}

                      <td className="px-6 py-5">

                        <ContactActions
                          id={item.id}
                          status={
                            item.status
                          }
                          onArchive={
                            handleArchive
                          }
                          onDelete={
                            handleDelete
                          }
                        />

                      </td>

                    </tr>
                  )
                )
              )}

            </tbody>

          </table>

        </div>
      </div>

      {/* ======================================
          PAGINATION
      ======================================= */}

      {totalPages > 1 && (
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm md:flex-row">

          <p className="text-sm text-slate-600">

            Showing

            <span className="mx-1 font-semibold">
              {(page - 1) *
                ITEMS_PER_PAGE +
                1}
            </span>

            -

            <span className="mx-1 font-semibold">
              {Math.min(
                page *
                  ITEMS_PER_PAGE,
                filteredContacts.length
              )}
            </span>

            of

            <span className="ml-1 font-semibold">
              {
                filteredContacts.length
              }
            </span>

            messages

          </p>

          <div className="flex items-center gap-2">

            <button
              type="button"
              disabled={page === 1}
              onClick={() =>
                setPage((previous) =>
                  Math.max(
                    previous - 1,
                    1
                  )
                )
              }
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from(
              {
                length: totalPages,
              },
              (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() =>
                    setPage(
                      index + 1
                    )
                  }
                  className={`h-10 w-10 rounded-lg text-sm font-medium transition ${
                    page === index + 1
                      ? "bg-blue-600 text-white"
                      : "border border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}

            <button
              type="button"
              disabled={
                page === totalPages
              }
              onClick={() =>
                setPage((previous) =>
                  Math.min(
                    previous + 1,
                    totalPages
                  )
                )
              }
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>

          </div>
        </div>
      )}

      {/* ======================================
          DELETE MODAL
      ======================================= */}

      <DeleteContactModal
        open={deleteOpen}
        patientName={
          selectedContact?.name ??
          ""
        }
        onClose={() => {
          setDeleteOpen(false);
          setSelectedContact(null);
        }}
        onConfirm={confirmDelete}
      />

      {/* ======================================
          ARCHIVE MODAL
      ======================================= */}

      <ArchiveContactModal
        open={archiveOpen}
        patientName={
          selectedContact?.name ??
          ""
        }
        archived={
          selectedContact?.status ===
          "Read"
        }
        onClose={() => {
          setArchiveOpen(false);
          setSelectedContact(null);
        }}
        onConfirm={confirmArchive}
      />

    </div>
  );
}