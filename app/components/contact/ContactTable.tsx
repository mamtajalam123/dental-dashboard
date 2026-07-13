"use client";

import { useMemo, useState } from "react";

import { contactData } from "@/data/contact";
import { ContactItem } from "@/types/contact";

import ContactStats from "./ContactStats";
import ContactFilters from "./ContactFilters";
import ContactStatus from "./ContactStatus";
import ContactActions from "./ContactActions";
import DeleteContactModal from "./DeleteContactModal";
import ArchiveContactModal from "./ArchiveContactModal";


const ITEMS_PER_PAGE = 8;

export default function ContactTable() {
  const [contacts, setContacts] =
    useState<ContactItem[]>(contactData);

  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [archiveOpen, setArchiveOpen] =
    useState(false);

  const [selectedContact, setSelectedContact] =
    useState<ContactItem | null>(null);

  const filteredContacts = useMemo(() => {
    let data = contacts.filter((item) => {
      const matchesSearch =
        search === "" ||
        item.patientName
          .toLowerCase()
          .includes(search.toLowerCase());

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

    data.sort((a, b) => {
      if (sort === "newest") {
        return b.id - a.id;
      }

      return a.id - b.id;
    });

    return data;
  }, [
    contacts,
    search,
    subject,
    status,
    sort,
  ]);

  const totalPages = Math.ceil(
    filteredContacts.length / ITEMS_PER_PAGE
  );

  const paginatedContacts =
    filteredContacts.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
    );

  const total = contacts.length;

  const newCount = contacts.filter(
    (item) => item.status === "New"
  ).length;

  const repliedCount = contacts.filter(
    (item) => item.status === "Replied"
  ).length;

  const archivedCount = contacts.filter(
    (item) => item.status === "Archived"
  ).length;

  const handleDelete = (id: number) => {
    const item = contacts.find(
      (contact) => contact.id === id
    );

    if (!item) return;

    setSelectedContact(item);
    setDeleteOpen(true);
  };

  const handleArchive = (id: number) => {
    const item = contacts.find(
      (contact) => contact.id === id
    );

    if (!item) return;

    setSelectedContact(item);
    setArchiveOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedContact) return;

    setContacts((prev) =>
      prev.filter(
        (item) => item.id !== selectedContact.id
      )
    );

    setDeleteOpen(false);
    setSelectedContact(null);
  };

  const confirmArchive = () => {
    if (!selectedContact) return;

    setContacts((prev) =>
      prev.map((item) =>
        item.id === selectedContact.id
          ? {
              ...item,
              status:
                item.status === "Archived"
                  ? "Read"
                  : "Archived",
            }
          : item
      )
    );

    setArchiveOpen(false);
    setSelectedContact(null);
  };

  const clearFilters = () => {
    setSearch("");
    setSubject("");
    setStatus("");
    setSort("newest");
    setPage(1);
  };

  return (
    <div className="space-y-6">

      <ContactStats
        total={total}
        newCount={newCount}
        repliedCount={repliedCount}
        archivedCount={archivedCount}
      />

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

      {/* Table Starts */}
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

                paginatedContacts.map((item) => (

                  <tr
                    key={item.id}
                    className="border-t border-slate-200 hover:bg-slate-50"
                  >

                    <td className="px-6 py-5">

                      <div>

                        <h4 className="font-semibold text-slate-800">
                          {item.patientName}
                        </h4>

                        <p className="mt-1 text-sm text-slate-500">
                          {item.message.length > 60
                            ? `${item.message.slice(0, 60)}...`
                            : item.message}
                        </p>

                      </div>

                    </td>

                    <td className="px-6 py-5">

                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                        {item.subject}
                      </span>

                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {item.email}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {item.phone}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {item.date}
                    </td>

                    <td className="px-6 py-5 text-center">

                      <ContactStatus
                        status={item.status}
                      />

                    </td>

                    <td className="px-6 py-5">

                      <ContactActions
                        id={item.id}
                        status={item.status}
                        onArchive={handleArchive}
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

        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm md:flex-row">

          <p className="text-sm text-slate-600">

            Showing

            <span className="mx-1 font-semibold">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>

            -

            <span className="mx-1 font-semibold">
              {Math.min(
                page * ITEMS_PER_PAGE,
                filteredContacts.length
              )}
            </span>

            of

            <span className="ml-1 font-semibold">
              {filteredContacts.length}
            </span>

            messages

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
                  type="button"
                  onClick={() =>
                    setPage(index + 1)
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
              disabled={page === totalPages}
              onClick={() =>
                setPage((prev) =>
                  Math.min(
                    prev + 1,
                    totalPages
                  )
                )
              }
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

      <DeleteContactModal
        open={deleteOpen}
        patientName={
          selectedContact?.patientName ?? ""
        }
        onClose={() => {
          setDeleteOpen(false);
          setSelectedContact(null);
        }}
        onConfirm={confirmDelete}
      />

      {/* Archive Modal */}

      <ArchiveContactModal
        open={archiveOpen}
        patientName={
          selectedContact?.patientName ?? ""
        }
        archived={
          selectedContact?.status ===
          "Archived"
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