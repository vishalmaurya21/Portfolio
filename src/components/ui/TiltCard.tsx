'use client';

import { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useSpring(0, { stiffness: 300, damping: 30 });
    const y = useSpring(0, { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const rotateX = (e.clientY - centerY) / 20;
        const rotateY = (centerX - e.clientX) / 20;

        x.set(rotateY);
        y.set(rotateX);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: y,
                rotateY: x,
                transformStyle: 'preserve-3d',
            }}
            className={className}
        >
            <motion.div
                animate={{
                    boxShadow: isHovered
                        ? '0 25px 50px rgba(255, 0, 51, 0.2)'
                        : '0 10px 30px rgba(0, 0, 0, 0.3)',
                }}
                style={{ transform: 'translateZ(50px)' }}
                className="h-full"
            >
                {children}
            </motion.div>
        </motion.div>
    );
}
