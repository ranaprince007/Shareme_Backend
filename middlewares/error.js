class ErrorHandler extends Error {
    constructor(code, message) {
        this.statusCode = code
        this.message = message
    }
}

module.exports = ErrorHandler

export const error = (msg, code)