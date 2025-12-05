const mongoose = require('mongoose');
const Project = require('./models/Project');
const Service = require('./models/Service');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio');
        console.log('Connected to MongoDB');

        // Clear existing data
        await Project.deleteMany({});
        await Service.deleteMany({});
        await User.deleteMany({});

        // Create admin user
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await User.create({
            username: 'admin',
            email: 'admin@portfolio.com',
            password: hashedPassword,
            role: 'admin'
        });

        // Create sample projects
        const projects = await Project.insertMany([
            {
                title: {
                    en: 'E-Commerce Platform',
                    ar: 'منصة التجارة الإلكترونية'
                },
                description: {
                    en: 'A full-stack e-commerce solution with React, Node.js, and MongoDB',
                    ar: 'حل متكامل للتجارة الإلكترونية باستخدام React و Node.js و MongoDB'
                },
                image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500',
                link: 'https://example.com/ecommerce',
                github: 'https://github.com/username/ecommerce',
                technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
                featured: true
            },
            {
                title: {
                    en: 'Task Management App',
                    ar: 'تطبيق إدارة المهام'
                },
                description: {
                    en: 'A real-time task management application with drag and drop',
                    ar: 'تطبيق لإدارة المهام في الوقت الفعلي مع السحب والإفلات'
                },
                image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500',
                link: 'https://example.com/tasks',
                github: 'https://github.com/username/tasks',
                technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
                featured: true
            },
            {
                title: {
                    en: 'Weather Dashboard',
                    ar: 'لوحة معلومات الطقس'
                },
                description: {
                    en: 'Beautiful weather dashboard with location-based forecasts',
                    ar: 'لوحة معلومات رائعة للطقس مع توقعات حسب الموقع'
                },
                image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=500',
                link: 'https://example.com/weather',
                github: 'https://github.com/username/weather',
                technologies: ['React', 'API Integration', 'CSS3'],
                featured: false
            }
        ]);

        // Create sample services
        const services = await Service.insertMany([
            {
                title: {
                    en: 'Web Development',
                    ar: 'تطوير الويب'
                },
                description: {
                    en: 'Building responsive and modern web applications using latest technologies',
                    ar: 'بناء تطبيقات ويب حديثة ومتجاوبة باستخدام أحدث التقنيات'
                },
                icon: 'Code'
            },
            {
                title: {
                    en: 'UI/UX Design',
                    ar: 'تصميم واجهة المستخدم'
                },
                description: {
                    en: 'Creating beautiful and user-friendly interfaces with modern design principles',
                    ar: 'إنشاء واجهات جميلة وسهلة الاستخدام بمبادئ تصميم حديثة'
                },
                icon: 'Palette'
            },
            {
                title: {
                    en: 'API Development',
                    ar: 'تطوير واجهات البرمجة'
                },
                description: {
                    en: 'Building robust RESTful APIs and backend services',
                    ar: 'بناء واجهات برمجية قوية وخدمات خلفية'
                },
                icon: 'Server'
            },
            {
                title: {
                    en: 'Performance Optimization',
                    ar: 'تحسين الأداء'
                },
                description: {
                    en: 'Optimizing applications for speed, SEO, and better user experience',
                    ar: 'تحسين التطبيقات للسرعة وتحسين محركات البحث وتجربة مستخدم أفضل'
                },
                icon: 'Zap'
            }
        ]);

        console.log('✅ Seed data created successfully!');
        console.log(`Created ${projects.length} projects`);
        console.log(`Created ${services.length} services`);
        console.log('Admin credentials: username: admin, password: admin123');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
