// Functions for viewing a profile page

//Create main profile page
async function profilePage() {
	console.log('Name is clicked');
	const parentElementID = event.srcElement.parentElement.parentElement.id;
	console.log('Parent Element: ', parentElementID);
	removeContentFrom(document.querySelector('#main-body-content'));

	const template = document.querySelector('#main-profile-content');
	const clone = document.importNode(template.content, true);

	const profile = await getProfileById(parentElementID);
	console.log(profile);
	clone.querySelector('#profile-page-name').textContent = `${
		profile.name
	}, ${getAgeFromDate(profile.birthday)}`;
	clone.querySelector('#profile-page-about-me').textContent =
		profile.profileDetails.aboutMe;
	clone.querySelector('#profile-page-location').textContent = profile.location;
	clone.querySelector('#profile-page-likes').textContent =
		profile.profileDetails.likes;
	clone.querySelector('#profile-page-dislikes').textContent =
		profile.profileDetails.dislikes;
	clone.querySelector('#profile-page-birthday').textContent = profile.birthday;

	document.querySelector('#main-body-content').appendChild(clone);
}
