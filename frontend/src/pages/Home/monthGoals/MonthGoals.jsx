import { useState, useEffect, useContext } from "react";

import { BounceLoader } from "react-spinners";
import MainContext from "../../../contexts/MainContext";

// import DeleteIcon from '@mui/icons-material/Delete';
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
// import VisibilityIcon from '@mui/icons-material/Visibility';


export default function MonthGoals() {

    const [loading, setLoading] = useState(true)
    const { contacts, chosenMonth, actualMonth } = useContext(MainContext)
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
            )}
            {!loading && (<ul id="events-table">
                <li><h3>Goals for the month</h3></li>
            </ul>)}
        </>
    )
}