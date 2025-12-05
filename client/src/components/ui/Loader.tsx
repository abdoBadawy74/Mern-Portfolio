import { motion } from 'framer-motion';
import React from 'react';

export function Loader() {
    return (
        <div className="flex items-center justify-center h-64 w-full">
            <div className="relative">
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full"
                />
                <motion.div
                    animate={{
                        rotate: -360,
                        scale: [1, 0.8, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute inset-0 w-16 h-16 border-4 border-purple-500/30 border-b-purple-500 rounded-full"
                />
            </div>
        </div>
    );
}
