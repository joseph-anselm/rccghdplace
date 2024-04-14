import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import OverlappingBoxes from "@/components/SectionA";
import Footer from "@/components/Footer";
import ImageGallery from "@/components/Gallery";
import ChurchServices from "@/components/Services";
import FeaturedBlogCard from "@/components/FeaturedBlog";

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
        <ImageGallery />
        <ChurchServices /> 
        <FeaturedBlogCard />       
        {children}
        <Footer/>
        </body>
    </html>
  );
}
