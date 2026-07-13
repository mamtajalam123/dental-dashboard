type ContactStatusProps = {
  status: "New" | "Read" | "Replied" | "Archived";
};

export default function ContactStatus({
  status,
}: ContactStatusProps) {
  const styles = {
    New: "bg-blue-100 text-blue-700",
    Read: "bg-yellow-100 text-yellow-700",
    Replied: "bg-emerald-100 text-emerald-700",
    Archived: "bg-slate-200 text-slate-700",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
}