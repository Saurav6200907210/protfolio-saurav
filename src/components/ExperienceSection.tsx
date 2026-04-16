import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import ElectricBorder from './ElectricBorder';

// EDIT HERE: update experience/internship details
const experiences = [
  {
    // EDIT HERE: role and company
    role: 'DevOps Intern',
    company: 'Vaidsys Technologies',
    // EDIT HERE: duration
    duration: 'Jan 2026 – Feb 2026',
    // EDIT HERE: bullet points
    bullets: [
      'Designed and implemented CI/CD pipelines using Jenkins and GitHub Actions to automate build and deployment processes',
      'Deployed and managed applications on AWS EC2 with Docker containerization for scalable infrastructure',
      'Integrated monitoring and logging using Prometheus and Grafana to track system performance and uptime',
      'Utilized Infrastructure as Code (IaC) tools and Linux environment to streamline deployment and reduce manual effort',
    ],
    // EDIT HERE: tech stack
    techStack: 'AWS, Docker, Jenkins, GitHub Actions, Prometheus, Grafana, Linux',
    // EDIT HERE: certificate/proof link
    certificateLink: '/certificates/mern-internship-certificate.pdf',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    
  },
  {
    // EDIT HERE: role and company
    role: 'MERN Stack Developer Intern',
    company: 'Infyntrek Systèmes',
    // EDIT HERE: duration
    duration: 'Sep 2025 – Dec 2025',
    // EDIT HERE: bullet points
    bullets: [
      'Developed and maintained full-stack web applications using MongoDB, Express.js, React.js, and Node.js',
      'Built RESTful APIs and backend services with secure JWT authentication and role-based access control',
      'Designed responsive user interfaces using React.js and optimized frontend performance',
      'Collaborated in debugging, code reviews, and feature development following clean code and best practices',
    ],
    // EDIT HERE: tech stack
    techStack: 'MongoDB, Express.js, React.js, Node.js, JWT',
    // EDIT HERE: certificate/proof link
    certificateLink: '/certificates/devops-internship-certificate.pdf',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
];

const ExperienceCard = ({ exp, index }: { exp: typeof experiences[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <ElectricBorder
      className={`cursor-target ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
      borderRadius="1rem"
      showOnHover={true}
    >
      <div
        ref={cardRef}
        className="project-card h-full"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${exp.gradient}`} />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

        <div className="relative p-6 sm:p-8 h-full flex flex-col">
          <h3 className="font-display text-xl sm:text-2xl font-bold mb-1 gradient-text">
            {exp.role}
          </h3>
          <p className="text-muted-foreground text-sm mb-1">@ {exp.company}</p>
          <p className="text-xs text-muted-foreground/70 mb-4">{exp.duration}</p>

          <ul className="space-y-3 mb-4 flex-grow">
            {exp.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <p className="text-xs text-muted-foreground mb-5">
            <span className="text-primary font-medium">Tech:</span> {exp.techStack}
          </p>

          <div className="mt-auto">
            <a
              href={exp.certificateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl gradient-primary font-medium text-sm text-primary-foreground glow-hover"
            >
              <ExternalLink size={18} />
              View Certificate
            </a>
          </div>
        </div>
      </div>
    </ElectricBorder>
  );
};

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-20 sm:py-32">
      <div className="section-container">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional internships and hands-on industry experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.role} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
