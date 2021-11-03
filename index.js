const express = require('express')
const cors = require('cors')
const corsOptions = require('./src/config/corsOptions');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const rateLimit = require("express-rate-limit");
const helmet = require('helmet');

// Create application instance
const app = express()

// setup helmet to protected by xss, clickjacking, ...
app.use(helmet())

// setup limiter required by user.
// over 100 request then server should res to client status [429 TOO MANY REQUESTS]
const limiter = rateLimit({
  // 15 minutes
  windowMs: 15 * 60 * 1000,
  // limit each IP to 100 requests per windowMs
  max: 100
});

// just run when deploy. [Maybe some test case over 100 requests]
if (process.env.NODE_ENV === 'production') {
  app.use(limiter);
}

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// set up for cookies middleware
app.use(cookieParser());

// server setup default public static files.
app.use('/uploads/users', express.static('./src/uploads/users'));

// set up for file upload middleware
app.use(fileUpload());

// default route.
app.get('/api/v1/', (req, res) => {
  return res.send("Web API \n Final CDPTW1");
});

// routes
app.use("/api", require('./src/routes/index.routes'));

// handler errors
app.all('*', (req, res) => {
  return res.status(404).json({ message: "Error 404", success: false });
})
app.use(require("./src/middlewares/errorHandler"));

const PORT = process.env.PORT || 3500;
app.listen(
  PORT,
  () => console.log(
    `http://localhost:${PORT}\n 
    ------------------------`
  )
);