/**
 * Portfolio Website - Main Page
 * 
 * This is the main entry point for the portfolio.
 * Each section is modular and can be easily edited.
 * Look for "EDIT HERE" comments in each component file.
 */

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import TargetCursor from '@/components/TargetCursor';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* GSAP Target Cursor - shows on desktop only */}
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
      />

      {/* Sticky Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section with typing animation */}
        <HeroSection />

        {/* Skills with horizontal scroll */}
        <SkillsSection />

        {/* Experience / Internships */}
        <ExperienceSection />

        {/* Projects Grid (MERN + DevOps) */}
        <ProjectsSection />

        {/* Contact Methods */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default Index;
