import { useContext } from 'react';
import { createContext } from 'react';

export const UsersContext = createContext();

export const useUsersContext = () => {
    const context = useContext(UsersContext);

    if (!context) {
        throw new Error('useUsersContext must be used within a ProjectsProvider');
    }

    return context;
}