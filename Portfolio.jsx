import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  Database, 
  Code2, 
  Cpu, 
  ChevronDown,
  Menu,
  X,
  MapPin,
  Calendar,
  Award,
  BookOpen
} from 'lucide-react';

// --- Data ---
const NAV_LINKS = ['About', 'Skills', 'Projects', 'Training', 'Education', 'Contact'];

const SKILLS = [
  { category: 'Languages', icon: <Code2 size={20} />, items: ['Python', 'JavaScript', 'SQL', 'C', 'C++'] },
  { category: 'Frameworks & Libraries', icon: <Terminal size={20} />, items: ['Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib'] },
  { category: 'Tools & Platforms', icon: <Database size={20} />, items: ['Power BI', 'Streamlit'] },
  { category: 'APIs & AI Tools', icon: <Cpu size={20} />, items: ['Google Gemini AI'] },
];

const PROJECTS = [
  {
    title: 'Seattle Airbnb Listing Analysis & Price Prediction',
    date: 'Jul 2026',
    github: 'https://github.com/Sumeet-kumar24/Seattle-Airbnb-Price-Prediction',
    description: 'Analyzed 3,800+ Seattle Airbnb listings and engineered a Random Forest regression model to predict nightly price.',
    bullets: [
      'Developed a 7-tab Streamlit and Plotly dashboard, including a live price predictor powered by a serialized model.',
      'Led end-to-end EDA and modeling in a 2-member team; contributed to the final report and presentation.'
    ],
    tags: ['Python', 'Scikit-learn', 'Streamlit', 'Plotly', 'Random Forest'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
  },
  {
    title: 'MemeForge AI — AI-Powered Meme Generator',
    date: 'Mar 2026',
    github: 'https://github.com/Sumeet-kumar24/AI_Meme_Generator',
    description: 'Created a browser-based meme generator integrating Imgflip, Google Gemini AI, and Giphy APIs for caption generation.',
    bullets: [
      'Designed a glass-morphism UI in vanilla JavaScript with no external front-end dependencies.',
      'Documented the system architecture and wrote a technical viva guide covering API integration and fallback logic.'
    ],
    tags: ['JavaScript', 'Gemini AI', 'Imgflip API', 'Giphy API'],
    image: 'https://images.unsplash.com/photo-1655393008684-219cb523a5c7?q=80&w=2070&auto=format&fit=crop'
  },
  {
    title: 'Retail Customer Lifetime Value Prediction',
    date: 'Mar 2026',
    github: 'https://github.com/Sumeet-kumar24/Online-Retail-Intelligence-Dashboard',
    description: 'Performed EDA and feature engineering on the UCI Online Retail dataset to build a CLV prediction model.',
    bullets: [
      'Achieved an R² of 0.478 and validated feature significance with a T-statistic of −9.66.',
      'Authored an 18-section analytical report covering methodology from data cleaning to model evaluation, per LPU standards.'
    ],
    tags: ['Python', 'Pandas', 'Regression', 'EDA'],
    stats: [
      { label: 'R² Score', value: 0.478, max: 1 },
      { label: 'T-statistic', value: -9.66, max: -10 }
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop'
  }
];

const TRAINING = [
  { title: 'Next-Gen Data Bootcamp: SQL, Power BI, Python, ML & AI Automation', org: 'CPE, LPU', date: 'Jun–Jul 2026', extra: 'Earned an O grade' },
  { title: 'Database Management System (Part 1 & 2)', org: 'Infosys Springboard', date: 'Jul 2026' },
  { title: 'Programming in Java', org: 'NeoColab, LPU', date: 'May 2026' },
  { title: 'Oracle Data Platform 2025 Certified Foundations Associate', org: 'Oracle University', date: 'Apr 2026' },
  { title: 'Data Structures & Algorithms', org: 'NeoColab, LPU', date: 'Jan 2026' },
  { title: 'Object Oriented Programming', org: 'NeoColab, LPU', date: 'Jan 2026' },
  { title: 'Introduction to Business Intelligence', org: 'Infosys Springboard', date: 'Dec 2025' },
  { title: 'Programming Using C++', org: 'Infosys Springboard', date: 'Aug 2025' },
  { title: 'Computer Programming (72 Hrs)', org: 'NeoColab, LPU', date: 'May 2025' },
  { title: 'Basic to Beyond Python', org: 'CSE Pathshala', date: 'Jan 2025' },
];

const ACHIEVEMENTS = [
  { title: 'Competed in Algo-N-Hunt', desc: 'A competitive coding, puzzle, and gaming marathon by Optimus, LPU', date: 'Nov 2025' },
  { title: 'Competed in Byte Battle 1.0', desc: 'A technical quiz organized by Accenture under CPE, LPU', date: 'Sep 2025' },
  { title: 'Completed a CSR internship, "CyberSmart Awareness"', desc: 'With WNS Cares Foundation, applying presentation, tutoring, and outreach skills', date: 'Jul 2025' },
];

const EDUCATION = [
  { school: 'Lovely Professional University', location: 'Punjab, India', degree: 'B.Tech, Computer Science and Engineering', score: 'CGPA: 7.4', date: 'Since Aug 2024' },
  { school: 'Ebenezer Higher Secondary School', location: 'Gwalior, Madhya Pradesh', degree: 'Intermediate', score: '61%', date: 'Apr 2021–Mar 2023' },
  { school: 'Kendriya Vidyalaya', location: 'Gwalior, Madhya Pradesh', degree: 'Matriculation', score: '69%', date: 'Apr 2019–Mar 2021' },
];

// --- Components ---

const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const Navbar = ({ activeSection, isScrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-slate-800' : 'py-6 bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="text-xl font-bold tracking-tight text-slate-100 hover:text-emerald-400 transition-colors">
          SK<span className="text-emerald-500">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="relative text-sm font-medium text-slate-300 hover:text-white transition-colors py-2"
            >
              {link}
              {activeSection === link.toLowerCase() && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500 rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-slate-300 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className={`text-left text-lg font-medium ${activeSection === link.toLowerCase() ? 'text-emerald-400' : 'text-slate-300'}`}
                >
                  {link}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-violet-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl lg:w-3/5"
          >
            <p className="text-emerald-400 font-mono text-sm md:text-base mb-4 tracking-wide">Hi, my name is</p>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-100 tracking-tight mb-4">
              Sumeet Kumar.
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-400 mb-6 leading-tight">
              Building in Data Science, ML & AI.
            </h2>
            <p className="text-lg text-slate-400 mb-10 max-w-2xl leading-relaxed">
              B.Tech CSE @ Lovely Professional University · Data Science Minor. I turn data and AI into practical, usable products.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
              >
                View Projects
              </button>
              <button
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3 bg-slate-800/80 hover:bg-slate-700 backdrop-blur-sm text-slate-200 border border-slate-700 hover:border-slate-600 font-medium rounded-lg transition-all hover:scale-105 active:scale-95"
              >
                Get in Touch
              </button>
            </div>

            <div className="flex items-center gap-6 mt-12">
              <a href="https://linkedin.com/in/sumeetkumar9" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors hover:scale-110">
                <Linkedin size={24} />
              </a>
              <a href="https://github.com/Sumeet-kumar24" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors hover:scale-110">
                <Github size={24} />
              </a>
              <a href="mailto:sk3444136@gmail.com" className="text-slate-400 hover:text-emerald-400 transition-colors hover:scale-110">
                <Mail size={24} />
              </a>
            </div>
          </motion.div>

          {/* Photo Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:w-2/5 flex justify-center lg:justify-end w-full"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full p-2 bg-slate-800/50 backdrop-blur-sm group border border-slate-700/50 shadow-[0_0_40px_rgba(16,185,129,0.1)] hover:shadow-[0_0_60px_rgba(16,185,129,0.2)] transition-shadow duration-500">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/30 group-hover:border-emerald-500/60 group-hover:rotate-12 transition-all duration-700"></div>
              <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-900 border border-slate-700 flex items-center justify-center">
                {/* User photo */}
                <img 
                  src="/profile.jpg" 
                  alt="Sumeet Kumar" 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-slate-500"
      >
        <span className="text-xs tracking-widest uppercase mb-2">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

const SectionHeading = ({ children, number }) => (
  <div className="flex items-center gap-4 mb-12">
    <span className="text-emerald-400 font-mono text-xl">0{number}.</span>
    <h2 className="text-3xl md:text-4xl font-bold text-slate-100">{children}</h2>
    <div className="h-[1px] bg-slate-700 flex-grow ml-4 max-w-xs"></div>
  </div>
);

const About = () => (
  <section id="about" className="py-24 max-w-4xl mx-auto px-6 md:px-12 scroll-mt-20">
    <FadeIn>
      <SectionHeading number={1}>About Me</SectionHeading>
      <div className="text-slate-300 text-lg leading-relaxed space-y-6">
        <p>
          I am a CSE student at LPU with a Data Science minor, focused on turning data and AI into practical, usable products — from ML pricing models to AI-assisted creative tools.
        </p>
        <p>
          I feel comfortable working across the entire stack, from exploratory data analysis (EDA) and model building to developing the dashboards and interfaces that put these models directly in front of users.
        </p>
      </div>
    </FadeIn>
  </section>
);

const Skills = () => {
  return (
    <section id="skills" className="py-24 max-w-6xl mx-auto px-6 md:px-12 scroll-mt-20">
      <FadeIn>
        <SectionHeading number={2}>Skills & Technologies</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((skill, index) => (
            <motion.div
              key={skill.category}
              whileHover={{ y: -5 }}
              className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm rounded-xl p-6 hover:bg-slate-800 transition-colors shadow-lg"
            >
              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center mb-6">
                {skill.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-4">{skill.category}</h3>
              <ul className="space-y-2">
                {skill.items.map(item => (
                  <li key={item} className="text-slate-400 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 max-w-6xl mx-auto px-6 md:px-12 scroll-mt-20">
      <FadeIn>
        <SectionHeading number={3}>Featured Projects</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative w-full [perspective:1500px] group h-[500px]"
            >
              <motion.div
                variants={{
                  initial: { rotateY: 0 },
                  hover: { rotateY: 180 }
                }}
                initial="initial"
                whileHover="hover"
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative w-full h-full [transform-style:preserve-3d]"
              >
                {/* FRONT */}
                <div className="absolute inset-0 [backface-visibility:hidden] bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm rounded-xl overflow-hidden flex flex-col">
                  {/* Subtle gradient hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className="p-6 flex-grow flex flex-col z-10 h-full overflow-y-auto custom-scrollbar">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center text-emerald-400 shrink-0">
                        <Code2 size={20} />
                      </div>
                      <span className="text-slate-400 group-hover:text-emerald-400 transition-colors">
                        <Github size={22} />
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-emerald-500/80 mb-4">{project.date}</p>
                    <p className="text-sm text-slate-300 mb-4">{project.description}</p>
                    <ul className="text-sm text-slate-400 space-y-2 mb-6 flex-grow">
                      {project.bullets.map((bullet, i) => (
                        <li key={i} className="pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-emerald-500/50 before:rounded-full">
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {/* Animated Stats for CLV project */}
                    {project.stats && (
                      <div className="mb-6 space-y-3">
                        {project.stats.map(stat => (
                          <div key={stat.label}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-slate-400">{stat.label}</span>
                              <span className="text-emerald-400 font-mono">{stat.value}</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden relative">
                              <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: `${Math.abs(stat.value / stat.max * 100)}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                                className="absolute top-0 left-0 bg-emerald-500 h-1.5 rounded-full"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-700/50">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs font-mono text-slate-400 bg-slate-900/50 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* BACK */}
                <div className="absolute top-0 left-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl overflow-hidden border border-emerald-500/50 bg-slate-800 flex items-center justify-center group/back shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                  <div className="absolute inset-0 bg-slate-900/40 z-10 group-hover/back:bg-slate-900/60 transition-colors duration-300" />
                  <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                  <div className="relative z-20 flex flex-col items-center justify-center p-6 text-center transform scale-95 group-hover/back:scale-100 transition-transform duration-300">
                    <h4 className="text-lg font-bold text-white mb-6 drop-shadow-md">{project.title}</h4>
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-lg transition-colors shadow-lg"
                    >
                      <Github size={20} /> View on GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
};

const TrainingAndEdu = () => {
  return (
    <section id="training" className="py-24 max-w-6xl mx-auto px-6 md:px-12 scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Training */}
        <div>
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <Award className="text-emerald-400" size={28} />
              <h2 className="text-3xl font-bold text-slate-100">Training & Certs</h2>
            </div>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
              {TRAINING.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-900 group-hover:border-emerald-500 text-slate-500 group-hover:text-emerald-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm transition-colors z-10">
                    <BookOpen size={16} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm group-hover:border-emerald-500/30 transition-colors">
                    <div className="flex flex-col mb-1">
                      <span className="font-bold text-slate-200">{item.title}</span>
                      <span className="text-sm text-emerald-500/90">{item.org}</span>
                    </div>
                    <time className="text-xs font-mono text-slate-500">{item.date}</time>
                    {item.extra && <p className="text-sm text-slate-400 mt-2">{item.extra}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Education & Achievements */}
        <div id="education" className="scroll-mt-20">
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="text-emerald-400" size={28} />
              <h2 className="text-3xl font-bold text-slate-100">Education</h2>
            </div>
            <div className="space-y-6 mb-16">
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5 hover:border-emerald-500/30 transition-colors">
                  <h3 className="text-lg font-bold text-slate-200">{edu.school}</h3>
                  <p className="text-emerald-400 text-sm mb-2">{edu.degree}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {edu.location}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {edu.date}</span>
                    <span className="px-2 py-0.5 bg-slate-700 rounded text-slate-200">{edu.score}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 mb-8">
              <Award className="text-emerald-400" size={28} />
              <h2 className="text-3xl font-bold text-slate-100">Achievements</h2>
            </div>
            <div className="space-y-4">
              {ACHIEVEMENTS.map((ach, idx) => (
                <div key={idx} className="group flex gap-4 items-start">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-slate-700 group-hover:bg-emerald-400 transition-colors shrink-0" />
                  <div>
                    <h4 className="text-slate-200 font-medium">{ach.title}</h4>
                    <p className="text-sm text-slate-400 mt-1">{ach.desc}</p>
                    <span className="text-xs font-mono text-slate-500 mt-2 block">{ach.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 max-w-4xl mx-auto px-6 md:px-12 text-center scroll-mt-20">
      <FadeIn>
        <p className="text-emerald-400 font-mono text-sm mb-4">04. What's Next?</p>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">Let's build something.</h2>
        <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
          Whether you have a question, a project idea, or just want to say hi, my inbox is always open. I'll try my best to get back to you!
        </p>
        
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 max-w-md mx-auto mb-12 backdrop-blur-sm text-left">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Name</label>
              <input type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Email</label>
              <input type="email" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Message</label>
              <textarea rows="4" className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors resize-none" placeholder="Hello..." />
            </div>
            <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-lg transition-colors">
              Send Message
            </button>
          </form>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-slate-400 mb-12">
          <a href="mailto:sk3444136@gmail.com" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
            <Mail size={18} /> sk3444136@gmail.com
          </a>
          <span className="flex items-center gap-2">
            <Terminal size={18} /> +91-6260093145
          </span>
        </div>
      </FadeIn>
    </section>
  );
};

const Footer = () => (
  <footer className="py-8 text-center text-slate-500 text-sm font-mono flex flex-col items-center border-t border-slate-800/50 mt-10">
    <div className="flex gap-6 mb-4">
      <a href="https://github.com/Sumeet-kumar24" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors"><Github size={20} /></a>
      <a href="https://linkedin.com/in/sumeetkumar9" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors"><Linkedin size={20} /></a>
    </div>
    <p>Designed & Built by Sumeet Kumar</p>
  </footer>
);

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial loading animation timer
    const timer = setTimeout(() => setIsLoading(false), 2000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Active section tracking
      const sections = NAV_LINKS.map(link => link.toLowerCase());
      let current = '';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= (el.offsetTop - 150)) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-[100]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-extrabold text-slate-100 flex items-center gap-1 tracking-tighter"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            S
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: 'spring' }}
          >
            K
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
            className="text-emerald-500"
          >
            .
          </motion.span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden">
      <Navbar activeSection={activeSection} isScrolled={isScrolled} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <TrainingAndEdu />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
