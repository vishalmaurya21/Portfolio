'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Twitter } from 'lucide-react';
import TypingText from '../ui/TypingText';
import GlitchText from '../ui/GlitchText';
import MagneticButton from '../ui/MagneticButton';

export default function Hero() {
    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Gradient orbs background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-20 w-64 md:w-96 h-64 md:h-96 bg-neon-red/20 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 -right-20 w-64 md:w-96 h-64 md:h-96 bg-neon-crimson/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-neon-blood/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Text content */}
                    <div className="text-center lg:text-left">
                        {/* Name */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6"
                        >
                            <GlitchText text="Vishal Kumar" className="text-gradient" />
                        </motion.h1>

                        {/* Typing Text */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 md:mb-8 h-10 md:h-12"
                        >
                            <TypingText
                                texts={[
                                    'Full Stack Developer',
                                    'UI/UX Designer',
                                    'Creative Problem Solver',
                                    'Tech Enthusiast',
                                ]}
                                className="font-light"
                            />
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl lg:max-w-none mb-8 md:mb-10"
                        >
                            I build exceptional digital experiences that combine beautiful design
                            with robust functionality. Let&apos;s create something amazing together.
                        </motion.p>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="flex items-center justify-center lg:justify-start gap-6"
                        >
                            {[
                                { icon: Github, href: 'https://github.com', label: 'GitHub' },
                                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                                { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                            ].map(({ icon: Icon, href, label }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.2, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 md:p-3 rounded-full glass hover:glow-cyan transition-all duration-300"
                                    aria-label={label}
                                >
                                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-gray-400 hover:text-neon-white transition-colors" />
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right side - Profile Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex justify-center lg:justify-end"
                    >
                        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                            {/* Glow effect behind image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-neon-white/20 to-neon-silver/20 rounded-full blur-2xl" />

                            {/* Image container */}
                            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-neon-white/20 hover:border-neon-white/40 transition-all duration-300">
                                <img
                                    src="/profile.jpg"
                                    alt="Vishal Kumar"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

        </section>
    );
}
