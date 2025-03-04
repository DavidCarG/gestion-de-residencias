import { useContext } from 'react';
import { createContext } from 'react';

export const ReportsContext = createContext();

export const useReportsContext = () => {
    const context = useContext(ReportsContext);

    if (!context) {
        throw new Error('useReportsContext must be used within a ProjectsProvider');
    }

    return context;
}