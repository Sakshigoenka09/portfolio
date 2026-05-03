import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Canvas } from '@react-three/fiber';
import { AbstractBackground } from './components/AbstractBackground';
import CursorTrail from './components/CursorTrail';
import { motion } from 'framer-motion';
import './App.css';
import './index.css';

const sections = {
  hero: {
    title: "Hi, I am Sakshi Goenka",
    subtitle: "Full-Stack MERN Developer.",
    socials: [
      { label: "GitHub", url: "https://github.com/Sakshigoenka09" },
      { label: "LinkedIn", url: "https://linkedin.com/in/sakshi-goenka-887199226" },
      { label: "Email", url: "mailto:sakshigoenka32@gmail.com" },
    ]
  },
  about: {
    title: "About Me",
    content: "Full-Stack MERN Developer with 1+ years of experience building scalable, high-performance web applications at BitCanny Pvt. Ltd. Proficient in designing RESTful APIs, implementing secure authentication systems, and developing responsive React interfaces. Experienced in delivering production-grade platforms including a multi-vendor marketplace and social media applications. Passionate about performance optimization and modern UI/UX with Three.js and Framer Motion.",
    skillCategories: [
      { label: "Languages", items: ["C/C++", "JavaScript (ES6+)", "TypeScript", "Python"] },
      { label: "Frontend", items: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Three.js", "Framer Motion"] },
      { label: "Backend", items: ["Node.js", "Express.js", "REST APIs", "WebSockets", "Auth (JWT, bcrypt)", "RAG", "pgvector"] },
      { label: "Databases", items: ["MongoDB", "MySQL", "Mongoose", "Vector DB"] },
      { label: "DevOps & Cloud", items: ["AWS S3", "CI/CD Pipelines", "Vercel", "Render", "Cloudinary", "Supabase", "lambda"] },
      { label: "Tools", items: ["Git", "GitHub", "Postman", "VS Code", "Figma", "Canva"] },
    ],
    achievements: ["German A1 Certification", "Solved 350+ DSA problems on LeetCode and various coding platforms"]
  },
  experience: {
    title: "Experience",
    items: [
      {
        role: "MERN Stack Developer",
        company: "BitCanny Technologies Pvt. Ltd.",
        time: "Feb 2025 — Feb 2026",
        highlights: [
          "Built 10+ production React UI screens and implemented search, filtering, and infinite scroll for large product datasets in KlosetKlub, a multi-vendor fashion marketplace.",
          "Executed Node.js data migration scripts updating 500+ records across 150+ paginated API pages. Worked with structured data flow and backend processing patterns aligned with event-driven systems.",
          "Developed category and activity listing pages with booking workflows using React.js for Activity Time, a kids' activities platform.",
          "Implemented dynamic pricing logic (Early Bird) and reusable UI components for scalable frontend architecture."
        ],
        links: [
          { label: "KlosetKlub — Live", url: "https://www.klosetklub.com/" },
          { label: "Activity Time — Live", url: "https://www.activity-time.com/" },
        ]
      }
    ]
  },
  projects: {
    title: "Featured Projects",
    items: [
      { name: "3D Interactive Developer Portfolio", tech: "MERN Stack • Three.js • Framer Motion", desc: "Developed a high-performance full-stack portfolio using the MERN stack with an interactive 3D UI powered by Three.js and React Three Fiber. Implemented smooth scroll animations and dynamic transitions using Framer Motion.", link: "https://rtfolio-nine-eta-ata6xmue4l.vercel.app", github: "https://github.com/Sakshigoenka09/portfolio" },
      { name: "InstaVibe", tech: "MERN Stack • JWT • Cloudinary • Multer", desc: "Built and deployed a full-stack social platform with 19+ RESTful API endpoints. Implemented secure JWT authentication, bcrypt hashing, and email-based recovery. Integrated media uploads and designed scalable MongoDB schemas.", link: "https://instagram-backend-clone-5o3u.vercel.app/", github: "https://github.com/Sakshigoenka09/Instagram-Backend-Clone-" },
      { name: "Community-Brain: AI Slack RAG Bot", tech: "Node.js • Groq (LLaMA 3.3) • Supabase (pgvector)", desc: "Built an AI-powered assistant for Slack using Node.js and Slack APIs to provide context-aware answers. Implemented a fast search system using RAG with Groq and Supabase, and a real-time pipeline to index new messages with a custom embedding setup.", link: null, github: null },
      { name: "Pulse", tech: "MERN Stack • In Development", desc: "A collaborative task-management platform with secure JWT authentication, project workspaces, and team-based task tracking — designed for real-world productivity workflows.", link: null, github: "https://github.com/Sakshigoenka09/pulse" },
      { name: "Furniro", tech: "HTML • CSS • JavaScript", desc: "A fully responsive furniture e-commerce frontend with pixel-perfect design, reusable UI components, and structured layouts optimized for performance and scalability.", link: "https://furniro-lime.vercel.app/", github: "https://github.com/Sakshigoenka09/Furniro" }
    ]
  },
  contact: {
    title: "Get in Touch",
    email: "sakshigoenka32@gmail.com",
    phone: "+91-7029438250",
    location: "Kolkata, India",
    content: "Looking to collaborate or build something awesome? Let's talk.",
  }
};

const Navbar = () => (
  <nav className="top-nav-bar">
    <a href="#home" className="nav-logo">Sakshi<span>.dev</span></a>
    <div className="nav-links">
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#experience">Experience</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
      <a href="/resume.pdf" download className="nav-resume-btn">Download Resume</a>
    </div>
  </nav>
);

const FadeInSection = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay }}
    className="section-content"
    style={{ perspective: 1000 }} // Added perspective to parent
  >
    {children}
  </motion.div>
);

const TiltCard = ({ children, className }) => (
  <motion.div
    className={`${className} glow-border`}
    whileHover={{ scale: 1.02, y: -8 }}
    transition={{ type: "spring", stiffness: 200, damping: 15 }}
  >
    {children}
  </motion.div>
);

function App() {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Sending email via EmailJS
    emailjs.sendForm('service_p9e325a', 'template_aolf7gi', formRef.current, 'iRfONB_uqkekS9B8H')
      .then((result) => {
          setSubmitStatus('success');
          setIsSubmitting(false);
          e.target.reset(); // clear form fields
          setTimeout(() => setSubmitStatus(null), 5000);
      }, (error) => {
          console.error(error.text);
          setSubmitStatus('error');
          setIsSubmitting(false);
          setTimeout(() => setSubmitStatus(null), 5000);
      });
  };

  return (
    <div className="main-wrapper">
      <CursorTrail />
      {/* 3D Background Fixed layer */}
      <div className="canvas-wrapper">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <AbstractBackground />
        </Canvas>
      </div>

      {/* Scrollable HTML overlay */}
      <div className="content-wrapper">
        <Navbar />

        {/* HERO SECTION */}
        <section id="home" className="fullscreen-section">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="hero-text"
          >
            <h1>{sections.hero.title}</h1>
            <p className="gradient-text subtitle">{sections.hero.subtitle}</p>
            <div className="hero-socials">
              {sections.hero.socials.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noreferrer" className="social-link">{s.label}</a>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="content-section">
          <FadeInSection>
            <h2 className="gradient-text">{sections.about.title}</h2>
            <div className="about-grid">
              <TiltCard className="glass-card flex-1">
                <p className="large-text">{sections.about.content}</p>
              </TiltCard>
              <TiltCard className="profile-container">
                <img src="/profile.jpeg" alt="Sakshi Goenka" className="profile-img" onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.classList.add('no-img'); }} />
              </TiltCard>
            </div>
          </FadeInSection>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="content-section">
          <FadeInSection>
            <h2 className="gradient-text">Skills & Technologies</h2>
            <div className="skills-grid">
              {sections.about.skillCategories.map((cat, idx) => (
                <TiltCard key={idx} className="glass-card skill-category-card">
                  <h3 className="skill-cat-title">{cat.label}</h3>
                  <div className="skill-items">
                    {cat.items.map((item, i) => <span key={i} className="skill-chip">{item}</span>)}
                  </div>
                </TiltCard>
              ))}
            </div>

            <h3 className="gradient-text" style={{ marginTop: '60px', fontSize: '2rem' }}>Achievements</h3>
            <div className="achievements-grid">
              {sections.about.achievements.map((ach, idx) => (
                <TiltCard key={idx} className="glass-card achievement-card">
                  <span className="achievement-icon">🏆</span>
                  <p>{ach}</p>
                </TiltCard>
              ))}
            </div>
          </FadeInSection>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="content-section">
          <FadeInSection>
            <h2 className="gradient-text">{sections.experience.title}</h2>
            <div className="experience-list">
              {sections.experience.items.map((job, idx) => (
                <TiltCard key={idx} className="glass-card exp-card">
                  <div className="exp-header">
                    <h3>{job.role}</h3>
                    <span className="exp-time">{job.time}</span>
                  </div>
                  <h4 className="exp-company">{job.company}</h4>
                  <ul className="exp-highlights">
                    {job.highlights.map((h, i) => <li key={i}>{h}</li>)}
                  </ul>
                  <div className="exp-links">
                    {job.links.map((link, i) => (
                      <a key={i} href={link.url} target="_blank" rel="noreferrer" className="btn-secondary">{link.label} ↗</a>
                    ))}
                  </div>
                </TiltCard>
              ))}
            </div>
          </FadeInSection>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="content-section">
          <FadeInSection>
            <h2 className="gradient-text">{sections.projects.title}</h2>
            <div className="projects-grid">
              {sections.projects.items.map((project, idx) => (
                <TiltCard key={idx} className="glass-card project-card">
                  <h3>{project.name}</h3>
                  <p className="tech-stack">{project.tech}</p>
                  <p className="project-desc">{project.desc}</p>
                  <div className="project-links">
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '10px 25px', fontSize: '0.9rem' }}>Live Demo ↗</a>
                    ) : (
                      <span className="btn-disabled">Live Demo (Coming Soon)</span>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="btn-secondary">GitHub ↗</a>
                    )}
                  </div>
                </TiltCard>
              ))}
            </div>
          </FadeInSection>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="content-section">
          <FadeInSection>
            <h2 className="gradient-text">{sections.contact.title}</h2>
            <div className="contact-grid">
              <TiltCard className="glass-card contact-info">
                <h3>Contact Info</h3>
                <p style={{ marginTop: '20px' }}><strong>Email:</strong> <a href="mailto:sakshigoenka32@gmail.com" className="inline-link">{sections.contact.email}</a></p>
                <p><strong>Phone:</strong> {sections.contact.phone}</p>
                <p><strong>Location:</strong> {sections.contact.location}</p>
                <div className="contact-socials">
                  <a href="https://github.com/Sakshigoenka09" target="_blank" rel="noreferrer" className="social-link">GitHub</a>
                  <a href="https://linkedin.com/in/sakshi-goenka-887199226" target="_blank" rel="noreferrer" className="social-link">LinkedIn</a>
                </div>
              </TiltCard>
              <TiltCard className="glass-card contact-card">
                <p className="large-text">{sections.contact.content}</p>
                <form ref={formRef} className="contact-form" onSubmit={sendEmail}>
                  <input type="text" name="name" placeholder="Name" required />
                  <input type="email" name="email" placeholder="Email" required />
                  <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
                  <button type="submit" className="btn-primary" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1 }}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  {submitStatus === 'success' && <p style={{color: '#4ade80', marginTop: '15px', fontSize: '0.9rem', textAlign: 'center'}}>Message sent successfully! 🚀</p>}
                  {submitStatus === 'error' && <p style={{color: '#f87171', marginTop: '15px', fontSize: '0.9rem', textAlign: 'center'}}>Failed to send message. Please try again.</p>}
                </form>
              </TiltCard>
            </div>
          </FadeInSection>
        </section>

        <footer className="footer">
          <p>© {new Date().getFullYear()} Sakshi Goenka. Built with MERN, Vite & React Three Fiber.</p>
        </footer>

      </div>
    </div>
  );
}

export default App;
