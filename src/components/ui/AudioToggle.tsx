'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AudioToggle() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const oscillatorRef = useRef<OscillatorNode | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);

    const createAmbientSound = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        }

        const ctx = audioContextRef.current;

        // Create a soft ambient drone
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(80, ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, ctx.currentTime);

        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 1);

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start();

        oscillatorRef.current = oscillator;
        gainNodeRef.current = gainNode;
        setIsLoaded(true);
    };

    const toggleAudio = () => {
        if (!isPlaying) {
            if (!isLoaded) {
                createAmbientSound();
            } else if (gainNodeRef.current && audioContextRef.current) {
                gainNodeRef.current.gain.linearRampToValueAtTime(0.03, audioContextRef.current.currentTime + 0.5);
            }
            setIsPlaying(true);
        } else {
            if (gainNodeRef.current && audioContextRef.current) {
                gainNodeRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 0.5);
            }
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        return () => {
            if (oscillatorRef.current) {
                oscillatorRef.current.stop();
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleAudio}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full glass hover:glow-cyan transition-all duration-300"
            aria-label={isPlaying ? 'Mute ambient sound' : 'Play ambient sound'}
        >
            {isPlaying ? (
                <Volume2 className="w-5 h-5 text-neon-red" />
            ) : (
                <VolumeX className="w-5 h-5 text-gray-400" />
            )}
        </motion.button>
    );
}
