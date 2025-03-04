import { useFetch } from '../../hooks/useFetch';
import { fetchProjects } from '../../api/projects';
import ProjectsTable from '../../components/ProjectsTable';
import ProjectsProvider from '../../context/Projects/ProjectsProvider';

const ProjectsView = () => {
    const response = useFetch(fetchProjects);

    return (
        <ProjectsProvider>
            <ProjectsTable {...response} />
        </ProjectsProvider>
    );
};

export default ProjectsView;
