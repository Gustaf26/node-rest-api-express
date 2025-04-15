import { createContext, useState, useEffect } from 'react';

import { BounceLoader } from "react-spinners";

const MainContext = createContext();

export const MainContextProvider = (props) => {

    const [contacts, setContacts] = useState([])
    const [userInfo, setUserInfo] = useState()
    const [loading, setLoading] = useState(true);
    const [sideOption, setOption] = useState('Home')
    const [calendarOption, setCalendarOption] = useState('month')

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
                    setUserInfo(res.msg)
                })
                .catch(err => console.log(err))
        }

        getMyInfo()

    }, [])

    useEffect(() => {

        async function getUserContacts() {

            console.log(userInfo)
            let myContacts = []

            fetch('http://127.0.0.1:3000/')
                .then(res => res.json())
                .then(res => {
                    userInfo && userInfo.commonContacts.forEach(contactId => {
                        res.contacts.forEach(generalContact => {
                            console.log(generalContact)
                            if (Number(generalContact.id) === Number(contactId)) myContacts.push(generalContact)
                        })
                    })
                    userInfo && userInfo.nearFriends.forEach(contactId => {
                        res.contacts.forEach(generalContact => {
                            console.log(generalContact)
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
        calendarOption
    };

    return (<MainContext.Provider value={contextValues}>
        {loading && (
            <div className="d-flex justify-content-center my-5">
                <BounceLoader color={"#888"} size={100} />
            </div>
        )}
        {!loading && props.children}
    </MainContext.Provider>
    )
}

export default MainContext 
