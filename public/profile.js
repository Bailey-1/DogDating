//Get profile ID from the URL hash
function getProfile() {
	return window.location.hash.substring(1);
}

// Request specific profile from the server
async function getProfileById(id) {
	const request = await fetch(`./api/get/profile/${id}`);
	if (!request.ok) return console.warn(`Could not get /api/get/profile/${id}`);
	if (!request.status == 200) return console.warn(`Request Status: ${request}`);
	console.log(request);
	const profileObj = await request.json();
	return profileObj;
}

// Fill out the page with the details
async function showProfile() {
	const profileID = getProfile();
	const profileObj = await getProfileById(profileID);
	console.log(profileObj);
	document.querySelector('#name').textContent = profileObj.name;
	document.querySelector('#aboutme').textContent =
		profileObj.profileDetails.aboutMe;
	document.querySelector('#breed').textContent = profileObj.breed;
	document.querySelector('#location').textContent = profileObj.location;
	document.querySelector('#likes').textContent =
		profileObj.profileDetails.likes;
	document.querySelector('#dislikes').textContent =
		profileObj.profileDetails.dislikes;
	document.querySelector('#birthday').textContent = profileObj.birthday;
}

// Deal with setup of page
function pageLoaded() {
	showProfile();
}

// Entry
window.addEventListener('load', pageLoaded);
