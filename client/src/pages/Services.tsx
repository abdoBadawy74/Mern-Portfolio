import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Code, Smartphone, Palette, Globe, Server, Zap } from 'lucide-react';
import axios from 'axios';

interface Service {
    _id: string;
    title: { en: string; ar: string };
    description: { en: string; ar: string };
    icon: string;
}

const iconMap: { [key: string]: React.ReactNode } = {
    'Code': <Code className="w-12 h-12 text-cyan-400" />,
    'Smartphone': <Smartphone className="w-12 h-12 text-purple-400" />,
    'Palette': <Palette className="w-12 h-12 text-pink-400" />,
    'Globe': <Globe className="w-12 h-12 text-blue-400" />,
    'Server': <Server className="w-12 h-12 text-green-400" />,
    'Zap': <Zap className="w-12 h-12 text-yellow-400" />,
};

export default function Services() {
    const { t, i18n } = useTranslation();
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get('/api/services');
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const lang = i18n.language as 'en' | 'ar';

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Navbar />
            <main className="container mx-auto px-4 pt-24 pb-12">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600"
                >
                    {t('nav.services')}
                </motion.h1>

                {loading ? (
                    <div className="text-center text-secondary">Loading services...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={service._id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-panel p-8 rounded-xl hover:bg-white/5 transition-colors duration-300 flex flex-col items-center text-center"
                            >
                                <div className="mb-6 p-4 rounded-full bg-white/5 border border-white/10">
                                    {iconMap[service.icon] || <Code className="w-12 h-12 text-gray-400" />}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-primary">{service.title[lang]}</h3>
                                <p className="text-secondary leading-relaxed">{service.description[lang]}</p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
