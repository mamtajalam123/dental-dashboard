type TeamStatusProps = {

  status: "Active" | "Inactive";

};


export default function TeamStatus({

  status,

}: TeamStatusProps) {


  const isActive =
    status === "Active";



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
        ${
          isActive
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
        }
      `}
    >

      {status}

    </span>

  );

}