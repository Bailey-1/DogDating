const db = require('./database/database');

const express = require('express');
const app = express();
const multer = require('multer');

const uploader = multer({
	dest: 'upload',
	limits: {
		// for security
		fields: 10,
		fileSize: 5000 * 5000 * 20, // 20MB
		files: 1
	}
});

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

async function getDiscoveryById(req, res) {
	res.json(await db.getDiscoveryById(req.params.id));
}

/* Pass the query parameters to the server through a POST request
because it is easier / neater than using a very long URL and Route. */
async function getDistinctProfileProperties(req, res) {
	res.json(await db.getDistinctFilterProperties(req.params.id));
}

async function getDiscoveryByFilter(req, res) {
	//console.log('Body: ', req.body);
	res.json(await db.getDiscoveryByFilters(req.body));
}

async function postUpdateProfileByUUID(req, res) {
	res.json(await db.updateProfileByUUID(req.body));
}

async function uploadImage(req, res) {
	console.log(req.body.id);
	console.log(req.file);

	res.json(await db.uploadImageToDatabase(req.body.id, req.file));
}

// wrap async function for express.js error handling
function asyncWrap(f) {
	return (req, res, next) => {
		Promise.resolve(f(req, res, next)).catch(e => next(e || new Error()));
	};
}

app.get('/api/names', asyncWrap(getNames));
app.get('/api/database/get/profilesByAccountId/:id', asyncWrap(getProfilesByAccountId));

app.get('/api/database/get/profileById/:id', asyncWrap(getProfileById));
app.get('/api/database/get/discoveryById/:id', asyncWrap(getDiscoveryById));
app.get('/api/database/get/distinctFilterProperties/:id', asyncWrap(getDistinctProfileProperties));

app.post('/api/database/post/discoveryByFilter', express.json(), asyncWrap(getDiscoveryByFilter));

app.post(
	'/api/database/post/updateProfileByUUID',
	express.json(),
	asyncWrap(postUpdateProfileByUUID)
);

app.post(
	'/api/database/post/image',
	uploader.single('photo'),
	express.json(),
	asyncWrap(uploadImage)
);

app.listen(8080);
