'use client'
import React from "react";
import { Toaster } from "react-hot-toast";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar/Navbar";
import AboutSection from "./components/AboutSection/AboutSection";
import ProjectsSection from "./components/ProjectsSection/ProjectsSection";
import EmailSection from "./components/EmailSection/EmailSection";
import Footer from "./components/Footer";
import Loader from "./components/UI/Loader"

export default function Home() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); 
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (loading) {
    return <Loader />;
  }
  return (
    <main className="flex min-h-screen flex-col bg-[#0b0724]">
      <Navbar />
      <div className="container px-12 py-5 mx-auto mt-24">
        <HeroSection />
        <AboutSection />
      </div>
      <div className="container mx-auto mt-8">
        <ProjectsSection />
        </div>
        <div className="container px-12 py-5 mx-auto">
        <Toaster />
        <EmailSection />
        </div>
      <Footer />
    </main>
  );
}
