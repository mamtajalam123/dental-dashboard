type PaymentStatusProps = {
  status:
    | "Pending"
    | "Paid"
    | "Partially Paid"
    | "Refunded";
};

export default function PaymentStatus({
  status,
}: PaymentStatusProps) {
  const styles = {
    Pending:
      "bg-yellow-100 text-yellow-700",

    Paid:
      "bg-green-100 text-green-700",

    "Partially Paid":
      "bg-blue-100 text-blue-700",

    Refunded:
      "bg-red-100 text-red-700",
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