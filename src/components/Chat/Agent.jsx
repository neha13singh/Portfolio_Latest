
import React, { useState, useEffect, useRef } from 'react';
import { Send, Terminal, User } from 'lucide-react';
import { motion } from 'framer-motion';
import OpenAI from 'openai';
import { vectorStore } from '../../utils/vectorStore';
import portfolioData from '../../data/portfolio.json';

const Agent = () => {
    const [messages, setMessages] = useState([
        { id: 1, type: 'agent', text: `Initializing System...\nLoaded Profile: ${portfolioData.profile.name}\nStatus: ONLINE\n\nWelcome. I am the Agent assigned to Neha Singh's portfolio. I have access to her full professional background. How can I assist you?` }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    // Initialize OpenAI Client
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const openai = apiKey ? new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Client-side only for this demo
    }) : null;

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Feed the Vector Store on mount
    useEffect(() => {
        vectorStore.feed(portfolioData);
    }, []);

    const processQuery = async (userText) => {
        if (!openai) {
            return "System Error: API Key not configured. Please add VITE_OPENAI_API_KEY to .env file.";
        }

        // Semantic Search via Fuse.js (Client-side Vector DB)
        const contextData = vectorStore.search(userText);
        console.log("Vector Match:", contextData);

        const exampleQA = [
            { q: "Give me a short professional summary", a: "Neha specializes in backend and AI engineering, building production-grade systems using Java, FastAPI, Docker, and OpenAI APIs." },
            { q: "What is Neha’s strongest project?", a: "MeetCode is her flagship project — a real-time competitive coding platform with WebSockets, Docker-based code execution, and automated matchmaking." },
            { q: "Where does Neha work currently?", a: "She works as an Application Engineer at Newgen Software, developing enterprise workflows and Java-based integrations." },
            { q: "Tell me about her education", a: "Neha completed her Bachelor’s in Electronics & Communication Engineering from IET Lucknow in 2025 with a CGPA of 8.5." },
            { q: "Is she suitable for backend roles?", a: "Yes, she has production experience with APIs, databases, Docker, and enterprise Java systems." },
            { q: "What AI experience does she have?", a: "She built GPT-based platforms with RAG pipelines, PII redaction, and multi-agent moderation systems." },
            { q: "Is Neha good at DSA?", a: "She has solved 400+ problems on LeetCode and ranked 245 on GeeksforGeeks." }
        ];

        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: `You are Neha Singh's Interactive Resume. You speak as "We" or "Neha".
            
            Current Date: ${new Date().toDateString()}

            DATA CONTEXT (Use this as your PRIMARY memory):
            ${JSON.stringify(contextData)}
            
            IDENTITY & INSTRUCTIONS:
            1. **Identity**: You are NOT a general AI. You are the specific representation of Neha's professional life.
            2. **Data-Driven**: Answer ONLY using the provided data. If a specific detail (like a specific library) isn't in the JSON, assume Neha hasn't explicitly highlighted it, but infer from similar skills if safe.
            3. **No General Lectures**: Do not explain *what* a technology is (e.g., don't define "React"). Instead, explain *how Neha used it* (e.g., "Neha used React to build the frontend of MeetCode...").
            4. **Aggressive Summarization**: Never dump raw lists. Blend facts into 1-2 powerful, professional sentences.
            5. **Education Rule**: STRICTLY summarize ONLY the highest qualification (Degree, College, Year) in 1 sentence. Ignore 10th/12th grades unless specifically asked.
            6. **Fallback**: If the data is empty or irrelevant, politely steer back to Neha's known expertise (Backend, AI, Full Stack).
            7. **Tone**: Professional, Confident, Concise.
            
            STYLE EXAMPLES (Mimic this brevity and tone):
            ${exampleQA.map(ex => `Q: ${ex.q}\nA: ${ex.a}`).join('\n\n')}
            `
                    },
                    { role: "user", content: userText }
                ],
            });

            console.log("💰 Token Usage:", completion.usage); // Log usage stats
            return completion.choices[0].message.content;
        } catch (error) {
            console.error(error);
            return `Error: ${error.message}`;
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
            <div className="bg-agent-dark p-3 border-b border-agent-grid flex items-center justify-between">
                <div className="flex items-center gap-2 text-agent-green">
                    <Terminal size={18} />
                    <span className="font-bold tracking-wider">AGENT_V1.0</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-agent-green animate-pulse"></div>
                    <span className="text-xs text-gray-500">ONLINE</span>
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
                            ? 'bg-agent-dark border-gray-700 text-gray-200'
                            : 'bg-agent-dark/50 border-agent-green/30 text-agent-green shadow-[0_0_10px_rgba(0,255,65,0.1)]'
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
                    <div className="flex items-center gap-1 text-agent-green ml-2">
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
                    placeholder={apiKey ? "Enter command or query..." : "API Key Missing (Check .env)"}
                    disabled={!apiKey}
                    className="flex-1 bg-black border border-gray-800 rounded px-4 py-2 text-white focus:outline-none focus:border-agent-green focus:ring-1 focus:ring-agent-green transition-all placeholder-gray-600 disabled:opacity-50"
                />
                <button
                    type="submit"
                    disabled={!input.trim() || !apiKey}
                    className="bg-agent-green text-black px-4 py-2 rounded font-bold hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
};

export default Agent;
