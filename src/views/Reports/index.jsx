import ReportsTable from '../../components/ReportsTable';
import { fetchReports } from '../../api/reports';
import { useFetch } from '../../hooks/useFetch';
import ReportsProvider from '../../context/Reports/ReportsProvider';

const ProjectsView = () => {
    const response = useFetch(fetchReports);

    return (
        <ReportsProvider>
            <ReportsTable {...response} />
        </ReportsProvider>
    );
};

export default ProjectsView;
