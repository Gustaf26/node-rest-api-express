

export const logger = (req, res, next) => {


    let { userId } = req.query

    if (!userId) {
        let error = new Error('No user id provided')
        next(error)
    }
    next()
}