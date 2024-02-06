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
        <h1 className="text-xl text-primary font-bold md:text-2xl lg:text-3xl xl:text-4xl mt-48 ml-52 md:mt-48 md:ml-46 lg:ml-50 xl:mt-36 xl:ml-40 2xl:ml-72">
          Genève - Appartement vide
        </h1>
        {children}
      </body>
    </html>
  );
}
