import React, { useRef, useState, useEffect } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import { Printer, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { themes, getThemeColor } from '../../utils/themeConfig';

const ResumePreview = ({ isPanel = false }) => {
    const { personalDetails, experience, education, skills, projects, currentTheme, setCurrentTheme } = useResume();
    const resumeRef = useRef(null);
    const containerRef = useRef(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        if (!isPanel) return;

        const handleResize = () => {
            if (containerRef.current) {
                const parentWidth = containerRef.current.offsetWidth;
                const targetResumeWidth = 794; // A4 width at 96dpi (approx 210mm)
                const margin = 40; // Padding/margin around the resume
                const newScale = Math.min((parentWidth - margin) / targetResumeWidth, 1.2); // Max scale 1.2
                setScale(Math.max(newScale, 0.3)); // Min zoom 0.3
            }
        };

        handleResize(); // Initial calculation
        window.addEventListener('resize', handleResize);

        const resizeObserver = new ResizeObserver(handleResize);
        if (containerRef.current) resizeObserver.observe(containerRef.current);

        return () => {
            window.removeEventListener('resize', handleResize);
            resizeObserver.disconnect();
        };
    }, [isPanel]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div ref={containerRef} className={`bg-gray-100 flex flex-col items-center ${isPanel ? 'w-full h-full overflow-hidden justify-center' : 'min-h-screen p-8 justify-start'}`}>

            {/* Toolbar - Floating or Fixed based on mode */}
            <div className={`mb-4 flex gap-4 no-print items-center z-50 transition-all duration-300 ${isPanel ? 'absolute bottom-4 right-4' : 'fixed bottom-8 right-8'}`}>

                {/* Theme Switcher Compact */}
                <div className="bg-white p-2 rounded-xl shadow-2xl border border-gray-200 flex gap-2 mr-2 origin-right items-center max-w-[300px] overflow-x-auto scrollbar-hide">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Theme</span>
                    {themes.map(theme => (
                        <button
                            key={theme.id}
                            onClick={() => setCurrentTheme(theme.id)}
                            className={`w-6 h-6 rounded-full transition-all border-2 ${currentTheme === theme.id ? 'border-blue-500 scale-125 shadow-md' : 'border-transparent hover:scale-110'}`}
                            title={theme.name}
                            style={{ backgroundColor: theme.color }}
                        />
                    ))}
                </div>

                {!isPanel && (
                    <Link to="/editor/personal">
                        <Button variant="secondary" className="flex items-center shadow-xl">
                            <Edit size={20} className="mr-2" /> Edit Resume
                        </Button>
                    </Link>
                )}

                <Button onClick={handlePrint} className="flex items-center shadow-xl px-4 py-2 text-sm font-bold bg-gray-900 text-white hover:bg-black">
                    <Printer size={18} className="mr-2" /> {isPanel ? 'Print' : 'Print / Download'}
                </Button>
            </div>

            {/* Resume Page (Scaled) */}
            <div
                style={{
                    transform: isPanel ? `scale(${scale})` : 'none',
                    transformOrigin: 'center center',
                    transition: 'transform 0.2s ease-out'
                }}
                className={isPanel ? '' : ''}
            >
                <motion.div
                    layout
                    ref={resumeRef}
                    className="bg-white shadow-2xl w-[210mm] min-h-[297mm] p-[10mm] relative text-left"
                    data-theme={currentTheme}
                >
                    {/* Header */}
                    <header className="resume-header border-b-2 border-gray-800 pb-4 mb-6">
                        <h1 className="resume-name text-4xl font-bold uppercase tracking-wider text-gray-900">{personalDetails.fullName}</h1>
                        <p className="resume-title text-xl text-gray-600 font-medium mt-1">{personalDetails.jobTitle}</p>

                        <div className="resume-contact flex flex-wrap gap-3 mt-4 text-sm text-gray-600">
                            {personalDetails.email && <span>{personalDetails.email}</span>}
                            {personalDetails.phone && <span>• {personalDetails.phone}</span>}
                            {personalDetails.address && <span>• {personalDetails.address}</span>}
                            {personalDetails.website && <span>• {personalDetails.website}</span>}
                            {personalDetails.linkedin && <span>• {personalDetails.linkedin}</span>}
                        </div>
                    </header>

                    {/* Professional Summary */}
                    {personalDetails.summary && (
                        <section className="mb-6">
                            <h2 className="resume-section-title text-lg font-bold uppercase border-b border-gray-300 mb-2 pb-1">Professional Profile</h2>
                            <p className="resume-text text-sm leading-relaxed text-gray-700 whitespace-pre-line">{personalDetails.summary}</p>
                        </section>
                    )}

                    <div className="grid grid-cols-3 gap-8">
                        {/* Left Column (Main Content) */}
                        <div className="col-span-2">
                            {experience.length > 0 && (
                                <section className="mb-6">
                                    <h2 className="resume-section-title text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1">Experience</h2>
                                    <div className="space-y-4">
                                        {experience.map(exp => (
                                            <div key={exp.id}>
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <h3 className="font-bold text-gray-800">{exp.position}</h3>
                                                    <span className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</span>
                                                </div>
                                                <h4 className="font-medium text-gray-700 mb-1">{exp.company}</h4>
                                                <p className="resume-text text-sm text-gray-600 whitespace-pre-line">{exp.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {projects.length > 0 && (
                                <section className="mb-6">
                                    <h2 className="resume-section-title text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1">Projects</h2>
                                    <div className="space-y-4">
                                        {projects.map(proj => (
                                            <div key={proj.id}>
                                                <div className="flex justify-between items-baseline mb-1">
                                                    <h3 className="font-bold text-gray-800">{proj.name}</h3>
                                                    <span className="text-sm text-gray-500 italic">{proj.tools}</span>
                                                </div>
                                                {proj.link && <a href={proj.link} className="text-blue-600 text-xs hover:underline block mb-1">{proj.link}</a>}
                                                <p className="resume-text text-sm text-gray-600 whitespace-pre-line">{proj.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Right Column (Sidebar) */}
                        <div>
                            {education.length > 0 && (
                                <section className="mb-6">
                                    <h2 className="resume-section-title text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1">Education</h2>
                                    <div className="space-y-4">
                                        {education.map(edu => (
                                            <div key={edu.id}>
                                                <h3 className="font-bold text-gray-800 text-sm">{edu.school}</h3>
                                                <p className="text-sm text-gray-700">{edu.degree}</p>
                                                <span className="text-xs text-gray-500 block mb-1">{edu.startDate} - {edu.endDate}</span>
                                                {edu.description && <p className="text-xs text-gray-600 mt-1">{edu.description}</p>}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {skills.length > 0 && (
                                <section className="mb-6">
                                    <h2 className="resume-section-title text-lg font-bold uppercase border-b border-gray-300 mb-4 pb-1">Skills</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map(skill => (
                                            <span key={skill} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>
                    </div>

                </motion.div>
            </div>
        </div>
    );
};

export default ResumePreview;
