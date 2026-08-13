interface FeedbackRow extends RowDataPacket {
  id: number;

  patientName: string;

  patient_image: string | null;

  treatment: string;

  rating: number;

  review: string;

  status:
    | "Pending"
    | "Approved"
    | "Rejected";

  date: string | null;

  createdAt?: string | null;

  updatedAt?: string | null;
}