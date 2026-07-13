"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Menu,
  X,
  LayoutDashboard,
  CalendarDays,
  Stethoscope,
  Users,
  MessageSquare,
  ImageIcon,
  Mail,
  Tags,
} from "lucide-react";



const menuItems = [

  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },


  {
    title: "Appointments",
    href: "/dashboard/appointments",
    icon: CalendarDays,
  },


  {
    title: "Services",
    href: "/dashboard/services",
    icon: Stethoscope,
  },


  {
    title: "Team",
    href: "/dashboard/team",
    icon: Users,
  },


  {
    title: "Feedback",
    href: "/dashboard/feedback",
    icon: MessageSquare,
  },


  {
    title: "Gallery",
    href: "/dashboard/gallery",
    icon: ImageIcon,
  },


  {
    title: "Contact Messages",
    href: "/dashboard/contact",
    icon: Mail,
  },


  {
 title:"Categories",
 href:"/dashboard/categories",
 icon:Tags
}

];




export default function MobileMenu() {


  const [open, setOpen] = useState(false);



  return (

    <>


      {/* Mobile Button */}


      <button

        onClick={() => setOpen(true)}

        className="
        fixed
        left-4
        top-4
        z-50
        rounded-xl
        bg-white
        p-3
        shadow-md
        lg:hidden
        "

      >

        <Menu size={24}/>

      </button>






      {/* Overlay */}



      {
        open && (

          <div

            onClick={() => setOpen(false)}

            className="
            fixed
            inset-0
            z-40
            bg-black/40
            lg:hidden
            "

          />

        )
      }







      {/* Sidebar */}




      <aside

        className={`
        
        fixed
        left-0
        top-0
        z-50
        h-full
        w-72
        bg-white
        shadow-xl
        transition-transform
        duration-300
        lg:hidden
        
        ${
          open
          ? "translate-x-0"
          : "-translate-x-full"
        }

        `}

      >




        {/* Header */}



        <div className="
          flex
          items-center
          justify-between
          border-b
          border-slate-200
          p-5
        ">


          <h2 className="
            text-xl
            font-bold
            text-slate-900
          ">

            Dr Sultan

          </h2>





          <button

            onClick={()=>setOpen(false)}

            className="
            rounded-lg
            p-2
            hover:bg-slate-100
            "

          >

            <X size={22}/>


          </button>


        </div>








        {/* Menu */}





        <nav className="space-y-2 p-4">



          {
            menuItems.map((item)=>{


              const Icon = item.icon;



              return (


                <Link

                  key={item.title}

                  href={item.href}

                  onClick={()=>setOpen(false)}

                  className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  text-slate-700
                  transition
                  hover:bg-blue-50
                  hover:text-blue-600
                  "

                >


                  <Icon size={20}/>


                  <span className="font-medium">

                    {item.title}

                  </span>


                </Link>


              );


            })
          }




        </nav>





      </aside>



    </>

  );

}