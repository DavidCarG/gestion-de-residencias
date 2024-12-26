import PropTypes from 'prop-types';
import { format } from 'date-fns';

const DateBodyTemplate = ({ createdAt }) => {
    const formattedDate = format(new Date(createdAt), 'dd/MM/yyyy');
    return <span>{formattedDate}</span>;
};

DateBodyTemplate.propTypes = {
    createdAt: PropTypes.string.isRequired,
};

export default DateBodyTemplate;
