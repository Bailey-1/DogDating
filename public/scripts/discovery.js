function loadProfiles() {
	//Null
}

function createHandlers() {
	console.log('createHandlers ');
}

function pageLoaded() {
	loadProfiles();
	createHandlers();
}

window.addEventListener('load', pageLoaded);
