'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface GlitchTextProps {
    text: string;
    className?: string;
}

export default function GlitchText({ text, className = '' }: GlitchTextProps) {
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 200);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <span className="relative inline-block">
            {/* Main text with gradient applied directly */}
            <span className={`relative z-10 ${className}`}>{text}</span>

            {/* Glitch layers - with white/silver colors */}
            {isGlitching && (
                <>
                    <motion.span
                        className="absolute top-0 left-0 opacity-80"
                        style={{ color: '#ffffff' }}
                        initial={{ x: 0, y: 0 }}
                        animate={{
                            x: [-2, 2, -1, 1, 0],
                            y: [1, -1, 2, -2, 0],
                        }}
                        transition={{ duration: 0.2, times: [0, 0.25, 0.5, 0.75, 1] }}
                        aria-hidden="true"
                    >
                        {text}
                    </motion.span>
                    <motion.span
                        className="absolute top-0 left-0 opacity-80"
                        style={{ color: '#e0e0e0' }}
                        initial={{ x: 0, y: 0 }}
                        animate={{
                            x: [2, -2, 1, -1, 0],
                            y: [-1, 1, -2, 2, 0],
                        }}
                        transition={{ duration: 0.2, times: [0, 0.25, 0.5, 0.75, 1] }}
                        aria-hidden="true"
                    >
                        {text}
                    </motion.span>
                </>
            )}
        </span>
    );
}
