import { useDispatch, useSelector } from 'react-redux';
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useNavigate } from 'react-router-dom';
import { setSelectedBtn } from '../../store/menuSlice';
import PropTypes from 'prop-types';

const MenuButton = ({ index, selectedBtn, handleListItem, path, icon: Icon, label }) => (
    <ListItemButton
        selected={selectedBtn === index}
        onClick={() => handleListItem(index, path)}
        sx={{
            borderRadius: '8px',
            width: '90%',
            margin: '10px auto 8px 10px',
            flexDirection: 'column',
            alignItems: 'center',
        }}
    >
        <ListItemIcon
            sx={{
                minWidth: 'auto',
                marginBottom: '4px',
            }}
        >
            <Icon sx={{ fontSize: '2rem' }} />
        </ListItemIcon>
        <ListItemText primary={label} sx={{ textAlign: 'center' }} />
    </ListItemButton>
);

MenuButton.propTypes = {
    index: PropTypes.number.isRequired,
    selectedBtn: PropTypes.number.isRequired,
    handleListItem: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
};

export default function OptionsMenu() {
    const dispatch = useDispatch();
    const selectedBtn = useSelector((state) => state.menu.selectedBtn);
    const navigate = useNavigate();

    const handleListItem = (i, path) => {
        dispatch(setSelectedBtn(i));
        navigate(path);
    };

    return (
        <Box
            sx={{
                marginTop: '1rem',
            }}
        >
            <List component="nav">
                <MenuButton
                    index={0}
                    selectedBtn={selectedBtn}
                    handleListItem={handleListItem}
                    path="/usuarios"
                    icon={PeopleIcon}
                    label="Usuarios"
                />
                <MenuButton
                    index={1}
                    selectedBtn={selectedBtn}
                    handleListItem={handleListItem}
                    path="/proyectos"
                    icon={WorkIcon}
                    label="Proyectos"
                />
                <MenuButton
                    index={2}
                    selectedBtn={selectedBtn}
                    handleListItem={handleListItem}
                    path="/reportes"
                    icon={BarChartIcon}
                    label="Reportes"
                />
            </List>
        </Box>
    );
}