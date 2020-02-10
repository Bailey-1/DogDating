// Functions for discovery page

async function discoverPage() {
	const template = document.querySelector('#profile-filters');
	const clone = document.importNode(template.content, true);
	document.querySelector('#main-body-content').appendChild(clone);
	const profiles = await getProfiles();
	profiles.forEach(createProfileElement);
}

function createProfileElement(profile) {
	//console.log('this the profile', profile);
	const template = document.querySelector('#profile-item');
	const clone = document.importNode(template.content, true);
	//console.log('This the clone', clone);
	clone.querySelector('.dogProfile').id = profile.id;
	clone.querySelector('#name').textContent = `${profile.name.substring(
		0,
		12
	)}, ${getAgeFromDate(profile.birthday)}`;
	clone.querySelector(
		'#profile-location'
	).textContent = `Location - ${profile.location.substring(0, 10)}`;
	clone.querySelector(
		'#profile-owner'
	).textContent = `Owner - ${profile.owner.substring(0, 10)}`;
	document.querySelector('#discover-profiles').appendChild(clone);
}
