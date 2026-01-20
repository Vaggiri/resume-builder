export const themes = [
    { id: 'modern', name: 'Modern', color: '#2563eb' },
    { id: 'professional', name: 'Professional', color: '#1e3a8a' },
    { id: 'creative', name: 'Creative', color: '#db2777' },
    { id: 'minimalist', name: 'Minimalist', color: '#18181b' },
    { id: 'executive', name: 'Executive', color: '#0f172a' },
    { id: 'ivy', name: 'Ivy League', color: '#14532d' },
    { id: 'tech', name: 'Tech', color: '#0ea5e9' },
    { id: 'startup', name: 'Startup', color: '#f97316' },
    { id: 'compact', name: 'Compact', color: '#4b5563' },
    { id: 'elegant', name: 'Elegant', color: '#7c3aed' },
    { id: 'swiss', name: 'Swiss', color: '#ef4444' },
    { id: 'glitch', name: 'Glitch Mode', color: '#00ff41' },
];

export const getThemeColor = (id) => {
    const theme = themes.find(t => t.id === id);
    return theme ? theme.color : '#cccccc';
};
