// Utility functions
// Single page to help manage API requests and to reuse them across the site

function removeContentFrom(what) {
	while (what.firstElementChild) {
		what.firstElementChild.remove();
	}
}

function getAgeFromDate(date) {
	//date is mm/dd/yyyy

	//get todays date to compare the date with.
	let today = new Date();
	let birthDate = new Date(date);
	let age = today.getFullYear() - birthDate.getFullYear();
	let m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age = age - 1;
	}
	return age;
}

// Returns array of all profiles
async function getDiscovery() {
	const request = await fetch('./api/get/discover');
	if (!request.ok) return console.warn('Could not get /api/get/discover');
	const profileObj = await request.json();
	return profileObj;
}

// Returns single object of profile - first to have same ID.
async function getProfileById(id) {
	const request = await fetch(`./api/database/get/profileById/${id}`);
	if (!request.ok) return console.warn(`Could not get /api/database/get/profileById/${id}`);
	const profileObj = await request.json();
	return profileObj;
}

async function getAccountById(id) {
	const request = await fetch(`./api/database/get/accountById/${id}`);
	if (!request.ok) return console.warn(`Could not get /api/database/get/accountById/${id}`);
	const accountObj = await request.json();
	return accountObj;
}

async function getProfilesByUserAccount(id) {
	const request = await fetch(`./api/database/get/profilesByAccountId/${id}`);
	if (!request.ok) return console.warn(`Could not get /api/database/get/profilesByAccountId/${id}`);
	const profileObj = await request.json();
	return profileObj;
}

async function getDiscoveryById(id) {
	const request = await fetch(`./api/database/get/discoveryById/${id}`);
	if (!request.ok) return console.warn(`Could not get /api/database/get/discoveryById/${id}`);
	const profileObj = await request.json();
	return profileObj;
}

async function getFilters(id) {
	const request = await fetch(`./api/database/get/distinctFilterProperties/${id}`);
	if (!request.ok) return console.warn(`Could not get /api/database/get/distinctFilterProperties`);
	const filterObj = await request.json();
	return filterObj;
}

async function getDiscoveryByFilters(filters) {
	const request = await fetch('/api/database/post/discoveryByFilter', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(filters)
	});
	if (!request.ok) return console.warn(`Could not POST /api/database/post/discoveryByFilter`);
	const profileObj = await request.json();
	return profileObj;
}

async function updateProfileByUUID(profile) {
	const request = await fetch('/api/database/post/updateProfileByUUID', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(profile)
	});
	if (!request.ok) return console.warn(`Could not POST /api/database/post/discoveryByFilter`);
	const response = await request.json();
	return response;
}

async function uploadImageToServer(payload) {
	const request = await fetch('/api/database/post/image', {
		method: 'POST',
		body: payload
	});
	if (!request.ok) return console.warn(`Could not POST /api/database/post/image`);
	const response = await request.json();
	return response;
}

async function getImagesById(id) {
	const request = await fetch(`./api/database/get/imagesFromId/${id}`);
	if (!request.ok) return console.warn(`Could not GET /api/database/post/imagesFromId/${id}`);
	const response = await request.json();
	return response;
}

async function getMessages(to, from) {
	const payload = { to: '', from: '' };
	payload.to = to;
	payload.from = from;

	const request = await fetch('/api/database/post/getMessages', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});
	if (!request.ok) return console.warn(`Could not POST /api/database/post/getMessages`);
	const profileObj = await request.json();
	return profileObj;
}

async function sendMessage(message) {
	const request = await fetch('/api/database/post/sendMessage', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(message)
	});
	if (!request.ok) return console.warn(`Could not POST /api/database/post/getMessages`);
	const profileObj = await request.json();
	return profileObj;
}

async function getMessage(id) {
	const request = await fetch(`./api/database/get/getMessage/${id}`);
	if (!request.ok) return console.warn(`Could not get /api/database/get/distinctFilterProperties`);
	const result = await request.json();
	return result.rows[0];
}

async function setProfilePic(body) {
	const request = await fetch('/api/database/post/setProfilePic', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	});
	if (!request.ok) return console.warn(`Could not POST /api/database/post/getMessages`);
	const result = await request.json();
	return result;
}

async function getProfilePicById(id) {
	const request = await fetch(`./api/database/get/getProfilePic/${id}`);
	if (!request.ok) return console.warn(`Could not get /api/database/get/getProfilePic`);
	const result = await request.json();

	if (result.rowCount == 0) {
		return false;
	} else {
		return result.rows[0];
	}
}

async function createProfile(body) {
	const request = await fetch('/api/database/post/createProfile', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	});
	if (!request.ok) return console.warn(`Could not POST /api/database/post/createProfile`);
	const result = await request.json();
	return result;
}
