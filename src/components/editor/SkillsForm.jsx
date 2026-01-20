import React, { useState } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import Button from '../common/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';

const SkillsForm = () => {
    const { skills, addSkill, removeSkill } = useResume();
    const [newSkill, setNewSkill] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        if (newSkill.trim()) {
            addSkill(newSkill.trim());
            setNewSkill('');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
        >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Skills</h2>

            <form onSubmit={handleAdd} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill (e.g. React, Python)"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button type="submit" disabled={!newSkill.trim()}>
                    <Plus size={20} />
                </Button>
            </form>

            <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                    {skills.map((skill) => (
                        <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full flex items-center gap-2"
                        >
                            <span>{skill}</span>
                            <button
                                onClick={() => removeSkill(skill)}
                                className="text-gray-500 hover:text-red-500 focus:outline-none"
                            >
                                <X size={14} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {skills.length === 0 && (
                <p className="text-gray-500 text-sm mt-4 text-center">No skills added yet.</p>
            )}
        </motion.div>
    );
};

export default SkillsForm;
