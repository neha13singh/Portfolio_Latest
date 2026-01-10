import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Layers, Zap } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="w-full max-w-2xl h-[450px] flex flex-col bg-agent-black border-2 border-agent-green rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,255,65,0.2)] relative"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-agent-dark shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-8 bg-agent-green rounded-sm"></div>
                        <div>
                            <h2 className="text-xl font-bold text-white tracking-wide">{project.name}</h2>
                            <span className="text-xs text-agent-green font-mono uppercase tracking-widest">STATUS: {project.status}</span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-800 rounded-full transition-colors text-gray-400 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 space-y-6 flex-1 overflow-y-auto custom-scrollbar">

                    {/* Long Description */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-agent-blue text-sm font-bold uppercase tracking-wider">
                            <Layers size={14} />
                            <span>Mission Brief</span>
                        </div>
                        <p className="text-gray-300 leading-relaxed text-sm md:text-base border-l-2 border-gray-700 pl-4">
                            {project.longDescription}
                        </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-agent-blue text-sm font-bold uppercase tracking-wider">
                            <Zap size={14} />
                            <span>Technology Stack</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((t, i) => (
                                <span key={i} className="px-3 py-1 bg-agent-dark/50 border border-gray-700 text-agent-green text-xs font-mono rounded-md">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Features List */}
                    {project.features && (
                        <div className="space-y-3">
                            <div className="text-agent-blue text-sm font-bold uppercase tracking-wider">
                                Key Features / Outcomes
                            </div>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {project.features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                        <span className="text-agent-green mt-1">▹</span>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4 border-t border-gray-800">
                        {project.links?.repo && (
                            <a href={project.links.repo} className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded transition-colors text-sm font-bold">
                                <Github size={16} />
                                <span className="hidden md:inline">Source Code</span>
                                <span className="md:hidden">Repo</span>
                            </a>
                        )}
                        {project.links?.demo && (
                            <a href={project.links.demo} className="flex items-center gap-2 px-4 py-2 bg-agent-green hover:bg-green-400 text-black rounded transition-colors text-sm font-bold shadow-lg shadow-agent-green/20">
                                <ExternalLink size={16} />
                                <span className="hidden md:inline">Live Demo</span>
                                <span className="md:hidden">Demo</span>
                            </a>
                        )}
                    </div>

                </div>

                {/* Decorative Footer */}
                <div className="bg-agent-dark/50 p-2 border-t border-gray-800 flex justify-between items-center text-[10px] text-gray-600 font-mono shrink-0">
                    <span>ID: {project.id?.toUpperCase() || 'UNK-00'}</span>
                    <span>SECURE::ACCESS_GRANTED</span>
                </div>

            </motion.div>
        </motion.div>
    );
};

export default ProjectModal;
