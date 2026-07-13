"use client";


import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";


export default function AddAppointmentPage() {


  const [formData,setFormData] = useState({

    patientName:"",
    phone:"",
    email:"",
    treatment:"",
    doctor:"",
    date:"",
    time:"",
    status:"Pending",
    payment:"Unpaid",

  });





  const handleChange =(
    e:React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
  )=>{


    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value,

    });


  };






  const handleSubmit =(
    e:React.FormEvent
  )=>{


    e.preventDefault();


    console.log(formData);


    // API will connect here later


  };





  return (

    <main
      className="
        space-y-6
      "
    >



      {/* Header */}


      <div
        className="
          flex
          items-center
          justify-between
        "
      >


        <div>

          <h1
            className="
              text-2xl
              font-bold
              text-slate-800
            "
          >

            Add Appointment

          </h1>


          <p
            className="
              mt-1
              text-slate-500
            "
          >

            Create a new patient appointment.

          </p>


        </div>





        <Link

          href="/dashboard/appointments"

          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            px-4
            py-2
            text-slate-700
            hover:bg-slate-50
          "

        >

          <ArrowLeft size={18}/>

          Back

        </Link>



      </div>







      {/* Form */}



      <form

        onSubmit={handleSubmit}

        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "

      >



        <div
          className="
            grid
            grid-cols-1
            gap-6
            md:grid-cols-2
          "
        >





          {/* Patient Name */}


          <InputField

            label="Patient Name"

            name="patientName"

            value={
              formData.patientName
            }

            onChange={
              handleChange
            }

          />







          {/* Phone */}


          <InputField

            label="Phone Number"

            name="phone"

            value={
              formData.phone
            }

            onChange={
              handleChange
            }

          />







          {/* Email */}


          <InputField

            label="Email"

            name="email"

            value={
              formData.email
            }

            onChange={
              handleChange
            }

          />









          {/* Treatment */}


          <SelectField

            label="Treatment"

            name="treatment"

            value={
              formData.treatment
            }

            onChange={
              handleChange
            }

            options={[
              "Dental Cleaning",
              "Root Canal",
              "Dental Implant",
              "Teeth Whitening",
            ]}

          />









          {/* Doctor */}


          <SelectField

            label="Doctor"

            name="doctor"

            value={
              formData.doctor
            }

            onChange={
              handleChange
            }

            options={[
              "Dr. Sultan",
              "Dr. Ahmed",
              "Dr. Rahman",
            ]}

          />









          {/* Date */}


          <InputField

            label="Appointment Date"

            type="date"

            name="date"

            value={
              formData.date
            }

            onChange={
              handleChange
            }

          />








          {/* Time */}


          <InputField

            label="Appointment Time"

            type="time"

            name="time"

            value={
              formData.time
            }

            onChange={
              handleChange
            }

          />








          {/* Status */}


          <SelectField

            label="Status"

            name="status"

            value={
              formData.status
            }

            onChange={
              handleChange
            }

            options={[
              "Pending",
              "Confirmed",
              "Completed",
              "Cancelled",
            ]}

          />








          {/* Payment */}


          <SelectField

            label="Payment"

            name="payment"

            value={
              formData.payment
            }

            onChange={
              handleChange
            }

            options={[
              "Paid",
              "Unpaid",
              "Partial",
            ]}

          />




        </div>







        {/* Submit */}


        <div
          className="
            mt-8
            flex
            justify-end
          "
        >


          <button

            type="submit"

            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-blue-600
              px-6
              py-3
              font-medium
              text-white
              hover:bg-blue-700
            "

          >

            <Save size={18}/>

            Save Appointment

          </button>



        </div>



      </form>




    </main>

  );

}







function InputField({

  label,

  name,

  value,

  onChange,

  type="text"


}:any){


  return (

    <div>

      <label
        className="
          mb-2
          block
          text-sm
          font-medium
          text-slate-700
        "
      >

        {label}

      </label>


      <input

        type={type}

        name={name}

        value={value}

        onChange={onChange}

        className="
          w-full
          rounded-xl
          border
          border-slate-200
          px-4
          py-3
          outline-none
          focus:border-blue-500
        "

      />


    </div>

  );


}








function SelectField({

  label,

  name,

  value,

  onChange,

  options


}:any){


  return (

    <div>


      <label
        className="
          mb-2
          block
          text-sm
          font-medium
          text-slate-700
        "
      >

        {label}

      </label>



      <select

        name={name}

        value={value}

        onChange={onChange}

        className="
          w-full
          rounded-xl
          border
          border-slate-200
          px-4
          py-3
          outline-none
          focus:border-blue-500
        "

      >


        <option value="">
          Select {label}
        </option>



        {
          options.map(
            (item:string)=>(
              
              <option
                key={item}
                value={item}
              >
                {item}
              </option>

            )
          )
        }


      </select>


    </div>

  );


}