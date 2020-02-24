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
	console.log('id: ', id);
	const q = `SELECT * FROM profiles WHERE acc_id = '${id}';`;
	console.log(q);
	const result = await sql.query(q);
	return result.rows;
}

async function getProfileById(id) {
	console.log('pro_id: ', id);
	const q = `SELECT * FROM profiles WHERE pro_id = '${id}';`;
	console.log(q);
	const result = await sql.query(q);
	return result.rows;
}
async function getAccountById(id) {
	console.log('pro_id: ', id);
	const q = `SELECT * FROM accounts WHERE acc_id = '${id}';`;
	console.log(q);
	const result = await sql.query(q);
	return result.rows;
}

async function getDiscoveryById(id) {
	let q = `SELECT pro_gender FROM profiles WHERE pro_id = '${id}'`;
	//console.log(q);
	const userGender = await sql.query(q);
	console.log(userGender.rows[0].pro_gender);
	q = `SELECT * FROM profiles WHERE pro_gender != '${userGender.rows[0].pro_gender}'`;
	//console.log(q);
	let result = await sql.query(q);
	return result;
}

// Get distinct valyes for the filter options on the wesite.
async function getDistinctFilterProperties(id) {
	console.log('id: ', id);
	let q = `SELECT pro_gender FROM profiles WHERE pro_id = '${id}'`;
	//console.log(q);
	const userGender = await sql.query(q);
	console.log(userGender.rows[0].pro_gender);
	let distinctItems = { location: '', breed: '', kennelClubMembership: '' };
	q = `SELECT DISTINCT pro_location FROM profiles WHERE pro_gender != '${userGender.rows[0].pro_gender}' ORDER BY pro_location`;
	distinctItems.location = await sql.query(q);

	q = `SELECT DISTINCT pro_breed FROM profiles WHERE pro_gender != '${userGender.rows[0].pro_gender}' ORDER BY pro_breed`;
	distinctItems.breed = await sql.query(q);

	q = `SELECT unnest(enum_range(NULL::kennelclubmembership)) AS "membership_type" ORDER BY "membership_type"`;
	distinctItems.kennelClubMembership = await sql.query(q);

	return distinctItems;
}

async function getDiscoveryByFilters(body) {
	//console.table(body);
	console.table(body);

	let q = `SELECT pro_gender FROM profiles WHERE pro_id = '${body.id}'`;
	//console.log(q);
	const userGender = await sql.query(q);

	q = `SELECT * FROM profiles INNER JOIN accounts ON profiles.acc_id = accounts.acc_id WHERE pro_gender !='${userGender.rows[0].pro_gender}'`;
	if (body.location != 'all' ? (q = q + ` AND profiles.pro_location = '${body.location}'`) : q);
	if (body.breed != 'all' ? (q = q + ` AND profiles.pro_breed = '${body.breed}'`) : q);
	if (
		body.kennelclub != 'all'
			? (q = q + ` AND accounts.acc_kennelclubmembership = '${body.kennelclub}'`)
			: q
	);
	console.log(q);

	let result = await sql.query(q);
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
		pro_aboutme = $8
		WHERE pro_id = $1`,
		[
			body.id,
			body.name,
			body.breed,
			body.location,
			body.likes,
			body.dislikes,
			body.birthday,
			body.aboutme
		]
	);
	return result;
}

async function uploadImageToDatabase(id, file) {
	console.log('id', id);
	console.log('file', file);

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
			[img_id, 'Hello world', id, fileExt]
		);
	} else {
		return 'Upload failed';
	}

	console.log(result);

	return result;
}

// Get all of a profiles images using the profile ID
async function getImagesFromId(id) {
	console.log('Get Images from ID');
	const result = await sql.query('SELECT * FROM images WHERE pro_id = $1', [id]);

	return result;
}

// Simple way to get all messages from a table between two parties.
async function getMessages(payload) {
	console.log(payload);
	// Select all messages between the same sender and reciever.
	const result = await sql.query(
		`SELECT * FROM messages WHERE (msg_sender = $1 AND msg_reciever = $2) OR (msg_sender = $2 AND msg_reciever = $1);`,
		[payload.from, payload.to]
	);
	return result;
}

async function getMessage(id) {
	const result = await sql.query(`SELECT * FROM messages WHERE msg_id = $1;`, [id]);
	return result;
}

async function sendMessage(payload) {
	console.log(payload);
	const msg_id = uuid();
	const result = await sql.query(
		`INSERT INTO messages (msg_id, msg_sender, msg_reciever, msg_content) 
	VALUES ($1, $2, $3, $4)`,
		[msg_id, payload.sender, payload.reciever, payload.content]
	);

	return msg_id;
}

module.exports = {
	getProfilesByAccountId,
	getProfileById,
	getAccountById,
	getDiscoveryById,
	getDistinctFilterProperties,
	getDiscoveryByFilters,
	updateProfileByUUID,
	uploadImageToDatabase,
	getImagesFromId,
	getMessages,
	getMessage,
	sendMessage
};
