const express = require('express');
const app = express();

const fs = require('fs');

app.use(express.json()); //expect json data from client. get data as object
app.use(express.static('public'));

let profiles;

function getProfiles() {
	let fileData = fs.readFileSync('./profiles.json');
	return JSON.parse(fileData);
}
// Return a array of json objects that would potentially be a match to the account.
app.get('/api/get/discover', (req, res) => {
	let temp = getProfiles();
	console.log(temp);
	res.send(temp);
});

//Return specific profile from object.
app.get('/api/get/profile/:id', (req, res) => {
	const id = req.params.id;
	let temp = getProfiles();
	console.log(temp);

	for (const i of temp) {
		if (i.id == id) {
			res.send(i);
			return;
		}
	}

	res.send();
});

app.get('/api/account/edit/', (req, res) => {
	res.send();
});

app.listen(8080);
