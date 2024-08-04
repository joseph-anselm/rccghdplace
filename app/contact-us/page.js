
import BlogPage from "@/components/BlogPage";
import ContactUs from "@/components/ContactUs";
import SubHeader from "@/components/SubHeader";

export default function Home() {
  return (
    <div>
     <SubHeader
        title="Contact us"
        backgroundImage="/images/contact.jpg"
      />
      <ContactUs />
    </div>
  );
}
