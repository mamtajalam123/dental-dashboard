export type ServiceStatus =
  | "Active"
  | "Inactive";

export interface Service {
  id: number;

  name: string;

  category: string;

  duration: string;

  description: string;

  image: string;

  status: ServiceStatus;
}

export const services = [
  {
    id: 1,
    name: "Dental Implant",
    category: "Implant",
    duration: "2 Hours",
    description: "Complete implant treatment",
    image: "/services/implant.jpg",
    status: "Active",
  },
  {
    id: 2,
    name: "Root Canal",
    category: "General",
    duration: "1 Hour",
    description: "RCT Treatment",
    image: "/services/root.jpg",
    status: "Active",
  },
];