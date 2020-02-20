let numOfResults = 0; //Number of results for the selected profile

function createProfileElement(profile) {
	console.log('profile: ', profile.pro_gender);
	const template = document.querySelector('#profile-item');
	const clone = document.importNode(template.content, true);
	clone.querySelector('.dogProfile').id = `profile-${profile.pro_id}`;
	clone.querySelector('#name').textContent = `(${
		profile.pro_gender == 'Male' ? 'M' : 'F'
	}) ${profile.pro_name.substring(0, 12)}, ${getAgeFromDate(profile.pro_birthday)}`;
	clone.querySelector('#location').textContent = `Location - ${profile.pro_location.substring(
		0,
		12
	)}`;

	clone.querySelector('#name').href = `profile#${profile.pro_id}`;

	document.querySelector('#discover-profiles').appendChild(clone);
}

async function loadProfiles() {
	const currentProfile = localStorage.getItem('currentProfile').substring(8);
	//console.log(currentProfile);
	const profiles = await getDiscoveryById(currentProfile);
	profiles.rows.forEach(createProfileElement);
	numOfResults = profiles.rowCount;
}

async function loadFilters() {
	const profileId = localStorage.getItem('currentProfile').substring(8);
	const filters = await getFilters(profileId);
	//filters.location.rows.forEach(createOptions);

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

function createOptions(element, value) {
	//console.log(value);
	const locOption = document.createElement('option');
	locOption.appendChild(document.createTextNode(value));
	document.querySelector(`#${element}`).appendChild(locOption);
}

function createHandlers() {
	document.querySelector('#resultsNum').textContent = `${numOfResults} Results`;
}

async function pageLoaded() {
	await loadProfiles();
	await loadFilters();
	createHandlers();
}

window.addEventListener('load', pageLoaded);
