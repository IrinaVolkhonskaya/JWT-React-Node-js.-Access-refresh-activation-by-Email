const ApiError = require('../exeptions/api-error');

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors })//здесь данные об ошибке пойдут на клиента
    }

    return res.status(500).json({ message: "Непредвиденная ошибка " })
};