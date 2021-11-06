const allowedOrigins = require('./whitelist');

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
}
module.exports = corsOptions;