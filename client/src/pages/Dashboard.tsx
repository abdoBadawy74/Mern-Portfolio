import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Folder, Briefcase, X, MessageSquare, Mail } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Loader } from '../components/ui/Loader';

interface Project {
    _id: string;
    title: { en: string; ar: string };
    description: { en: string; ar: string };
    image: string;
    link?: string;
    github?: string;
    technologies: string[];
}

interface Service {
    _id: string;
    title: { en: string; ar: string };
    description: { en: string; ar: string };
    icon: string;
}

interface ContactMessage {
    _id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
}

export default function Dashboard() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Project[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [contacts, setContacts] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);

    // Project Modal State
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [projectForm, setProjectForm] = useState({
        titleEn: '', titleAr: '', descEn: '', descAr: '', image: '', link: '', github: '', technologies: ''
    });

    // Service Modal State
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [serviceForm, setServiceForm] = useState({
        titleEn: '', titleAr: '', descEn: '', descAr: '', icon: ''
    });

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            fetchData();
        }
    }, [navigate]);

    const fetchData = async () => {
        try {
            const [projectsRes, servicesRes, contactsRes] = await Promise.all([
                axios.get('/api/projects'),
                axios.get('/api/services'),
                axios.get('/api/contacts')
            ]);
            setProjects(projectsRes.data);
            setServices(servicesRes.data);
            setContacts(contactsRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    // --- Project Handlers ---
    const handleDeleteProject = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await axios.delete(`/api/projects/${id}`);
                setProjects(projects.filter(p => p._id !== id));
                toast.success('Project deleted successfully');
            } catch (error) {
                toast.error('Failed to delete project');
            }
        }
    };

    const handleProjectSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            title: { en: projectForm.titleEn, ar: projectForm.titleAr },
            description: { en: projectForm.descEn, ar: projectForm.descAr },
            image: projectForm.image,
            link: projectForm.link,
            github: projectForm.github,
            technologies: projectForm.technologies.split(',').map(t => t.trim())
        };

        try {
            if (editingProject) {
                const res = await axios.put(`/api/projects/${editingProject._id}`, payload);
                setProjects(projects.map(p => p._id === editingProject._id ? res.data : p));
                toast.success('Project updated successfully');
            } else {
                const res = await axios.post('/api/projects', payload);
                setProjects([res.data, ...projects]);
                toast.success('Project created successfully');
            }
            closeProjectModal();
        } catch (error) {
            toast.error('Failed to save project');
        }
    };

    const openProjectModal = (project?: Project) => {
        if (project) {
            setEditingProject(project);
            setProjectForm({
                titleEn: project.title.en,
                titleAr: project.title.ar,
                descEn: project.description.en,
                descAr: project.description.ar,
                image: project.image,
                link: project.link || '',
                github: project.github || '',
                technologies: project.technologies.join(', ')
            });
        } else {
            setEditingProject(null);
            setProjectForm({ titleEn: '', titleAr: '', descEn: '', descAr: '', image: '', link: '', github: '', technologies: '' });
        }
        setIsProjectModalOpen(true);
    };

    const closeProjectModal = () => {
        setIsProjectModalOpen(false);
        setEditingProject(null);
    };

    // --- Service Handlers ---
    const handleDeleteService = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await axios.delete(`/api/services/${id}`);
                setServices(services.filter(s => s._id !== id));
                toast.success('Service deleted successfully');
            } catch (error) {
                toast.error('Failed to delete service');
            }
        }
    };

    const handleServiceSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            title: { en: serviceForm.titleEn, ar: serviceForm.titleAr },
            description: { en: serviceForm.descEn, ar: serviceForm.descAr },
            icon: serviceForm.icon
        };

        try {
            if (editingService) {
                const res = await axios.put(`/api/services/${editingService._id}`, payload);
                setServices(services.map(s => s._id === editingService._id ? res.data : s));
                toast.success('Service updated successfully');
            } else {
                const res = await axios.post('/api/services', payload);
                setServices([res.data, ...services]);
                toast.success('Service created successfully');
            }
            closeServiceModal();
        } catch (error) {
            toast.error('Failed to save service');
        }
    };

    const openServiceModal = (service?: Service) => {
        if (service) {
            setEditingService(service);
            setServiceForm({
                titleEn: service.title.en,
                titleAr: service.title.ar,
                descEn: service.description.en,
                descAr: service.description.ar,
                icon: service.icon
            });
        } else {
            setEditingService(null);
            setServiceForm({ titleEn: '', titleAr: '', descEn: '', descAr: '', icon: '' });
        }
        setIsServiceModalOpen(true);
    };

    const closeServiceModal = () => {
        setIsServiceModalOpen(false);
        setEditingService(null);
    };

    // --- Contact Handlers ---
    const handleDeleteContact = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            try {
                await axios.delete(`/api/contacts/${id}`);
                setContacts(contacts.filter(c => c._id !== id));
                toast.success('Message deleted successfully');
            } catch (error) {
                toast.error('Failed to delete message');
            }
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Navbar />
            <main className="container mx-auto px-4 pt-24 pb-12">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
                        Dashboard
                    </h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => openProjectModal()}
                            className="px-4 py-2 rounded-lg bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 transition-colors flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Project
                        </button>
                        <button
                            onClick={() => openServiceModal()}
                            className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30 transition-colors flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Service
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Projects Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-panel p-6 rounded-xl"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Folder className="w-6 h-6 text-cyan-400" />
                            <h2 className="text-xl font-bold">Projects</h2>
                        </div>

                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                            {projects.map((project) => (
                                <div key={project._id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                    <div>
                                        <h3 className="font-medium">{project.title.en}</h3>
                                        <p className="text-sm text-secondary truncate max-w-[200px]">{project.description.en}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openProjectModal(project)}
                                            className="p-2 rounded-lg hover:bg-blue-500/20 text-blue-400 transition-colors"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProject(project._id)}
                                            className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {projects.length === 0 && <p className="text-center text-secondary py-4">No projects found.</p>}
                        </div>
                    </motion.div>

                    {/* Services Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-panel p-6 rounded-xl"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Briefcase className="w-6 h-6 text-purple-400" />
                            <h2 className="text-xl font-bold">Services</h2>
                        </div>

                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                            {services.map((service) => (
                                <div key={service._id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                    <div>
                                        <h3 className="font-medium">{service.title.en}</h3>
                                        <p className="text-sm text-secondary truncate max-w-[200px]">{service.description.en}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openServiceModal(service)}
                                            className="p-2 rounded-lg hover:bg-blue-500/20 text-blue-400 transition-colors"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteService(service._id)}
                                            className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {services.length === 0 && <p className="text-center text-secondary py-4">No services found.</p>}
                        </div>
                    </motion.div>
                </div>

                {/* Contact Messages Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel p-6 rounded-xl"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <MessageSquare className="w-6 h-6 text-pink-400" />
                        <h2 className="text-xl font-bold">Contact Messages</h2>
                    </div>

                    <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                        {contacts.map((contact) => (
                            <div key={contact._id} className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-accent" />
                                        <span className="font-bold">{contact.name}</span>
                                        <span className="text-sm text-secondary">({contact.email})</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs text-secondary">{new Date(contact.createdAt).toLocaleDateString()}</span>
                                        <button
                                            onClick={() => handleDeleteContact(contact._id)}
                                            className="p-1 rounded hover:bg-red-500/20 text-red-400 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-sm text-secondary/90 bg-black/20 p-3 rounded-lg border border-white/5">
                                    {contact.message}
                                </p>
                            </div>
                        ))}
                        {contacts.length === 0 && <p className="text-center text-secondary py-4">No messages found.</p>}
                    </div>
                </motion.div>

                {/* Project Modal */}
                {isProjectModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[#1a1a1a] border border-white/10 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-white/10">
                                <h2 className="text-xl font-bold">{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
                                <button onClick={closeProjectModal} className="text-secondary hover:text-white">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <form onSubmit={handleProjectSubmit} className="p-6 space-y-4">
                                {/* ... Project Form Fields (Same as before) ... */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-1">Title (EN)</label>
                                        <input
                                            type="text"
                                            value={projectForm.titleEn}
                                            onChange={e => setProjectForm({ ...projectForm, titleEn: e.target.value })}
                                            required
                                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-accent outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-1">Title (AR)</label>
                                        <input
                                            type="text"
                                            value={projectForm.titleAr}
                                            onChange={e => setProjectForm({ ...projectForm, titleAr: e.target.value })}
                                            required
                                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-accent outline-none text-right"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-1">Description (EN)</label>
                                        <textarea
                                            value={projectForm.descEn}
                                            onChange={e => setProjectForm({ ...projectForm, descEn: e.target.value })}
                                            required
                                            rows={3}
                                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-accent outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-1">Description (AR)</label>
                                        <textarea
                                            value={projectForm.descAr}
                                            onChange={e => setProjectForm({ ...projectForm, descAr: e.target.value })}
                                            required
                                            rows={3}
                                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-accent outline-none text-right"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-1">Image URL</label>
                                    <input
                                        type="text"
                                        value={projectForm.image}
                                        onChange={e => setProjectForm({ ...projectForm, image: e.target.value })}
                                        required
                                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-accent outline-none"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-1">Live Link</label>
                                        <input
                                            type="text"
                                            value={projectForm.link}
                                            onChange={e => setProjectForm({ ...projectForm, link: e.target.value })}
                                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-accent outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-1">GitHub Link</label>
                                        <input
                                            type="text"
                                            value={projectForm.github}
                                            onChange={e => setProjectForm({ ...projectForm, github: e.target.value })}
                                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-accent outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-1">Technologies (comma separated)</label>
                                    <input
                                        type="text"
                                        value={projectForm.technologies}
                                        onChange={e => setProjectForm({ ...projectForm, technologies: e.target.value })}
                                        placeholder="React, Node.js, MongoDB"
                                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-accent outline-none"
                                    />
                                </div>
                                <div className="flex justify-end gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={closeProjectModal}
                                        className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:opacity-90 transition-opacity"
                                    >
                                        {editingProject ? 'Update Project' : 'Create Project'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}

                {/* Service Modal */}
                {isServiceModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-[#1a1a1a] border border-white/10 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-white/10">
                                <h2 className="text-xl font-bold">{editingService ? 'Edit Service' : 'Add New Service'}</h2>
                                <button onClick={closeServiceModal} className="text-secondary hover:text-white">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                            <form onSubmit={handleServiceSubmit} className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-1">Title (EN)</label>
                                        <input
                                            type="text"
                                            value={serviceForm.titleEn}
                                            onChange={e => setServiceForm({ ...serviceForm, titleEn: e.target.value })}
                                            required
                                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-accent outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-1">Title (AR)</label>
                                        <input
                                            type="text"
                                            value={serviceForm.titleAr}
                                            onChange={e => setServiceForm({ ...serviceForm, titleAr: e.target.value })}
                                            required
                                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-accent outline-none text-right"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-1">Description (EN)</label>
                                        <textarea
                                            value={serviceForm.descEn}
                                            onChange={e => setServiceForm({ ...serviceForm, descEn: e.target.value })}
                                            required
                                            rows={3}
                                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-accent outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-secondary mb-1">Description (AR)</label>
                                        <textarea
                                            value={serviceForm.descAr}
                                            onChange={e => setServiceForm({ ...serviceForm, descAr: e.target.value })}
                                            required
                                            rows={3}
                                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-accent outline-none text-right"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-secondary mb-1">Icon Name (e.g., Code, Smartphone)</label>
                                    <input
                                        type="text"
                                        value={serviceForm.icon}
                                        onChange={e => setServiceForm({ ...serviceForm, icon: e.target.value })}
                                        required
                                        placeholder="Code, Smartphone, Palette, Globe, Server, Zap"
                                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-accent outline-none"
                                    />
                                </div>
                                <div className="flex justify-end gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={closeServiceModal}
                                        className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold hover:opacity-90 transition-opacity"
                                    >
                                        {editingService ? 'Update Service' : 'Create Service'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </main>
        </div>
    );
}
