import { useState, useEffect, useContext } from "react";
// import { useNavigate } from 'react-router-dom'

import { BounceLoader } from "react-spinners";
import MainContext from "../../contexts/MainContext";

import { TableHead, TableRow, Table, TableCell } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VisibilityIcon from '@mui/icons-material/Visibility';



export default function ContactList() {

    const [editable, setEditable] = useState('')
    const [loading, setLoading] = useState(true)
    const { contacts } = useContext(MainContext)

    useEffect(() => {

        if (contacts) setLoading(false)

    }, [contacts])

    return (
        <>
            {loading && (
                <div style={{ marginTop: '10%' }} className="d-flex justify-content-center align-items-center">
                    <BounceLoader color={"#888"} size={100} />
                </div>
            )}
            {!loading && (<ul id="contacts-table">
                <li className="th">
                    <span className="td"><b></b></span>
                    <span className="td"><b>Name</b></span>
                    <span className="td"><b>Email</b></span>
                    <span className="td"><b>Phone</b></span>
                </li>
                {contacts.map((contact, i) => {
                    return (<li className="tr" key={contact.id} style={{
                        visibility: loading ? 'hidden' : 'visible'
                    }}>
                        <span className="td">
                            <img alt={contact.name} src={contact.thumbnail} />
                            {Number(editable) === contact.id && (
                                <div style={{
                                    position: 'absolute', top: '0', left: '0', width: '100%',
                                    height: '100%', backgroundColor: 'rgba(255,255,255,0.8)'
                                }}>
                                    <VisibilityIcon onClick={(e) => { e.stopPropagation(); }} className="visit-contact-icon contact-list-icon" id={`visit-contact-icon-${contact.id}`} />
                                    <DeleteIcon onClick={(e) => { e.stopPropagation(); }} className="delete-contact-icon contact-list-icon" />
                                    <ModeEditIcon onClick={(e) => { e.stopPropagation(); }} className="edit-contact-icon contact-list-icon" id={`edit-icon-${contact.id}`} />
                                </div>)}
                        </span>
                        <span className="td">{contact.name}</span>
                        <span className="td">{contact.email}</span>
                        <span className="td">{contact.phone}</span>
                    </li>)
                })}
            </ul>)}
        </>
    )
}