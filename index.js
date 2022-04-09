const express = require('express')
const cors = require("cors");
const app = express()
app.use(cors());
app.use(express.json());

app.get('/parkings', (req,res) => {
    res.send("Liste des parkings")
})



/* Routes */
app.use('/birds', require('./routes/birds'));

var server = app.listen(8080, () => {
	console.log("App listening at http://%s",  server.address().port);
})
