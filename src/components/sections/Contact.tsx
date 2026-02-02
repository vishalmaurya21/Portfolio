'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Check, Loader2 } from 'lucide-react';

export default function Contact() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
    const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [focused, setFocused] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('loading');

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setFormState('success');
        setFormData({ name: '', email: '', subject: '', message: '' });

        // Reset after 3 seconds
        setTimeout(() => setFormState('idle'), 3000);
    };

    const contactInfo = [
        { icon: Mail, label: 'Email', value: 'iamviishalkumar@gmail.com' },
        { icon: MapPin, label: 'Location', value: 'Ahmedabad, India' },
        { icon: Phone, label: 'Phone', value: '+91 6393965886' },
    ];

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative py-32 overflow-hidden"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-tertiary/30 via-transparent to-transparent" />

            {/* Animated gradient orbs */}
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-neon-magenta/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-2s' }} />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>

                        <div className="space-y-6 mb-10">
                            {contactInfo.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="p-3 rounded-xl glass group-hover:glow-cyan transition-all duration-300">
                                        <item.icon className="w-5 h-5 text-neon-cyan" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">{item.label}</p>
                                        <p className="text-white font-medium">{item.value}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="text-gray-400 leading-relaxed"
                        >
                            I&apos;m currently available for freelance work and full-time positions.
                            If you have a project that needs my expertise, or if you just want to say hi,
                            feel free to reach out!
                        </motion.p>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name & Email Row */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="relative">
                                    <label htmlFor="name" className="sr-only">Your Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        onFocus={() => setFocused('name')}
                                        onBlur={() => setFocused(null)}
                                        required
                                        className={`input-field ${focused === 'name' ? 'ring-2 ring-neon-cyan/50' : ''}`}
                                    />
                                    <motion.div
                                        animate={{ scaleX: focused === 'name' ? 1 : 0 }}
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-magenta origin-left"
                                    />
                                </div>
                                <div className="relative">
                                    <label htmlFor="email" className="sr-only">Your Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        onFocus={() => setFocused('email')}
                                        onBlur={() => setFocused(null)}
                                        required
                                        className={`input-field ${focused === 'email' ? 'ring-2 ring-neon-cyan/50' : ''}`}
                                    />
                                    <motion.div
                                        animate={{ scaleX: focused === 'email' ? 1 : 0 }}
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-magenta origin-left"
                                    />
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="relative">
                                <label htmlFor="subject" className="sr-only">Subject</label>
                                <input
                                    id="subject"
                                    type="text"
                                    placeholder="Subject"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    onFocus={() => setFocused('subject')}
                                    onBlur={() => setFocused(null)}
                                    required
                                    className={`input-field ${focused === 'subject' ? 'ring-2 ring-neon-cyan/50' : ''}`}
                                />
                                <motion.div
                                    animate={{ scaleX: focused === 'subject' ? 1 : 0 }}
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-magenta origin-left"
                                />
                            </div>

                            {/* Message */}
                            <div className="relative">
                                <label htmlFor="message" className="sr-only">Your Message</label>
                                <textarea
                                    id="message"
                                    placeholder="Your Message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    onFocus={() => setFocused('message')}
                                    onBlur={() => setFocused(null)}
                                    required
                                    rows={5}
                                    className={`input-field resize-none ${focused === 'message' ? 'ring-2 ring-neon-cyan/50' : ''}`}
                                />
                                <motion.div
                                    animate={{ scaleX: focused === 'message' ? 1 : 0 }}
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-magenta origin-left"
                                />
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={formState === 'loading' || formState === 'success'}
                                whileHover={{ scale: formState === 'idle' ? 1.02 : 1 }}
                                whileTap={{ scale: formState === 'idle' ? 0.98 : 1 }}
                                aria-label={formState === 'loading' ? 'Sending message...' : undefined}
                                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 border-2 ${formState === 'success'
                                    ? 'bg-green-500 text-white border-green-500'
                                    : formState === 'loading'
                                        ? 'bg-white/80 text-black border-white/80 opacity-80 cursor-not-allowed'
                                        : 'bg-white text-black border-white hover:bg-white/90 hover:shadow-lg hover:shadow-white/20'
                                    }`}
                            >
                                <AnimatePresence mode="wait">
                                    {formState === 'idle' && (
                                        <motion.span
                                            key="idle"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center gap-2"
                                        >
                                            Send Message <Send className="w-5 h-5" />
                                        </motion.span>
                                    )}
                                    {formState === 'loading' && (
                                        <motion.span
                                            key="loading"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                        >
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                        </motion.span>
                                    )}
                                    {formState === 'success' && (
                                        <motion.span
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            className="flex items-center gap-2"
                                            role="status"
                                            aria-live="polite"
                                        >
                                            Message Sent! <Check className="w-5 h-5" />
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
