function removeContentFrom(what) {
	while (what.firstElementChild) {
		what.firstElementChild.remove();
	}
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
	if (!request.ok) console.warn('Could not get posts');
	const profileObj = await request.json();
	return profileObj;
}

function createProfileElement(profile) {
	//console.log('this the profile', profile);
	const template = document.querySelector('#profile-item');
	const clone = document.importNode(template.content, true);
	//console.log('This the clone', clone);
	clone.querySelector('.dogProfile').id = profile.id;
	clone.querySelector('#name').textContent = profile.name;
	clone.querySelector('#profile-location').textContent = profile.location;
	clone.querySelector('#profile-owner').textContent = profile.owner;
	document.querySelector('#discover-profiles').appendChild(clone);
}

function createProfilePage() {
	console.log('Name is clicked');
	const parentElement = event.srcElement.parentElement.parentElement;
	removeContentFrom(document.querySelector('#main-body-content'));

	const template = document.querySelector('#main-profile-content');
	const clone = document.importNode(template.content, true);

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
