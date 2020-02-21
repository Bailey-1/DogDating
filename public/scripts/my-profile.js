async function showProfiles() {
	const currentProfile = localStorage.getItem('currentProfile').substring(8);
	const userProfile = await getProfileById(currentProfile);
	console.log(userProfile);

	document.querySelector('#name').textContent = `${userProfile[0].pro_name}, ${getAgeFromDate(
		userProfile[0].pro_birthday
	)}`;
	document.querySelector('#breed').textContent = userProfile[0].pro_breed;
	document.querySelector('#location').textContent = userProfile[0].pro_location;
	document.querySelector('#likes').textContent = userProfile[0].pro_likes;
	document.querySelector('#dislikes').textContent = userProfile[0].pro_dislikes;
	document.querySelector('#birthday').textContent = userProfile[0].pro_birthday;
	document.querySelector('#aboutme').textContent = userProfile[0].pro_aboutme;

	document.title = `Doggy Dating - ${userProfile[0].pro_name}'s Profile`;
}

async function pageLoaded() {
	await showProfiles();
}

window.addEventListener('load', pageLoaded);
