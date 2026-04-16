import { useState, useEffect, useRef } from 'react';
import { MessageCircle, FileText } from 'lucide-react';
import heroAvatar from '@/assets/hero-avatar.jpg';

// EDIT HERE: update typing animation lines
const typingLines = [
  'Engineering Student 23-27',
  'Fullstack Web Developer',
  'Exploring DSA and Open Source',
  'DevOps and Cloud Computing Aspirant',
];

// EDIT HERE: add resume PDF link
const RESUME_LINK = '/resume.pdf';

const HeroSection = () => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Typing animation effect
  useEffect(() => {
    const currentLine = typingLines[currentLineIndex];
    const typeSpeed = isDeleting ? 30 : 80;
    const pauseTime = 2000;

    if (!isDeleting && currentText === currentLine) {
      setTimeout(() => setIsDeleting(true), pauseTime);
      return;
    }

    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentLineIndex((prev) => (prev + 1) % typingLines.length);
      return;
    }

    const timeout = setTimeout(() => {
      setCurrentText((prev) =>
        isDeleting
          ? prev.slice(0, -1)
          : currentLine.slice(0, prev.length + 1)
      );
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentLineIndex, isDeleting]);

  // Parallax effect for desktop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 20;
        const y = (e.clientY - rect.top - rect.height / 2) / 20;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 pb-10">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Side - Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <p className="text-primary font-medium mb-4 animate-fade-in-up">
              Hello, I'm
            </p>
            
            {/* EDIT HERE: change name */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 animate-fade-in-up stagger-1">
              <span className="gradient-text">Saurav Kumar</span>
            </h1>

            {/* Typing Animation */}
            <div className="h-16 sm:h-20 flex items-center justify-center lg:justify-start animate-fade-in-up stagger-2">
              <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-light typing-cursor">
                {currentText}
              </p>
            </div>

            {/* EDIT HERE: update bio text */}
            <p className="text-muted-foreground text-lg mt-6 max-w-lg mx-auto lg:mx-0 animate-fade-in-up stagger-3">
              Passionate about building scalable web applications and exploring 
              the latest in cloud technologies. Always learning, always growing.
            </p>

            {/* CTA Buttons - Mobile Only */}
            <div className="flex gap-4 mt-8 justify-center lg:hidden animate-fade-in-up stagger-4">
              <button
                onClick={scrollToContact}
                className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary font-semibold text-primary-foreground glow-hover"
              >
                <MessageCircle size={20} />
                Let's Talk
              </button>
              <a
                href={RESUME_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl glass font-semibold glow-hover"
              >
                <FileText size={20} />
                Resume
              </a>
            </div>
          </div>

          {/* Right Side - Interactive Hero Image */}
          <div className="order-1 lg:order-2 flex justify-center animate-fade-in-up">
            <div
              ref={cardRef}
              className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
              style={{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                transition: 'transform 0.1s ease-out',
              }}
            >
              {/* Gradient Border */}
              <div className="absolute inset-0 rounded-2xl gradient-full p-[3px] animate-float">
              <div className="w-full h-full rounded-2xl bg-card overflow-hidden relative">
                  {/* Hero Avatar Image */}
                  <img 
                    src={heroAvatar} 
                    alt="Saurav Kumar" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  
                  {/* Glass overlay with content */}
                  <div className="absolute inset-0 flex items-end p-6">
                    <div className="glass rounded-xl p-4 w-full">
                      {/* EDIT HERE: update tagline */}
                      <p className="text-sm font-medium text-center mb-4">
                        Building the Future, One Line at a Time
                      </p>
                      
                      {/* Buttons - Desktop Only */}
                      <div className="hidden lg:flex gap-3">
                        <button
                          onClick={scrollToContact}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg gradient-primary font-semibold text-sm text-primary-foreground glow-hover"
                        >
                          <MessageCircle size={16} />
                          Let's Talk
                        </button>
                        <a
                          href={RESUME_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg glass font-semibold text-sm glow-hover"
                        >
                          <FileText size={16} />
                          Resume
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary animate-pulse" />
                  <div className="absolute top-4 right-10 w-2 h-2 rounded-full bg-secondary animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>

              {/* Background glow */}
              <div className="absolute -inset-4 rounded-3xl gradient-full opacity-20 blur-3xl -z-10" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <div className="w-1 h-3 rounded-full bg-primary animate-scroll-indicator" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
