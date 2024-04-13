import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import OverlappingBoxes from "@/components/SectionA";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RCCG - His Dwelling Place",
  description: "Modern RCCG Youth Church in Ijebu Ode",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Header/>
        <OverlappingBoxes />
        {children}
        </body>
    </html>
  );
}
