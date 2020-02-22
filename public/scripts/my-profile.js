async function showProfile() {
	const currentProfile = localStorage.getItem('currentProfile').substring(8);
	const userProfile = await getProfileById(currentProfile);
	console.log(userProfile[0]);

	document.querySelector('#name').textContent = `${userProfile[0].pro_name}, ${getAgeFromDate(
		userProfile[0].pro_birthday
	)}`;
	document.querySelector('#nameOption').value = userProfile[0].pro_name;
	document.querySelector('#breed').value = userProfile[0].pro_breed;
	document.querySelector('#location').value = userProfile[0].pro_location;
	document.querySelector('#likes').value = userProfile[0].pro_likes;
	document.querySelector('#dislikes').value = userProfile[0].pro_dislikes;
	document.querySelector('#birthday').value = userProfile[0].pro_birthday;
	document.querySelector('#aboutme').value = userProfile[0].pro_aboutme;

	document.title = `Doggy Dating - ${userProfile[0].pro_name}'s Profile`;
}

async function updateDetails() {
	let profileObj = {
		id: '',
		name: '',
		breed: '',
		location: '',
		likes: '',
		dislikes: '',
		birthday: '',
		aboutme: ''
	};

	profileObj.id = localStorage.getItem('currentProfile').substring(8);
	profileObj.name = document.querySelector('#nameOption').value;
	profileObj.breed = document.querySelector('#breed').value;
	profileObj.location = document.querySelector('#location').value;
	profileObj.likes = document.querySelector('#likes').value;
	profileObj.dislikes = document.querySelector('#dislikes').value;
	profileObj.aboutme = document.querySelector('#aboutme').value;
	profileObj.birthday = document.querySelector('#birthday').value;
	console.log(profileObj);
	const response = await updateProfileByUUID(profileObj);
	console.log('Response: ', response);
	showProfile();
}

function addHandlers() {
	document.querySelector('#updateDetails').addEventListener('click', updateDetails);
}

async function pageLoaded() {
	await showProfile();
	addHandlers();
}

window.addEventListener('load', pageLoaded);
