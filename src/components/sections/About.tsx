'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientY - rect.top - rect.height / 2) / 20;
        const y = (e.clientX - rect.left - rect.width / 2) / 20;
        setRotation({ x: -x, y });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    const bioText = [
        "I'm a passionate developer with a love for creating beautiful,",
        "functional, and user-friendly digital experiences. With expertise",
        "in modern web technologies, I transform ideas into reality.",
        "",
        "When I'm not coding, you can find me exploring new technologies,",
        "contributing to open-source projects, or enjoying a good cup of coffee.",
    ];

    const stats = [
        // { number: '5+', label: 'Years Experience' },
        // { number: '50+', label: 'Projects Completed' },
        // { number: '30+', label: 'Happy Clients' },
        { number: '10+', label: 'Technologies' },
    ];

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative py-32 overflow-hidden"
        >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-secondary/50 to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* 3D Avatar/Geometric Shape */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex justify-center"
                    >
                        <div
                            className="relative w-80 h-80 cursor-pointer perspective-1000"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            {/* Rotating geometric shape */}
                            <motion.div
                                className="absolute inset-0"
                                style={{
                                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                                    transformStyle: 'preserve-3d',
                                }}
                                transition={{ type: 'spring', stiffness: 100 }}
                            >
                                {/* Outer ring */}
                                <div className="absolute inset-0 rounded-full border-2 border-neon-cyan/30 animate-spin-slow" />
                                <div className="absolute inset-4 rounded-full border-2 border-neon-magenta/30 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />
                                <div className="absolute inset-8 rounded-full border-2 border-neon-purple/30 animate-spin-slow" style={{ animationDuration: '25s' }} />

                                {/* Center avatar area */}
                                <div className="absolute inset-16 rounded-full overflow-hidden glass flex items-center justify-center">
                                    <div className="text-6xl">👨‍💻</div>
                                </div>

                                {/* Floating dots */}
                                {[...Array(8)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-3 h-3 rounded-full bg-neon-cyan"
                                        style={{
                                            top: `${50 + 45 * Math.sin((i * Math.PI * 2) / 8)}%`,
                                            left: `${50 + 45 * Math.cos((i * Math.PI * 2) / 8)}%`,
                                            transform: 'translate(-50%, -50%)',
                                        }}
                                        animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [0.5, 1, 0.5],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: i * 0.2,
                                        }}
                                    />
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Bio Text */}
                    <div>
                        {bioText.map((line, index) => (
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, x: 30 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.3 + index * 0.1,
                                }}
                                className={`text-lg ${line ? 'text-gray-300' : 'h-4'} leading-relaxed`}
                            >
                                {line}
                            </motion.p>
                        ))}

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10"
                        >
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl font-bold text-gradient mb-1">
                                        {stat.number}
                                    </div>
                                    <div className="text-sm text-gray-400">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>

                        {/* Download CV Button */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.6, delay: 1 }}
                            className="mt-10"
                        >
                            <motion.a
                                href="#"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-outline inline-block"
                            >
                                Download CV
                            </motion.a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
