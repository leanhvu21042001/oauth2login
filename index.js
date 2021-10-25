const express = require('express')
const cors = require('cors')
const corsOptions = require('./src/config/corsOptions');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


// Create application instance
const app = express()

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// set up for cookies middleware
app.use(cookieParser());

// routes
app.use("/api", require('./src/routes/index.routes'));

// handler errors
app.all('*', (req, res) => {
  return res.status(404).json({ mgs: "Error 404", success: false });
})
app.use(errorHandler);

const port = process.env.PORT || 3500;
app.listen(
  port,
  () => console.log(
    `http://localhost:${port}\n 
    ------------------------`
  )
);