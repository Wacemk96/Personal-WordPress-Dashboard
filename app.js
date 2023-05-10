const request = require('request');
const bodyParser = require('body-parser');
const express = require('express');
const https = require('https');
const client = require("@mailchimp/mailchimp_marketing");

const app = express();
const port = 3000;

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post('/', function (req, res) {

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;


    client.setConfig({
        apiKey: "367cc36dfa03227a7b25139fab206a64-us21",
        server: "https://us21.api.mailchimp.com/3.0/lists/ef122d41df",
    });

    const run = async () => {
        const response = await client.lists.batchListMembers("list_id", {
            members: [{
                email_address: email,
                status: subscribed,
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }],
        });
        console.log(response);
    };

    run();

    // const data = {
    //     members: [
    //         {
    //             email_address: email,
    //             status: subscribed,
    //             merge_fields: {
    //                 FNAME: firstName,
    //                 LNAME: lastName,
    //             }
    //         }
    //     ]
    // };
    // const jsonData = JSON.stringify(data);
    // const url = "https://us21.api.mailchimp.com/3.0/lists/ef122d41df";

    // const options = {
    //     method: "POST",
    //     auth: "waseemk:367cc36dfa03227a7b25139fab206a64-us21"
    // }

    // const request = https.request(url, options, function(response) {
    //     response.on("data", function(data){
    //         console.log(JSON.parse(data));
    //     })
    // })
    // request.write(jsonData);
    // request.end();
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});


// mailship api key
// 367cc36dfa03227a7b25139fab206a64-us21

// mailchimp unique ID
// ef122d41df