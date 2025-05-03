import { useState, useEffect, useContext } from "react";
// import { useNavigate } from 'react-router-dom'

import { BounceLoader } from "react-spinners";
import MainContext from "../contexts/MainContext";

import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';


export default function EventsList() {

    const [editable, setEditable] = useState('')
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
                <li className="th">
                    {chosenMonth + ' Events'}
                </li>
                {events.map((event, i) => {
                    if (actualMonth === new Date(event.date).getMonth()) {
                        return (<li>
                            {mobile && (
                                <ul className="events-list-info-list">
                                    <li className="events-list-span"><em>Activity</em>:</li>
                                    <li className="events-list-span"><em>Date</em>:</li>
                                    <li className="events-list-span"><em>Invited</em></li>
                                </ul>
                            )}
                            <ul className="events-list-info-list" key={event.id} style={{
                                visibility: loading ? 'hidden' : 'visible'
                            }}>
                                <li className="events-list-span title">{event.title}</li>
                                <li className="events-list-span">{event.date}</li>
                                {event.persons && event.persons.map(person => {
                                    return contacts && contacts.map(contact => {
                                        if (Number(person) === Number(contact.id)) {
                                            return (<li className="events-list-span" key={contact.id}>{contact.name}<img src={contact.thumbnail} /></li>)
                                        }
                                        else return null
                                    })
                                })}
                            </ul></li>)
                    }
                })}
                {events.filter(event => actualMonth === new Date(event.date).getMonth()).length === 0 ? <li><span><em>There are no events this month</em></span></li> : null}
            </ul>)}
        </>
    )
}