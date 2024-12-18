import { useFetch } from '../../hooks/useFetch';
import { fetchProjects } from '../../api/projects';
import ProjectsTable from '../../components/ProjectsTable';
import Layout from '../../components/layout';

const ProjectsView = () => {
  const response = useFetch(fetchProjects);

  return (
    <Layout>
      <ProjectsTable {...response} />
    </Layout>
  );
};

export default ProjectsView;
