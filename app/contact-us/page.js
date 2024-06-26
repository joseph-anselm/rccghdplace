
import BlogPage from "@/components/BlogPage";
import ContactUs from "@/components/ContactUs";
import SubHeader from "@/components/SubHeader";

export default function Home() {
  return (
    <div>
     <SubHeader
        title="Contact us"
        backgroundImage="https://source.unsplash.com/1600x900/?contact"
      />
      <ContactUs />
    </div>
  );
}
