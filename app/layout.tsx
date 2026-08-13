import type { Metadata } from "next";
import "./globals.css";

import Providers from "./providers";
import AuthProvider from "../app/components/auth/AuthProvider";


export const metadata: Metadata = {
  title: "Dr. Sultan Dental Care",
  description: "Dental Clinic Management System",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (

    <html lang="en">

      <body>

        <Providers>

          <AuthProvider>

            {children}

          </AuthProvider>

        </Providers>

      </body>

    </html>

  );

}