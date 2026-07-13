import { Feedback } from "@/types/feedback";

export const feedbackData: Feedback[] = [
  {
    id: 1,
    patientName: "Rahul Sharma",
    patientImage: "/images/patients/patient-1.jpg",
    treatment: "Dental Implant",
    rating: 5,
    review:
      "Excellent experience. The doctor explained everything clearly and the treatment was painless.",
    status: "Approved",
    date: "12 Jul 2026",
  },
  {
    id: 2,
    patientName: "Priya Das",
    patientImage: "/images/patients/patient-2.jpg",
    treatment: "Smile Makeover",
    rating: 4,
    review:
      "Very friendly staff and a clean clinic. I'm happy with my new smile.",
    status: "Pending",
    date: "10 Jul 2026",
  },
  {
    id: 3,
    patientName: "Amit Roy",
    patientImage: "/images/patients/patient-3.jpg",
    treatment: "Root Canal",
    rating: 5,
    review:
      "The treatment was comfortable and professional. Highly recommended.",
    status: "Approved",
    date: "08 Jul 2026",
  },
  {
    id: 4,
    patientName: "Sneha Paul",
    patientImage: "/images/patients/patient-4.jpg",
    treatment: "Teeth Whitening",
    rating: 5,
    review:
      "Amazing results. My teeth look much brighter than before.",
    status: "Approved",
    date: "06 Jul 2026",
  },
  {
    id: 5,
    patientName: "Arjun Sen",
    patientImage: "/images/patients/patient-5.jpg",
    treatment: "Braces",
    rating: 3,
    review:
      "Overall good service, but the waiting time could be improved.",
    status: "Rejected",
    date: "04 Jul 2026",
  },
  {
    id: 6,
    patientName: "Neha Kapoor",
    patientImage: "/images/patients/patient-6.jpg",
    treatment: "Dental Filling",
    rating: 4,
    review:
      "Quick appointment and excellent care from the entire team.",
    status: "Approved",
    date: "02 Jul 2026",
  },
];