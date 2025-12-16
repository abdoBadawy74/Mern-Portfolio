import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import { Moon, Sun, Languages } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
    const { i18n, t } = useTranslation();
    const { theme, toggleTheme } = useTheme();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
        document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
                    {` < Abdurahman />`}
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    <Link to="/projects" className="text-sm hover:text-cyan-400 transition-colors">
                        {t('nav.projects')}
                    </Link>
                    <Link to="/services" className="text-sm hover:text-cyan-400 transition-colors">
                        {t('nav.services')}
                    </Link>
                    <Link to="/about" className="text-sm hover:text-cyan-400 transition-colors">
                        {t('nav.about')}
                    </Link>
                    <Link to="/contact" className="text-sm hover:text-cyan-400 transition-colors">
                        {i18n.language === 'en' ? "Contact" : "تواصل معي"}
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleLanguage}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                        aria-label={t('aria.toggleLanguage')}
                    >
                        <Languages className="h-5 w-5" />
                    </button>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                        aria-label={t('aria.toggleTheme')}
                    >
                        {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </button>
                </div>
            </div>
        </header>
    );
}
