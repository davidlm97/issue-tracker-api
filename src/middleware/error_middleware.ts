// NOTE: Middleware in Express make use of the number of arguments to work 
// That means that unused variables in the middleware functions declarations 
// should be kept in order to make them work as expected. 

// TODO tipado y docs

// Middleware that manage asynchronous errors inside controllers. 
// Use it by wrapping the controller functions (pass them as parameters)
export const asyncMiddleware = (callback) => {
    return function (req, res, next) {
        callback(req, res, next).catch(next)
    }
}

// Middleware for managing 405 error. Must be put at the end of a router if no HTTP method has been matched.
export const methodNotAllowedErrorHandler = (req, res, next) => {
    return res.status(405).json({ errors: [{ code: 405, msg: 'Method not allowed for the resource specified' }] })
}

// Middleware for managing 404 error. Use it at the end of the routes specified in the app main router.
export const notFoundErrorHandler = (req, res, next) => {
    return res.status(404).json({ errors: [{ code: 404, msg: 'Resource not found' }] })
}

// Middleware where a request is sent if it has errored inside a controller.
export const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    console.error(new Date().toISOString() + err.stack)
    return res.status(500).json({ errors: [{ code: 500, msg: 'Internal server error' }] })
}