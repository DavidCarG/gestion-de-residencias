import { useContext } from 'react';
import { createContext } from 'react';

export const ProjectsContext = createContext();

export const useProjectsContext = () => {
    const context = useContext(ProjectsContext);

    if (!context) {
        throw new Error('useProjectsContext must be used within a ProjectsProvider');
    }

    return context;
}