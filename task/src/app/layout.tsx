import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../app/globals.css";
import Header from "../components/Header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Dashboard G360",
  description: "Task",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} font-bold`}>
        <Header />
        <h1 className="px-5 mt-40 mb-12 text-xl text-primary font-bold xl:text-4xl lg:text-3xl md:text-2xl xl:px-8 lg:px-7 md:px-6 ml-28">
          Genève - Appartement vide
        </h1>
        {children}
      </body>
    </html>
  );
}
