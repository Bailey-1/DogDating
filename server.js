const express = require('express');
const app = express();

const fs = require('fs');

app.use(express.json()); //expect json data from client. get data as object
app.use(express.static('public', { extensions: ['html'] }));

let profiles;

function getProfiles() {
	let fileData = fs.readFileSync('./profiles.json');
	return JSON.parse(fileData);
}
// Return a array of json objects that would potentially be a match to the account.
app.get('/api/get/discover', (req, res) => {
	let temp = getProfiles();
	res.send(temp);
});

app.get('/api/get/profiles/:username', (req, res) => {
	const username = req.params.username;

	console.log('Username: ', username);

	let temp = getProfiles();
	let filtered = [];
	for (let i = 0; i < temp.length; i++) {
		if (temp[i].owner == username) {
			filtered.push(temp[i]);
		}
	}
	res.send(filtered);
});

//Return specific profile from object.
app.get('/api/get/profile/:id', (req, res) => {
	const id = req.params.id;
	let temp = getProfiles();

	for (const i of temp) {
		if (i.id == id) {
			res.send(i);
			return;
		}
	}
	res.status(404).send('Invalid Profile Selection');
});

app.get('/api/account/edit/', (req, res) => {
	res.send();
});

app.listen(8080);
