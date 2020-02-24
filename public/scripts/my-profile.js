let currentProfile = localStorage.getItem('currentProfile').substring(8);

async function showProfile() {
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

	await showProfilePic();
}

async function showProfilePic() {
	const imageObj = await getProfilePicById(currentProfile);
	console.log(imageObj);
	let profilePicSrc;
	if (imageObj == false) {
		profilePicSrc = `./images/user.png`;
	} else {
		profilePicSrc = `./uploadedImages/${imageObj.img_id}.${imageObj.img_ext}`;
	}
	document.querySelector('#profilePicElement').src = profilePicSrc;
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

async function uploadImage() {
	console.log('uploadImage function has been called');
	const payload = new FormData();
	const id = localStorage.getItem('currentProfile').substring(8);
	console.log('id:', id);
	payload.append('id', id);
	const imageUpload = document.querySelector('#fileUpload');
	console.log(imageUpload.files.length);

	if (imageUpload.files.length) {
		payload.append('photo', imageUpload.files[0]);
	}

	console.log(payload);
	const response = await uploadImageToServer(payload);
	showProfileImages();
}

async function showProfileImages() {
	removeContentFrom(document.querySelector('#images'));
	const id = localStorage.getItem('currentProfile').substring(8);
	const imageObj = await getImagesById(id);
	console.log(imageObj.rows);
	imageObj.rows.forEach(createImageElement);

	// Call addEventListeners again to add the click event to any new images without having to refresh the page
	addEventListeners();
}

function createImageElement(imageObj) {
	const template = document.querySelector('#profileImageTemplate');
	const clone = document.importNode(template.content, true);
	clone.querySelector('div.imageDiv').id = `img-${imageObj.img_id}`;
	clone.querySelector('#userImage').src = `./uploadedImages/${imageObj.img_id}.${imageObj.img_ext}`;
	clone.querySelector('#imageDesc').textContent = imageObj.img_desc;
	clone.querySelector('#userImage').title = `Uploaded at: ${imageObj.img_time}`;

	document.querySelector('#images').prepend(clone);
}

async function getProfilePic() {
	// Cheeky way to get the id of the image for every user uploaded image.
	const image_id = event.srcElement.parentElement.id.substring(4);
	console.log(image_id);
	const obj = { img_id: image_id, pro_id: localStorage.getItem('currentProfile').substring(8) };
	const result = await setProfilePic(obj);
	showProfilePic();
}

function addEventListeners() {
	document.querySelector('#updateDetails').addEventListener('click', updateDetails);
	document.querySelector('#uploadImageButton').addEventListener('click', uploadImage);
	const items = document.querySelectorAll('button.setProfilePic');
	for (const i of items) {
		i.addEventListener('click', getProfilePic);
	}
}

async function pageLoaded() {
	await showProfile();
	await showProfileImages();
	await addEventListeners();
}

window.addEventListener('load', pageLoaded);
