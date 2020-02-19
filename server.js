const db = require('./database/database');

const express = require('express');
const app = express();

const fs = require('fs');

app.use(express.json()); //expect json data from client. get data as object

// Prevent .html showing in the url and change the default page to be 'profile-selection.html' instead of 'index.html'
app.use(
	express.static('public', {
		index: 'profile-selection.html',
		extensions: ['html']
	})
);

//TODO REMOVE
async function getNames(req, res) {
	console.log('Get names');
	res.json(await db.listProfiles());
}

async function getProfilesByAccountId(req, res) {
	res.json(await db.getProfilesByAccountId(req.params.id));
}

async function getProfileById(req, res) {
	res.json(await db.getProfileById(req.params.id));
}

// wrap async function for express.js error handling
function asyncWrap(f) {
	return (req, res, next) => {
		Promise.resolve(f(req, res, next)).catch(e => next(e || new Error()));
	};
}

app.get('/api/names', asyncWrap(getNames));
app.get(
	'/api/database/get/profilesByAccountId/:id',
	asyncWrap(getProfilesByAccountId)
);

app.get('/api/database/get/profileById/:id', asyncWrap(getProfileById));

app.listen(8080);
