import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Profile from '../assests/images/profile.JPG';
export default function About() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Navbar />
            <main className="container mx-auto px-4 pt-24 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
                        {t('nav.about')}
                    </h1>

                    <div className="glass-panel p-8 rounded-xl mb-12">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <img
                                src={Profile}
                                alt="Profile"
                                className="w-64 h-64 rounded-full border-4 border-primary/20 object-cover"
                            />
                            <div>
                                <h2 className="text-2xl font-bold mb-4 text-primary">Hi, I'm Abdo</h2>
                                <p className="text-secondary mb-6 leading-relaxed">
                                    I'm a passionate Full Stack Developer with experience in building modern web applications.
                                    I love creating beautiful, functional, and user-friendly digital experiences.
                                    My journey in tech started with a curiosity for how things work, and it has evolved into a career where I get to solve complex problems with code.
                                </p>
                                <div className="flex gap-4">
                                    <div className="text-center">
                                        <span className="block text-3xl font-bold text-accent">3+</span>
                                        <span className="text-sm text-secondary">Years Experience</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="block text-3xl font-bold text-accent">35+</span>
                                        <span className="text-sm text-secondary">Projects Completed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="glass-panel p-6 rounded-xl">
                            <h3 className="text-xl font-bold mb-4 text-primary">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {['React', 'Node.js', 'TypeScript', 'MongoDB', 'Tailwind CSS', 'Next.js', 'Git', 'Docker'].map(skill => (
                                    <span key={skill} className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="glass-panel p-6 rounded-xl">
                            <h3 className="text-xl font-bold mb-4 text-primary">Education</h3>
                            <ul className="space-y-4">
                                <li className="border-l-2 border-primary/30 pl-4">
                                    <h4 className="font-bold text-foreground">Computer Science Degree</h4>
                                    <p className="text-sm text-secondary">University of Technology, 2020-2024</p>
                                </li>
                                <li className="border-l-2 border-primary/30 pl-4">
                                    <h4 className="font-bold text-foreground">Full Stack Bootcamp</h4>
                                    <p className="text-sm text-secondary">Tech Academy, 2022</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
