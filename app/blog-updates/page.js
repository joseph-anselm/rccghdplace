
import BlogPage from "@/components/BlogPage";
import SubHeader from "@/components/SubHeader";

export default function Home() {
  return (
    <div>
     <SubHeader
        title="Blogs and Updates"
        backgroundImage="https://source.unsplash.com/1600x900/?joyful-youth-christians-Africans" // Replace with your image URL
      />
      <BlogPage />
    </div>
  );
}

