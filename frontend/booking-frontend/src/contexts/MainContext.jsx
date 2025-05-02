import { createContext, useState, useEffect } from 'react';

import { BounceLoader } from "react-spinners";

const MainContext = createContext();

const thisMonth = new Date().getMonth()

const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const MainContextProvider = (props) => {

    const [contacts, setContacts] = useState([])
    const [events, setEvents] = useState([])
    const [userInfo, setUserInfo] = useState()
    const [loading, setLoading] = useState(true);
    const [sideOption, setOption] = useState('Home')
    const [calendarOption, setCalendarOption] = useState('month')
    const [actualMonth, setActualMonth] = useState(thisMonth)
    const [chosenMonth, setChosenMonth] = useState(allMonths[actualMonth])
    const [eventOnCreation, setEventOnCreation] = useState(false)


    useEffect(() => {
        setChosenMonth(allMonths[actualMonth])
    }, [actualMonth])

    useEffect(() => {

        async function getMyInfo() {

            fetch('http://127.0.0.1:3000/1')
                .then(res => res.json())
                .then(res => {
                    let commonContacts = JSON.parse(res.msg.commonContacts);
                    let friends = JSON.parse(res.msg.nearFriends)
                    let myEvents = JSON.parse(res.msg.events)
                    res.msg.commonContacts = commonContacts
                    res.msg.nearFriends = friends
                    res.msg.events = myEvents
                    let preliminaryUserinfo = res.msg
                    setUserInfo(res.msg)


                    res.msg.events.forEach(async (event) => {
                        return fetch(`http://127.0.0.1:3000/events/${event}`)
                            .then(res => res.json())
                            .then(res => {
                                res.msg.persons = JSON.parse(res.msg.persons);
                                res.msg.persons.forEach(personId => {
                                    if (preliminaryUserinfo.nearFriends.includes(personId)) { res.msg.contactType = 'friend' }
                                    else { res.msg.contactType = 'contact' }
                                })
                                setEvents(prev => [...prev, res.msg])
                            })
                            .catch(err => console.log(err))
                    })
                })
                .catch(err => console.log(err))
        }

        getMyInfo()

    }, [])

    useEffect(() => {

        async function getUserContacts() {

            let myContacts = []

            fetch('http://127.0.0.1:3000/')
                .then(res => res.json())
                .then(res => {
                    userInfo && userInfo.commonContacts.forEach(contactId => {
                        res.contacts.forEach(generalContact => {

                            if (Number(generalContact.id) === Number(contactId)) myContacts.push(generalContact)
                        })
                    })
                    userInfo && userInfo.nearFriends.forEach(contactId => {
                        res.contacts.forEach(generalContact => {

                            if (Number(generalContact.id) === Number(contactId)) myContacts.push(generalContact)
                        })
                    })
                    setContacts(myContacts); setLoading(false)
                })
                .catch(err => console.log(err))
        }

        getUserContacts()

    }, [userInfo])

    const contextValues = {
        contacts,
        sideOption,
        setOption,
        calendarOption,
        setCalendarOption,
        chosenMonth,
        setChosenMonth,
        setActualMonth,
        actualMonth,
        events,
        eventOnCreation,
        setEventOnCreation
    };

    return (<MainContext.Provider value={contextValues}>
        {loading ? (
            <div className="d-flex justify-content-center my-5">
                <BounceLoader color={"#888"} size={100} />
            </div>
        ) : props.children}
    </MainContext.Provider>
    )
}

export default MainContext 
