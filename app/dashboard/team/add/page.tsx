"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import TeamForm, {
  TeamFormData,
} from "@/app/components/team/TeamForm";

export default function AddTeamPage() {

  const router = useRouter();

  const handleSubmit = (
    data: TeamFormData
  ) => {

    console.log("New Team Member:", data);

    // TODO:
    // POST API
    // await axios.post("/api/team", data);

    router.push("/dashboard/team");

  };

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <div className="flex items-center gap-3">

            <Link
              href="/dashboard/team"
              className="rounded-lg border border-slate-300 p-2 hover:bg-slate-100"
            >
              <ArrowLeft size={18} />
            </Link>

            <div>

              <h1 className="text-3xl font-bold text-slate-900">
                Add Team Member
              </h1>

              <p className="mt-1 text-slate-500">
                Create a new doctor or staff member.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Form */}

      <TeamForm
        submitLabel="Save Team Member"
        onSubmit={handleSubmit}
      />

    </div>

  );

}