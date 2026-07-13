"use client";

import { FeedbackStatus as StatusType } from "@/types/feedback";

type FeedbackStatusProps = {
  status: StatusType;
};

const statusStyles: Record<StatusType, string> = {
  Approved:
    "bg-emerald-100 text-emerald-700 border border-emerald-200",

  Pending:
    "bg-amber-100 text-amber-700 border border-amber-200",

  Rejected:
    "bg-red-100 text-red-700 border border-red-200",
};

export default function FeedbackStatus({
  status,
}: FeedbackStatusProps) {
  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${statusStyles[status]}
      `}
    >
      {status}
    </span>
  );
}