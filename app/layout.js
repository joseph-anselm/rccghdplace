// import { Inter } from "next/font/google";
// import "./globals.css";
// import Navbar from "@/components/Navbar";
// import Header from "@/components/Header";
// import Creed from "@/components/Creed";
// import Footer from "@/components/Footer";
// import ImageGallery from "@/components/Gallery";
// import ChurchServices from "@/components/Services";
// import FeaturedBlogCard from "@/components/FeaturedBlog";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "RCCG - His Dwelling Place",
//   description: "Modern RCCG Youth Church in Ijebu Ode",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <Navbar />
//         <Header/>
//         <Creed />
//         <ChurchServices /> 
//         <ImageGallery />
//         <FeaturedBlogCard />       
//         {children}
//         <Footer/>
//         </body>
//     </html>
//   );
// }


// import { Inter } from "next/font/google";
// import "./globals.css";
// import Navbar from "@/components/Navbar";
// import Header from "@/components/Header";
// import Creed from "@/components/Creed";
// import Footer from "@/components/Footer";
// import ImageGallery from "@/components/Gallery";
// import ChurchServices from "@/components/Services";
// import FeaturedBlogCard from "@/components/FeaturedBlog";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "RCCG - His Dwelling Place",
//   description: "Modern RCCG Youth Church in Ijebu Ode",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" className="scroll-smooth">
//       <body className={inter.className}>
//         <Navbar />
//         <Header/>
//         <Creed />
//         <ChurchServices /> 
//         <ImageGallery />
//         <FeaturedBlogCard />       
//         {children}
//         <Footer/>
//       </body>
//     </html>
//   );
// }

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import Creed from "@/components/Creed";
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
        <div className="scroll-effect">
          <Header />
          <Creed />
          <ChurchServices />
          <ImageGallery />
          <FeaturedBlogCard />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}

