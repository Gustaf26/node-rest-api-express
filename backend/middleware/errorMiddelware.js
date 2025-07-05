
const errorHandler = (err, req, res, next) => {

    let msg = err.message
    if (err) res.status(403).send({ msg })
}

export default errorHandler