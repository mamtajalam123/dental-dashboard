import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dr. Sultan Dental Care",
  description: "Dental Clinic Admin Panel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}