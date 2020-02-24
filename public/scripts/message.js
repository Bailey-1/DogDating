// Function to show messages
async function showMessages() {
	// Get profile objects for both profiles.
	const recieverProfile = await getProfileById(window.location.hash.substring(1));
	const currentProfile = await getProfileById(localStorage.getItem('currentProfile').substring(8));

	// Get message object for all messages between them
	const messages = await getMessages(recieverProfile[0].pro_id, currentProfile[0].pro_id);
	console.table(messages.rows);
	//messages.rows.forEach(decideTableRows);

	// Go through each message in the object.
	for (const message of messages.rows) {
		// Pass the message to a object with each profile.
		decideTableRows(message, currentProfile[0], recieverProfile[0]);
	}
}

// Function to decide which template to use with each message
function decideTableRows(message, currentProfile, recieverProfile) {
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

	clone.querySelector('#name').textContent = name;
	clone.querySelector('#message').textContent = message.msg_content;
	clone.querySelector('#time').textContent = `Time: ${message.msg_time.substring(
		11,
		19
	)} - Date: ${message.msg_time.substring(0, 10)}`;
	document.querySelector('#chatTable').appendChild(clone);
}

async function getMessageProperties() {
	const message = { sender: '', reciever: '', content: '' };
	message.reciever = window.location.hash.substring(1);
	message.sender = localStorage.getItem('currentProfile').substring(8);
	message.content = document.querySelector('#messageBox').value;
	const result = await sendMessage(message);
	console.log(result);
	const newMessage = await getMessage(result);
	console.log('newmessage: ', newMessage);
	const currentProfile = await getProfileById(localStorage.getItem('currentProfile').substring(8));

	createTableRows(newMessage, '#sentMessage', currentProfile[0].pro_name);
}

// Deal with setup of page
async function pageLoaded() {
	await showMessages();
	addEventHandlers();
}

function addEventHandlers() {
	document.querySelector('#sendButton').addEventListener('click', getMessageProperties);
}

// Entry
window.addEventListener('load', pageLoaded);
