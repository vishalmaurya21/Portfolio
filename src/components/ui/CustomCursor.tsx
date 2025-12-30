'use client';

import { useEffect, useRef } from 'react';

interface CursorPoint {
    x: number;
    y: number;
    age: number;
}

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const trailRef = useRef<CursorPoint[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const canvas = canvasRef.current;
        if (!cursor || !canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let animationId: number;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e: MouseEvent) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;

            trailRef.current.push({
                x: e.clientX,
                y: e.clientY,
                age: 0,
            });

            if (trailRef.current.length > 20) {
                trailRef.current.shift();
            }
        };

        const handleClick = () => {
            cursor.classList.add('scale-150');
            setTimeout(() => cursor.classList.remove('scale-150'), 150);
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            trailRef.current = trailRef.current.filter((point) => {
                point.age++;
                return point.age < 20;
            });

            trailRef.current.forEach((point, index) => {
                const opacity = 1 - point.age / 20;
                const size = (1 - point.age / 20) * 8;

                ctx.beginPath();
                ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 0, 51, ${opacity * 0.5})`;
                ctx.fill();
            });

            animationId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none z-[9999]"
            />
            <div
                ref={cursorRef}
                className="fixed w-4 h-4 rounded-full border-2 border-neon-red pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 hidden md:block"
                style={{ mixBlendMode: 'difference' }}
            />
        </>
    );
}
