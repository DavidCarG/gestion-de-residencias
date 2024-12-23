import { Box } from '@mui/material';
import SideBar from './SideBar';
import PropTypes from 'prop-types';

const LayoutStyles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    display: 'flex',
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#152027',
    margin: '0',
    height: '100%',
    overflowY: 'auto',
  },
};

export default function Layout({ children }) {
  return (
    <Box sx={LayoutStyles.container}>
      <Box sx={LayoutStyles.main}>
        <SideBar />
        <Box sx={LayoutStyles.content}>{children}</Box>
      </Box>
    </Box>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
