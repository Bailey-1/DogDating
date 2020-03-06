async function showProfile() {
	const userProfile = await getProfileById(currentProfile);
	console.log(userProfile);

	document.querySelector('#name').textContent = `${userProfile[0].pro_name}, ${getAgeFromDate(
		userProfile[0].pro_birthday
	)}`;
	document.querySelector('#nameOption').value = userProfile[0].pro_name;
	document.querySelector('#breed').value = userProfile[0].pro_breed;
	document.querySelector('#location').value = userProfile[0].pro_location;
	document.querySelector('#likes').value = userProfile[0].pro_likes;
	document.querySelector('#dislikes').value = userProfile[0].pro_dislikes;
	document.querySelector('#aboutme').value = userProfile[0].pro_aboutme;
	document.querySelector('#sex').value = userProfile[0].pro_sex;

	// Have to create a date object with the date from the database
	// So I can use the "input" tag with "type="date""
	const dateObj = new Date(userProfile[0].pro_birthday); // Create date object
	console.log('dateObj', dateObj.toISOString().substring(0, 10));
	// Have to use toISOString() so it looks like yyyy-mm-dd for the input to accept it as valid.
	// and substring to cut off the time and just leave the date
	document.querySelector('#birthday').value = dateObj.toISOString().substring(0, 10);

	document.title = `Doggy Dating - ${userProfile[0].pro_name}'s Profile`;

	await showProfilePic();
}

async function showProfilePic() {
	const imageObj = await getProfilePicById(currentProfile);

	let profilePicSrc;
	!imageObj
		? (profilePicSrc = `./images/user.png`)
		: (profilePicSrc = `./uploadedImages/${imageObj.img_id}.${imageObj.img_ext}`);

	document.querySelector('#profilePicElement').src = profilePicSrc;
}

async function updateDetails() {
	let profileObj = {};

	profileObj.id = currentProfile;
	profileObj.name = document.querySelector('#nameOption').value;
	profileObj.breed = document.querySelector('#breed').value;
	profileObj.location = document.querySelector('#location').value;
	profileObj.likes = document.querySelector('#likes').value;
	profileObj.dislikes = document.querySelector('#dislikes').value;
	profileObj.aboutme = document.querySelector('#aboutme').value;
	profileObj.birthday = document.querySelector('#birthday').value;
	profileObj.sex = document.querySelector('#sex').value;

	console.log(profileObj);
	const response = await updateProfileByUUID(profileObj);
	console.log('Response: ', response);
	showProfile();
}

async function uploadImage() {
	console.log('uploadImage function has been called');
	const payload = new FormData();
	const desc = document.querySelector('#imageDescInput').value;

	payload.append('desc', desc);
	const imageUpload = document.querySelector('#fileUpload');
	console.log(imageUpload.files.length);

	if (imageUpload.files.length) {
		payload.append('photo', imageUpload.files[0]);
	}

	console.log(payload);
	const response = await uploadImageToServer(currentProfile, payload);
	console.log('reponse: ', response);

	const imgObj = await getImagesById(currentProfile);

	for (const img of imgObj.rows) {
		if (document.querySelector(`#img-${img.img_id}`) === null) {
			createImageElement(img);
		}
	}
	addEventListeners();
}

async function showProfileImages() {
	removeContentFrom(document.querySelector('#images'));
	const imageObj = await getImagesById(currentProfile);
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

async function setNewProfilePic() {
	// Cheeky way to get the id of the image for every user uploaded image.
	const img_id = event.srcElement.parentElement.id.substring(4);
	const result = await setProfilePic(currentProfile, img_id);
	showProfilePic();
}

async function deletePic() {
	const img_id = event.srcElement.parentElement.id.substring(4);
	//console.log(img_id);
	deletePictureUtil(currentProfile, img_id);
	// Just removes the element from the website instead of removing all images and adding them again which
	// Jumps the screen up and looks weird. This looks alot smoother.
	document.querySelector(`#img-${img_id}`).remove();
}

function addEventListeners() {
	document.querySelector('#updateDetails').addEventListener('click', updateDetails);
	document.querySelector('#uploadImageButton').addEventListener('click', uploadImage);
	let items = document.querySelectorAll('button.setProfilePic');
	for (const i of items) {
		i.addEventListener('click', setNewProfilePic);
	}
	items = document.querySelectorAll('button.deletePic');
	for (const i of items) {
		i.addEventListener('click', deletePic);
	}
}

async function showReviews() {
	console.log(currentProfile);
	const reviewObj = await getReviewsByProfileID(currentProfile, currentProfile);
	console.log('reviewObj: ', reviewObj);
	reviewObj.rows.forEach(generateReviewElement);
}

async function generateReviewElement(reviewObj) {
	// Get the profile information for the sender of the review.
	const profileObj = await getProfileById(reviewObj.rev_sender);
	console.log('profileObj', profileObj);
	const profilePicObj = await getProfilePicById(reviewObj.rev_sender);
	console.log('profilePicObj', profilePicObj);

	const template = document.querySelector('#reviewTemplate');
	const clone = document.importNode(template.content, true);
	clone.querySelector('div.review').id = `rev-${profileObj[0].pro_id}`;
	clone.querySelector('#reviewTimeText').textContent = reviewObj.rev_time.substring(0, 10);
	clone.querySelector('#reviewContentText').textContent = reviewObj.rev_content;
	clone.querySelector('#reviewNameText').textContent = `${profileObj[0].pro_name}, ${getAgeFromDate(
		profileObj[0].pro_birthday
	)}`;

	clone.querySelector('#reviewProfileLink').href = `./profile#${profileObj[0].pro_id}`;

	if (profilePicObj != false) {
		clone.querySelector(
			'#reviewImg'
		).src = `./uploadedImages/${profilePicObj.img_id}.${profilePicObj.img_ext}`;
	}
	let i = 0;
	for (i = 0; i < reviewObj.rev_rating; i++) {
		const imgEl = document.createElement('img');
		imgEl.src = './svg/fill-star.svg';
		imgEl.classList.add('stars');
		clone.querySelector('#reviewRating').append(imgEl);
	}

	console.log('answer: ', 5 - i);
	const emptyStars = 5 - i;
	for (let x = 0; x < emptyStars; x++) {
		const imgEl = document.createElement('img');
		imgEl.src = './svg/line-star.svg';
		imgEl.classList.add('stars');
		clone.querySelector('#reviewRating').append(imgEl);
	}
	document.querySelector('#reviews').prepend(clone);
}

async function pageLoaded() {
	await showProfile();
	await showProfileImages();
	await showReviews();
	addEventListeners();
}

window.addEventListener('load', pageLoaded);
