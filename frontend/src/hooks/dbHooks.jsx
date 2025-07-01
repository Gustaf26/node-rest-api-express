

export const addEventToDb = async (atendees, place, description, date, userId) => {


    atendees.push(userId)

    let event = JSON.stringify({
        atendees: atendees,
        place,
        description,
        date
    })

    let eventCreated = await fetch(`http://localhost:3000/events`, {
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