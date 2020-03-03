const currentProfile = localStorage.getItem('currentProfile').substring(8);

async function createProfileElement(profile) {
	const template = document.querySelector('#profile-item');
	const clone = document.importNode(template.content, true);
	clone.querySelector('.dogProfile').id = `profile-${profile.pro_id}`;
	clone.querySelector('#name').textContent = `${profile.pro_name}, ${getAgeFromDate(
		profile.pro_birthday
	)}`;
	clone.querySelector('#location').textContent = profile.pro_location;

	clone.querySelector('#breed').textContent = profile.pro_breed;
	clone.querySelector('#name').href = `profile#${profile.pro_id}`;
	clone.querySelector('#messageBtn').href = `message#${profile.pro_id}`;

	const imageObj = await getProfilePicById(profile.pro_id);
	let profilePicSrc;
	if (imageObj == false) {
		profilePicSrc = `./images/user.png`;
	} else {
		profilePicSrc = `./uploadedImages/${imageObj.img_id}.${imageObj.img_ext}`;
	}
	clone.querySelector('#profilePicElement').src = profilePicSrc;

	document.querySelector('#profiles-area').appendChild(clone);
}

async function loadFilters() {
	const profileId = localStorage.getItem('currentProfile').substring(8);
	const filters = await getFilters(profileId);

	for (const option of filters.location.rows) {
		createOptions('select-location', option.pro_location);
	}
	for (const option of filters.breed.rows) {
		createOptions('select-breed', option.pro_breed);
	}
	for (const option of filters.kennelClubMembership.rows) {
		//console.log(option);
		createOptions('select-kennelclub', option.membership_type);
	}

	document.querySelector('#location-tag').textContent = `Location: (${filters.location.rowCount})`;
	document.querySelector('#breed-tag').textContent = `Breed: (${filters.breed.rowCount})`;
	document.querySelector(
		'#kennelclub-tag'
	).textContent = `Kennel Club Membership: (${filters.kennelClubMembership.rowCount})`;
}

// Create a option element in side of a selection element automatically.
function createOptions(element, value) {
	const locOption = document.createElement('option');
	locOption.appendChild(document.createTextNode(value));
	document.querySelector(`#${element}`).appendChild(locOption);
}

function getLocationSearch() {
	const search = window.location.search.substring(1);
	console.log('search: ', search);
	let searchArr = search.split('&');
	console.log('search: ', searchArr);
}

async function updateProfilesSelection() {
	let queryArr = [];
	// Filters
	if (document.querySelector('#select-location').value != 'all')
		queryArr.push('location=' + document.querySelector('#select-location').value);
	if (document.querySelector('#select-breed').value != 'all')
		queryArr.push('breed=' + document.querySelector('#select-breed').value);
	if (document.querySelector('#select-kennelclub').value != 'all')
		queryArr.push('kc=' + document.querySelector('#select-kennelclub').value);

	// Sort
	if (document.querySelector('#sort-type').value != 'default')
		queryArr.push(
			's=' +
				document.querySelector('#sort-type').value +
				'-' +
				document.querySelector('#sort-dir').value
		);

	console.log('queryArr: ', queryArr);
	const queryStr = '?' + queryArr.join('&');
	console.log('queryStr: ', queryStr);

	const url = `/api/profile/${currentProfile}/discovery${queryStr}`;
	console.log(url);
	const profiles = await getDiscoveryByFilters(currentProfile, queryStr);

	console.log('Profiles ', profiles);
	removeContentFrom(document.querySelector('#profiles-area'));
	profiles.rows.forEach(createProfileElement);
	document.querySelector('#resultsNum').textContent = `${profiles.rowCount} Results`;
}

function createHandlers() {
	document.querySelector('#select-breed').addEventListener('change', updateProfilesSelection);
	document.querySelector('#select-location').addEventListener('change', updateProfilesSelection);
	document.querySelector('#select-kennelclub').addEventListener('change', updateProfilesSelection);
	document.querySelector('#sort-type').addEventListener('change', updateProfilesSelection);
	document.querySelector('#sort-dir').addEventListener('change', updateProfilesSelection);
}

async function pageLoaded() {
	await loadFilters();
	createHandlers();
	updateProfilesSelection();
}

window.addEventListener('load', pageLoaded);
