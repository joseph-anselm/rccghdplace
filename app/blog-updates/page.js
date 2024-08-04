
import BlogPage from "@/components/BlogPage";
import SubHeader from "@/components/SubHeader";

export default function Home() {
  return (
    <div>
     <SubHeader
        title="Blogs and Updates"
        backgroundImage="/images/Blogs.jpg" 
      />
      <BlogPage />
    </div>
  );
}

