//Get profile ID from the URL hash
function getProfile() {
	return window.location.hash.substring(1);
}

// Fill out the page with the details
async function showProfile() {
	const profileID = getProfile();
	const profileObj = await getProfileById(profileID);
	console.log(profileObj[0]);
	document.querySelector('#name').textContent = `${profileObj[0].pro_name}, ${getAgeFromDate(
		profileObj[0].pro_birthday
	)}`;
	document.querySelector('#breed').textContent = profileObj[0].pro_breed;
	document.querySelector('#location').textContent = profileObj[0].pro_location;
	document.querySelector('#likes').textContent = profileObj[0].pro_likes;
	document.querySelector('#dislikes').textContent = profileObj[0].pro_dislikes;

	// Format the date using the browser date settings.
	const dateObj = new Date(profileObj[0].pro_birthday);
	document.querySelector('#birthday').textContent = dateObj.toLocaleDateString();

	document.querySelector('#aboutme').textContent = profileObj[0].pro_aboutme;

	document.querySelector('#messageBtn').href = `message#${profileObj[0].pro_id}`;

	const imageObj = await getProfilePicById(profileObj[0].pro_id);
	let profilePicSrc;
	if (imageObj == false) {
		profilePicSrc = `./images/user.png`;
	} else {
		profilePicSrc = `./uploadedImages/${imageObj.img_id}.${imageObj.img_ext}`;
	}
	document.querySelector('#profilePicElement').src = profilePicSrc;

	document.title = `Doggy Dating - ${profileObj[0].pro_name}'s Profile`;
}

async function showProfileImages() {
	removeContentFrom(document.querySelector('#images'));
	const id = getProfile();
	const imageObj = await getImagesById(id);
	console.log(imageObj.rows);
	imageObj.rows.forEach(createImageElement);
}

function createImageElement(imageObj) {
	const template = document.querySelector('#profileImageTemplate');
	const clone = document.importNode(template.content, true);
	clone.querySelector('#userImage').src = `./uploadedImages/${imageObj.img_id}.${imageObj.img_ext}`;
	clone.querySelector('#userImage').title = `Uploaded at: ${imageObj.img_time}`;
	clone.querySelector('#imageDesc').textContent = imageObj.img_desc;

	document.querySelector('#images').prepend(clone);
}

function addEventListeners() {}
// Deal with setup of page
async function pageLoaded() {
	await showProfile();
	await showProfileImages();
	addEventListeners();
}

// Entry
window.addEventListener('load', pageLoaded);
