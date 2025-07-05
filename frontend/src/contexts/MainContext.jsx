import { createContext, useState, useEffect } from 'react';

import { BounceLoader } from "react-spinners";

const MainContext = createContext();

export const MainContextProvider = (props) => {

    const [contacts, setContacts] = useState([])
    const [events, setEvents] = useState([])
    const [userInfo, setUserInfo] = useState()
    const [loading, setLoading] = useState(true);
    const [sideOption, setOption] = useState('Home')
    const [calendarOption, setCalendarOption] = useState('month')
    const [eventOnCreation, setEventOnCreation] = useState(false)
    const [dayEvent, setDayEvent] = useState({})
    const [eventCreated, setEventCreated] = useState('initial')

    useEffect(() => {

        const getData = async () => {

            // First thing is to get the user info (id === 1 default) from db
            const getUserInfo = async () => {
                return await fetch('http://localhost:3000/contacts/1')
                    .then(res => res.json())
                    .then(res => {

                        // Turning JSON strings into JS arrays. SQLite doens´t allow to have arrays
                        let { commonContacts, nearFriends } = res.msg
                        res.msg.commonContacts = JSON.parse(commonContacts)
                        res.msg.nearFriends = JSON.parse(nearFriends)
                        return res.msg
                    })
                    .catch(err => 'Some error')
            }

            const userInfo = await getUserInfo()
            setUserInfo(userInfo)

            // Fetching one by one the user events
            let eventPromise = new Promise((resolve, reject) => {
                // fetch(`http://localhost:3000/events?userId=${userInfo.id}`)
                fetch(`http://localhost:3000/events?userId=1`)
                    .then(res => res.json())
                    .then(res => {
                        resolve(res.msg)
                    })
                    .catch(err => reject(err))
            })

            // Awaiting for all events to be loaded
            let events = await eventPromise.then(res => res).catch(err => err)

            events = events.map(event => { event.persons = JSON.parse(event.persons); return event })
            setEvents(events)
            setEventCreated(false)
        }

        if (eventCreated) getData()

    }, [eventCreated])

    useEffect(() => {

        function addContacts(userInfo, allConts) {

            let myContacts = []

            // I´m adding both common friends and near friends to the user contacts, but no one else :-)
            if (userInfo) {
                let allUserContacts = [...userInfo.commonContacts, ...userInfo.nearFriends]
                allUserContacts.forEach(contactId => {
                    allConts.forEach(generalContact => {
                        if (Number(generalContact.id) === Number(contactId)) myContacts.push(generalContact)
                    })
                })
            }

            return myContacts
        }

        function getUserContacts() {

            fetch('http://localhost:3000/contacts')
                .then(res => res.json())
                .then(res => {
                    let myContacts = addContacts(userInfo, res.contacts)
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
        events,
        eventOnCreation,
        setEventOnCreation,
        dayEvent,
        setDayEvent,
        userInfo,
        setEventCreated,
        setEvents
    };

    return (<MainContext.Provider value={contextValues}>
        {loading ? (
            <div style={{ position: 'absolute', left: '50%', top: '30%' }}
                className="d-flex justify-content-center my-5">
                <BounceLoader color={"#888"} size={100} />
            </div>
        ) : props.children}
    </MainContext.Provider>
    )
}

export default MainContext 
