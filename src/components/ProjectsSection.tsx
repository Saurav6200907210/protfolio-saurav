import { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import ElectricBorder from './ElectricBorder';

// EDIT HERE: update MERN project details
const mernProjects = [
  {
    // EDIT HERE: project title
    title: 'Smart CV',
    // EDIT HERE: bullet points
    bullets: [
      'Developed SmartCV, an ATS-optimized Resume Builder enabling users to generate industry-standard structured resumes',
      'Implemented dynamic form handling, real-time state updates, and live preview rendering',
      'Improved UI responsiveness, performance, and usability with scalable modular code',
    ],
    // EDIT HERE: github repo link
    github: 'https://github.com/Saurav6200907210/SmartCV-Resume',
    // EDIT HERE: live demo link
    live: 'https://smart-cv-resume.vercel.app/',
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    // EDIT HERE: project title
    title: 'RealChat',
    // EDIT HERE: bullet points
    bullets: [
      'Built a real-time multi-user chat application using React.js with room-based communication (10+ users)',
      'Designed mobile-first responsive UI with smooth animations and typing indicators',
      'Implemented real-time message sync, reactions, and structured data handling',
    ],
    // EDIT HERE: github repo link
    github: 'https://github.com/Saurav6200907210/real1-chat',
    // EDIT HERE: live demo link
    live: 'https://real1-chat.lovable.app/',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    // EDIT HERE: project title
    title: 'README Generator',
    // EDIT HERE: bullet points
    bullets: [
      'Built an AI-driven README & API Docs Generator producing production-ready Markdown documentation',
      'Implemented copy-to-clipboard, export features, and tab-based responsive UI',
      'Improved output quality using prompt optimization and robust error handling',
    ],
    // EDIT HERE: github repo link
    github: 'https://github.com/Saurav6200907210/readme-md',
    // EDIT HERE: live demo link
    live: 'https://readme-md.lovable.app/',
    gradient: 'from-green-500/20 to-teal-500/20',
  },
];

// EDIT HERE: update DevOps project details
const devopsProjects = [
  {
    // EDIT HERE: project title
    title: 'WebMetricsX',
    // EDIT HERE: bullet points
    bullets: [
      'Built a real-time website monitoring and SEO analytics platform with live data updates every 5 seconds',
      'Designed full-stack architecture (React + Node.js) with dashboards, performance insights, and PDF export',
      'Implemented CI/CD pipeline using Jenkins, Docker, Kubernetes, and GitHub Webhooks',
      'Automated infrastructure using Terraform and server setup using Ansible on AWS EC2',
      'Integrated Prometheus and Grafana for real-time monitoring and visualization',
    ],
    // EDIT HERE: github repo link
    github: 'https://github.com/Saurav6200907210/WebMetricsX',
    // EDIT HERE: live demo link
    live: 'http://3.108.172.46:5177/',
    gradient: 'from-orange-500/20 to-red-500/20',
  },
  {
    // EDIT HERE: project title
    title: 'CI/CD Pipeline Automation',
    // EDIT HERE: bullet points
    bullets: [
      'Designed automated CI/CD pipeline using Jenkins, Docker, GitHub Webhooks, and AWS EC2',
      'Automated build and deployment process triggered on every GitHub push',
      'Containerized application and managed deployment lifecycle using Docker',
      'Implemented email notification system for deployment success and failure alerts',
    ],
    // EDIT HERE: github repo link
    github: 'https://github.com/Saurav6200907210/CI-CD-using-jenkins-github-webhook-AWS-ec2-docker-with-email-notification',
    // EDIT HERE: live demo link (empty = no live link)
    live: 'http://65.1.105.241/',
    gradient: 'from-indigo-500/20 to-purple-500/20',
  },
];

const ProjectCard = ({ project, index }: { project: typeof mernProjects[0]; index: number }) => {
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
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

        <div className="relative p-6 sm:p-8 h-full flex flex-col">
          <h3 className="font-display text-xl sm:text-2xl font-bold mb-4 gradient-text">
            {project.title}
          </h3>

          <ul className="space-y-3 mb-6 flex-grow">
            {project.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="flex gap-3 mt-auto">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`${project.live ? 'flex-1' : 'w-full'} flex items-center justify-center gap-2 px-4 py-3 rounded-xl glass font-medium text-sm glow-hover`}
            >
              <Github size={18} />
              GitHub
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl gradient-primary font-medium text-sm text-primary-foreground glow-hover"
              >
                <ExternalLink size={18} />
                Live Link
              </a>
            )}
          </div>
        </div>
      </div>
    </ElectricBorder>
  );
};

const ProjectSubSection = ({ title, subtitle, projects }: { title: string; subtitle: string; projects: typeof mernProjects }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-20 last:mb-0">
      <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
          <span className="gradient-text">{title}</span>
        </h3>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">{subtitle}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 sm:py-32">
      <div className="section-container">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and technical projects
          </p>
        </div>

        <ProjectSubSection
          title="MERN Projects"
          subtitle="Full-stack web applications built with MongoDB, Express, React & Node.js"
          projects={mernProjects}
        />

        <ProjectSubSection
          title="DevOps Projects"
          subtitle="Infrastructure automation, CI/CD pipelines & cloud-native solutions"
          projects={devopsProjects}
        />
      </div>
    </section>
  );
};

export default ProjectsSection;
