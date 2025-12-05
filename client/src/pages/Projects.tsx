import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Github, ExternalLink } from 'lucide-react';
import { Loader } from '../components/ui/Loader';

interface Project {
    _id: string;
    title: { en: string; ar: string };
    description: { en: string; ar: string };
    image: string;
    tags: string[];
    link?: string;
    github?: string;
    technologies: string[];
}

export default function Projects() {
    const { t, i18n } = useTranslation();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('/api/projects');
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const lang = i18n.language as 'en' | 'ar';

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Navbar />
            <main className="container mx-auto px-4 pt-24 pb-12">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600"
                >
                    {t('nav.projects')}
                </motion.h1>

                {loading ? (
                    <Loader />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-panel rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 flex flex-col"
                            >
                                <img src={project.image} alt={project.title[lang]} className="w-full h-48 object-cover" />
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold mb-2 text-primary">{project.title[lang]}</h3>
                                    <p className="text-secondary mb-4 flex-1">{project.description[lang]}</p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.technologies.map(tag => (
                                            <span key={tag} className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-4 mt-auto">
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-center flex items-center justify-center gap-2 transition-colors"
                                            >
                                                <Github className="w-4 h-4" />
                                                Code
                                            </a>
                                        )}
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:from-cyan-600 hover:to-blue-600 text-center flex items-center justify-center gap-2 transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
