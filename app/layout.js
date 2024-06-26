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

// import { Oswald, Poppins } from "next/font/google";
// import "./globals.css";
// import Navbar from "@/components/Navbar";
// import Header from "@/components/Header";
// import Creed from "@/components/Creed";
// import Footer from "@/components/Footer";
// import ImageGallery from "@/components/GalleryGroup";
// import ChurchServices from "@/components/Services";
// import FeaturedBlogCard from "@/components/FeaturedBlog";
// import HDPVision from "@/components/hdpVision";
// import FeaturedImages from "@/components/Gallery";

// const oswald = Oswald({ subsets: ["latin"] });
// const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });


// export const metadata = {
//   title: "RCCG - His Dwelling Place",
//   description: "Modern RCCG Youth Church in Ijebu Ode",
// }; 

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={oswald.className}>
//         <Navbar />
//         <div className="scroll-effect">
          
//           {children}
//           <Footer />
//         </div>
//       </body>
//     </html>
//   );
// }

import { Oswald, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";

const oswald = Oswald({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "RCCG - His Dwelling Place",
  description: "Modern RCCG Youth Church in Ijebu Ode",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={oswald.className}>
        <Navbar />
        <div className="scroll-effect">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}


