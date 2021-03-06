/* eslint-disable eqeqeq */
// Utility functions
// Single page to help manage API requests and to reuse them across the site

// Check to see if user has currentProfile value in localstorage if not it selects the 'Ruth' profile by default.
if (localStorage.getItem('currentProfile') === null) {
  localStorage.setItem('currentProfile', 'profile-9cc6db1c-48ca-4ac9-ba72-eedfafa01a4b');
}

const currentProfile = localStorage.getItem('currentProfile').substring(8);
const currentAccount = localStorage.getItem('currentAccount');

testCurrentProfile();

async function testCurrentProfile() {
  const profileResult = await getProfileById(currentProfile);
  console.log('profileResult: ', profileResult);
  if (profileResult.length !== 1) {
    console.log(window.location.pathname);
    if (window.location.pathname !== '/profile-selection') {
      alert('Please select a profile');
      window.location.replace('./profile-selection');
    }
  }
}

// Richs function for removing all content from a parent element.
// CREDIT - Dr Richard Boakes, 2020
function removeContentFrom(what) {
  while (what.firstElementChild) {
    what.firstElementChild.remove();
  }
}

// Function used to calculate the age of the profile from the birth date.
function getAgeFromDate(date) {
  // date is YYYY/MM/DD cause thats what rich wanted.
  const today = new Date();
  const birthDate = new Date(date);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  // Looks complicated but just works out if the age is actually a year younger then current year - birth year.
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age -= 1;

  // Not going to deal with future dates yet and min age required for profile on this website - TODO
  if (age < 0) age = 0;
  return age;
}

// Returns single object of profile - first to have same ID.
async function getProfileById(id) {
  const request = await fetch(`./api/profile/${id}`);
  if (!request.ok) return console.warn(`Could not get /api/profile/${id}`);
  const profileObj = await request.json();
  return profileObj;
}

async function getAccountById(id) {
  const request = await fetch(`./api/account/${id}`);
  if (!request.ok) return console.warn(`Could not get /api/account/${id}`);
  const accountObj = await request.json();
  return accountObj;
}

async function getProfilesByUserAccount(id) {
  const request = await fetch(`./api/account/${id}/profiles`);
  if (!request.ok) return console.warn(`Could not get ./api/account/${id}/profiles`);
  const profileObj = await request.json();
  return profileObj;
}

async function getFilters(id) {
  const request = await fetch(`./api/profile/${id}/discovery/filters`);
  if (!request.ok) return console.warn(`Could not get ./api/profile/${id}/discovery/filters`);
  const filterObj = await request.json();
  return filterObj;
}

async function getDiscoveryByFilters(id, query) {
  const request = await fetch(`/api/profile/${id}/discovery${query}`);
  if (!request.ok) return console.warn('Could not POST /api/database/post/discoveryByFilter');
  const profileObj = await request.json();
  return profileObj;
}

async function updateProfileByUUID(profile) {
  const request = await fetch('/api/profile/:id', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });
  if (!request.ok) return console.warn('Could not PUT /api/profile/:id');
  const response = await request.json();
  return response;
}

async function uploadImageToServer(id, payload) {
  const request = await fetch(`/api/profile/${id}/images`, { method: 'POST', body: payload });
  if (!request.ok) return console.warn(`Could not POST /api/profile/${id}/image`);
  const response = await request.json();
  return response;
}

async function getImagesById(id) {
  const request = await fetch(`./api/profile/${id}/images`);
  if (!request.ok) return console.warn(`Could not GET ./api/profile/${id}/images`);
  const response = await request.json();
  return response;
}

async function getMessages(to, from) {
  const request = await fetch(`./api/profile/${from}/recipient/${to}`);

  if (!request.ok) return console.warn(`Could not get /api/profile/${from}/recipient/${to}`);
  const profileObj = await request.json();
  return profileObj;
}

async function sendMessage(id, recId, msg) {
  const body = { content: msg };
  const request = await fetch(`./api/profile/${id}/recipient/${recId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!request.ok) return console.warn(`Could not POST /api/profile/${id}/recipient/${recId}`);
  const msgId = await request.json();
  return msgId;
}

async function getMessage(id, recId, msgId) {
  const request = await fetch(`./api/profile/${id}/recipient/${recId}/message/${msgId}`);
  if (!request.ok) {
    return console.warn(`Could not GET ./api/profile/${id}/recipient/${recId}/message/${msgId}`);
  }
  const result = await request.json();
  return result.rows[0];
}

async function setProfilePic(id, imgId) {
  const request = await fetch(`/api/profile/${id}/image/${imgId}`, { method: 'PUT' });
  if (!request.ok) return console.warn(`Could not PUT /api/profile/${id}/image/${imgId}`);
  const result = await request.json();
  return result;
}

async function getProfilePicById(id) {
  const request = await fetch(`./api/profile/${id}/profilepic`);
  if (!request.ok) return console.warn(`Could not GET ./api/profile/${id}/profilepic`);
  const result = await request.json();

  if (result.rowCount === 0) {
    return false;
  } else {
    return result.rows[0];
  }
}

async function createProfile(body) {
  const request = await fetch('/api/profile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!request.ok) return console.warn('Could not POST /api/profile');
  const result = await request.json();
  return result;
}

async function deletePictureUtil(proId, imgId) {
  const request = await fetch(`/api/profile/${proId}/image/${imgId}`, { method: 'DELETE' });
  if (!request.ok) return console.warn(`Could not DELETE /api/profile/${proId}/image/${imgId}`);
  const result = await request.json();
  return result;
}

async function getReviewsByProfileID(id, recId) {
  const request = await fetch(`./api/profile/${id}/reviews/${recId}`);
  if (!request.ok) return console.warn(`Could not GET ./api/profile/${id}/reviews/${recId}`);
  const result = await request.json();
  return result;
}

async function postReview(id, recId, body) {
  const request = await fetch(`/api/profile/${id}/reviews/${recId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!request.ok) return console.warn(`Could not POST /api/profile/${id}/reviews/${recId}`);
  const result = await request.json();
  return result;
}

async function getConversations(id) {
  const request = await fetch(`./api/profile/${id}/conversations`);
  if (!request.ok) return console.warn(`Could not GET ./api/profile/${id}/conversations`);
  const result = await request.json();
  return result;
}

export {
  currentProfile,
  currentAccount,
  testCurrentProfile,
  removeContentFrom,
  getAgeFromDate,
  getProfileById,
  getAccountById,
  getProfilesByUserAccount,
  getFilters,
  getDiscoveryByFilters,
  updateProfileByUUID,
  uploadImageToServer,
  getImagesById,
  getMessages,
  sendMessage,
  getMessage,
  setProfilePic,
  getProfilePicById,
  createProfile,
  deletePictureUtil,
  getReviewsByProfileID,
  postReview,
  getConversations,
};
