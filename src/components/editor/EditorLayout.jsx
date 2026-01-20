import React, { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { User, Briefcase, GraduationCap, Code, Folder, CheckCircle2, GripVertical, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import ResumePreview from '../preview/ResumePreview';

const SidebarItem = ({ to, icon: Icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all mx-2 ${isActive
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/10'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`
        }
    >
        <Icon size={18} />
        <span className="font-medium text-sm">{label}</span>
    </NavLink>
);

const EditorLayout = () => {
    return (
        <div className="h-screen bg-[#0f172a] overflow-hidden font-body flex">
            {/* Panel 1: Sidebar (Fixed Width) */}
            <aside className="w-72 bg-[#1e293b] border-r border-slate-700 flex flex-col z-20 flex-shrink-0">
                <div className="p-6 border-b border-slate-700/50">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                            <CheckCircle2 className="text-white" size={20} />
                        </div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 tracking-tight">
                            Resumify
                        </h1>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                    <SidebarItem to="/editor/personal" icon={User} label="Personal" />
                    <SidebarItem to="/editor/experience" icon={Briefcase} label="Experience" />
                    <SidebarItem to="/editor/education" icon={GraduationCap} label="Education" />
                    <SidebarItem to="/editor/skills" icon={Code} label="Skills" />
                    <SidebarItem to="/editor/projects" icon={Folder} label="Projects" />
                </nav>

                <div className="p-4 border-t border-slate-700/50">
                    <NavLink to="/preview" target="_blank" className="flex items-center text-slate-400 hover:text-white transition-colors text-sm">
                        <ExternalLink size={16} className="mr-2" /> Open Full Preview
                    </NavLink>
                </div>
            </aside>

            {/* Panel 2: Editor Form (Flexible 40%) */}
            <div className="flex-1 min-w-[400px] bg-[#f8fafc] flex flex-col relative border-r border-slate-200">
                <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
                <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">Editor</h2>
                </header>
                <div className="flex-1 overflow-y-auto p-6 z-10 scrollbar-thin">
                    <Outlet />
                </div>
            </div>

            {/* Panel 3: Live Preview (Flexible 40% - 50%) */}
            <div className="w-[45%] bg-slate-200/50 flex flex-col min-w-[400px] hidden xl:flex">
                <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">Live Preview</h2>
                </header>
                <div className="flex-1 overflow-hidden relative flex items-center justify-center p-4 bg-slate-200/50">
                    <div className="w-full h-full flex items-center justify-center overflow-auto scrollbar-thin">
                        <ResumePreview isPanel={true} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorLayout;
