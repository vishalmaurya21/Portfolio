'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
}

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationIdRef = useRef<number>();
    const mouseRef = useRef({ x: 0, y: 0 });
    const lastMouseUpdateRef = useRef<number>(0);

    const initParticles = useCallback((width: number, height: number) => {
        const particles: Particle[] = [];
        // Reduce particle count on mobile for better performance
        const isMobile = width < 768;
        const count = isMobile ? 50 : Math.min(150, Math.floor((width * height) / 10000));

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                size: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.6 + 0.4,
            });
        }
        return particles;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particlesRef.current = initParticles(canvas.width, canvas.height);
        };

        // Throttle mouse movement to reduce CPU usage
        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            if (now - lastMouseUpdateRef.current > 16) { // ~60fps throttle
                mouseRef.current.x = e.clientX;
                mouseRef.current.y = e.clientY;
                lastMouseUpdateRef.current = now;
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        let lastFrameTime = 0;
        const targetFPS = 60;
        const frameInterval = 1000 / targetFPS;

        const animate = (currentTime: number) => {
            // Limit to 60fps
            const elapsed = currentTime - lastFrameTime;

            if (elapsed > frameInterval) {
                lastFrameTime = currentTime - (elapsed % frameInterval);

                // Clear canvas with solid background for better performance
                ctx.fillStyle = '#0a0a0a';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                const repelRadius = 120;
                const repelRadiusSq = repelRadius * repelRadius;

                particlesRef.current.forEach((particle) => {
                    // Update position
                    particle.x += particle.vx;
                    particle.y += particle.vy;

                    // Antimagnetic effect (optimized with squared distance)
                    const dx = particle.x - mouseRef.current.x;
                    const dy = particle.y - mouseRef.current.y;
                    const distanceSq = dx * dx + dy * dy;

                    if (distanceSq < repelRadiusSq && distanceSq > 0) {
                        const distance = Math.sqrt(distanceSq);
                        const force = (repelRadius - distance) / repelRadius;
                        const repelAmount = force * 2;
                        particle.x += (dx / distance) * repelAmount;
                        particle.y += (dy / distance) * repelAmount;
                    }

                    // Wrap around edges
                    if (particle.x < 0) particle.x = canvas.width;
                    if (particle.x > canvas.width) particle.x = 0;
                    if (particle.y < 0) particle.y = canvas.height;
                    if (particle.y > canvas.height) particle.y = 0;

                    // Draw particle (batch operations for better performance)
                    ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                    ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
                });
            }

            animationIdRef.current = requestAnimationFrame(animate);
        };

        animationIdRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
        };
    }, [initParticles]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ background: '#0a0a0a' }}
        />
    );
}

