import { getProfileById } from './utility.js';

async function showProfiles() {
	const currentProfile = localStorage.getItem('currentProfile').substring(8);
	const userProfile = await getProfileById(currentProfile);
	console.log(userProfile);

	document.querySelector('#name').textContent = userProfile.name;
	document.querySelector('#breed').textContent = userProfile.breed;
	document.querySelector('#location').textContent = userProfile.location;
	document.querySelector('#likes').textContent =
		userProfile.profileDetails.likes;
	document.querySelector('#dislikes').textContent =
		userProfile.profileDetails.dislikes;
	document.querySelector('#birthday').textContent = userProfile.birthday;
	document.querySelector('#aboutme').textContent =
		userProfile.profileDetails.aboutMe;
}

async function pageLoaded() {
	await showProfiles();
}

window.addEventListener('load', pageLoaded);
