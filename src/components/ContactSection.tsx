import { useEffect, useRef, useState } from 'react';
import { Github, MessageCircle, Mail } from 'lucide-react';
import ElectricBorder from './ElectricBorder';

// EDIT HERE: github profile link
const GITHUB_LINK = 'https://github.com/Saurav6200907210';

// EDIT HERE: whatsapp number (with country code, no + or spaces)
const WHATSAPP_NUMBER = '916200907210';

// EDIT HERE: email address
const EMAIL_ADDRESS = 'sonukumarteg245@gmail.com';

const contactMethods = [
  {
    name: 'GitHub',
    icon: Github,
    href: GITHUB_LINK,
    description: 'Check out my repositories',
    gradient: 'from-gray-500 to-gray-700',
  },
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    description: 'Let\'s have a quick chat',
    gradient: 'from-green-500 to-green-700',
  },
  {
    name: 'Email',
    icon: Mail,
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL_ADDRESS}`,
    description: 'Send me a message',
    gradient: 'from-blue-500 to-purple-600',
  },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-20 sm:py-32">
      <div className="section-container">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Contact Me</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Let's connect! I'm always open to discussing new opportunities.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {contactMethods.map((method, index) => (
            <div
              key={method.name}
              className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ElectricBorder
                className="cursor-target"
                borderRadius="1rem"
                showOnHover={true}
                colorFrom={method.name === 'GitHub' ? 'hsl(0, 0%, 50%)' : method.name === 'WhatsApp' ? 'hsl(142, 70%, 45%)' : 'hsl(220, 90%, 56%)'}
                colorTo={method.name === 'GitHub' ? 'hsl(0, 0%, 70%)' : method.name === 'WhatsApp' ? 'hsl(142, 70%, 60%)' : 'hsl(270, 70%, 60%)'}
              >
                <a
                  href={method.href}
                  target={method.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={method.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="contact-card group h-full"
                >
                  {/* Icon Container */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${method.gradient} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                    <method.icon size={28} className="text-white" />
                  </div>

                  {/* Text */}
                  <h3 className="font-display text-xl font-bold">{method.name}</h3>
                  <p className="text-muted-foreground text-sm text-center">
                    {method.description}
                  </p>

                  {/* Hover Glow */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                </a>
              </ElectricBorder>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
