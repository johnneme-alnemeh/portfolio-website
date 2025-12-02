'use client'
import React from "react";
import { Toaster } from "react-hot-toast";
import dynamic from 'next/dynamic';
import Loader from "./components/UI/Loader";

// Static imports for critical components
import Navbar from "./components/Navbar/Navbar";

// Dynamic imports for non-critical components
const HeroSection = dynamic(() => import("./components/HeroSection"), { ssr: true });
const AboutSection = dynamic(() => import("./components/AboutSection/AboutSection"), { ssr: true });
const ProjectsSection = dynamic(() => import("./components/ProjectsSection/ProjectsSection"), { ssr: true });
const EmailSection = dynamic(() => import("./components/EmailSection/EmailSection"), { ssr: true });
const Footer = dynamic(() => import("./components/Footer"), { ssr: true });

export default function Home() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Preload the portrait image
    const preloadImage = new Image();
    preloadImage.src = '/images/portrait.jpg';
    
    // Set a shorter loading time
    const timer = setTimeout(() => setLoading(false), 2500); 
    return () => clearTimeout(timer);
  }, []);

  // Remove duplicate loading check
  if (loading) {
    return <Loader />;
  }
  
  return (
    <main className="flex min-h-screen flex-col bg-[#0b0724]">
      {/* Fixed position for Toaster to prevent layout shifts */}
      <div className="fixed top-0 right-0 z-50">
        <Toaster />
      </div>
      
      <Navbar />
      
      {/* Use consistent container styling throughout */}
      <div className="container px-4 sm:px-8 lg:px-12 mx-auto mt-16 md:mt-24" style={{ minHeight: '100vh' }}>
        <HeroSection />
      </div>
      
      <div className="container px-4 sm:px-8 lg:px-12 mx-auto">
        <AboutSection />
      </div>
      
      <div className="container px-4 sm:px-8 lg:px-12 mx-auto">
        <ProjectsSection />
      </div>
      
      <div className="container px-4 sm:px-8 lg:px-12 mx-auto">
        <EmailSection />
      </div>
      
      <Footer />
    </main>
  );
}
