const express = require(`express`)
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));
app.get('/favicon.ico', (req, res) => res.status(204));

app.get(`/`, (req, res) => {
    res.sendfile(`index.html`);
  });
  
//Start up the server on port 3000.
var port = process.env.PORT || 80
app.listen(port, ()=>{
    console.log("Server Running at Localhost:80")
})