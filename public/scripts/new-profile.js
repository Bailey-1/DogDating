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

function addEventListeners() {
	document.querySelector('#updateDetails').addEventListener('click', updateDetails);
	document.querySelector('#uploadImageButton').addEventListener('click', uploadImage);
	const items = document.querySelectorAll('button.setProfilePic');
	for (const i of items) {
		i.addEventListener('click', getProfilePic);
	}
}

function showProfile() {
	document.querySelector('#profilePicElement').src = './images/user.png';
}

function pageLoaded() {
	showProfile();
	addEventListeners();
}

window.addEventListener('load', pageLoaded);
