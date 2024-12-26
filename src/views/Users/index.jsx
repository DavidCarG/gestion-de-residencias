import { useFetch } from '../../hooks/useFetch';
import { fetchUsers } from '../../api/users';
import UsersTable from '../../components/UsersTable';
import UsersProvider from '../../context/Users/UsersProvider';

const UsersView = () => {
    const response = useFetch(fetchUsers);

    return (
        <UsersProvider>
            <UsersTable {...response} />
        </UsersProvider>
    );
};

export default UsersView;
