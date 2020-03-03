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
	const response = await db.getProfilesByAccountId(req.params.id);
	console.log('Response', response);
	//res.json(response);
	res.status(200).json(response);
}

async function getProfileById(req, res) {
	const response = await db.getProfileById(req.params.id);
	console.log('Response', response);

	res.status(200).json(response);
}

async function getAccountById(req, res) {
	res.status(200).json(await db.getAccountById(req.params.id));
}

/* Pass the query parameters to the server through a POST request
because it is easier / neater than using a very long URL and Route. */
async function getDistinctProfileProperties(req, res) {
	res.status(200).json(await db.getDistinctFilterProperties(req.params.id));
}

async function getDiscoveryByFilter(req, res) {
	console.table(req.query);

	res.status(200).json(await db.getDiscoveryByFilters(req.params.id, req.query));
}

async function postUpdateProfileByUUID(req, res) {
	res.status(200).json(await db.updateProfileByUUID(req.body));
}

async function uploadImage(req, res) {
	res.status(200).json(await db.uploadImageToDatabase(req.params.id, req.body.desc, req.file));
}

async function getImagesFromId(req, res) {
	res.status(200).json(await db.getImagesFromId(req.params.id));
}

async function getMessages(req, res) {
	res.status(200).json(await db.getMessages(req.params.id, req.params.rec_id));
}

async function getMessage(req, res) {
	res.status(200).json(await db.getMessage(req.params.id, req.params.rec_id, req.params.msg_id));
}

// Send a message from profile ID to recipient profile rec_id
async function sendMessage(req, res) {
	res.status(200).json(await db.sendMessage(req.params.id, req.params.rec_id, req.body.content));
}

async function setProfilePic(req, res) {
	res.status(200).json(await db.setProfilePic(req.params.id, req.params.img_id));
}

async function getProfilePicById(req, res) {
	res.status(200).json(await db.getProfilePic(req.params.id));
}

async function createProfile(req, res) {
	const response = await db.createProfile(req.body);
	res.status(200).json(response);
}

async function deleteProfile(req, res) {
	res.status(200).json(await db.deleteProfile(req.params.id));
}

// wrap async function for express.js error handling
function asyncWrap(f) {
	return (req, res, next) => {
		Promise.resolve(f(req, res, next)).catch(e => next(e || new Error()));
	};
}

// Get accounts profiles
app.get('/api/account/:id/profiles', asyncWrap(getProfilesByAccountId));

// Get infomation on account
app.get('/api/account/:id', asyncWrap(getAccountById));

app.get('/api/profile/:id/discovery/filters', asyncWrap(getDistinctProfileProperties));

app.get('/api/profile/:id/discovery', express.json(), asyncWrap(getDiscoveryByFilter));

// Get specific message
app.get('/api/profile/:id/recipient/:rec_id/message/:msg_id', asyncWrap(getMessage));

// Set profile picture to img_id
app.put('/api/profile/:id/image/:img_id', express.json(), asyncWrap(setProfilePic));

app.get('/api/profile/:id/profilepic', asyncWrap(getProfilePicById));

app.post('/api/profile', express.json(), asyncWrap(createProfile)); // Create profile
// Handle different types of requests to the same route.
app
	.route('/api/profile/:id')
	.get(asyncWrap(getProfileById)) // Get profile infomation
	.put(express.json(), asyncWrap(postUpdateProfileByUUID)) // Update profile infomation
	.delete(asyncWrap(deleteProfile));

app
	.route('/api/profile/:id/images')
	.get(asyncWrap(getImagesFromId)) // Get images from profile
	.post(uploader.single('photo'), express.json(), asyncWrap(uploadImage)); // upload images to profile

app
	.route('/api/profile/:id/recipient/:rec_id')
	.get(express.json(), asyncWrap(getMessages)) // Get messages between two profiles
	.post(express.json(), asyncWrap(sendMessage)); // Send message between two profiles

app.get('*', function(req, res) {
	res.status(404).send('404: Not found. TODO: make this return a HTML error');
});

app.listen(8080);
