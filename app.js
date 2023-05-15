const request = require('request');
const bodyParser = require('body-parser');
const express = require('express');
const https = require('https');
const { url } = require('inspector');
require('dotenv').config();
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post('/', async function (req, res) {

    const username = req.body.username;
    const password = req.body.password;
    const title = req.body.title;
    const content = req.body.content;
    // Username: Admin
    // Password: DSLw Fxme AjiP 5j9b 9xr9 V6lv
    const auth = { username: username, password: password};


    axios.post('http://localhost/wordpress/wp-json/wp/v2/posts',
        {
            title: title,
            content: content,
            status: 'publish'
        },
        { auth }
    )
        .then(response => {
            console.log(response.data);
            res.send(response.data.guid.rendered)
        })
        .catch(error => {
            console.error(error);
            res.send(error)
        });


})

app.post("/failure", function (req, res) {
    res.redirect("/")
})


app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});
