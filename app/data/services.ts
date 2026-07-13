import { Service } from "../types/service";


export const services: Service[] = [
  {
    id: 1,
    name: "Dental Implant",
    category: "Implant",
    duration: "2 Hours",
    description:
      "Permanent replacement for missing teeth using titanium implants.",
    image: "/services/implant.jpg",
    status: "Active",
  },

  {
    id: 2,
    name: "Root Canal",
    category: "Treatment",
    duration: "90 Minutes",
    description:
      "Treatment to remove infected pulp and save the natural tooth.",
    image: "/services/root-canal.jpg",
    status: "Active",
  },

  {
    id: 3,
    name: "Teeth Whitening",
    category: "Cosmetic",
    duration: "60 Minutes",
    description:
      "Professional teeth whitening treatment for a brighter smile.",
    image: "/services/whitening.jpg",
    status: "Inactive",
  },

  {
    id: 4,
    name: "Dental Cleaning",
    category: "Preventive",
    duration: "45 Minutes",
    description:
      "Routine dental cleaning to remove plaque and tartar buildup.",
    image: "/services/cleaning.jpg",
    status: "Active",
  },

  {
    id: 5,
    name: "Tooth Extraction",
    category: "Surgery",
    duration: "40 Minutes",
    description:
      "Safe and painless removal of damaged or impacted teeth.",
    image: "/services/extraction.jpg",
    status: "Active",
  },

  {
    id: 6,
    name: "Braces",
    category: "Orthodontics",
    duration: "1 Hour",
    description:
      "Orthodontic treatment to straighten and align teeth.",
    image: "/services/braces.jpg",
    status: "Active",
  },

  {
    id: 7,
    name: "Dentures",
    category: "Prosthodontics",
    duration: "3 Visits",
    description:
      "Custom removable dentures for replacing missing teeth.",
    image: "/services/dentures.jpg",
    status: "Inactive",
  },

  {
    id: 8,
    name: "Smile Makeover",
    category: "Cosmetic",
    duration: "Multiple Visits",
    description:
      "Complete smile enhancement using advanced cosmetic procedures.",
    image: "/services/smile-makeover.jpg",
    status: "Active",
  },
];