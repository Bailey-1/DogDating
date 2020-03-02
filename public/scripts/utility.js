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
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age = age - 1;

	// Not going to deal with future dates yet and min age required for profile ont this website
	if (age < 0) age = 0;

	return age;
}

// Returns single object of profile - first to have same ID.
async function getProfileById(id) {
	const request = await fetch(`./api/profile/${id}`);
	if (!request.ok) return console.warn(`Could not get /api/profile/${id}`);
	const profileObj = await request.json();
	return profileObj;
}

async function getAccountById(id) {
	const request = await fetch(`./api/account/${id}`);
	if (!request.ok) return console.warn(`Could not get /api/account/${id}`);
	const accountObj = await request.json();
	return accountObj;
}

async function getProfilesByUserAccount(id) {
	const request = await fetch(`./api/account/${id}/profiles`);
	if (!request.ok) return console.warn(`Could not get ./api/account/${id}/profiles`);
	const profileObj = await request.json();
	return profileObj;
}

async function getFilters(id) {
	const request = await fetch(`./api/profile/${id}/discovery/filters`);
	if (!request.ok) return console.warn(`Could not get ./api/profile/${id}/discovery/filters`);
	const filterObj = await request.json();
	return filterObj;
}

async function getDiscoveryByFilters(filters) {
	const request = await fetch('/api/profile/:id/discovery', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(filters)
	});
	if (!request.ok) return console.warn(`Could not POST /api/database/post/discoveryByFilter`);
	const profileObj = await request.json();
	return profileObj;
}

async function updateProfileByUUID(profile) {
	const request = await fetch('/api/profile/:id', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(profile)
	});
	if (!request.ok) return console.warn(`Could not POST /api/profile/:id`);
	const response = await request.json();
	return response;
}

async function uploadImageToServer(id, payload) {
	const request = await fetch(`/api/profile/${id}/image`, {
		method: 'POST',
		body: payload
	});
	if (!request.ok) return console.warn(`Could not POST /api/profile/${id}/image`);
	const response = await request.json();
	return response;
}

async function getImagesById(id) {
	const request = await fetch(`./api/profile/${id}/images`);
	if (!request.ok) return console.warn(`Could not GET ./api/profile/${id}/images`);
	const response = await request.json();
	return response;
}

async function getMessages(to, from) {
	const request = await fetch(`./api/profile/${from}/recipient/${to}`);

	if (!request.ok) return console.warn(`Could not get /api/profile/${from}/recipient/${to}`);
	const profileObj = await request.json();
	return profileObj;
}

async function sendMessage(id, rec_id, msg) {
	const body = { content: msg };
	const request = await fetch(`./api/profile/${id}/recipient/${rec_id}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	});
	if (!request.ok) return console.warn(`Could not POST /api/profile/${id}/recipient/${rec_id}`);
	const msg_id = await request.json();
	return msg_id;
}

async function getMessage(id, rec_id, msg_id) {
	const request = await fetch(`./api/profile/${id}/recipient/${rec_id}/message/${msg_id}`);
	if (!request.ok)
		return console.warn(`Could not get ./api/profile/${id}/recipient/${rec_id}/message/${msg_id}`);
	const result = await request.json();
	return result.rows[0];
}

async function setProfilePic(id, img_id) {
	const request = await fetch(`/api/profile/${id}/image/${img_id}`, {
		method: 'PUT'
	});
	if (!request.ok) return console.warn(`Could not POST /api/profile/${id}/image/${img_id}`);
	const result = await request.json();
	return result;
}

async function getProfilePicById(id) {
	const request = await fetch(`./api/profile/${id}/profilepic`);
	if (!request.ok) return console.warn(`Could not get ./api/profile/${id}/profilepic`);
	const result = await request.json();

	if (result.rowCount == 0) {
		return false;
	} else {
		return result.rows[0];
	}
}

async function createProfile(body) {
	const request = await fetch('/api/profile', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	});
	if (!request.ok) return console.warn(`Could not POST /api/profile`);
	const result = await request.json();
	return result;
}
