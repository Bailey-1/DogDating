import * as util from './utility.js';

async function loadContent() {
  const currentProfileData = await util.getProfileById(util.currentProfile);
  const currentAccount = await util.getAccountById(localStorage.getItem('currentAccount'));
  document.querySelector(
    '#mainTitle',
  ).textContent = `Welcome ${currentAccount[0].acc_name}! You are currently browsing as ${currentProfileData[0].pro_name}!`;
}

async function loadChats() {
  const chats = await util.getConversations(util.currentProfile);
  console.log(chats);
  chats.rows.forEach(createTableRow);
}

async function createTableRow(data) {
  const template = document.querySelector('#chat');
  const clone = document.importNode(template.content, true);

  clone.querySelector('#name').textContent = data.pro_name;
  clone.querySelector('#name').href = `./profile#${data.pro_id}`;

  clone.querySelector('#message').textContent =
    data.msg_content !== '\n' ? data.msg_content : '* Message Has No Content *';
  clone.querySelector('#message').href = `./message#${data.pro_id}`;

  clone.querySelector('#time').textContent = `Time: ${data.msg_time.substring(
    11,
    19,
  )} - Date: ${data.msg_time.substring(0, 10)}`;
  clone.querySelector('.messageContent').classList.add(data.msg_type);
  console.log('here', data.msg_type);
  clone.querySelector('.messageInfo').classList.add(data.msg_type);
  document.querySelector('#chatTable').appendChild(clone);
}

function addEventListeners() {
  // Event listeners;
}

function pageLoaded() {
  loadContent();
  addEventListeners();
  loadChats();
}

window.addEventListener('load', pageLoaded);
