import React from 'react';
import { useResume } from '../../contexts/ResumeContext';
import Input from '../common/Input';
import { motion } from 'framer-motion';

const PersonalForm = () => {
    const { personalDetails, updatePersonalDetails } = useResume();

    const handleChange = (e) => {
        const { name, value } = e.target;
        updatePersonalDetails(name, value);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
        >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Personal Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    label="Full Name"
                    name="fullName"
                    value={personalDetails.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="md:col-span-2"
                />

                <Input
                    label="Job Title"
                    name="jobTitle"
                    value={personalDetails.jobTitle}
                    onChange={handleChange}
                    placeholder="Software Engineer"
                    className="md:col-span-2"
                />

                <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={personalDetails.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                />

                <Input
                    label="Phone"
                    name="phone"
                    value={personalDetails.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                />

                <Input
                    label="Address"
                    name="address"
                    value={personalDetails.address}
                    onChange={handleChange}
                    placeholder="San Francisco, CA"
                    className="md:col-span-2"
                />

                <Input
                    label="Website"
                    name="website"
                    value={personalDetails.website}
                    onChange={handleChange}
                    placeholder="https://johndoe.com"
                />

                <Input
                    label="LinkedIn"
                    name="linkedin"
                    value={personalDetails.linkedin}
                    onChange={handleChange}
                    placeholder="linkedin.com/in/johndoe"
                />

                <Input
                    label="GitHub"
                    name="github"
                    value={personalDetails.github}
                    onChange={handleChange}
                    placeholder="github.com/johndoe"
                />

                <div className="md:col-span-2">
                    <label className="mb-1 text-sm font-medium text-gray-700 block">Professional Summary</label>
                    <textarea
                        name="summary"
                        value={personalDetails.summary}
                        onChange={handleChange}
                        placeholder="Brief summary of your professional background..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 h-32 resize-none"
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default PersonalForm;
