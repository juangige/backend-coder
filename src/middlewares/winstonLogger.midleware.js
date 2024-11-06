import winstonsLogger from "../utils/winston.util.js";

function winston(req, res, next) {
    try{
        req.logger = winstonsLogger // agrego al objeto de requerimientos la configuracion de los registros
        const message = `${req.method} ${req.url}`
        req.logger.http(message)
        return next()
    } catch(error) {
        return next (error)
    }
    next
}

export default winston