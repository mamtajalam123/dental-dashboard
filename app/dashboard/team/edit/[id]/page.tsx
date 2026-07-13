"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import TeamForm, {
  TeamFormData,
} from "@/app/components/team/TeamForm";

import { teamMembers } from "@/data/team";

export default function EditTeamPage() {

  const router = useRouter();

  const params = useParams();

  const member = teamMembers.find(
    (item) => item.id === Number(params.id)
  );

  if (!member) {

    return (

      <div className="rounded-xl border border-red-200 bg-red-50 p-6">

        <h2 className="text-xl font-semibold text-red-600">
          Team Member Not Found
        </h2>

      </div>

    );

  }

  const handleSubmit = (
    data: TeamFormData
  ) => {

    console.log("Updated Member:", data);

    // API
    // await axios.put(`/api/team/${member.id}`, data);

    router.push("/dashboard/team");

  };

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center gap-3">

        <Link
          href="/dashboard/team"
          className="rounded-lg border border-slate-300 p-2 hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
        </Link>

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Edit Team Member
          </h1>

          <p className="mt-1 text-slate-500">
            Update doctor or staff information.
          </p>

        </div>

      </div>

      <TeamForm
        initialData={{
          name: member.name,
          designation: member.designation,
          specialization: member.specialization,
          experience: member.experience,
          email: member.email,
          phone: member.phone,
          bio: member.bio,
          image: member.image,
          status: member.status,
        }}
        submitLabel="Update Team Member"
        onSubmit={handleSubmit}
      />

    </div>

  );

}