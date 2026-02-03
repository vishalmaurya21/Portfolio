'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronDown } from 'lucide-react';
import TiltCard from '../ui/TiltCard';

const projects = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'A full-featured online store with cart, checkout, and payment integration.',
        longDescription: 'Built a comprehensive e-commerce solution with real-time inventory management, secure payment processing via Stripe, and an admin dashboard for order management. Implemented advanced features like wishlist, product reviews, and recommendation engine.',
        tags: ['React', 'Next.js', 'Stripe', 'MongoDB'],
        category: 'fullstack',
        github: 'https://github.com',
        demo: 'https://demo.com',
    },
    {
        id: 2,
        title: 'AI Dashboard',
        description: 'Analytics dashboard with machine learning predictions and data visualization.',
        longDescription: 'Created an intelligent dashboard that analyzes user behavior patterns and provides predictive insights. Integrated TensorFlow models for forecasting and D3.js for interactive data visualizations.',
        tags: ['Python', 'TensorFlow', 'React', 'D3.js'],
        category: 'ai',
        github: 'https://github.com',
        demo: 'https://demo.com',
    },
    {
        id: 3,
        title: 'Mobile Banking App',
        description: 'Secure mobile banking application with biometric authentication.',
        longDescription: 'Developed a secure banking application with end-to-end encryption, biometric authentication, and real-time transaction monitoring. Features include instant money transfers, bill payments, and spending analytics.',
        tags: ['React Native', 'Node.js', 'PostgreSQL'],
        category: 'mobile',
        github: 'https://github.com',
        demo: 'https://demo.com',
    },
    {
        id: 4,
        title: 'Social Media Platform',
        description: 'Real-time social networking app with chat and media sharing.',
        longDescription: 'Built a comprehensive social platform with real-time messaging using WebSockets, media upload with cloud storage, and feed algorithm for personalized content. Scaled to handle 10K+ concurrent users.',
        tags: ['Next.js', 'Socket.io', 'Redis', 'AWS'],
        category: 'fullstack',
        github: 'https://github.com',
        demo: 'https://demo.com',
    },
    {
        id: 5,
        title: 'Portfolio Website',
        description: 'Modern portfolio with animations and interactive elements.',
        longDescription: 'Designed and developed a cutting-edge portfolio showcasing advanced web technologies, smooth animations, and interactive 3D effects. Optimized for performance and SEO.',
        tags: ['React', 'Framer Motion', 'Tailwind'],
        category: 'frontend',
        github: 'https://github.com',
        demo: 'https://demo.com',
    },
    {
        id: 6,
        title: 'Task Management',
        description: 'Collaborative project management tool with Kanban boards.',
        longDescription: 'Created a collaborative project management system with drag-and-drop Kanban boards, team chat, and real-time updates. Integrated calendar views and time tracking features.',
        tags: ['Vue.js', 'Firebase', 'Vuetify'],
        category: 'frontend',
        github: 'https://github.com',
        demo: 'https://demo.com',
    },
];

const categories = [
    { id: 'all', label: 'All' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'ai', label: 'AI/ML' },
];

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [expandedProject, setExpandedProject] = useState<number | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    const filteredProjects = activeCategory === 'all'
        ? projects
        : projects.filter((p) => p.category === activeCategory);

    const handleKeyDown = (e: React.KeyboardEvent, projectId: number) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setExpandedProject(expandedProject === projectId ? null : projectId);
        }
    };

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative py-32 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-tertiary/30 to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="section-title text-gradient">Featured Projects</h2>
                    <p className="section-subtitle mx-auto">
                        Click on a project card to learn more
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border-2 ${activeCategory === category.id
                                ? 'bg-white text-black border-white shadow-lg shadow-white/20'
                                : 'bg-transparent text-white border-white/30 hover:border-white/60 hover:bg-white/10'
                                }`}
                        >
                            {category.label}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <TiltCard
                                key={project.id}
                                className="h-full"
                            >
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                                    onKeyDown={(e) => handleKeyDown(e, project.id)}
                                    className="card h-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                                    role="button"
                                    tabIndex={0}
                                    aria-expanded={expandedProject === project.id}
                                >
                                    {/* Project Image */}
                                    <div className="relative h-40 overflow-hidden bg-gradient-to-br from-neon-red/20 to-neon-crimson/20 flex items-center justify-center">
                                        <span className="text-4xl">🚀</span>
                                    </div>

                                    {/* Project Info */}
                                    <div className="p-5">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-lg font-bold text-white group-hover:text-gradient transition-all">
                                                {project.title}
                                            </h3>
                                            <motion.div
                                                animate={{ rotate: expandedProject === project.id ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <ChevronDown className="w-5 h-5 text-neon-red" />
                                            </motion.div>
                                        </div>

                                        <p className="text-gray-400 text-sm mb-3">
                                            {project.description}
                                        </p>

                                        {/* Expandable Details */}
                                        <AnimatePresence>
                                            {expandedProject === project.id && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="pt-3 border-t border-white/10 mb-3">
                                                        <p className="text-gray-300 text-sm leading-relaxed">
                                                            {project.longDescription}
                                                        </p>
                                                    </div>

                                                    <div className="flex gap-2 mb-3">
                                                        <a
                                                            href={project.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="flex-1 px-3 py-2 rounded-lg glass hover:glow-cyan transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                                                        >
                                                            <Github className="w-4 h-4" />
                                                            Code
                                                        </a>
                                                        <a
                                                            href={project.demo}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="flex-1 px-3 py-2 rounded-lg bg-gradient-to-r from-neon-red to-neon-crimson text-white hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                                                        >
                                                            <ExternalLink className="w-4 h-4" />
                                                            Demo
                                                        </a>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-1 text-xs rounded-full bg-dark-tertiary text-neon-red border border-neon-red/20"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {project.tags.length > 3 && (
                                                <span className="px-2 py-1 text-xs rounded-full bg-dark-tertiary text-gray-400">
                                                    +{project.tags.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </TiltCard>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
