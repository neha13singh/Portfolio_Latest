import React, { useState, useEffect, useRef } from 'react';
import { Send, Terminal, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { vectorStore } from '../../utils/vectorStore';
import portfolioData from '../../data/portfolio.json';

const Agent = () => {
    const [messages, setMessages] = useState([
        { id: 1, type: 'agent', text: `Initializing System...\nLoaded Profile: ${portfolioData.profile.name}\nStatus: ONLINE\n\nWelcome. I am the Agent assigned to Neha Singh's portfolio. I have access to her full professional background. How can I assist you?` }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Feed the Vector Store on mount
    useEffect(() => {
        vectorStore.feed(portfolioData);
    }, []);

    const processQuery = async (userText) => {
        try {
            // Semantic Search via Fuse.js (Client-side Vector DB)
            const contextData = vectorStore.search(userText);
            console.log("Vector Match:", contextData);

            const response = await fetch('/api/agent/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userText,
                    contextData
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Backend error');
            }

            const data = await response.json();
            console.log("💰 Backend Token Usage:", data.usage);

            return data.response;
        } catch (error) {
            console.error(error);
            return `Error: ${error.message}. Please try again later or contact me via email.`;
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), type: 'user', text: input };

        // UI: Show ALL messages (start fresh only on refresh)
        let currentMessages = [];
        setMessages(prev => {
            const updated = [...prev, userMsg];
            currentMessages = updated;
            return updated;
        });

        setInput('');
        setIsTyping(true);

        const responseText = await processQuery(userMsg.text);

        setMessages(prev => [...prev, { id: Date.now() + 1, type: 'agent', text: responseText }]);
        setIsTyping(false);
    };

    return (
        <div className="flex flex-col h-full bg-agent-black border border-agent-grid rounded-lg overflow-hidden shadow-2xl font-mono text-sm md:text-base">
            {/* Header */}
            <div className="bg-agent-header p-3 border-b border-agent-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Terminal size={18} className="text-white" />
                    <span className="font-bold tracking-wider text-white">AGENT_V1.0</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                    <span className="text-xs text-gray-500">OPERATIONAL</span>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-opacity-90 bg-black">
                {messages.map((msg) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={msg.id}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[80%] p-3 rounded-lg border ${msg.type === 'user'
                            ? 'bg-agent-header border-agent-border text-gray-200 shadow-sm'
                            : 'bg-white/10 border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                            }`}>
                            <div className="flex items-center gap-2 mb-1 opacity-50 text-xs uppercase tracking-widest">
                                {msg.type === 'user' ? <User size={12} /> : <Terminal size={12} />}
                                <span>{msg.type === 'user' ? 'Guest' : 'System'}</span>
                            </div>
                            <div className="whitespace-pre-wrap leading-relaxed">
                                {msg.text}
                            </div>
                        </div>
                    </motion.div>
                ))}
                {isTyping && (
                    <div className="flex items-center gap-1 text-white ml-2">
                        <span className="animate-bounce">●</span>
                        <span className="animate-bounce delay-100">●</span>
                        <span className="animate-bounce delay-200">●</span>
                    </div>
                )}
                <div ref={scrollRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 bg-agent-dark border-t border-agent-grid flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter command or query..."
                    className="flex-1 bg-black border border-agent-border rounded px-4 py-2 text-white focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder-gray-600"
                />
                <button
                    type="submit"
                    disabled={!input.trim()}
                    className="bg-white text-black px-4 py-2 rounded font-bold hover:bg-agent-silver disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
};

export default Agent;
