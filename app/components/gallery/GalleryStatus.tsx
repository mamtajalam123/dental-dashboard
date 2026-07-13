type GalleryStatusProps = {
  status: "Active" | "Inactive";
};

export default function GalleryStatus({
  status,
}: GalleryStatusProps) {
  const styles =
    status === "Active"
      ? "bg-emerald-100 text-emerald-700"
      : "bg-red-100 text-red-700";

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
        ${styles}
      `}
    >
      {status}
    </span>
  );
}