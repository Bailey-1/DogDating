const account = 'cee3a7e6-5339-11ea-8d77-2e728ce88125'; //this would be changed if you could change accounts

// Used to share data between different pages.
localStorage.setItem('currentAccount', account); //Current User

// Creates each profile element from a template and adds it
function createProfileElement(profile) {
	const template = document.querySelector('#profile-item');
	const clone = document.importNode(template.content, true);
	clone.querySelector('.dogProfile').id = `profile-${profile.pro_id}`;
	clone.querySelector('#name').textContent = `(${
		profile.pro_gender == 'Male' ? 'M' : 'F'
	}) ${profile.pro_name}, ${getAgeFromDate(profile.pro_birthday)}`;
	clone.querySelector('#breed').textContent = profile.pro_breed;
	clone.querySelector('#birthday').textContent = profile.pro_birthday;

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
	const userId = localStorage.getItem('currentAccount');
	const profiles = await getProfilesByUserAccount(userId);
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
