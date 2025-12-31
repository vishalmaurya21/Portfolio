'use client';

import React, { useRef, useEffect, useState } from 'react';

interface CharacterProps {
    char: string;
    mousePos: { x: number; y: number };
}

function Character({ char, mousePos }: CharacterProps) {
    const charRef = useRef<HTMLSpanElement>(null);
    const [pressure, setPressure] = useState(0);

    useEffect(() => {
        if (!charRef.current) return;

        const rect = charRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
            Math.pow(mousePos.x - centerX, 2) + Math.pow(mousePos.y - centerY, 2)
        );

        // Maximum distance for the effect (in pixels)
        const maxDistance = 200;
        const newPressure = Math.max(0, 1 - distance / maxDistance);
        setPressure(newPressure);
    }, [mousePos]);

    const scale = 1 + pressure * 0.5; // Scale up to 1.5x
    const fontWeight = 400 + Math.floor(pressure * 600); // 400 to 1000

    return (
        <span
            ref={charRef}
            style={{
                display: 'inline-block',
                transform: `scale(${scale}) translateZ(0)`,
                fontWeight: fontWeight,
                transition: 'transform 0.15s ease-out, font-weight 0.15s ease-out',
                transformOrigin: 'center',
                backfaceVisibility: 'hidden',
                willChange: 'transform',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                background: 'linear-gradient(to right, #e0e0e0, #ffffff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
            }}
        >
            {char === ' ' ? '\u00A0' : char}
        </span>
    );
}

interface TextPressureProps {
    text: string;
    className?: string;
}

export default function TextPressure({ text, className = '' }: TextPressureProps) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <span className={className}>
            {text.split('').map((char, index) => (
                <Character key={index} char={char} mousePos={mousePos} />
            ))}
        </span>
    );
}
