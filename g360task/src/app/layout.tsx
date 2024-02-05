import type { Metadata } from "next";

import "./globals.css";
import Header from "../components/Header";
import CardGrid from "../components/CardGrid";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Task",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <CardGrid />
        {children}
      </body>
    </html>
  );
}
