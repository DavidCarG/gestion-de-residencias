import { useFetch } from '../../hooks/useFetch';
import { fetchUsers } from '../../api/users';
import UsersTable from '../../components/UsersTable';
import Layout from '../../components/layout';

const UsersView = () => {
  const response = useFetch(fetchUsers);

  return (
    <Layout>
      <UsersTable {...response} />
    </Layout>
  );
};

export default UsersView;
