//Get profile ID from the URL hash
function getProfile() {
	return window.location.hash.substring(1);
}

// Fill out the page with the details
async function showProfile() {
	const profileID = getProfile();
	const profileObj = await getProfileById(profileID);
	console.log(profileObj[0]);
	document.querySelector('#name').textContent = `${
		profileObj[0].pro_name
	}, ${getAgeFromDate(profileObj[0].pro_birthday)}`;
	document.querySelector('#breed').textContent = profileObj[0].pro_breed;
	document.querySelector('#location').textContent = profileObj[0].pro_location;
	document.querySelector('#likes').textContent = profileObj[0].pro_likes;
	document.querySelector('#dislikes').textContent = profileObj[0].pro_dislikes;
	document.querySelector('#birthday').textContent = profileObj[0].pro_birthday;
	document.querySelector('#aboutme').textContent = profileObj[0].pro_aboutme;
}

// Deal with setup of page
function pageLoaded() {
	showProfile();
}

// Entry
window.addEventListener('load', pageLoaded);
