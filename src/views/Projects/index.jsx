import { useFetch } from '../../hooks/useFetch';
import { fetchProjects } from '../../api/projects';
import ProjectsTable from '../../components/ProjectsTable';

const ProjectsView = () => {
  const response = useFetch(fetchProjects);

  return (
      <ProjectsTable {...response} />
  );
};

export default ProjectsView;
