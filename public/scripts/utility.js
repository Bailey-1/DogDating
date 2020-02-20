// Utility functions
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
	if (!request.ok)
		return console.warn(`Could not get /api/database/get/profileById/${id}`);
	const profileObj = await request.json();
	return profileObj;
}

async function getProfilesByUserAccount(id) {
	const request = await fetch(`./api/database/get/profilesByAccountId/${id}`);
	if (!request.ok)
		return console.warn(
			`Could not get /api/database/get/profilesByAccountId/${id}`
		);
	const profileObj = await request.json();
	return profileObj;
}

async function getDiscoveryById(id) {
	const request = await fetch(`./api/database/get/discoveryById/${id}`);
	if (!request.ok)
		return console.warn(`Could not get /api/database/get/discoveryById/${id}`);
	const profileObj = await request.json();
	return profileObj;
}

async function getFilters(id) {
	const request = await fetch(
		`./api/database/get/distinctFilterProperties/${id}`
	);
	if (!request.ok)
		return console.warn(
			`Could not get /api/database/get/distinctFilterProperties`
		);
	const filterObj = await request.json();
	return filterObj;
}
