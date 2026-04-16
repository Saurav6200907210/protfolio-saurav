import { useEffect, useRef, useState, useCallback } from 'react';
import ElectricBorder from './ElectricBorder';

// EDIT HERE: update skills list
const skills = [
  { name: 'HTML', icon: '🌐' },
  { name: 'CSS', icon: '🎨' },
  { name: 'JavaScript', icon: '⚡' },
  { name: 'TailwindCSS', icon: '💨' },
  { name: 'ReactJS', icon: '⚛️' },
  { name: 'NextJS', icon: '▲' },
  { name: 'Angular', icon: '🅰️' },
  { name: 'NodeJS', icon: '💚' },
  { name: 'ExpressJS', icon: '🚂' },
  { name: 'SQL', icon: '🗃️' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Vercel', icon: '▲' },
  { name: 'Netlify', icon: '🌐' },
  { name: 'Firebase', icon: '🔥' },
  { name: 'Git', icon: '📦' },
  { name: 'GitHub', icon: '🐙' },
  { name: 'GitLab', icon: '🦊' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Kubernetes', icon: '☸️' },
  { name: 'Terraform', icon: '🏗️' },
  { name: 'Ansible', icon: '🔧' },
  { name: 'GitHub Actions', icon: '⚙️' },
  { name: 'GitLab CI', icon: '🔄' },
  { name: 'Jenkins', icon: '🤖' },
  { name: 'Prometheus', icon: '📊' },
  { name: 'Grafana', icon: '📈' },
  { name: 'AWS', icon: '☁️' },
  { name: 'GCP', icon: '🌩️' },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const trackScrollWidth = track.scrollWidth - window.innerWidth + 64; // Account for padding

    // Section is in viewport
    if (rect.top <= 0 && rect.bottom >= windowHeight) {
      const sectionScrollable = section.offsetHeight - windowHeight;
      const scrolled = Math.abs(rect.top);
      const progress = Math.min(Math.max(scrolled / sectionScrollable, 0), 1);
      setScrollProgress(progress);

      // Calculate which cards should be visible based on progress
      const totalCards = skills.length;
      const cardsToShow = Math.ceil(progress * totalCards * 1.5) + 3; // Show extra cards
      const newVisibleCards = Array.from({ length: Math.min(cardsToShow, totalCards) }, (_, i) => i);
      setVisibleCards(newVisibleCards);

      // Apply horizontal scroll
      track.style.transform = `translateX(-${progress * trackScrollWidth}px)`;
    } else if (rect.top > 0) {
      // Before section
      setScrollProgress(0);
      setVisibleCards([0, 1, 2]);
      track.style.transform = 'translateX(0)';
    } else {
      // After section
      setScrollProgress(1);
      setVisibleCards(skills.map((_, i) => i));
      track.style.transform = `translateX(-${trackScrollWidth}px)`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative"
      style={{ height: '250vh' }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden"
      >
        {/* Section Header */}
        <div className="section-container mb-8 sm:mb-12">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-4">
            <span className="gradient-text">Skills & Tools</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto text-sm sm:text-base">
            Technologies I work with to bring ideas to life
          </p>
        </div>

        {/* Horizontal Scroll Track */}
        <div className="overflow-hidden px-4 sm:px-8">
          <div
            ref={trackRef}
            className="flex gap-4 sm:gap-6 py-4 will-change-transform"
            style={{ transition: 'transform 0.15s ease-out' }}
          >
            {skills.map((skill, index) => (
              <ElectricBorder
                key={skill.name}
                className={`cursor-target flex-shrink-0 w-32 sm:w-40 h-36 sm:h-44 transition-all duration-500 ${
                  visibleCards.includes(index)
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-20'
                }`}
                borderRadius="0.75rem"
                showOnHover={true}
              >
                <div 
                  className="skill-card w-full h-full flex flex-col items-center justify-center gap-3 sm:gap-4"
                  style={{
                    transitionDelay: `${Math.min(index * 50, 500)}ms`,
                  }}
                >
                  {/* Icon */}
                  <div className="text-4xl sm:text-5xl">{skill.icon}</div>
                  
                  {/* Skill Name */}
                  <span className="font-medium text-sm sm:text-base text-center px-2">
                    {skill.name}
                  </span>

                  {/* Background Glow */}
                  <div className="absolute inset-0 gradient-primary opacity-5 rounded-xl" />
                </div>
              </ElectricBorder>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="section-container mt-6 sm:mt-8">
          <div className="h-1 bg-muted rounded-full overflow-hidden max-w-md mx-auto">
            <div
              className="h-full gradient-primary transition-all duration-150"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <p className="text-center text-muted-foreground text-xs sm:text-sm mt-4">
            Scroll to explore all {skills.length} skills
          </p>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
