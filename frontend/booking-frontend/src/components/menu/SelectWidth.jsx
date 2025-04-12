import { useState, useEffect } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';


export default function SelectWidth({ widthProps }) {


    const handleChange = (event) => {

        if (widthProps.open) widthProps.setFullScreen(true)
        else widthProps.setFullScreen(false)
        widthProps.setOpen(prev => { return !prev })

    };


    return (
        <div>
            {!widthProps.open ? <MenuIcon onClick={(e) => handleChange(e)} /> : <CloseIcon onClick={(e) => handleChange(e)} />}
        </div>
    );
}