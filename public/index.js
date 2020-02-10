// Config
async function setup() {
	//add event listeners here
	console.log('It worked');
	await discoverPage();
	const items = document.querySelectorAll('.profile-name');
	for (const i of items) {
		i.addEventListener('click', createProfilePage);
	}
}

window.addEventListener('load', setup);
