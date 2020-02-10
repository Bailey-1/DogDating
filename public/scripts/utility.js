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
	console.log('Date', date);
	let birthDate = new Date(date);
	console.log('Birthdate', birthDate);
	let age = today.getFullYear() - birthDate.getFullYear();
	let m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age = age - 1;
	}
	return age;
}

// Returns array of all profiles
async function getProfiles() {
	const request = await fetch('./api/get/discover');
	if (!request.ok) return console.warn('Could not get /api/get/discover');
	const profileObj = await request.json();
	return profileObj;
}

// Returns single object of profile - first to have same ID.
async function getProfileById(id) {
	const request = await fetch(`./api/get/profile/${id}`);
	if (!request.ok) return console.warn(`Could not get /api/get/profile/${id}`);
	const profileObj = await request.json();
	return profileObj;
}
