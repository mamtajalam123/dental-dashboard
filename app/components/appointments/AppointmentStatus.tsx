type AppointmentStatusProps = {
  status:
    | "Pending"
    | "Confirmed"
    | "Completed"
    | "Cancelled"
    | "Rejected"
    | "No Show";
};

export default function AppointmentStatus({
  status,
}: AppointmentStatusProps) {
  const styles = {
    Pending:
      "bg-yellow-100 text-yellow-700",

    Confirmed:
      "bg-blue-100 text-blue-700",

    Completed:
      "bg-green-100 text-green-700",

    Cancelled:
      "bg-gray-100 text-gray-700",

    Rejected:
      "bg-red-100 text-red-700",

    "No Show":
      "bg-orange-100 text-orange-700",
  };

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
        ${
          styles[status]
        }
      `}
    >
      {status}
    </span>
  );
}