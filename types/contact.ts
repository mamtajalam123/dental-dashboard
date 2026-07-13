export type ContactStatus =
  | "New"
  | "Read"
  | "Replied"
  | "Archived";

export type ContactItem = {
  id: number;

  patientName: string;

  email: string;

  phone: string;

  subject: string;

  message: string;

  date: string;

  status: ContactStatus;
};