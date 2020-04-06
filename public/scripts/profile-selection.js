import * as util from './utility.js';

const account = 'cee3a7e6-5339-11ea-8d77-2e728ce88125'; // this would be changed if you could change accounts
// Used to share data between different pages.
localStorage.setItem('currentAccount', account); // Current User

// Creates each profile element from a template and adds it
async function createProfileElement(profile) {
  const template = document.querySelector('#profile-item');
  const clone = document.importNode(template.content, true);
  clone.querySelector('.dogProfile').id = `profile-${profile.pro_id}`;
  clone.querySelector('#name').textContent = `${profile.pro_name}, ${util.getAgeFromDate(
    profile.pro_birthday,
  )}`;
  clone.querySelector('#breed').textContent = profile.pro_breed;
  clone.querySelector('#birthday').textContent = profile.pro_birthday;
  clone.querySelector('#sex').textContent = profile.pro_sex;

  const imageObj = await util.getProfilePicById(profile.pro_id);
  let profilePicSrc;
  !imageObj
    ? (profilePicSrc = './images/user.png')
    : (profilePicSrc = `./uploadedImages/${imageObj.img_id}.${imageObj.img_ext}`);

  clone.querySelector('#profilePicElement').src = profilePicSrc;

  document.querySelector('#userProfileArea').appendChild(clone);
}

// Adds the selectedBtn class to the pushed button and removes it from the rest
function selectedProfile() {
  // Not the nicest way but if it works it works.
  const selectedId = event.srcElement.parentElement.parentElement.id;
  console.log(selectedId);
  console.log('Selected ID: ', selectedId);
  const items = document.querySelectorAll('.selectBtn');
  console.log(items);
  for (const item of items) {
    console.log('item ', item);
    if (item.classList.contains('selectedBtn')) {
      item.classList.remove('selectedBtn');
      console.log('it does contain .selectedBtn');
    }
  }

  event.target.classList.toggle('selectedBtn');
  localStorage.setItem('currentProfile', selectedId);
}

// Show profiles user can view as. This changes recommended profiles, my profile etc
async function showProfiles() {
  const userId = localStorage.getItem('currentAccount');
  const profiles = await util.getProfilesByUserAccount(userId);

  await profiles.forEach(createProfileElement);
}

function newProfile() {
  window.location.href = '/new-profile';
}

// Add event handlers to the page.
function createEventHandlers() {
  document.querySelector('#newProfileBtn').addEventListener('click', newProfile);

  const items = document.querySelectorAll('.selectBtn');
  for (const i of items) i.addEventListener('click', selectedProfile);

  const nameItems = document.querySelectorAll('.profile-name');
  for (const i of nameItems) i.addEventListener('click', clickedName);
}

// Function for when the name of a profile is clicked.
function clickedName() {
  console.log(event.srcElement.parentElement.parentElement.id);
  const profile = event.srcElement.parentElement.parentElement.id;
  console.log(profile);
  localStorage.setItem('currentProfile', profile);
  window.location.href = '/my-profile';
}

// Add the selectedBtn class to the profile that matches the current profile ID.
function addClasses() {
  const selectedID = localStorage.getItem('currentProfile');
  console.log('selected id: ', selectedID);
  const target = document.querySelector(`#${selectedID}`);
  console.log(target);
  target.children[1].children[4].classList.add('selectedBtn');
}

// Setup things
async function pageLoaded() {
  // Used await to allow all elements to display before handlers are created
  await showProfiles();

  // have to use this because i don't know what is causing the delay
  setTimeout(function () {
    createEventHandlers();
    addClasses();
  }, 100);
}

// Entry
window.addEventListener('load', pageLoaded);
