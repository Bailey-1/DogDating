let messageObj;
let recieverProfile;
let currentProfile;

// Function to show messages
async function showMessages() {
	// Get profile objects for both profiles.
	recieverProfile = await getProfileById(window.location.hash.substring(1));
	currentProfile = await getProfileById(localStorage.getItem('currentProfile').substring(8));

	recieverProfile = recieverProfile[0];
	currentProfile = currentProfile[0];

	// Get message object for all messages between them
	messageObj = await getMessages(recieverProfile.pro_id, currentProfile.pro_id);
	console.table(messageObj.rows);
	//messages.rows.forEach(decideTableRows);

	// Go through each message in the object.
	for (const message of messageObj.rows) {
		// Pass the message to a object with each profile.
		decideTableRows(message);
	}
}

// Function to decide which template to use with each message
function decideTableRows(message) {
	// Checks to see if the sender id is equal to the currentProfile id
	if (message.msg_sender == currentProfile.pro_id) {
		console.log('Sender');
		// Pass the message, template ID and the name of the sender to createTableRows
		createTableRows(message, '#sentMessage', currentProfile.pro_name);
	} else {
		console.log('Reciever');
		// Pass the message, template ID and the name of the sender to createTableRows

		createTableRows(message, '#recievedMessage', recieverProfile.pro_name);
	}
}

// Reuseable function to create rows in the table from either the sender or reciever.
function createTableRows(message, tempId, name) {
	const template = document.querySelector(tempId);
	const clone = document.importNode(template.content, true);

	clone.querySelector('tr').id = `msg-${message.msg_id}`;

	clone.querySelector('#name').textContent = `${name}:`;
	clone.querySelector('#message').textContent = message.msg_content;
	clone.querySelector('#time').textContent = `Time: ${message.msg_time.substring(
		11,
		19
	)} - Date: ${message.msg_time.substring(0, 10)}`;
	document.querySelector('#chatTable').appendChild(clone);
}

// Get message properties to be sent to the server as a new message
async function sendMessageProperties() {
	const id = localStorage.getItem('currentProfile').substring(8);
	const rec_id = window.location.hash.substring(1);
	const msg = document.querySelector('#messageBox').value;
	console.log('id: ', id);
	console.log('rec_id: ', rec_id);
	console.log('msg: ', msg);

	const result = await sendMessage(id, rec_id, msg);
	console.log(result);
	const newMessage = await getMessage(result);
	console.log('newmessage: ', newMessage);

	createTableRows(newMessage, '#sentMessage', currentProfile.pro_name);
	document.querySelector('#messageBox').value = '';
}

async function mainLoop() {
	console.log('mainloop');

	// Get message object for all messages between them
	const newMessages = await getMessages(recieverProfile.pro_id, currentProfile.pro_id);

	for (const message of newMessages.rows) {
		if (document.querySelector(`#msg-${message.msg_id}`)) {
			console.log(`Message ${message.msg_id} exists`);
		} else {
			console.log(`Message ${message.msg_id} does not exist`);
			decideTableRows(message);
		}
	}
}

function checkKeys(e) {
	if (e.key == 'Enter') {
		sendMessageProperties();
	}
}

// Deal with setup of page
async function pageLoaded() {
	await showMessages();
	addEventListeners();
	document.querySelector('#messageTitle').textContent = `Message ${recieverProfile.pro_name}`;
	setInterval(mainLoop, 5000);
}

function addEventListeners() {
	document.querySelector('#sendButton').addEventListener('click', sendMessageProperties);
	document.querySelector('#messageBox').addEventListener('keyup', checkKeys);
}

// Entry
window.addEventListener('load', pageLoaded);
