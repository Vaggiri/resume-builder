import React, { createContext, useContext, useState, useEffect } from 'react';

const ResumeContext = createContext();

const initialPersonalDetails = {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
};

export const ResumeProvider = ({ children }) => {
    // Load from local storage if available
    const [personalDetails, setPersonalDetails] = useState(() => {
        const saved = localStorage.getItem('personalDetails');
        return saved ? JSON.parse(saved) : initialPersonalDetails;
    });

    const [education, setEducation] = useState(() => {
        const saved = localStorage.getItem('education');
        return saved ? JSON.parse(saved) : [];
    });

    const [experience, setExperience] = useState(() => {
        const saved = localStorage.getItem('experience');
        return saved ? JSON.parse(saved) : [];
    });

    const [skills, setSkills] = useState(() => {
        const saved = localStorage.getItem('skills');
        return saved ? JSON.parse(saved) : [];
    });

    const [projects, setProjects] = useState(() => {
        const saved = localStorage.getItem('projects');
        return saved ? JSON.parse(saved) : [];
    });

    const [currentTheme, setCurrentTheme] = useState(() => {
        return localStorage.getItem('theme') || 'modern';
    });

    // Effects to save to local storage
    useEffect(() => {
        localStorage.setItem('personalDetails', JSON.stringify(personalDetails));
    }, [personalDetails]);

    useEffect(() => {
        localStorage.setItem('education', JSON.stringify(education));
    }, [education]);

    useEffect(() => {
        localStorage.setItem('experience', JSON.stringify(experience));
    }, [experience]);

    useEffect(() => {
        localStorage.setItem('skills', JSON.stringify(skills));
    }, [skills]);

    useEffect(() => {
        localStorage.setItem('projects', JSON.stringify(projects));
    }, [projects]);

    useEffect(() => {
        localStorage.setItem('theme', currentTheme);
        document.body.setAttribute('data-theme', currentTheme);
    }, [currentTheme]);

    // Actions
    const updatePersonalDetails = (field, value) => {
        setPersonalDetails(prev => ({ ...prev, [field]: value }));
    };

    const addEducation = () => {
        setEducation(prev => [...prev, { id: Date.now(), school: '', degree: '', startDate: '', endDate: '', description: '' }]);
    };

    const updateEducation = (id, field, value) => {
        setEducation(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const removeEducation = (id) => {
        setEducation(prev => prev.filter(item => item.id !== id));
    };

    const addExperience = () => {
        setExperience(prev => [...prev, { id: Date.now(), company: '', position: '', startDate: '', endDate: '', description: '' }]);
    };

    const updateExperience = (id, field, value) => {
        setExperience(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const removeExperience = (id) => {
        setExperience(prev => prev.filter(item => item.id !== id));
    };

    const addSkill = (skill) => {
        if (!skills.includes(skill)) setSkills(prev => [...prev, skill]);
    };

    const removeSkill = (skill) => {
        setSkills(prev => prev.filter(s => s !== skill));
    };

    const addProject = () => {
        setProjects(prev => [...prev, { id: Date.now(), name: '', description: '', link: '', tools: '' }]);
    };

    const updateProject = (id, field, value) => {
        setProjects(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    };

    const removeProject = (id) => {
        setProjects(prev => prev.filter(item => item.id !== id));
    };

    const clearAll = () => {
        if (window.confirm("Are you sure you want to clear all data? This cannot be undone.")) {
            setPersonalDetails(initialPersonalDetails);
            setEducation([]);
            setExperience([]);
            setSkills([]);
            setProjects([]);
            localStorage.clear();
        }
    }

    const value = {
        personalDetails,
        updatePersonalDetails,
        education,
        addEducation,
        updateEducation,
        removeEducation,
        experience,
        addExperience,
        updateExperience,
        removeExperience,
        skills,
        addSkill,
        removeSkill,
        projects,
        addProject,
        updateProject,
        removeProject,
        currentTheme,
        setCurrentTheme,
        clearAll
    };

    return (
        <ResumeContext.Provider value={value}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
};
