import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
        // Force text direction update
        document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
            title="Switch Language"
        >
            <Globe className="w-5 h-5 text-cyan-400" />
            <span className="font-medium">{i18n.language.toUpperCase()}</span>
        </button>
    );
}
