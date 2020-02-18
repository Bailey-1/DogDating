const account = 'Tim'; //this would be changed if you could change accounts

console.log('profile-selection.js');

// Used to share data between different pages.
localStorage.setItem('currentAccount', account); //Current User

//localStorage.setItem('currentProfile', null); //Current Profile ID

async function getProfilesByUserAccount() {
	const request = await fetch(`./api/get/profiles/${account}`);
	if (!request.ok) return console.warn(`Could not get /api/get/profile/${id}`);
	if (!request.status == 200) return console.warn(`Request Status: ${request}`);
	const profileObj = await request.json();
	console.log(profileObj);
	return profileObj;
}

// Creates each profile element from a template and adds it
function createProfileElement(profile) {
	const template = document.querySelector('#profile-item');
	const clone = document.importNode(template.content, true);
	clone.querySelector('.dogProfile').id = `profile-${profile.id}`;
	clone.querySelector('#name').textContent = profile.name;
	clone.querySelector('#breed').textContent = profile.breed;
	clone.querySelector('#birthday').textContent = profile.birthday;

	document.querySelector('#user-profiles').appendChild(clone);
}

// Adds the selectedBtn class to the pushed button and removes it from the rest
function selectedProfile() {
	//Not the nicest way but if it works it works.
	const selectedId = event.originalTarget.parentElement.parentElement.id;

	//This line is haunted idk y
	//document.location.hash = selectedId;

	console.log('Selected ID: ', selectedId);

	const items = document.querySelectorAll('.selectBtn');
	console.log(items);
	for (let item of items) {
		console.log('item ', item);
		if (item.classList.contains('selectedBtn')) {
			item.classList.remove('selectedBtn');
			console.log('it does contain .selectedBtn');
		}
	}

	event.target.classList.toggle('selectedBtn');

	localStorage.setItem('currentProfile', selectedId);
}

// Show profiles user can view as. This changes recommended profiles, my profile etc
async function showProfiles() {
	const profiles = await getProfilesByUserAccount();
	profiles.forEach(createProfileElement);
}

// Add event handlers to the page.
function createHandlers() {
	const items = document.querySelectorAll('.selectBtn');
	for (const i of items) {
		i.addEventListener('click', selectedProfile);
	}
}
// Add the selectedBtn class to the profile that matches the current profile ID.
function addClasses() {
	const selectedID = localStorage.getItem('currentProfile');

	let target = document.querySelector(`#${selectedID}`);
	console.log('target ', target.children[1].children[3]);
	target.children[1].children[3].classList.add('selectedBtn');
}

// Setup things
async function pageLoaded() {
	//Used await to allow all elements to display before handlers are created
	await showProfiles();
	createHandlers();
	addClasses();
}

// Entry
window.addEventListener('load', pageLoaded);
