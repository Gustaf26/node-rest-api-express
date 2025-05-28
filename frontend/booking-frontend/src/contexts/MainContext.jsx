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
    const [chosenDate, setChosenDate] = useState('')
    const [chosenDay, setChosenDay] = useState('')
    const [eventOnCreation, setEventOnCreation] = useState(false)


    useEffect(() => {
        setChosenMonth(allMonths[actualMonth])
    }, [actualMonth])

    useEffect(() => {
        if (chosenDate) {
            setChosenDay(Number(chosenDate.slice(chosenDate.lastIndexOf('-'), chosenDate.length)))

            let month = chosenDate.indexOf('-') + 1 === '0' ?
                chosenDate.slice(chosenDate.indexOf('-') + 2, chosenDate.lastIndexOf('-')) :
                chosenDate.slice(chosenDate.indexOf('-') + 1, chosenDate.lastIndexOf('-'))
            setActualMonth(Number(month - 1))
        }
    }, [chosenDate])

    useEffect(() => {

        const getData = async () => {

            const getUserInfo = async () => {
                return await fetch('http://127.0.0.1:3000/1')
                    .then(res => res.json())
                    .then(res => {
                        let commonContacts = JSON.parse(res.msg.commonContacts);
                        let friends = JSON.parse(res.msg.nearFriends)
                        let myEvents = JSON.parse(res.msg.events)
                        res.msg.commonContacts = commonContacts
                        res.msg.nearFriends = friends
                        res.msg.events = myEvents
                        return res.msg
                    })
                    .catch(err => 'Some error')
            }

            const userInfo = await getUserInfo()
            setUserInfo(userInfo)

            let eventPromises = userInfo.events.map(event => {
                return new Promise((resolve, reject) => {
                    fetch(`http://127.0.0.1:3000/events/${event}`)
                        .then(res => res.json())
                        .then(res => {
                            res.msg.persons = JSON.parse(res.msg.persons);
                            resolve(res.msg)
                        })
                        .catch(err => reject(err))
                })
            })

            let events = await Promise.all(eventPromises)
            setEvents(events)
        }

        getData()

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
        setEventOnCreation,
        chosenDate,
        chosenDay,
        setChosenDate
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
