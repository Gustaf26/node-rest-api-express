


export const updateEventInDb = async (atendees, place, description, date, eventId, userId) => {

    atendees.push(userId)

    let event = JSON.stringify({
        persons: `[${atendees}]`,
        place,
        description,
        date
    })

    let eventCreated = await fetch(`http://localhost:3000/events/${eventId}?userId=${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: event
    })
        .then(res => res.json())
        .then(res => res)
        .catch(err => err)

    if (eventCreated.error) { console.log(eventCreated.error) }
    else { return eventCreated }

}

export const addEventToDb = async (atendees, place, description, date, userId) => {


    atendees.push(userId)

    let event = JSON.stringify({
        persons: `[${atendees}]`,
        place,
        description,
        date
    })

    let eventCreated = await fetch(`http://localhost:3000/events?userId=${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: event
    })
        .then(res => res.json())
        .then(res => res)
        .catch(err => err)

    if (eventCreated.error) { console.log(eventCreated.error) }
    else { return eventCreated }

}

export const deleteEventFromDb = async (event, userId) => {

    let eventCreated = await fetch(`http://localhost:3000/events/${event.id}?userId=${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => res)
        .catch(err => err)

    return eventCreated

}