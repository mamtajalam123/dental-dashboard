import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Clock3,
  CalendarDays,
  IndianRupee,
} from "lucide-react";
import TeamStatus from "@/app/components/team/TeamStatus";



interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TeamDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  // Temporary Mock Data
  const member = {
    id,
    name: "Dr. Sultan Ahmed",
    designation: "Chief Dentist",
    specialization: "Dental Implantology",
    qualification: "BDS, MDS",
    experience: "12 Years",
    consultationFee: "₹800",
    email: "drsultan@example.com",
    phone: "+91 9876543210",
    workingDays: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ],
    startTime: "09:00 AM",
    endTime: "06:00 PM",
    bio: "Dr. Sultan Ahmed has over 12 years of experience in advanced dental implantology, cosmetic dentistry, and full-mouth rehabilitation. He is committed to delivering comfortable, patient-focused dental care using modern technology.",
    status: "Active" as const,
    image: "/team/doctor-1.jpg",
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div className="flex items-center gap-4">

          <Link
            href="/team"
            className="flex h-10 w-10 items-center justify-center rounded-xl border hover:bg-slate-100"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h1 className="text-3xl font-bold">
              {member.name}
            </h1>

            <p className="text-slate-500">
              Team Member Details
            </p>
          </div>

        </div>

        <div className="flex gap-3">

          <Link
            href={`/team/${member.id}/edit`}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            <Pencil size={18} />
            Edit
          </Link>

          <button className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700">
            <Trash2 size={18} />
            Delete
          </button>

        </div>

      </div>

      {/* Content */}

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Left */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <Image
            src={member.image}
            alt={member.name}
            width={400}
            height={400}
            className="mx-auto h-60 w-60 rounded-full object-cover"
          />

          <div className="mt-6 text-center">

            <h2 className="text-2xl font-bold">
              {member.name}
            </h2>

            <p className="mt-1 text-slate-500">
              {member.designation}
            </p>

            <div className="mt-4">
              <TeamStatus status={member.status} />
            </div>

          </div>

        </div>

        {/* Right */}

        <div className="space-y-6 lg:col-span-2">

          {/* Professional */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold">
              Professional Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              <Info
                icon={<GraduationCap size={18} />}
                label="Qualification"
                value={member.qualification}
              />

              <Info
                icon={<Briefcase size={18} />}
                label="Specialization"
                value={member.specialization}
              />

              <Info
                icon={<Clock3 size={18} />}
                label="Experience"
                value={member.experience}
              />

              <Info
                icon={<IndianRupee size={18} />}
                label="Consultation Fee"
                value={member.consultationFee}
              />

            </div>

          </div>

          {/* Contact */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold">
              Contact Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              <Info
                icon={<Mail size={18} />}
                label="Email"
                value={member.email}
              />

              <Info
                icon={<Phone size={18} />}
                label="Phone"
                value={member.phone}
              />

            </div>

          </div>

          {/* Schedule */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-semibold">
              Working Schedule
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              <Info
                icon={<CalendarDays size={18} />}
                label="Working Days"
                value={member.workingDays.join(", ")}
              />

              <Info
                icon={<Clock3 size={18} />}
                label="Working Hours"
                value={`${member.startTime} - ${member.endTime}`}
              />

            </div>

          </div>

          {/* Biography */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="mb-4 text-xl font-semibold">
              Biography
            </h2>

            <p className="leading-7 text-slate-600">
              {member.bio}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">

      <div className="mt-1 text-blue-600">
        {icon}
      </div>

      <div>

        <p className="text-sm text-slate-500">
          {label}
        </p>

        <p className="font-semibold text-slate-800">
          {value}
        </p>

      </div>

    </div>
  );
}