import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownRight, ArrowUpRight, Check, ChevronRight, Clock3, Code2, LockKeyhole, Menu, Play, Plus, X, Zap } from 'lucide-react';
import { comingSoon, courses, domains } from './data';
import './styles.css';

const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100, active: false });
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;
    const move = (event) => setPos((current) => ({ ...current, x: event.clientX, y: event.clientY }));
    const over = (event) => setPos((current) => ({ ...current, active: Boolean(event.target.closest('a,button,[data-cursor]')) }));
    window.addEventListener('pointermove', move);
    window.addEventListener('mouseover', over);
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('mouseover', over); };
  }, []);
  return <span className={`cursor ${pos.active ? 'cursor-active' : ''}`} style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }} />;
}

function Brand({ compact = false }) {
  return <a className={`brand ${compact ? 'brand-compact' : ''}`} href="#top" onClick={(e) => { e.preventDefault(); scrollToId('top'); }} aria-label="Learn Anything home"><span className="brand-mark">{'{ }'}</span><span className="brand-name">LEARN <em>ANYTHING</em></span></a>;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const handle = () => setScrolled(window.scrollY > 30); window.addEventListener('scroll', handle); handle(); return () => window.removeEventListener('scroll', handle); }, []);
  const links = [['Home', 'top'], ['What You Can Learn', 'domains'], ['Courses', 'courses'], ['About Us', 'about'], ['Contact', 'contact']];
  const go = (id) => { setOpen(false); scrollToId(id); };
  return <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
    <div className="nav-shell"><Brand />
      <nav className={`nav-links ${open ? 'nav-open' : ''}`} aria-label="Primary navigation">
        {links.map(([label, id], index) => <a className={index === 0 ? 'nav-active' : ''} key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }}>{label}</a>)}
      </nav>
      <button className="button button-small nav-cta" onClick={() => go('courses')}>Explore Courses <ArrowUpRight size={15} /></button>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X size={20} /> : <Menu size={20} />}</button>
    </div>
  </header>;
}

const codeBits = ['{ }', '</>', '01', 'const', 'function', 'import', 'API', 'AI', 'CSS', 'JS', 'React', 'Node'];
function Hero() {
  return <section className="hero" id="top">
    <div className="hero-grid" />
    <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
    <div className="code-atmosphere" aria-hidden="true">{codeBits.map((bit, index) => <span key={bit} className={`code-bit bit-${index + 1}`}>{bit}</span>)}</div>
    <div className="hero-inner page-width">
      <div className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> YOUR JOURNEY STARTS HERE <span className="eyebrow-index">[ 00 / 01 ]</span></div>
      <h1 className="hero-title"><span>LEARN</span><span className="hero-title-accent">ANYTHING<span className="title-dot">.</span></span></h1>
      <div className="hero-bottom">
        <p className="hero-copy">Explore technology.<br /><span>Understand concepts.</span> Build real skills.</p>
        <div className="hero-actions"><button className="button button-primary" onClick={() => scrollToId('courses')}>Explore Courses <ArrowUpRight size={17} /></button><button className="text-button" onClick={() => scrollToId('domains')}>What Can I Learn? <ArrowDownRight size={17} /></button></div>
      </div>
    </div>
    <button className="scroll-cue" onClick={() => scrollToId('domains')} aria-label="Scroll to domains"><span>SCROLL TO EXPLORE</span><span className="scroll-line" /></button>
  </section>;
}

function SectionHeading({ index, eyebrow, title, copy, align = 'left' }) {
  return <div className={`section-heading ${align === 'center' ? 'heading-center' : ''} reveal`}><div className="heading-top"><span className="eyebrow">{eyebrow}</span><span className="section-index">{index}</span></div><h2>{title}</h2>{copy && <p>{copy}</p>}</div>;
}

function DomainCard({ domain, index, onOpen }) {
  const Icon = domain.icon;
  return <button className={`domain-card reveal reveal-delay-${(index % 4) + 1}`} onClick={() => onOpen(domain)} data-cursor>
    <div className={`domain-icon icon-${domain.accent}`}><Icon size={22} strokeWidth={1.5} /></div><span className="card-label">{domain.label}</span><h3>{domain.name}</h3><p>{domain.description}</p><span className="card-explore">EXPLORE <ArrowUpRight size={15} /></span>
  </button>;
}

function Domains({ onOpen }) {
  return <section className="section domains-section" id="domains"><div className="page-width"><SectionHeading index="01" eyebrow="CHOOSE YOUR DIRECTION" title={<>WHAT DO YOU WANT<br /><span>TO LEARN?</span></>} copy="Choose a domain and start exploring." /><div className="domain-grid">{domains.map((domain, index) => <DomainCard key={domain.id} domain={domain} index={index} onOpen={onOpen} />)}</div></div></section>;
}

function CodeThumbnail({ course, compact = false }) {
  return <div className={`code-thumb palette-${course.palette} ${compact ? 'thumb-compact' : ''}`}><div className="thumb-noise" /><div className="thumb-top"><span className="terminal-dots"><i /><i /><i /></span><span>{course.language}</span><span className="thumb-num">01 / {String(course.lessons).padStart(2, '0')}</span></div><div className="thumb-code"><span className="code-fade">// learn / build / repeat</span><strong>{course.symbol}</strong><span className="code-caret">_</span></div><div className="thumb-bottom"><span>LESSON 01</span><span>{course.duration}</span></div>{!compact && <span className="thumb-play"><Play size={16} fill="currentColor" /></span>}</div>;
}

function CourseCard({ course, index, onOpen }) {
  return <article className={`course-card reveal reveal-delay-${(index % 3) + 1}`} onClick={() => onOpen(course)} data-cursor><CodeThumbnail course={course} /><div className="course-info"><div className="course-tag">{course.tag}</div><h3>{course.title}</h3><p>{course.description}</p><div className="course-meta"><span>{course.lessons} lessons</span><span className="meta-divider" /><span>{course.duration}</span><ChevronRight className="course-arrow" size={18} /></div></div></article>;
}

function Courses({ onOpen }) {
  return <section className="section courses-section" id="courses"><div className="page-width"><SectionHeading index="02" eyebrow="STATIC COURSE LIBRARY" title={<>EXPLORE<br /><span>COURSES.</span></>} copy="Start with something you want to understand." /><div className="course-grid">{courses.map((course, index) => <CourseCard key={course.id} course={course} index={index} onOpen={onOpen} />)}</div><div className="course-foot reveal"><span>MORE SIGNAL, LESS NOISE.</span><button className="text-button" onClick={() => scrollToId('coming')}>See what is next <ArrowUpRight size={16} /></button></div></div></section>;
}

function ComingSoon() {
  return <section className="section coming-section" id="coming"><div className="page-width"><div className="coming-top reveal"><div><div className="eyebrow"><span className="eyebrow-line" /> IN THE PIPELINE</div><h2>MORE TO<br /><span>COME.</span></h2></div><p>Some things are worth<br />waiting to understand.</p></div><div className="coming-grid">{comingSoon.map((item, index) => { const Icon = item.icon; return <div className={`coming-card reveal reveal-delay-${(index % 3) + 1}`} key={item.name}><div className="coming-card-top"><Icon size={19} /><span><LockKeyhole size={13} /> COMING SOON</span></div><div className="coming-blur" /><div className="coming-info"><span>{item.meta}</span><h3>{item.name}</h3><span className="coming-arrow">{String(index + 1).padStart(2, '0')} <ArrowUpRight size={15} /></span></div></div>; })}</div></div></section>;
}

const features = [{ number: '01', title: 'Learn at Your Pace', copy: 'Explore topics whenever you want.', icon: Clock3 }, { number: '02', title: 'Practical Knowledge', copy: 'Focus on concepts that help you build.', icon: Zap }, { number: '03', title: 'Multiple Domains', copy: 'Explore technology from different perspectives.', icon: Code2 }, { number: '04', title: 'Always Growing', copy: 'New courses and topics are coming.', icon: Plus }];
function Features() {
  return <section className="section features-section" id="features"><div className="page-width"><SectionHeading index="03" eyebrow="THE WAY WE TEACH" title={<>LEARNING<br /><span>WITHOUT THE NOISE.</span></>} /><div className="feature-list">{features.map((feature, index) => { const Icon = feature.icon; return <div className={`feature-row reveal reveal-delay-${(index % 4) + 1}`} key={feature.number}><span className="feature-number">{feature.number}</span><Icon className="feature-icon" size={24} strokeWidth={1.5} /><div><h3>{feature.title}</h3><p>{feature.copy}</p></div><ArrowUpRight className="feature-arrow" size={20} /></div>; })}</div></div></section>;
}

function About() {
  return <section className="section about-section" id="about"><div className="page-width about-grid"><div className="about-copy"><SectionHeading index="04" eyebrow="THE WHY" title={<>LEARNING SHOULD<br /><span>HAVE NO LIMITS.</span></>} /><p className="about-lede reveal">Learn Anything is built around a simple idea — technology and knowledge should be easier to explore. Discover a topic, understand the fundamentals and keep building.</p><button className="text-button reveal" onClick={() => scrollToId('contact')}>Keep exploring <ArrowUpRight size={17} /></button></div><div className="about-terminal reveal"><div className="terminal-top"><span><i /><i /><i /></span><span>learn-anything / philosophy</span><span>01</span></div><div className="terminal-body"><span className="terminal-brace">{'{ }'}</span><span className="terminal-command">$ <b>keep</b> going<span className="terminal-caret">_</span></span><div className="terminal-steps"><span><b>01</b> LEARN</span><span><b>02</b> BUILD</span><span><b>03</b> REPEAT</span></div></div></div></div></section>;
}

function CTA() {
  return <section className="cta-section" id="contact"><div className="cta-glow" /><div className="page-width cta-inner reveal"><span className="eyebrow">A NEW TAB IS ALWAYS OPEN</span><h2>WHAT WILL YOU<br /><span>LEARN NEXT?</span></h2><p>There is always something new to explore.</p><button className="button button-primary" onClick={() => scrollToId('domains')}>Start Exploring <ArrowUpRight size={17} /></button></div></section>;
}

function Footer() {
  return <footer className="footer"><div className="page-width"><div className="footer-main"><div><Brand compact /><p className="footer-copy">A calm place to explore technology,<br />understand concepts and build real skills.</p></div><div className="footer-links"><span className="footer-label">NAVIGATE</span><a href="#top" onClick={(e) => { e.preventDefault(); scrollToId('top'); }}>Home</a><a href="#courses" onClick={(e) => { e.preventDefault(); scrollToId('courses'); }}>Courses</a><a href="#domains" onClick={(e) => { e.preventDefault(); scrollToId('domains'); }}>Domains</a><a href="#about" onClick={(e) => { e.preventDefault(); scrollToId('about'); }}>About</a><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToId('contact'); }}>Contact</a></div><div className="footer-links"><span className="footer-label">FOLLOW ALONG</span><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></div></div><div className="footer-bottom"><span>© 2026 Learn Anything. All rights reserved.</span><span>LEARN <b>·</b> EXPLORE <b>·</b> BUILD</span></div></div></footer>;
}

function CourseModal({ item, onClose }) {
  const [started, setStarted] = useState(false);
  useEffect(() => { const escape = (event) => event.key === 'Escape' && onClose(); window.addEventListener('keydown', escape); document.body.style.overflow = 'hidden'; return () => { window.removeEventListener('keydown', escape); document.body.style.overflow = ''; }; }, [onClose]);
  const isCourse = Boolean(item.lessons);
  const data = isCourse ? item : { title: item.name, description: item.description, lessons: 8, duration: '3h 20m', difficulty: 'Explore', language: item.name.toUpperCase(), symbol: '{ }', palette: 'lime', outline: ['Start with the fundamentals', 'Build confidence through practice', 'Take the next step'] };
  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`${data.title} details`} onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="course-modal"><button className="modal-close" onClick={onClose} aria-label="Close details"><X size={20} /></button><div className="modal-grid"><div className="modal-media">{started ? <div className="demo-player"><div className="player-status"><span className="live-dot" /> DEMO LESSON / PLAYBACK</div><div className="player-video-wrapper"><iframe className="player-iframe" src="https://www.youtube.com/embed/W6NZfCO5SIk?autoplay=1&rel=0&modestbranding=1" title={`${data.title} - Demo Lesson`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowFullScreen /></div></div> : <div className="modal-preview-wrapper" onClick={() => setStarted(true)}><CodeThumbnail course={data} compact /><button className="modal-play" onClick={(e) => { e.stopPropagation(); setStarted(true); }}><Play size={20} fill="currentColor" /> Preview demo lesson</button></div>}</div><div className="modal-content"><div className="course-tag">{isCourse ? data.tag : 'DOMAIN PATH'}</div><h2>{data.title}</h2><p>{data.description}</p><div className="modal-stats"><span><b>{data.lessons}</b> lessons</span><span><b>{data.duration}</b> total</span><span><b>{data.difficulty}</b> level</span></div><div className="lesson-list"><span className="footer-label">YOU WILL EXPLORE</span>{data.outline.map((lesson, index) => <div key={lesson}><span>{String(index + 1).padStart(2, '0')}</span><p>{lesson}</p><Check size={15} /></div>)}</div><button className="button button-primary modal-start" onClick={() => setStarted(true)}>{started ? 'Playing Demo Lesson' : 'Start Learning'} <ArrowUpRight size={17} /></button></div></div></div></div>;
}

function App() {
  useReveal();
  const [selected, setSelected] = useState(null);
  const openDetail = (item) => setSelected(item);
  const closeDetail = () => setSelected(null);
  const selectedKey = useMemo(() => selected?.id || selected?.name || '', [selected]);
  return <><Cursor /><Navbar /><main><Hero /><Domains onOpen={openDetail} /><Courses onOpen={openDetail} /><ComingSoon /><Features /><About /><CTA /></main><Footer />{selected && <CourseModal key={selectedKey} item={selected} onClose={closeDetail} />}</>;
}

createRoot(document.getElementById('root')).render(<App />);
