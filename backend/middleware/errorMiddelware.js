
const errorHandler = (err, req, res, next) => {

    let msg = err.message
    if (err) res.status(400).send({ msg })
}

export default errorHandler