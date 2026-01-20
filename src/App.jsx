import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ResumeProvider } from './contexts/ResumeContext';
import EditorLayout from './components/editor/EditorLayout';
import PersonalForm from './components/editor/PersonalForm';
import EducationForm from './components/editor/EducationForm';
import ExperienceForm from './components/editor/ExperienceForm';
import SkillsForm from './components/editor/SkillsForm';
import ProjectsForm from './components/editor/ProjectsForm';
import ResumePreview from './components/preview/ResumePreview';

function App() {
  return (
    <ResumeProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Navigate to="/editor/personal" replace />} />
          <Route path="/editor" element={<EditorLayout />}>
            <Route index element={<Navigate to="personal" replace />} />
            <Route path="personal" element={<PersonalForm />} />
            <Route path="experience" element={<ExperienceForm />} />
            <Route path="education" element={<EducationForm />} />
            <Route path="skills" element={<SkillsForm />} />
            <Route path="projects" element={<ProjectsForm />} />
          </Route>
          <Route path="/preview" element={<ResumePreview />} />
        </Routes>
      </Router>
    </ResumeProvider>
  );
}

export default App;
