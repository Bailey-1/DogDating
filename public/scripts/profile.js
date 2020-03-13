let currentRating = 0;
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

	let profilePicSrc =
		imageObj === false
			? `./images/user.png`
			: `./uploadedImages/${imageObj.img_id}.${imageObj.img_ext}`;

	document.querySelector('#profilePicElement').src = profilePicSrc;
	document.title = `Doggy Dating - ${profileObj[0].pro_name}'s Profile`;
}

async function showProfileImages() {
	removeContentFrom(document.querySelector('#images'));
	const id = getProfile();
	const imageObj = await getImagesById(id);
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

// Show reviews for the profile.
async function getReviews() {
	removeContentFrom(document.querySelector('#reviews'));
	const reviewObj = await getReviewsByProfileID(currentProfile, window.location.hash.substring(1));
	await reviewObj.rows.forEach(generateReviewElement);
	console.log(reviewObj);
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

	let starLocation = clone.querySelector('#reviewRating');

	if (profilePicObj != false) {
		clone.querySelector(
			'#reviewImg'
		).src = `./uploadedImages/${profilePicObj.img_id}.${profilePicObj.img_ext}`;
	}

	let i = 0; // Has to be define outside of the scope of the for loop.
	for (i = 0; i < reviewObj.rev_rating; i++) {
		const imgEl = document.createElement('img');
		imgEl.src = './svg/fill-star.svg';
		imgEl.classList.add('stars');
		await starLocation.append(imgEl);
	}

	const emptyStars = 5 - i;
	for (let x = 0; x < emptyStars; x++) {
		const imgEl = document.createElement('img');
		imgEl.src = './svg/line-star.svg';
		imgEl.classList.add('stars');
		await starLocation.append(imgEl);
	}
	console.log(profileObj[0].pro_name);
	document.querySelector('#reviews').prepend(clone);
}

async function sendReview() {
	let body = { content: '', rating: 0 };
	body.content = document.querySelector('#reviewTextArea').value;
	body.rating = currentRating;
	const result = await postReview(currentProfile, window.location.hash.substring(1), body);
	getReviews();
}

// Resets all of the star items to be 'empty'
function clearStars() {
	const starElements = document.querySelectorAll('.ratingSymbol');
	console.log(starElements);
	for (element of starElements) element.src = './svg/line-star.svg';
}

// Selects star imgs and sets them to be 'filled'
function rateStars(numOfStars) {
	currentRating = numOfStars;
	clearStars();
	const starElements = document.querySelectorAll(`.star${numOfStars}`);
	for (element of starElements) element.src = './svg/fill-star.svg';
}

function addEventListeners() {
	document.querySelector('#reviewBtn').addEventListener('click', function() {
		document.querySelector('#reviewOptions').classList.toggle('invisibleElement');
	});

	document.querySelector('#sendReview').addEventListener('click', sendReview);

	// Not the cleanest but it works i guess.
	document.querySelector('#star5').addEventListener('click', function() {
		rateStars(5);
	});
	document.querySelector('#star4').addEventListener('click', function() {
		rateStars(4);
	});
	document.querySelector('#star3').addEventListener('click', function() {
		rateStars(3);
	});
	document.querySelector('#star2').addEventListener('click', function() {
		rateStars(2);
	});
	document.querySelector('#star1').addEventListener('click', function() {
		rateStars(1);
	});
}

// Deal with setup of page
async function pageLoaded() {
	await showProfile();
	await showProfileImages();
	await getReviews();
	addEventListeners();
}

// Entry
window.addEventListener('load', pageLoaded);
