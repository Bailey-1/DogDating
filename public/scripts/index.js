import * as util from './utility.js';

async function loadContent() {
  const currentProfileData = await util.getProfileById(util.currentProfile);
  const currentAccount = await util.getAccountById(localStorage.getItem('currentAccount'));
  document.querySelector(
    '#mainTitle',
  ).textContent = `Welcome ${currentAccount[0].acc_name}! You are currently browsing as ${currentProfileData[0].pro_name}!`;
}

async function loadChats() {}

function addEventListeners() {
  // Event listeners;
}

function pageLoaded() {
  loadContent();
  addEventListeners();
  loadChats();
}

window.addEventListener('load', pageLoaded);
