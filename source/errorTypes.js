class AppError extends Error {
    constructor(message) {
        super(message)
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }
}

class ColorNotFoundError extends AppError {
    constructor(color) {
        super(`Color "${color}" was not found.`)
        this.context = { color }
    }
}

module.exports = {
    ColorNotFoundError,
}
