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
    const { events, contacts, chosenMonth } = useContext(MainContext)

    useEffect(() => {

        if (events) setLoading(false)
        console.log(events)

    }, [events])

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
                    return (<li key={event.id} style={{
                        visibility: loading ? 'hidden' : 'visible'
                    }}>
                        {/* <span className="events-list-span">

                            {Number(editable) === event.id && (
                                <div style={{
                                    position: 'absolute', top: '0', left: '0', width: '100%',
                                    height: '100%', backgroundColor: 'rgba(255,255,255,0.8)'
                                }}>
                                    <VisibilityIcon onClick={(e) => { e.stopPropagation(); }} className="visit-contact-icon contact-list-icon" id={`visit-contact-icon-${event.id}`} />
                                    <DeleteIcon onClick={(e) => { e.stopPropagation(); }} className="delete-contact-icon contact-list-icon" />
                                    <ModeEditIcon onClick={(e) => { e.stopPropagation(); }} className="edit-contact-icon contact-list-icon" id={`edit-icon-${event.id}`} />
                                </div>)}
                        </span> */}
                        <span className="events-list-span title">{event.title}</span>
                        <span className="events-list-span">{event.date}</span>
                        {event.persons && event.persons.map(person => {
                            return contacts && contacts.map(contact => {
                                if (Number(person) === Number(contact.id)) {
                                    return (<span className="events-list-span" key={contact.id}>{contact.name}<img src={contact.thumbnail} /></span>)
                                }
                                else return null
                            })
                        })}
                    </li>)
                })}
            </ul>)}
        </>
    )
}