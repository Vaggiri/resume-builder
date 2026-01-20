import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import Input from '../common/Input';
import Button from '../common/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus } from 'lucide-react';

const EducationForm = () => {
    const { education, addEducation, updateEducation, removeEducation } = useResume();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Education</h2>
                <Button onClick={addEducation} className="flex items-center gap-2">
                    <Plus size={16} /> Add Education
                </Button>
            </div>

            <AnimatePresence>
                {education.map((edu, index) => (
                    <motion.div
                        key={edu.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 relative group"
                    >
                        <button
                            onClick={() => removeEducation(edu.id)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <Trash2 size={20} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label="School / University"
                                value={edu.school}
                                onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                                placeholder="University of California"
                            />
                            <Input
                                label="Degree"
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                placeholder="B.S. Computer Science"
                            />
                            <Input
                                label="Start Date"
                                type="text"
                                value={edu.startDate}
                                onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                                placeholder="Sep 2018"
                            />
                            <Input
                                label="End Date"
                                type="text"
                                value={edu.endDate}
                                onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                                placeholder="May 2022"
                            />
                            <div className="md:col-span-2">
                                <label className="mb-1 text-sm font-medium text-gray-700 block">Description (Optional)</label>
                                <textarea
                                    value={edu.description}
                                    onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                                    placeholder="Honors, activities, or relevant coursework..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 h-24 resize-none"
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {education.length === 0 && (
                <div className="text-center py-10 bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
                    No education added yet. Click "Add Education" to get started.
                </div>
            )}
        </motion.div>
    );
};

export default EducationForm;
