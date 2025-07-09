
const errorHandler = (err, req, res, next) => {

    let msg = err.message
    console.log(err)
    if (err) res.status(err.status).send({ msg })
}

export default errorHandler