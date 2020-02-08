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

async function discoverPage() {
	const template = document.querySelector('#profile-filters');
	const clone = document.importNode(template.content, true);
	document.querySelector('#main-body-content').appendChild(clone);
	const profiles = await getProfiles();
	profiles.forEach(createProfileElement);
}

async function getProfiles() {
	const request = await fetch('./api/get/discover');
	if (!request.ok) return console.warn('Could not get /api/get/discover');
	const profileObj = await request.json();
	return profileObj;
}

async function getProfileById(id) {
	const request = await fetch(`./api/get/profile/${id}`);
	if (!request.ok) return console.warn(`Could not get /api/get/profile/${id}`);
	const profileObj = await request.json();
	return profileObj;
}

function createProfileElement(profile) {
	//console.log('this the profile', profile);
	const template = document.querySelector('#profile-item');
	const clone = document.importNode(template.content, true);
	//console.log('This the clone', clone);
	clone.querySelector('.dogProfile').id = profile.id;
	clone.querySelector('#name').textContent = `${profile.name.substring(
		0,
		12
	)}, ${getAgeFromDate(profile.birthday)}`;
	clone.querySelector(
		'#profile-location'
	).textContent = `Location - ${profile.location.substring(0, 10)}`;
	clone.querySelector(
		'#profile-owner'
	).textContent = `Owner - ${profile.owner.substring(0, 10)}`;
	document.querySelector('#discover-profiles').appendChild(clone);
}

async function createProfilePage() {
	console.log('Name is clicked');
	const parentElementID = event.srcElement.parentElement.parentElement.id;
	console.log('Parent Element: ', parentElementID);
	removeContentFrom(document.querySelector('#main-body-content'));

	const template = document.querySelector('#main-profile-content');
	const clone = document.importNode(template.content, true);

	const profile = await getProfileById(parentElementID);
	console.log(profile);
	clone.querySelector('#profile-page-name').textContent = `${
		profile.name
	}, ${getAgeFromDate(profile.birthday)}`;
	clone.querySelector('#profile-page-about-me').textContent =
		profile.profileDetails.aboutMe;
	clone.querySelector('#profile-page-location').textContent = profile.location;
	clone.querySelector('#profile-page-likes').textContent =
		profile.profileDetails.likes;
	clone.querySelector('#profile-page-dislikes').textContent =
		profile.profileDetails.dislikes;
	clone.querySelector('#profile-page-birthday').textContent = profile.birthday;

	document.querySelector('#main-body-content').appendChild(clone);
}
async function setup() {
	//add event listeners here
	console.log('It worked');
	await discoverPage();
	const items = document.querySelectorAll('.profile-name');
	for (const i of items) {
		i.addEventListener('click', createProfilePage);
	}
}

window.addEventListener('load', setup);
