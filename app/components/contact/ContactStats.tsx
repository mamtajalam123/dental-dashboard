import {
  Mail,
  MailOpen,
  CheckCircle2,
  Archive,
} from "lucide-react";

type ContactStatsProps = {
  total: number;
  newCount: number;
  repliedCount: number;
  archivedCount: number;
};

export default function ContactStats({
  total,
  newCount,
  repliedCount,
  archivedCount,
}: ContactStatsProps) {
  const cards = [
    {
      title: "Total Messages",
      value: total,
      icon: Mail,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "New Messages",
      value: newCount,
      icon: MailOpen,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
    },
    {
      title: "Replied",
      value: repliedCount,
      icon: CheckCircle2,
      bg: "bg-emerald-100",
      color: "text-emerald-600",
    },
    {
      title: "Archived",
      value: archivedCount,
      icon: Archive,
      bg: "bg-slate-200",
      color: "text-slate-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-sm
              transition
              hover:-translate-y-1
              hover:shadow-lg
            "
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-800">
                  {card.value}
                </h2>

              </div>

              <div
                className={`
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  ${card.bg}
                `}
              >
                <Icon
                  size={28}
                  className={card.color}
                />
              </div>

            </div>

          </div>
        );
      })}

    </div>
  );
}