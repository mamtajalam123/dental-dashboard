export type TeamStatus =
  | "Active"
  | "Inactive";

export type TeamDesignation =
  | "Chief Dentist"
  | "General Dentist"
  | "Orthodontist"
  | "Cosmetic Dentist"
  | "Oral Surgeon"
  | "Dental Assistant"
  | "Receptionist";

export interface TeamMember {
  id: number;

  name: string;

  designation: TeamDesignation;

  specialization: string;

  experience: string;

  email: string;

  phone: string;

  image: string;

  status: TeamStatus;
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,

    name: "Dr. Sultan Ahmed",

    designation: "Chief Dentist",

    specialization: "Dental Implant",

    experience: "12 Years",

    email: "dr.sultan@example.com",

    phone: "+91 9876543210",

    image: "/team/dr-sultan.jpg",

    status: "Active",
  },

  {
    id: 2,

    name: "Dr. Priya Sharma",

    designation: "Orthodontist",

    specialization: "Braces & Aligners",

    experience: "8 Years",

    email: "priya@example.com",

    phone: "+91 9876543211",

    image: "/team/priya.jpg",

    status: "Active",
  },

  {
    id: 3,

    name: "Rahul Das",

    designation: "Dental Assistant",

    specialization: "Patient Care",

    experience: "4 Years",

    email: "rahul@example.com",

    phone: "+91 9876543212",

    image: "/team/rahul.jpg",

    status: "Inactive",
  },

  {
    id: 4,

    name: "Sneha Roy",

    designation: "Receptionist",

    specialization: "Front Desk",

    experience: "5 Years",

    email: "sneha@example.com",

    phone: "+91 9876543213",

    image: "/team/sneha.jpg",

    status: "Active",
  },
];