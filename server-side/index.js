const express = require("express");
const cors = require("cors")
const axios = require("axios");


//initializing express app
const app = express();


//middlewares
app.use(cors())
app.use(express.json());


//route
app.get("/", (req, res) => {
    axios.get('https://fakerapi.it/api/v1/persons?_quantity=100000')
  .then(item => {
    console.log(`statusCode: ${item.status}`);
    console.log(item.data);
    res.statusCode = 200
    res.send(item.data)
  })
  .catch(error => {
    console.error(error);
  });
    
});


//PORT
const PORT = 5000;

app.listen(PORT, () => {
   console.log(`Server is running on PORT: ${PORT}`);
});


