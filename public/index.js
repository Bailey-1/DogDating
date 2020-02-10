// Config
let currentAccount = {
	username: 'Tim',
	password: 'password123',
	profiles: ['1', '4', '5']
};

async function createDiscoveryPage() {
	console.log('Discovery Page');
	// Create the discovery page
	await discoverPage();
}

function createLoginPage() {
	console.log('Login Page');

	loginPage();
	document
		.querySelector('#loginButton')
		.addEventListener('click', createProfileSelectionPage);
}

function createProfileSelectionPage(currentAccount) {
	console.log('Profile Selection Page');
	profilesPage(currentAccount);
}

function createProfilePage() {
	console.log('Profile Page');
}

window.addEventListener('load', createLoginPage);

document.querySelector('#home').addEventListener('click', createDiscoveryPage);
