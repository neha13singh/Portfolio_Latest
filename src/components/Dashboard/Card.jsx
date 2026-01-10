import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ title, children, className = '', delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className={`relative group bg-agent-black/80 border border-gray-800 rounded-lg overflow-hidden backdrop-blur-sm ${className}`}
        >
            {/* Glowing Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-agent-green opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-agent-green opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-agent-green opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-agent-green opacity-50 group-hover:opacity-100 transition-opacity"></div>

            {/* Header */}
            {title && (
                <div className="px-4 py-2 border-b border-gray-800 bg-agent-dark/50 flex items-center justify-between">
                    <span className="font-mono text-xs text-agent-green tracking-widest uppercase">{title}</span>
                    <div className="flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                        <div className="w-1 h-1 rounded-full bg-gray-600"></div>
                        <div className="w-1 h-1 rounded-full bg-gray-600"></div>
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
