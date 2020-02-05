const express = require('express');
const app = express();

const fs = require('fs');

app.use(express.json()); //expect json data from client. get data as object

app.use(express.static('public'));

//Get data from files

let profiles = fs.readFileSync('profiles.json');

// Return a array of json objects that would potentially be a match to the account.
app.get('/api/discover', (req, res) => {
	res.send(profiles);
});

//Return specific profile from object.
app.get('/api/profile/:id', (req, res) => {
	res.send();
});

app.get('/api/account/edit/', (req, res) => {
	res.send();
});

app.listen(8080);
