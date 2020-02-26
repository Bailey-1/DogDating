const db = require('./database/database');

const express = require('express');
const app = express();
const multer = require('multer');

const uploader = multer({
	dest: 'upload',
	limits: {
		// for security
		fields: 10,
		fileSize: 5000 * 5000 * 20, // 20MB and 5000px by 5000px
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

async function getProfilesByAccountId(req, res) {
	res.json(await db.getProfilesByAccountId(req.params.id));
}

async function getProfileById(req, res) {
	res.json(await db.getProfileById(req.params.id));
}

async function getAccountById(req, res) {
	res.json(await db.getAccountById(req.params.id));
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
	res.json(await db.uploadImageToDatabase(req.body.id, req.file));
}

async function getImagesFromId(req, res) {
	res.json(await db.getImagesFromId(req.params.id));
}

async function getMessages(req, res) {
	res.json(await db.getMessages(req.body));
}

async function getMessage(req, res) {
	res.json(await db.getMessage(req.params.id));
}

async function sendMessage(req, res) {
	res.json(await db.sendMessage(req.body));
}

async function setProfilePic(req, res) {
	res.json(await db.setProfilePic(req.body));
}

async function getProfilePicById(req, res) {
	res.json(await db.getProfilePic(req.params.id));
}

async function createProfile(req, res) {
	res.json(await db.createProfile(req.body));
}

// wrap async function for express.js error handling
function asyncWrap(f) {
	return (req, res, next) => {
		Promise.resolve(f(req, res, next)).catch(e => next(e || new Error()));
	};
}

app.get('/api/database/get/profilesByAccountId/:id', asyncWrap(getProfilesByAccountId));
app.get('/api/database/get/accountById/:id', asyncWrap(getAccountById));

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

app.get('/api/database/get/imagesFromId/:id', asyncWrap(getImagesFromId));

app.post('/api/database/post/getMessages', express.json(), asyncWrap(getMessages));
app.get('/api/database/get/getMessage/:id', asyncWrap(getMessage));
app.post('/api/database/post/sendMessage', express.json(), asyncWrap(sendMessage));

app.post('/api/database/post/setProfilePic', express.json(), asyncWrap(setProfilePic));

app.get('/api/database/get/getProfilePic/:id', asyncWrap(getProfilePicById));

app.post('/api/database/post/createProfile', express.json(), asyncWrap(createProfile));

app.listen(8080);
