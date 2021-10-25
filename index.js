const express = require('express')

// Create application instance
const app = express()


// routes
app.use("/api", require('./src/routes/index.routes'));


const port = process.env.PORT || 3500;
app.listen(
  port,
  () => console.log(
    `http://localhost:${port}\n 
    ------------------------`
  )
);