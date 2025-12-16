import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { ArrowRight, Github, Linkedin, MessageCircle, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HeroSection() {
    const { t } = useTranslation();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#000] to-[#000] -z-20" />

            {/* Floating Orbs */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl -z-10"
            />
            <motion.div
                animate={{
                    y: [0, 30, 0],
                    rotate: [0, -10, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl -z-10"
            />

            <div className="container px-4 mx-auto text-center z-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-xl md:text-2xl text-cyan-400 font-mono mb-4">{t('hero.greeting')}</h2>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                        {t('hero.name')}
                    </h1>
                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-6">
                        {t('hero.role')}
                    </h3>
                    <p className="text-xl md:text-2xl text-secondary mb-8 max-w-2xl mx-auto">
                        {t('hero.description')}
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <Link
                            to="/projects"
                            className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
                        >
                            {t('hero.viewWork')} <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a
                            href="/cv.pdf" // Placeholder path, user might need to upload this
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3 rounded-full bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition-colors flex items-center gap-2"
                        >
                            <FileText className="w-4 h-4" /> {t('hero.viewCV')}
                        </a>
                    </div>
                    {/* ... social buttons ... */}

                    <div className="flex justify-center gap-6">
                        <a
                            href="https://github.com/abdoBadawy74" // Inferred from workspace
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/60 hover:text-white transition-colors"
                        >
                            <Github className="w-8 h-8" />
                        </a>
                        <a
                            href="https://linkedin.com/in/your-profile" // Placeholder
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/60 hover:text-white transition-colors"
                        >
                            <Linkedin className="w-8 h-8" />
                        </a>
                        <a
                            href="https://wa.me/your-number" // Placeholder
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white/60 hover:text-white transition-colors"
                        >
                            <MessageCircle className="w-8 h-8" />
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Floating Cards */}
            <motion.div
                animate={{
                    rotateX: [0, 5, 0],
                    rotateY: [0, 10, 0],
                    y: [0, -10, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-[10%] top-1/3 w-48 h-32 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl flex items-center justify-center hidden lg:flex"
            >
                <div className="text-center">
                    <span className="text-cyan-400 font-mono text-lg block">&lt;React /&gt;</span>
                </div>
            </motion.div>

            <motion.div
                animate={{
                    rotateX: [0, -5, 0],
                    rotateY: [0, -10, 0],
                    y: [0, 10, 0]
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute right-[15%] top-1/4 w-48 h-32 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl flex items-center justify-center hidden lg:flex"
            >
                <div className="text-center">
                    <span className="text-purple-400 font-mono text-lg block">Next.js</span>
                </div>
            </motion.div>

            <motion.div
                animate={{
                    rotateX: [0, 5, 0],
                    rotateY: [0, 5, 0],
                    y: [0, -15, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute left-[20%] bottom-1/4 w-48 h-32 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl flex items-center justify-center hidden lg:flex"
            >
                <div className="text-center">
                    <span className="text-pink-400 font-mono text-lg block">UI/UX</span>
                </div>
            </motion.div>
        </section>
    );
}
