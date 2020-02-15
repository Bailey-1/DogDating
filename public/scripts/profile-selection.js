const account = 'Tim'; //this would be changed if you could change accounts

// Used to share data between different pages.
localStorage.setItem('currentAccount', account);

// Get profile objects from the server
async function getProfiles() {
	const request = await fetch(`./api/get/profiles/${account}`);
	if (!request.ok) return console.warn(`Could not get /api/get/profile/${id}`);
	if (!request.status == 200) return console.warn(`Request Status: ${request}`);
	console.log(request);
	const profileObj = await request.json();
	return profileObj;
}

// Show profiles user can login as.
function showProfiles() {
	const profiles = getProfiles();
}

// Setup things
function pageLoaded() {
	showProfiles();
}

// Entry
window.addEventListener('load', pageLoaded);
