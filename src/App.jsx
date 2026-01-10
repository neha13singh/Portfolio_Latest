import React, { useState } from 'react';
import Agent from './components/Chat/Agent';
import Dashboard from './components/Dashboard/Dashboard';
import { motion } from 'framer-motion';
import { Terminal, LayoutDashboard } from 'lucide-react';
import portfolioData from './data/portfolio.json';
import { Github, Mail, MapPin, Linkedin, X } from 'lucide-react';

function App() {
  const [isMobileAgentOpen, setIsMobileAgentOpen] = useState(false);

  return (
    <div className="h-[100dvh] bg-agent-black text-gray-300 p-2 md:p-6 flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-agent-dark via-agent-black to-agent-black opacity-80"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-20"></div>

        {/* Abstract Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-10"></div>
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto h-full flex flex-col gap-3 md:gap-4 overflow-hidden">

        {/* Modern Header */}
        <div className="bg-agent-black/40 backdrop-blur-md border border-agent-border rounded-xl p-3 md:p-4 shadow-lg flex flex-col md:flex-row justify-between items-center gap-4 shrink-0 relative overflow-hidden group">

          {/* Ambient Glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"></div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-agent-zinc/50 p-0.5 relative overflow-hidden bg-agent-card flex items-center justify-center">
                <span className="text-xl md:text-2xl font-bold text-agent-zinc">{portfolioData.profile.name.charAt(0)}</span>
                {/* If you had an image, it would go here. For now, initial is fine or we can leave blank */}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 md:w-3.5 md:h-3.5 bg-agent-zinc rounded-full border-2 border-agent-black animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.6)]"></div>
            </div>

            {/* Identity Info */}
            <div className="flex flex-col flex-1 min-w-0">
              <h1 className="text-xl md:text-3xl font-bold text-white tracking-tighter leading-none flex items-center gap-2 truncate">
                {portfolioData.profile.name.split(' ')[0]}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-agent-zinc to-cyan-500 font-light truncate">
                  {portfolioData.profile.name.split(' ').slice(1).join(' ')}
                </span>
              </h1>
              <h2 className="text-[10px] md:text-xs text-gray-400 font-mono tracking-[0.2em] uppercase mt-1 flex items-center gap-2 truncate">
                <span className="text-white">::</span>
                {portfolioData.profile.title}
              </h2>
            </div>

            {/* Mobile Agent Toggle */}
            <button
              onClick={() => setIsMobileAgentOpen(!isMobileAgentOpen)}
              className={`lg:hidden p-2 rounded-lg border transition-all ${isMobileAgentOpen ? 'bg-white/20 border-white text-white' : 'bg-gray-800 border-gray-700 text-gray-400'}`}
            >
              <Terminal size={20} />
            </button>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t border-gray-800 pt-3 md:pt-0 md:border-none md:mt-0">

            {/* Location Tag - Hidden on Mobile */}
            <div className="hidden md:flex flex-col items-end text-right">
              <span className="text-[10px] text-gray-500 font-mono tracking-wider">Base of Operations</span>
              <div className="flex items-center gap-1.5 text-xs text-gray-300">
                <MapPin size={12} className="text-white" />
                <span>{portfolioData.profile.location}</span>
              </div>
            </div>

            {/* Socials Grid */}
            <div className="flex items-center gap-2 md:gap-3 ml-auto md:ml-0">
              {portfolioData.profile.socials?.github && (
                <a href={portfolioData.profile.socials.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800/50 rounded-lg hover:bg-white hover:text-black transition-all border border-gray-700 hover:border-white group/icon relative">
                  <Github size={18} />
                  <span className="hidden md:block absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] bg-black border border-gray-700 text-white px-2 py-0.5 rounded opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">GitHub</span>
                </a>
              )}
              {portfolioData.profile.socials?.linkedin && (
                <a href={portfolioData.profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800/50 rounded-lg hover:bg-white hover:text-black transition-all border border-gray-700 hover:border-white group/icon relative">
                  <Linkedin size={18} />
                  <span className="hidden md:block absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] bg-black border border-gray-700 text-white px-2 py-0.5 rounded opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">LinkedIn</span>
                </a>
              )}
              <a href={`mailto:${portfolioData.profile.email}`} className="p-2 bg-gray-800/50 rounded-lg hover:bg-white hover:text-black transition-all border border-gray-700 hover:border-white group/icon relative">
                <Mail size={18} />
                <span className="hidden md:block absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] bg-black border border-gray-700 text-white px-2 py-0.5 rounded opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">Contact Protocol</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Interface Area - Split View */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4 overflow-hidden relative">

          {/* Left: Data Archives (Dashboard) */}
          {/* On Mobile: Hidden if Agent is Open. On Desktop: Always Visible (flex-1) */}
          <div className={`flex-1 bg-agent-black/30 backdrop-blur-sm border border-agent-border rounded-2xl shadow-2xl overflow-hidden flex flex-col ${isMobileAgentOpen ? 'hidden lg:flex' : 'flex'}`}>
            <div className="p-3 border-b border-agent-border bg-agent-header/50 flex items-center gap-2 text-white shrink-0">
              <LayoutDashboard size={18} />
              <span className="text-xs font-bold tracking-wider">DATA_ARCHIVES</span>
            </div>
            <div className="flex-1 overflow-hidden relative">
              <Dashboard />
            </div>
          </div>

          {/* Right: Neural Link (Chat) */}
          {/* On Mobile: Absolute overlay when open. On Desktop: Fixed sidebar */}
          <div className={`
            ${isMobileAgentOpen
              ? 'fixed inset-0 z-50 flex flex-col bg-black p-2'
              : 'hidden lg:flex lg:w-[350px] xl:w-[400px]'} 
            bg-agent-black/30 backdrop-blur-sm border border-agent-border rounded-2xl shadow-2xl overflow-hidden
          `}>
            {isMobileAgentOpen && (
              <button
                onClick={() => setIsMobileAgentOpen(false)}
                className="lg:hidden absolute top-4 right-4 z-[60] p-2 bg-white/10 rounded-full text-white border border-white/20"
              >
                <X size={20} />
              </button>
            )}
            <Agent />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
