const express = require('express')
const cors = require("cors");
const app = express()
app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.send("ok")
})

/* Routes */
app.use('/users', require('./routes/users'));

var server = app.listen(process.env.PORT || 5000, () => {
	console.log("App listening at http://localhost:",  server.address().port);
})