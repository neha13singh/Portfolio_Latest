import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, title, delay = 0, className = '', highlight = false }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className={`relative group bg-agent-card border ${highlight ? 'border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.05)]' : 'border-agent-border'} rounded-lg overflow-hidden backdrop-blur-sm shadow-xl transition-all duration-300 hover:border-white/60 ${className}`}
        >
            {/* Glowing Corner Accents */}
            <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 ${highlight ? 'border-white opacity-100' : 'border-white opacity-40'} group-hover:opacity-100 transition-opacity`}></div>
            <div className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 ${highlight ? 'border-white opacity-100' : 'border-white opacity-40'} group-hover:opacity-100 transition-opacity`}></div>
            <div className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 ${highlight ? 'border-white opacity-100' : 'border-white opacity-40'} group-hover:opacity-100 transition-opacity`}></div>
            <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 ${highlight ? 'border-white opacity-100' : 'border-white opacity-40'} group-hover:opacity-100 transition-opacity`}></div>

            {/* Header */}
            {title && (
                <div className={`px-4 py-2 border-b ${highlight ? 'border-white/20 bg-white/5' : 'border-agent-border bg-agent-header'} flex items-center justify-between`}>
                    <span className={`font-mono text-xs font-bold tracking-widest uppercase ${highlight ? 'text-white' : 'text-agent-dim group-hover:text-white transition-colors'}`}>{title}</span>
                    <div className="flex gap-1">
                        <div className={`w-1 h-1 rounded-full ${highlight ? 'bg-white/40' : 'bg-agent-zinc'}`}></div>
                        <div className={`w-1 h-1 rounded-full ${highlight ? 'bg-white/40' : 'bg-agent-zinc'}`}></div>
                        <div className={`w-1 h-1 rounded-full ${highlight ? 'bg-white/40' : 'bg-agent-zinc'}`}></div>
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="p-4">
                {children}
            </div>
        </motion.div>
    );
};

export default Card;
