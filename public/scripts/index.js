async function loadContent() {
	const currentProfile = await getProfileById(localStorage.getItem('currentProfile').substring(8));
	const currentAccount = await getAccountById(localStorage.getItem('currentAccount'));
	document.querySelector(
		'#mainTitle'
	).textContent = `Welcome ${currentAccount[0].acc_name}! You are currently browsing as ${currentProfile[0].pro_name}!`;
}

function addEventListeners() {
	// Event listeners;
}

function pageLoaded() {
	loadContent();
	addEventListeners();
}

window.addEventListener('load', pageLoaded);
