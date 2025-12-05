import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "hero.title": "Antigravity Portfolio",
            "hero.subtitle": "Frontend Developer | React/Next.js | ASP.NET Core",
            "hero.viewProjects": "View Projects",
            "hero.contact": "Contact Me",
            "nav.projects": "Projects",
            "nav.services": "Services",
            "nav.about": "About"
        }
    },
    ar: {
        translation: {
            "hero.title": "محفظة مضادة للجاذبية",
            "hero.subtitle": "مطور واجهات أمامية | React/Next.js | ASP.NET Core",
            "hero.viewProjects": "عرض المشاريع",
            "hero.contact": "اتصل بي",
            "nav.projects": "المشاريع",
            "nav.services": "الخدمات",
            "nav.about": "عن"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
