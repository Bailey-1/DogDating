import * as util from './utility.js';
async function sendDetails() {
  const profileObj = {};

  profileObj.pro_name = document.querySelector('#nameOption').value;
  profileObj.pro_breed = document.querySelector('#breed').value;
  profileObj.pro_sex = document.querySelector('#sex').value;
  profileObj.pro_location = document.querySelector('#location').value;
  profileObj.pro_likes = document.querySelector('#likes').value;
  profileObj.pro_dislikes = document.querySelector('#dislikes').value;
  profileObj.pro_aboutme = document.querySelector('#aboutme').value;
  profileObj.pro_birthday = document.querySelector('#birthday').value;
  profileObj.acc_id = util.currentAccount;
  console.log(profileObj);
  const response = await util.createProfile(profileObj);
  console.log('Response: ', response);

  localStorage.setItem('currentProfile', `profile-${response.id}`);
  window.location.href = '/my-profile';
}

function addEventListeners() {
  document.querySelector('#updateDetails').addEventListener('click', sendDetails);
}

function pageLoaded() {
  addEventListeners();
}

window.addEventListener('load', pageLoaded);
