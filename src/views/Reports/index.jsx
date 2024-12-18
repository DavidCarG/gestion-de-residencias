import ReportsTable from '../../components/ReportsTable';
import { fetchReports } from '../../api/reports';
import { useFetch } from '../../hooks/useFetch';
import Layout from '../../components/layout';

const formatData = (data) => {
  return data.map((report) => ({
    reportId: report._id,
    projectId: report.projectId._id,
    projectName: report.projectId.projectName,
    requestingCompany: report.projectId.requestingCompany,
    userId: report.userId._id,
    userName: report.userId.name,
    userEmail: report.userId.email,
    link: report.link,
    createdAt: report.createdAt,
    updatedAt: report.updatedAt,
  }));
};

const ProjectsView = () => {
  const { data, loading, error } = useFetch(fetchReports);
  const formattedData = data ? formatData(data) : [];

  return (
    <Layout>
      <ReportsTable data={formattedData} loading={loading} error={error} />
    </Layout>
  );
};

export default ProjectsView;
