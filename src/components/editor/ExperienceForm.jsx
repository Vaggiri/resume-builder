import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import Input from '../common/Input';
import Button from '../common/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus } from 'lucide-react';

const ExperienceForm = () => {
    const { experience, addExperience, updateExperience, removeExperience } = useResume();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Experience</h2>
                <Button onClick={addExperience} className="flex items-center gap-2">
                    <Plus size={16} /> Add Position
                </Button>
            </div>

            <AnimatePresence>
                {experience.map((exp, index) => (
                    <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 relative group"
                    >
                        <button
                            onClick={() => removeExperience(exp.id)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <Trash2 size={20} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="Company"
                                value={exp.company}
                                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                                placeholder="Google"
                            />
                            <Input
                                label="Position"
                                value={exp.position}
                                onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                                placeholder="Senior Engineer"
                            />
                            <Input
                                label="Start Date"
                                type="text"
                                value={exp.startDate}
                                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                                placeholder="Jan 2022"
                            />
                            <Input
                                label="End Date"
                                type="text"
                                value={exp.endDate}
                                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                                placeholder="Present"
                            />
                            <div className="md:col-span-2">
                                <label className="mb-1 text-sm font-medium text-gray-700 block">Description</label>
                                <textarea
                                    value={exp.description}
                                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                    placeholder="Key responsibilities and achievements..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 h-24 resize-none"
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {experience.length === 0 && (
                <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
                    No experience added yet. Click "Add Position" to get started.
                </div>
            )}
        </motion.div>
    );
};

export default ExperienceForm;
