'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Update active section
            const sections = navLinks.map((link) => link.href.slice(1));
            for (const section of sections.reverse()) {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 150) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = (href: string) => {
        setIsMobileMenuOpen(false);
        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Desktop Right-Side Navbar */}
            <motion.nav
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`hidden md:block fixed right-0 top-0 bottom-0 z-50 transition-all duration-300 glass-strong px-4 py-8 border-l border-white/10`}
            >
                <div className="h-full flex flex-col items-center justify-center gap-8">
                    <div className="flex flex-col items-center gap-6">
                        {navLinks.map((link) => (
                            <motion.button
                                key={link.name}
                                onClick={() => handleLinkClick(link.href)}
                                whileHover={{ scale: 1.05 }}
                                className={`relative px-2 py-1 text-sm font-medium transition-colors ${activeSection === link.href.slice(1)
                                    ? 'text-neon-cyan'
                                    : 'text-gray-300 hover:text-white'
                                    }`}
                            >
                                {link.name}
                                {activeSection === link.href.slice(1) && (
                                    <motion.div
                                        layoutId="activeSection"
                                        className="absolute -left-1 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-white to-neon-silver"
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Top Navbar */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-strong' : 'glass'
                    } border-b border-white/10`}
            >
                <div className="flex items-center justify-between px-6 py-4">
                    <button
                        onClick={() => handleLinkClick('#home')}
                        className="text-xl font-bold text-gradient"
                    >
                        VK
                    </button>

                    {/* Hamburger Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-white"
                    >
                        <AnimatePresence mode="wait">
                            {isMobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X className="w-6 h-6" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu className="w-6 h-6" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>

                {/* Mobile Dropdown Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden glass-strong border-t border-white/10"
                        >
                            <div className="flex flex-col py-4 px-6 gap-4">
                                {navLinks.map((link, index) => (
                                    <motion.button
                                        key={link.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => handleLinkClick(link.href)}
                                        className={`text-left py-2 px-4 rounded-lg transition-all ${activeSection === link.href.slice(1)
                                            ? 'bg-white/10 text-gradient font-medium'
                                            : 'text-gray-300 hover:bg-white/5'
                                            }`}
                                    >
                                        {link.name}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    );
}
