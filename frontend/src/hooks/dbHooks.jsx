

export const addEventToDb = async (atendees, place, eventDescription, date) => {

    let event = JSON.stringify({
        atendees,
        place,
        eventDescription,
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

    if (eventCreated.error) { console.log('Some error on the request') }
    else { console.log(eventCreated.msg) }

}