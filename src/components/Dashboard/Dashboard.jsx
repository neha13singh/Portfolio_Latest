import React, { useState } from 'react';
import portfolioData from '../../data/portfolio.json';
import Card from './Card';
import ProjectModal from './ProjectModal';
import ExperienceModal from './ExperienceModal';
import { Cpu, Code, Briefcase, GraduationCap } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const Dashboard = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedExperience, setSelectedExperience] = useState(null);

    return (
        <div className="relative h-full">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-4 h-full overflow-y-auto custom-scrollbar">

                {/* Main Content (Span 8) - FIRST for Mobile Priority */}
                <div className="md:col-span-8 space-y-6">

                    {/* Experience - Fixed Height 180px */}
                    <Card title="Experience_Log" delay={0.1}>
                        <div className="h-[180px] overflow-y-auto custom-scrollbar pr-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {portfolioData.experience.map((exp, idx) => (
                                <div key={idx} className="relative pl-6 border-l-2 border-gray-800 group hover:border-agent-green transition-all bg-black/20 p-4 rounded h-full flex flex-col justify-center">
                                    <div className="absolute -left-[9px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gray-600 border-2 border-black group-hover:bg-agent-green transition-colors"></div>
                                    <h4 className="text-white font-bold text-lg">{exp.role}</h4>
                                    <p className="text-agent-green text-sm mb-2 font-mono flex items-center gap-2">
                                        <Briefcase size={14} />
                                        {exp.company}
                                    </p>
                                    <p className="text-gray-500 text-xs mb-3 font-mono">
                                        {exp.duration}
                                    </p>
                                    <button
                                        onClick={() => setSelectedExperience(exp)}
                                        className="text-xs px-3 py-1 bg-agent-green/10 text-agent-green rounded border border-agent-green/20 hover:bg-agent-green hover:text-black transition-all font-bold w-max"
                                    >
                                        DETAILS
                                    </button>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Projects - Fixed Height 360px */}
                        <Card title="Project_Logs" delay={0.2}>
                            <div className="h-[360px] overflow-y-auto custom-scrollbar pr-2 space-y-4">
                                {portfolioData.projects.map((project, idx) => (
                                    <div key={idx} className="bg-black/40 p-3 rounded border border-gray-800 hover:border-agent-blue/50 transition-all group relative overflow-hidden">
                                        <div className="flex justify-between items-center mb-1 relative z-10">
                                            <h3 className="text-sm font-bold text-white group-hover:text-agent-blue transition-colors flex items-center gap-1">
                                                <span className="text-agent-blue text-xs">&lt;&gt;</span>
                                                {project.name}
                                            </h3>
                                            <button
                                                onClick={() => setSelectedProject(project)}
                                                className="text-[10px] px-2 py-0.5 bg-agent-blue/10 text-agent-blue rounded border border-agent-blue/20 hover:bg-agent-blue hover:text-black transition-all font-bold"
                                            >
                                                VIEW
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-400 mb-2 line-clamp-2 relative z-10">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-1 relative z-10">
                                            {project.tech.slice(0, 3).map((t, i) => (
                                                <span key={i} className="text-[9px] uppercase tracking-wider text-gray-500 font-mono group-hover:text-gray-400 transition-colors">#{t}</span>
                                            ))}
                                            {project.tech.length > 3 && <span className="text-[9px] text-gray-600">+{project.tech.length - 3}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Education - Fixed Height 360px */}
                        <Card title="Academic_Data" delay={0.3}>
                            <div className="h-[360px] overflow-y-auto custom-scrollbar pr-2 space-y-4">
                                {portfolioData.education.map((edu, idx) => (
                                    <div key={idx} className="relative pl-4 border-l border-gray-800 group hover:border-agent-green transition-colors">
                                        <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-gray-600 group-hover:bg-agent-green transition-colors"></div>
                                        <h4 className="text-white font-bold text-sm">{edu.degree}</h4>
                                        <p className="text-gray-300 text-xs mb-1">{edu.school}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500 text-xs">{edu.year || ''}</span>
                                            {edu.score && <span className="text-agent-green text-xs font-mono border border-agent-green/30 px-1 rounded">{edu.score}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Profile Section (Span 4) - SECOND for Mobile */}
                <div className="md:col-span-4 space-y-6">
                    {/* Skills - Fixed Height 270px */}
                    <Card title="Skill_Matrix" delay={0.4}>
                        <div className="h-[270px] overflow-y-auto custom-scrollbar pr-2 flex flex-wrap gap-2 content-start">
                            {portfolioData.skills.map((skill, idx) => (
                                <span key={idx} className="px-3 py-1 bg-agent-dark border border-gray-700 text-gray-300 text-xs rounded hover:border-agent-green hover:text-agent-green transition-colors cursor-default">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </Card>

                    {/* Achievements - Fixed Height 270px */}
                    <Card title="System_Achievements" delay={0.5}>
                        <div className="h-[270px] overflow-y-auto custom-scrollbar pr-2">
                            <ul className="space-y-3">
                                {portfolioData.achievements?.map((ach, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-xs group">
                                        <span className="text-agent-green mt-0.5">🏆</span>
                                        <a href={ach.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:underline decoration-agent-green/50 transition-colors">
                                            {ach.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Card>
                </div>

                {/* Project Modal */}
                <AnimatePresence>
                    {selectedProject && (
                        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
                    )}
                </AnimatePresence>

                {/* Experience Modal */}
                <AnimatePresence>
                    {selectedExperience && (
                        <ExperienceModal experience={selectedExperience} onClose={() => setSelectedExperience(null)} />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Dashboard;
