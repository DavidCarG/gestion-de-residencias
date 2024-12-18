import { Divider, Stack } from '@mui/material';
import UserOptions from './UserOptions';
import OptionsMenu from './OptionsMenu';

const sidebarStyles = {
  innerStack: {
    height: '100%',
    maxWidth: '20vw',
    padding: '9vh 0px 10px 0px',
    justifyContent: 'space-between',
    flexGrow: 1,
    borderRight: '0.5px solid #707070',
  },
};

export default function SideBar() {
  return (
    <Stack sx={sidebarStyles.innerStack}>
      <OptionsMenu />
      <Stack spacing={2}>
        <Divider />
        {/*<UserOptions />*/}
      </Stack>
    </Stack>
  );
}
