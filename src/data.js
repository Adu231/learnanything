import { Braces, Smartphone, BrainCircuit, ChartNoAxesCombined, ShieldCheck, PenTool, Terminal, CloudCog } from 'lucide-react';

export const domains = [
  { id: 'web', label: '01 / BUILD', name: 'Web Development', short: 'Web', description: 'HTML, CSS, JavaScript, React and modern web technologies.', icon: Braces, accent: 'green' },
  { id: 'app', label: '02 / SHIP', name: 'App Development', short: 'Mobile', description: 'Android, mobile applications and app development concepts.', icon: Smartphone, accent: 'blue' },
  { id: 'ai', label: '03 / THINK', name: 'AI & Machine Learning', short: 'Intelligence', description: 'Artificial intelligence, machine learning and intelligent systems.', icon: BrainCircuit, accent: 'violet' },
  { id: 'data', label: '04 / FIND', name: 'Data Science', short: 'Data', description: 'Data analysis, Python, statistics and visualization.', icon: ChartNoAxesCombined, accent: 'amber' },
  { id: 'security', label: '05 / DEFEND', name: 'Cybersecurity', short: 'Security', description: 'Security fundamentals, ethical hacking and digital protection.', icon: ShieldCheck, accent: 'red' },
  { id: 'design', label: '06 / SHAPE', name: 'UI/UX Design', short: 'Design', description: 'User interfaces, user experience and product design.', icon: PenTool, accent: 'pink' },
  { id: 'programming', label: '07 / SOLVE', name: 'Programming', short: 'Foundations', description: 'Programming fundamentals, algorithms and problem solving.', icon: Terminal, accent: 'cyan' },
  { id: 'cloud', label: '08 / SCALE', name: 'Cloud & DevOps', short: 'Infrastructure', description: 'Cloud computing, deployment, servers and modern workflows.', icon: CloudCog, accent: 'orange' },
];

export const courses = [
  { id: 'html', tag: 'FOUNDATIONS', title: 'HTML & CSS Fundamentals', description: 'Learn the foundations of modern web pages.', lessons: 18, duration: '4h 20m', difficulty: 'Beginner', language: 'HTML / CSS', symbol: '</>', palette: 'lime', outline: ['Structure your first document', 'The box model, spacing & flow', 'Responsive layouts with CSS'] },
  { id: 'js', tag: 'PROGRAMMING', title: 'JavaScript Essentials', description: 'Understand programming logic and JavaScript fundamentals.', lessons: 24, duration: '6h 10m', difficulty: 'Beginner', language: 'JAVASCRIPT', symbol: 'JS', palette: 'yellow', outline: ['Variables & data types', 'Functions that do the work', 'Working with the DOM'] },
  { id: 'react', tag: 'INTERFACES', title: 'React Fundamentals', description: 'Build modern interactive interfaces with React.', lessons: 20, duration: '5h 35m', difficulty: 'Intermediate', language: 'REACT', symbol: '<R>', palette: 'cyan', outline: ['Thinking in components', 'State, props & effects', 'Composing a real interface'] },
  { id: 'python', tag: 'DATA & LOGIC', title: 'Python Basics', description: 'Start programming with Python.', lessons: 16, duration: '3h 45m', difficulty: 'Beginner', language: 'PYTHON', symbol: 'py', palette: 'blue', outline: ['Syntax without the noise', 'Lists, loops & logic', 'Your first useful script'] },
  { id: 'git', tag: 'WORKFLOW', title: 'Git & GitHub', description: 'Learn version control and modern collaboration.', lessons: 12, duration: '2h 30m', difficulty: 'Beginner', language: 'GIT', symbol: 'git', palette: 'orange', outline: ['Commits as checkpoints', 'Branching with confidence', 'Collaborating on GitHub'] },
  { id: 'node', tag: 'RUNTIME', title: 'Node.js Basics', description: 'Understand backend development with Node.js.', lessons: 22, duration: '5h 05m', difficulty: 'Intermediate', language: 'NODE', symbol: 'N', palette: 'green', outline: ['The Node runtime', 'Modules & file systems', 'Building a simple server'] },
];

export const comingSoon = [
  { name: 'Advanced AI Engineering', meta: 'NEXT / INTELLIGENCE', icon: BrainCircuit },
  { name: 'Full Stack Development', meta: 'NEXT / SYSTEMS', icon: Braces },
  { name: 'Advanced Cybersecurity', meta: 'NEXT / DEFENSE', icon: ShieldCheck },
  { name: 'Cloud Architecture', meta: 'NEXT / SCALE', icon: CloudCog },
];
