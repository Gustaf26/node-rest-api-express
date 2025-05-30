import { useState, useEffect, useContext } from "react";
// import { useNavigate } from 'react-router-dom'

import { BounceLoader } from "react-spinners";
import MainContext from "../../../contexts/MainContext";

// import DeleteIcon from '@mui/icons-material/Delete';
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
// import VisibilityIcon from '@mui/icons-material/Visibility';


export default function EventsList() {

    // const [editable, setEditable] = useState('')
    const [loading, setLoading] = useState(true)
    const { events, contacts, chosenMonth, actualMonth } = useContext(MainContext)
    const [mobile, setMobile] = useState(false)

    useEffect(() => {

        if (events) setLoading(false)
        console.log(events)

    }, [events])

    useEffect(() => {
        window.innerWidth < 1200 && setMobile(true)
    })

    return (
        <>
            {loading && (
                <div style={{ marginTop: '10%' }} className="d-flex justify-content-center align-items-center">
                    <BounceLoader color={"#888"} size={100} />
                </div>
            )}
            {!loading && (<ul id="events-table">
                <li><h3>Goals for the day</h3></li>
            </ul>)}
        </>
    )
}