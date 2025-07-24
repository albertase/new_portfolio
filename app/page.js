import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";

// 🚨 Add this line to prevent build-time crash
export const dynamic = "force-dynamic";

// Fetch blog data with fallback
async function getData() {
  try {
    const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`);

    if (!res.ok) {
      throw new Error('Failed to fetch blog posts');
    }

    const data = await res.json();

    const filtered = data
      .filter((item) => item?.cover_image)
      .sort(() => Math.random() - 0.5);

    return filtered;
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    return []; // fallback to empty array
  }
}

// Main homepage component
export default async function Home() {
  const blogs = await getData();

  return (
    <div suppressHydrationWarning>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Blog blogs={blogs} />
      <ContactSection />
    </div>
  );
}
