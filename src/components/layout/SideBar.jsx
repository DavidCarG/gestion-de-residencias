import { Divider, Stack, Typography, Avatar, Box } from '@mui/material';
import OptionsMenu from './OptionsMenu';
import { useSelector } from 'react-redux';

const sidebarStyles = {
  innerStack: {
    height: '100%',
    width: '10vw',
    padding: '0px 0px 10px 0px',
    justifyContent: 'space-between',
    borderRight: '0.5px solid #707070',
    transition: 'all 0.5s',
  },
  userContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
  },
  avatar: {
    marginRight: '10px',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
};

export default function SideBar() {
  const { username, email } = useSelector((state) => state.user);

  return (
    <Stack sx={sidebarStyles.innerStack}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <OptionsMenu />
      </Box>
      <Stack spacing={2}>
        <Divider />
        {username && email ? (
          <div style={sidebarStyles.userContainer}>
            <Avatar sx={sidebarStyles.avatar}>{username.charAt(0)}</Avatar>
            <div style={sidebarStyles.userInfo}>
              <Typography variant="body1">{username}</Typography>
              <Typography variant="body2" color="textSecondary">
                {email}
              </Typography>
            </div>
          </div>
        ) : (
          <Typography variant="body2" color="textSecondary">
            User information not available
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}