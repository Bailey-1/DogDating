// Functions for login page

function loginPage() {
	removeContentFrom(document.querySelector('#main-body-content'));

	const template = document.querySelector('#loginPage');
	const clone = document.importNode(template.content, true);
	document.querySelector('#main-body-content').appendChild(clone);
}
