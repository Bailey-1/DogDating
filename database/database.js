'use strict';
const config = require('./config');
const Postgres = require('pg').Client;
const fs = require('fs');
const util = require('util');
const path = require('path');
const uuid = require('uuid-random');

fs.renameAsync = fs.renameAsync || util.promisify(fs.rename);

const sql = new Postgres(config);
sql.connect();

sql.on('error', err => {
	console.error('SQL Fail', err);
	sql.end();
});

async function getProfilesByAccountId(id) {
	const q = `SELECT * FROM profiles WHERE acc_id = '${id}' ORDER BY pro_name;`;
	const result = await sql.query(q);
	return result.rows;
}
async function getProfileById(id) {
	const q = `SELECT * FROM profiles WHERE pro_id = '${id}';`;
	const result = await sql.query(q);
	return result.rows;
}

async function getAccountById(id) {
	const q = `SELECT * FROM accounts WHERE acc_id = '${id}';`;
	const result = await sql.query(q);
	return result.rows;
}

// Get distinct valyes for the filter options on the wesite.
async function getDistinctFilterProperties(id) {
	console.log('id: ', id);
	let q = `SELECT pro_sex FROM profiles WHERE pro_id = '${id}'`;
	//console.log(q);
	const usersex = await sql.query(q);
	console.log(usersex.rows[0].pro_sex);
	let distinctItems = { location: '', breed: '', kennelClubMembership: '' };
	q = `SELECT DISTINCT pro_location FROM profiles WHERE pro_sex != '${usersex.rows[0].pro_sex}' ORDER BY pro_location`;
	distinctItems.location = await sql.query(q);

	q = `SELECT DISTINCT pro_breed FROM profiles WHERE pro_sex != '${usersex.rows[0].pro_sex}' ORDER BY pro_breed`;
	distinctItems.breed = await sql.query(q);

	q = `SELECT unnest(enum_range(NULL::kennelclubmembership)) AS "membership_type" ORDER BY "membership_type"`;
	distinctItems.kennelClubMembership = await sql.query(q);

	return distinctItems;
}

async function getDiscoveryByFilters(id, query) {
	console.log('id: ', id);
	const profile = await sql.query(`SELECT pro_sex FROM profiles WHERE pro_id = '${id}'`);
	const profileSex = profile.rows[0].pro_sex;
	let q = `SELECT * FROM profiles INNER JOIN accounts ON profiles.acc_id = accounts.acc_id WHERE pro_sex !='${profileSex}'`;

	if (query.location) q += ` AND profiles.pro_location = '${query.location}'`;
	if (query.breed) q += ` AND profiles.pro_breed = '${query.breed}'`;
	if (query.kc) q += ` AND accounts.acc_kennelclubmembership = '${query.kc}'`;

	if (query.s) {
		const sortOption = query.s.split('-');
		console.table(sortOption);

		q += ` ORDER BY ${sortOption[0]} ${sortOption[1]}`;
	}

	console.log(q);

	let result = await sql.query(q);

	// Not a great way to sort it but must be used because of YYYY-MM-DD formatting
	if (query.s && query.s.split('-')[0] === 'pro_birthday') result.rows = result.rows.reverse();
	//console.log(result);
	return result;
}

async function updateProfileByUUID(body) {
	console.log('Body: ', body);
	let result = await sql.query(
		`UPDATE profiles SET pro_name = $2, 
		pro_breed = $3, 
		pro_location = $4, 
		pro_likes = $5, 
		pro_dislikes = $6, 
		pro_birthday = $7, 
		pro_aboutme = $8,
		pro_sex = $9
		WHERE pro_id = $1`,
		[
			body.id,
			body.name,
			body.breed,
			body.location,
			body.likes,
			body.dislikes,
			body.birthday,
			body.aboutme,
			body.sex
		]
	);
	return result;
}

async function uploadImageToDatabase(id, desc, file) {
	console.log('id', id);
	console.log('file', file);
	console.log('desc', desc);

	let newFilename, result;

	console.log('Minetype ', file.mimetype);

	if (file) {
		const img_id = uuid();
		// we should first check that the file is actually an image
		// move the file where we want it
		//TODO deal with this.
		const fileExt = file.mimetype.split('/')[1] || 'png';
		console.log('FileExt', fileExt);
		console.log('File Name: ', file.filename);
		newFilename = img_id + '.' + fileExt;
		await fs.renameAsync(file.path, path.join('public', 'uploadedImages', newFilename));

		console.log(img_id);
		result = await sql.query(
			`INSERT INTO images (img_id ,img_desc, pro_id, img_ext)
		VALUES ($1, $2, $3, $4)`,
			[img_id, desc, id, fileExt]
		);
		console.log(result);

		return img_id;
	}

	return 'Upload failed';
}

// Get all of a profiles images using the profile ID
async function getImagesFromId(id) {
	console.log('Get Images from ID');
	const result = await sql.query('SELECT * FROM images WHERE pro_id = $1', [id]);

	return result;
}

// Simple way to get all messages from a table between two parties.
async function getMessages(id, rec_id) {
	// Select all messages between the same sender and reciever.
	const result = await sql.query(
		`SELECT * FROM messages WHERE (msg_sender = $1 AND msg_reciever = $2) OR (msg_sender = $2 AND msg_reciever = $1);`,
		[id, rec_id]
	);
	return result;
}

async function getMessage(id, rec_id, msg_id) {
	const result = await sql.query(`SELECT * FROM messages WHERE msg_id = $1;`, [id]);
	return result;
}

async function sendMessage(id, rec_id, msg) {
	const msg_id = uuid();
	console.log('msg_id: ', msg_id);
	const result = await sql.query(
		`INSERT INTO messages (msg_id, msg_sender, msg_reciever, msg_content) 
	VALUES ($1, $2, $3, $4)`,
		[msg_id, id, rec_id, msg]
	);

	console.log('result: ', result);

	return msg_id;
}

// Set profile's profile picture and set everything else to be false
async function setProfilePic(id, img_id) {
	let result = await sql.query(`UPDATE images SET img_profilepic = False WHERE pro_id = $1;`, [id]);

	result = await sql.query(`UPDATE images SET img_profilepic = True WHERE img_id = $1;`, [img_id]);
	return result;
}

async function getProfilePic(pro_id) {
	let result = await sql.query('SELECT * FROM images WHERE pro_id = $1 AND img_profilepic = True', [
		pro_id
	]);
	return result;
}

async function createProfile(body) {
	console.log('body:', body);

	const pro_id = uuid();
	console.log('pro_id: ', pro_id);
	const result = await sql.query(
		`INSERT INTO profiles (
			pro_name, 
			pro_location, 
			pro_birthday, 
			pro_sex, 
			pro_breed, 
			pro_aboutme, 
			pro_likes, 
			pro_dislikes, 
			acc_id,
			pro_id) VALUES (
				$1, $2, $3, $4, $5, $6, $7, $8, $9, $10
			)`,
		[
			body.pro_name,
			body.pro_location,
			body.pro_birthday,
			body.pro_sex,
			body.pro_breed,
			body.pro_aboutme,
			body.pro_likes,
			body.pro_dislikes,
			body.acc_id,
			pro_id
		]
	);

	const data = { id: pro_id, queryResult: result };
	console.log(data);
	return data;
}

async function deleteProfile(id) {
	let result = [];
	result[0] = await sql.query(`DELETE FROM images WHERE pro_id = $1`, [id]);
	result[1] = await sql.query(`DELETE FROM messages WHERE msg_sender = $1 OR msg_reciever = $1`, [
		id
	]);
	result[2] = await sql.query(`DELETE FROM profiles WHERE pro_id = $1`, [id]);

	return result;
}

async function deletePic(id, img_id) {
	const result = await sql.query(`DELETE FROM images WHERE pro_id = $1 AND img_id = $2`, [
		id,
		img_id
	]);
	return result;
}

async function getPic(id, img_id) {
	const result = await sql.query(`SELECT * FROM images WHERE pro_id = $1 AND img_id = $2`, [
		id,
		img_id
	]);
	return result;
}

async function getReviewFromProfile(id) {
	const result = await sql.query(`SELECT * FROM reviews WHERE rev_reciever = $1`, [id]);
	return result;
}

module.exports = {
	getProfilesByAccountId,
	getProfileById,
	getAccountById,
	getDistinctFilterProperties,
	getDiscoveryByFilters,
	updateProfileByUUID,
	uploadImageToDatabase,
	getImagesFromId,
	getMessages,
	getMessage,
	sendMessage,
	setProfilePic,
	getProfilePic,
	createProfile,
	deleteProfile,
	deletePic,
	getPic,
	getReviewFromProfile
};
