import { useFetch } from '../../hooks/useFetch';
import { fetchUsers } from '../../api/users';
import UsersTable from '../../components/UsersTable';

const UsersView = () => {
    const response = useFetch(fetchUsers);

    return (
        <UsersTable {...response} />
    );
};

export default UsersView;