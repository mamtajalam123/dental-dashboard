"use client";

import { useMemo, useState } from "react";

import { contactData } from "@/data/contact";

import ContactFilters from "@/app/components/contact/ContactFilters";
import ContactStatus from "@/app/components/contact/ContactStatus";
import ContactActions from "@/app/components/contact/ContactActions";
import DeleteContactModal from "@/app/components/contact/DeleteContactModal";
import ArchiveContactModal from "@/app/components/contact/ArchiveContactModal";

const ITEMS_PER_PAGE = 8;

export default function ArchivedContactPage() {
  const [contacts, setContacts] = useState(
    contactData.filter(
      (item) => item.status === "Archived"
    )
  );

  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [status, setStatus] = useState("Archived");
  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [archiveOpen, setArchiveOpen] =
    useState(false);

  const [selected, setSelected] = useState<
    (typeof contacts)[number] | null
  >(null);

  const filtered = useMemo(() => {
    let data = [...contacts];

    if (search) {
      data = data.filter((item) =>
        item.patientName
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (subject) {
      data = data.filter(
        (item) => item.subject === subject
      );
    }

    if (status) {
      data = data.filter(
        (item) => item.status === status
      );
    }

    data.sort((a, b) =>
      sort === "newest"
        ? b.id - a.id
        : a.id - b.id
    );

    return data;
  }, [contacts, search, subject, status, sort]);

  const totalPages = Math.ceil(
    filtered.length / ITEMS_PER_PAGE
  );

  const items = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const clearFilters = () => {
    setSearch("");
    setSubject("");
    setStatus("Archived");
    setSort("newest");
    setPage(1);
  };

  const openDelete = (id: number) => {
    const item = contacts.find(
      (c) => c.id === id
    );

    if (!item) return;

    setSelected(item);
    setDeleteOpen(true);
  };

  const openRestore = (id: number) => {
    const item = contacts.find(
      (c) => c.id === id
    );

    if (!item) return;

    setSelected(item);
    setArchiveOpen(true);
  };

  const confirmDelete = () => {
    if (!selected) return;

    setContacts((prev) =>
      prev.filter(
        (item) => item.id !== selected.id
      )
    );

    setDeleteOpen(false);
    setSelected(null);
  };

  const confirmRestore = () => {
    if (!selected) return;

    setContacts((prev) =>
      prev.filter(
        (item) => item.id !== selected.id
      )
    );

    setArchiveOpen(false);
    setSelected(null);
  };

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Archived Messages
        </h1>

        <p className="mt-2 text-slate-500">
          Manage archived patient messages.
        </p>

      </div>

      <ContactFilters
        search={search}
        setSearch={setSearch}
        subject={subject}
        setSubject={setSubject}
        status={status}
        setStatus={setStatus}
        sort={sort}
        setSort={setSort}
        onClear={clearFilters}
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="px-6 py-4 text-left">
                  Patient
                </th>

                <th className="px-6 py-4 text-left">
                  Subject
                </th>

                <th className="px-6 py-4 text-left">
                  Date
                </th>

                <th className="px-6 py-4 text-center">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {items.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="py-16 text-center"
                  >
                    No archived messages found.
                  </td>

                </tr>

              ) : (

                items.map((item) => (

                  <tr
                    key={item.id}
                    className="border-t"
                  >

                    <td className="px-6 py-5">
                      {item.patientName}
                    </td>

                    <td className="px-6 py-5">
                      {item.subject}
                    </td>

                    <td className="px-6 py-5">
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
                        onArchive={openRestore}
                        onDelete={openDelete}
                      />

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">

          {Array.from(
            { length: totalPages },
            (_, i) => (
              <button
                key={i}
                onClick={() =>
                  setPage(i + 1)
                }
                className={`h-10 w-10 rounded-lg ${
                  page === i + 1
                    ? "bg-blue-600 text-white"
                    : "border"
                }`}
              >
                {i + 1}
              </button>
            )
          )}

        </div>
      )}

      <DeleteContactModal
        open={deleteOpen}
        patientName={
          selected?.patientName ?? ""
        }
        onClose={() => {
          setDeleteOpen(false);
          setSelected(null);
        }}
        onConfirm={confirmDelete}
      />

      <ArchiveContactModal
        open={archiveOpen}
        patientName={
          selected?.patientName ?? ""
        }
        archived
        onClose={() => {
          setArchiveOpen(false);
          setSelected(null);
        }}
        onConfirm={confirmRestore}
      />

    </div>
  );
}