import { Divider, Stack, Typography, Avatar } from '@mui/material';
import UserOptions from './UserOptions';
import OptionsMenu from './OptionsMenu';
import { useSelector } from 'react-redux';

const sidebarStyles = {
  innerStack: {
    height: '100%',
    maxWidth: '20vw',
    padding: '9vh 0px 10px 0px',
    justifyContent: 'space-between',
    flexGrow: 1,
    borderRight: '0.5px solid #707070',
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
      <OptionsMenu />
      <Stack spacing={2}>
        <Divider />
        <div style={sidebarStyles.userContainer}>
          <Avatar sx={sidebarStyles.avatar}>{username.charAt(0)}</Avatar>
          <div style={sidebarStyles.userInfo}>
            <Typography variant="body1">{username}</Typography>
            <Typography variant="body2" color="textSecondary">
              {email}
            </Typography>
          </div>
        </div>
      </Stack>
    </Stack>
  );
}
