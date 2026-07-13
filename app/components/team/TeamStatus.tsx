type TeamStatusProps = {
  status: "Active" | "Inactive";
};

export default function TeamStatus({
  status,
}: TeamStatusProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
        status === "Active"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {status}
    </span>
  );
}