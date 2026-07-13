"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  ArrowLeft,
  Mail,
  Phone,
  Briefcase,
  Award,
  User,
} from "lucide-react";

import { teamMembers } from "@/data/team";
import TeamStatus from "@/app/components/team/TeamStatus";

export default function ViewTeamPage() {

  const params = useParams();

  const member = teamMembers.find(
    (item) => item.id === Number(params.id)
  );

  if (!member) {

    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

        <h2 className="text-2xl font-bold text-red-600">
          Team Member Not Found
        </h2>

      </div>
    );

  }

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
            Team Member Details
          </h1>

          <p className="mt-1 text-slate-500">
            Complete profile information.
          </p>

        </div>

      </div>

      {/* Profile */}

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Left */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex flex-col items-center">

            <Image
              src={member.image}
              alt={member.name}
              width={180}
              height={180}
              className="rounded-2xl object-cover"
            />

            <h2 className="mt-5 text-2xl font-bold text-slate-900">
              {member.name}
            </h2>

            <p className="mt-1 text-blue-600">
              {member.designation}
            </p>

            <div className="mt-4">
              <TeamStatus status={member.status} />
            </div>

          </div>

        </div>

        {/* Right */}

        <div className="space-y-6 lg:col-span-2">

          {/* Contact */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-xl font-semibold">
              Contact Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              <InfoCard
                icon={<Mail size={18} />}
                title="Email"
                value={member.email}
              />

              <InfoCard
                icon={<Phone size={18} />}
                title="Phone"
                value={member.phone}
              />

              <InfoCard
                icon={<Briefcase size={18} />}
                title="Specialization"
                value={member.specialization}
              />

              <InfoCard
                icon={<Award size={18} />}
                title="Experience"
                value={member.experience}
              />

            </div>

          </div>

          {/* Biography */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-2">

              <User
                size={20}
                className="text-blue-600"
              />

              <h2 className="text-xl font-semibold">
                Biography
              </h2>

            </div>

            <p className="leading-8 text-slate-600">
              {member.bio}
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

function InfoCard({

  icon,

  title,

  value,

}:{

  icon: React.ReactNode;

  title: string;

  value: string;

}) {

  return (

    <div className="rounded-xl border border-slate-200 p-4">

      <div className="mb-2 flex items-center gap-2 text-blue-600">

        {icon}

        <span className="font-medium">
          {title}
        </span>

      </div>

      <p className="text-slate-700">
        {value}
      </p>

    </div>

  );

}