import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Pencil,
  Trash2,
  Stethoscope,
  User,
} from "lucide-react";
import FeedbackRating from "@/app/components/feedback/RatingStars";
import FeedbackStatus from "@/app/components/feedback/FeedbackStatus";



interface FeedbackDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function FeedbackDetailsPage({
  params,
}: FeedbackDetailsPageProps) {
  const { id } = await params;

  // Temporary Data
  const feedback = {
    id,
    patient: "Rahul Sharma",
    image: "/patients/patient-1.jpg",
    treatment: "Dental Implant",
    rating: 5,
    status: "Approved" as const,
    featured: true,
    date: "12 Jul 2026",
    testimonial:
      "I had an amazing experience with Dr. Sultan Dental Care. The staff was friendly, the clinic was clean, and the implant treatment was completely painless. Highly recommended!",
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-4">

          <Link
            href="/feedback"
            className="flex h-10 w-10 items-center justify-center rounded-xl border hover:bg-slate-100"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>

            <h1 className="text-3xl font-bold">
              Patient Feedback
            </h1>

            <p className="text-slate-500">
              Review Details
            </p>

          </div>

        </div>

        <div className="flex gap-3">

          <Link
            href={`/feedback/${feedback.id}/edit`}
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

      {/* Profile */}

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Left */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <div className="flex flex-col items-center">

            <Image
              src={feedback.image}
              alt={feedback.patient}
              width={140}
              height={140}
              className="rounded-full object-cover"
            />

            <h2 className="mt-4 text-2xl font-bold">
              {feedback.patient}
            </h2>

            <div className="mt-3">
              <FeedbackRating rating={feedback.rating} />
            </div>

            <div className="mt-4">
              <FeedbackStatus status={feedback.status} />
            </div>

            {feedback.featured && (
              <span className="mt-4 rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
                ⭐ Featured Testimonial
              </span>
            )}

          </div>

        </div>

        {/* Right */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">

          <h2 className="mb-6 text-xl font-semibold">
            Patient Information
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            <InfoItem
              icon={<User size={18} />}
              label="Patient Name"
              value={feedback.patient}
            />

            <InfoItem
              icon={<Stethoscope size={18} />}
              label="Treatment"
              value={feedback.treatment}
            />

            <InfoItem
              icon={<CalendarDays size={18} />}
              label="Review Date"
              value={feedback.date}
            />

            <div>

              <p className="mb-2 text-sm text-slate-500">
                Status
              </p>

              <FeedbackStatus
                status={feedback.status}
              />

            </div>

          </div>

        </div>

      </div>

      {/* Testimonial */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <h2 className="mb-5 text-xl font-semibold">
          Patient Review
        </h2>

        <blockquote className="rounded-xl border-l-4 border-blue-600 bg-slate-50 p-6 leading-8 italic text-slate-700">
          "{feedback.testimonial}"
        </blockquote>

      </div>

    </div>
  );
}

function InfoItem({
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