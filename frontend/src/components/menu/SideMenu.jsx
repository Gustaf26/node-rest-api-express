import { useState, useEffect } from 'react'

import SelectWidth from './SelectWidth.jsx';
import MenuContent from './MenuContent.jsx'
import OptionsMenu from './OptionsMenu.jsx';

import { styled } from '@mui/material/styles';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function SideMenu() {

    const [fullScreen, setFullWidth] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {

        if (open) setFullWidth(false)
        else setFullWidth(true)

    }, [open])

    const Drawer = styled(MuiDrawer)({
        width: fullScreen ? 70 : 240,
        maxWidth: fullScreen ? 70 : 240,
        flexShrink: 1,
        boxSizing: 'border-box',
        mt: 10,
        [`& .${drawerClasses.paper}`]: {
            width: fullScreen ? 70 : 240,
            boxSizing: 'border-box',
            overflowX: 'hidden'
        },

    });


    return (
        <Drawer id="side-nav" variant="permanent"
            sx={{
                display: { xs: 'block', md: 'block' },
                [`& .${drawerClasses.paper}`]: {
                    backgroundColor: 'background.paper',
                },
                // maxWidth: mobile ? 40 : 240,
                overflowX: 'hidden',
            }}>
            <Box
                sx={{
                    display: 'flex',
                    mt: 'calc(var(--template-frame-height, 0px) + 4px)',
                    p: 1.5,
                    ml: '10px'
                }}
            >
                <SelectWidth widthProps={{ open, setOpen }} />
            </Box>
            <Divider />
            <MenuContent />
            <Stack
                direction="row"
                sx={{
                    p: 2,
                    gap: 1,
                    alignItems: 'center',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >

                <OptionsMenu />
                <Box sx={{ mr: 'auto', display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body" sx={{ fontSize: '0.9em', fontWeight: 500, lineHeight: '16px' }}>
                        { }
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: '0.9em', color: 'text.secondary' }}>
                        { }
                    </Typography>
                </Box>
            </Stack>
        </Drawer >)
}
