'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const skills = [
    { name: 'React / Next.js', level: 95, color: 'from-neon-cyan to-neon-blue' },
    { name: 'TypeScript', level: 90, color: 'from-neon-blue to-neon-purple' },
    { name: 'Node.js', level: 85, color: 'from-neon-purple to-neon-magenta' },
    { name: 'Python', level: 80, color: 'from-neon-magenta to-neon-pink' },
    { name: 'Database (SQL/NoSQL)', level: 85, color: 'from-neon-pink to-neon-cyan' },
    { name: 'UI/UX Design', level: 75, color: 'from-neon-cyan to-neon-magenta' },
];

const technologies = [
    { name: 'React', icon: '⚛️' },
    { name: 'Next.js', icon: '▲' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'Docker', icon: '🐳' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Git', icon: '📦' },
    { name: 'Figma', icon: '🎨' },
    { name: 'Tailwind', icon: '🎐' },
];

export default function Skills() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        if (isInView && !animated) {
            setAnimated(true);
        }
    }, [isInView, animated]);

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="relative py-32 overflow-hidden"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-secondary/50 to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title text-gradient">Skills & Technologies</h2>
                    <p className="section-subtitle mx-auto">
                        The tools and technologies I use to bring ideas to life
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Progress Bars */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-bold text-white mb-8">Expertise Level</h3>
                        <div className="space-y-6">
                            {skills.map((skill, index) => (
                                <div key={skill.name}>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-300 font-medium">{skill.name}</span>
                                        <span className="text-neon-cyan">{skill.level}%</span>
                                    </div>
                                    <div className="progress-bar">
                                        <motion.div
                                            className={`progress-bar-fill bg-gradient-to-r ${skill.color}`}
                                            initial={{ width: 0 }}
                                            animate={animated ? { width: `${skill.level}%` } : { width: 0 }}
                                            transition={{
                                                duration: 1,
                                                delay: 0.3 + index * 0.1,
                                                ease: 'easeOut',
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Technology Icons */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h3 className="text-2xl font-bold text-white mb-8">Tech Stack</h3>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                            {technologies.map((tech, index) => (
                                <motion.div
                                    key={tech.name}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{
                                        duration: 0.4,
                                        delay: 0.5 + index * 0.05,
                                        type: 'spring',
                                        stiffness: 200,
                                    }}
                                    whileHover={{
                                        scale: 1.1,
                                        y: -5,
                                    }}
                                    className="group relative"
                                >
                                    <div className="glass rounded-xl p-4 flex flex-col items-center gap-2 transition-all duration-300 group-hover:glow-cyan cursor-pointer">
                                        <motion.span
                                            className="text-3xl"
                                            animate={{
                                                scale: [1, 1.1, 1],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                delay: index * 0.1,
                                            }}
                                        >
                                            {tech.icon}
                                        </motion.span>
                                        <span className="text-xs text-gray-400 group-hover:text-white transition-colors text-center">
                                            {tech.name}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Radial Progress Charts */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-20"
                >
                    <h3 className="text-2xl font-bold text-white mb-8 text-center">Core Competencies</h3>
                    <div className="flex flex-wrap justify-center gap-8">
                        {[
                            { label: 'Frontend', value: 95 },
                            { label: 'Backend', value: 85 },
                            { label: 'DevOps', value: 70 },
                            { label: 'Design', value: 75 },
                        ].map((item, index) => (
                            <div key={item.label} className="flex flex-col items-center">
                                <div className="relative w-28 h-28">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="56"
                                            cy="56"
                                            r="48"
                                            fill="none"
                                            stroke="rgba(255,255,255,0.1)"
                                            strokeWidth="8"
                                        />
                                        <motion.circle
                                            cx="56"
                                            cy="56"
                                            r="48"
                                            fill="none"
                                            stroke="url(#gradient)"
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            strokeDasharray={`${2 * Math.PI * 48}`}
                                            initial={{ strokeDashoffset: 2 * Math.PI * 48 }}
                                            animate={animated ? {
                                                strokeDashoffset: 2 * Math.PI * 48 * (1 - item.value / 100),
                                            } : {}}
                                            transition={{
                                                duration: 1.5,
                                                delay: 0.8 + index * 0.2,
                                                ease: 'easeOut',
                                            }}
                                        />
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#00f5ff" />
                                                <stop offset="100%" stopColor="#ff00ff" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white">{item.value}%</span>
                                    </div>
                                </div>
                                <span className="mt-3 text-gray-300 font-medium">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
