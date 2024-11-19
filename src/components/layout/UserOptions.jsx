import { Avatar, Box, Stack, Typography } from "@mui/material";
import BlueBerryOptions from "./BlueBerryOptions";

const userOptionsStyles = {
    name: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        maxWidth: '200px',
    },
    email: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        maxWidth: '200px',
    },
};

export default function UserOptions() {
    return (
        <Box>
            <Stack
                alignItems="center"
                direction="row"
                justifyContent="flex-start"
                padding="0px 5%"
                spacing={3}
            >
                <Avatar src="/images/koruw.png" />
                <Stack>
                    <Typography
                        variant="body1"
                        noWrap
                        sx={userOptionsStyles.name}
                    >
                        David Flores Sotelo
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        noWrap
                        sx={userOptionsStyles.email}
                    >
                        davidflores@gmail.com
                    </Typography>
                </Stack>
                <BlueBerryOptions />
            </Stack>
        </Box>
    );
}