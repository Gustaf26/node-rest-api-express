import { useState, useEffect, useContext } from "react";

import { BounceLoader } from "react-spinners";
import MainContext from "../../../contexts/MainContext";

// import DeleteIcon from '@mui/icons-material/Delete';
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
// import VisibilityIcon from '@mui/icons-material/Visibility';


export default function MonthGoals() {

    const [loading, setLoading] = useState(true)
    const { contacts, chosenMonth, actualMonth, events } = useContext(MainContext)
    const [mobile, setMobile] = useState(false)

    useEffect(() => {

        if (events) setLoading(false)

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
            )}<h4>Goals for the month</h4>
            {!loading && (<ul id="events-table">
                <li><span>Learn new recipies</span></li>
                <li><span>Go to Turning Torso</span></li>
                <li><span>Read 4 pocket books</span></li>
                <li><span>Record my jazz song</span></li>
            </ul>)}
        </>
    )
}