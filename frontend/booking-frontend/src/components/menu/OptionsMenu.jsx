import * as React from 'react';

import { styled } from '@mui/material/styles';
import Divider, { dividerClasses } from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import { paperClasses } from '@mui/material/Paper';
import { listClasses } from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon, { listItemIconClasses } from '@mui/material/ListItemIcon';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
// import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// import { useNavigate } from "react-router-dom";
// import zIndex from '@mui/material/styles/zIndex';

const MenuItem = styled(MuiMenuItem)({
    margin: '2px 0',
});

export default function OptionsMenu() {

    // const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = async (e) => {

        setAnchorEl(null);

    };


    return (
        <div>
            <div aria-label="Open menu"
                style={{ position: 'relative', width: '44px', height: '44px' }}
                onClick={handleClick}>
                <FiberManualRecordIcon sx={{ width: 44, height: 44 }} />
                <p style={{ color: 'white', zIndex: '100', position: 'absolute', left: 'calc(50% - 6px)', bottom: "calc(50% - 12px)", margin: 0 }}>

                </p>
            </div>
            <Menu
                anchorEl={anchorEl}
                id="menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                sx={{
                    [`& .${listClasses.root}`]: {
                        padding: '4px',
                    },
                    [`& .${paperClasses.root}`]: {
                        padding: 0,
                    },
                    [`& .${dividerClasses.root}`]: {
                        margin: '4px -4px',
                    },
                }}
            >
                <MenuItem id="profile" onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>Add another account</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
                <Divider />
                <MenuItem
                    onClick={(e) => { e.stopPropagation(); handleClose(e) }}
                    sx={{
                        [`& .${listItemIconClasses.root}`]: {
                            ml: 'auto',
                            minWidth: 0,
                        },
                    }}
                >
                    <ListItemText>Logout</ListItemText>
                    <ListItemIcon>
                        <LogoutRoundedIcon fontSize="small" />
                    </ListItemIcon>
                </MenuItem>
            </Menu>
        </div>
    );
}
