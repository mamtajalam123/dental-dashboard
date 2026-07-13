import ContactTable from "@/app/components/contact/ContactTable";

export default function ContactPage() {
  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Contact Messages
          </h1>

          <p className="mt-2 text-slate-500">
            Manage patient contact messages, reply, archive and
            delete requests.
          </p>

        </div>

      </div>

      {/* Table */}

      <ContactTable />

    </div>
  );
}