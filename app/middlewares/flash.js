module.exports = function (resquest, response, next) {

    if (resquest.session.flash) {
        response.locals.flash = resquest.session.flash
        resquest.session.flash = undefined
    }

    resquest.flash = function (type, content) {
        if (resquest.session.flash === undefined) {
            resquest.session.flash = {}
        }

        resquest.session.flash[type] = content
    }

    next()
}