import { createContext, useState, useEffect } from 'react';

import { BounceLoader } from "react-spinners";

// import { useDateInfo } from '../pages/Home/hooks/useDateInfo';

const MainContext = createContext();

// const thisMonth = new Date().getMonth()

// const allMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const MainContextProvider = (props) => {

    const [contacts, setContacts] = useState([])
    const [events, setEvents] = useState([])
    const [userInfo, setUserInfo] = useState()
    const [loading, setLoading] = useState(true);
    const [sideOption, setOption] = useState('Home')
    const [calendarOption, setCalendarOption] = useState('month')
    const [eventOnCreation, setEventOnCreation] = useState(false)


    // useEffect(() => {

    //     if (chosenDate) {

    //         let firstDash = chosenDate.indexOf('-') + 1 === '0' ? chosenDate.indexOf('-') + 2 :
    //             chosenDate.indexOf('-') + 1;

    //         let secondDash = chosenDate.lastIndexOf('-')

    //         let dateMonth = Number(chosenDate.slice(firstDash, secondDash)) - 1
    //         let dateDay = Number(chosenDate.slice(secondDash + 1, chosenDate.length))

    //         setChosenDay(dateDay)
    //         setActualMonth(dateMonth)
    //     }
    // }, [chosenDate])

    useEffect(() => {

        const getData = async () => {

            // First thing is to get the user info from db
            const getUserInfo = async () => {
                return await fetch('http://127.0.0.1:3000/1')
                    .then(res => res.json())
                    .then(res => {

                        // Turning JSON strings into JS arrays. SQLite doens´t allow to have arrays
                        let { commonContacts, nearFriends, events } = res.msg
                        res.msg.commonContacts = JSON.parse(commonContacts)
                        res.msg.nearFriends = JSON.parse(nearFriends)
                        res.msg.events = JSON.parse(events)
                        return res.msg
                    })
                    .catch(err => 'Some error')
            }

            const userInfo = await getUserInfo()
            setUserInfo(userInfo)

            // Fetching one by one the user events
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

            // Awaiting for all events to be loaded
            let events = await Promise.all(eventPromises)
            setEvents(events)
        }

        getData()

    }, [])

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

            fetch('http://127.0.0.1:3000/')
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
        // chosenMonth,
        // setChosenMonth,
        // setActualMonth,
        // actualMonth,
        events,
        eventOnCreation,
        setEventOnCreation,
        // chosenDate,
        // chosenDay,
        // setChosenDate,
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
