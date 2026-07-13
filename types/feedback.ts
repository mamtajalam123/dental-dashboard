export type FeedbackStatus = "Approved" | "Pending" | "Rejected";

export interface Feedback {
  id: number;
  patientName: string;
  patientImage: string;
  treatment: string;
  rating: number;
  review: string;
  status: FeedbackStatus;
  date: string;
}