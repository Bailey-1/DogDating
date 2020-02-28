const account = 'cee3a7e6-5339-11ea-8d77-2e728ce88125'; //this would be changed if you could change accounts
// Used to share data between different pages.
localStorage.setItem('currentAccount', account); //Current User

// Creates each profile element from a template and adds it
async function createProfileElement(profile) {
	const template = document.querySelector('#profile-item');
	const clone = document.importNode(template.content, true);
	clone.querySelector('.dogProfile').id = `profile-${profile.pro_id}`;
	clone.querySelector('#name').textContent = `${profile.pro_name}, ${getAgeFromDate(
		profile.pro_birthday
	)}`;
	clone.querySelector('#breed').textContent = profile.pro_breed;
	clone.querySelector('#birthday').textContent = profile.pro_birthday;

	const imageObj = await getProfilePicById(profile.pro_id);
	let profilePicSrc;
	if (imageObj == false) {
		profilePicSrc = `./images/user.png`;
	} else {
		profilePicSrc = `./uploadedImages/${imageObj.img_id}.${imageObj.img_ext}`;
	}
	clone.querySelector('#profilePicElement').src = profilePicSrc;

	document.querySelector('#userProfileArea').appendChild(clone);
}

// Adds the selectedBtn class to the pushed button and removes it from the rest
function selectedProfile() {
	//Not the nicest way but if it works it works.
	console.log(event);
	const selectedId = event.srcElement.parentElement.parentElement.id;

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
	//profiles.forEach(createProfileElement);
	for (const profile of profiles) {
		await createProfileElement(profile);
	}
}

function newProfile() {
	window.location.href = '/new-profile';
}

// Add event handlers to the page.
function createEventHandlers() {
	document.querySelector('#newProfileBtn').addEventListener('click', newProfile);

	const items = document.querySelectorAll('.selectBtn');
	for (const i of items) {
		i.addEventListener('click', selectedProfile);
	}

	const nameItems = document.querySelectorAll('.profile-name');
	for (const i of nameItems) {
		i.addEventListener('click', clickedName);
	}
}

// Function for when the name of a profile is clicked.
function clickedName() {
	console.log(event.srcElement.parentElement.parentElement.id);
	const profile = event.srcElement.parentElement.parentElement.id;
	console.log(profile);
	localStorage.setItem('currentProfile', profile);
	window.location.href = '/my-profile';
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
	createEventHandlers();
	addClasses();
}

// Entry
window.addEventListener('load', pageLoaded);
