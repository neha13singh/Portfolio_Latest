import React from 'react';
import { motion } from 'framer-motion';
import { X, Briefcase, Calendar, CheckCircle2 } from 'lucide-react';

const ExperienceModal = ({ experience, onClose }) => {
    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-agent-black border-2 border-white/20 w-full max-w-2xl max-h-full flex flex-col rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.05)] overflow-hidden relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-800 bg-agent-dark/50 relative shrink-0">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-white/10 rounded-lg">
                            <Briefcase className="text-white" size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">{experience.role}</h2>
                            <p className="text-agent-silver font-mono text-sm">{experience.company}</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
                    {/* Duration */}
                    <div className="flex items-center gap-2 text-sm text-gray-400 font-mono">
                        <Calendar size={16} />
                        <span>{experience.duration}</span>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-2">Overview</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            {experience.description}
                        </p>
                    </div>

                    {/* Key Responsibilities */}
                    {experience.points && (
                        <div>
                            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3">Key Responsibilities</h3>
                            <ul className="space-y-3">
                                {experience.points.map((point, idx) => (
                                    <li key={idx} className="flex items-start gap-3 group">
                                        <CheckCircle2 size={16} className="text-white mt-0.5 shrink-0 group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all" />
                                        <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-800 bg-black/20 text-xs text-gray-600 font-mono text-center uppercase tracking-widest shrink-0">
                    Role_ID: {experience.role.replace(/\s+/g, '_').toUpperCase()}
                </div>

            </motion.div>
        </div>
    );
};

export default ExperienceModal;
