'use strict';
const config = require('./config');
const Postgres = require('pg').Client;

const sql = new Postgres(config);
sql.connect();

sql.on('error', err => {
	console.error('SQL Fail', err);
	sql.end();
});

async function listProfiles() {
	const q = 'SELECT * FROM profiles;';
	const result = await sql.query(q);
	return result.rows;
}

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

module.exports = {
	listProfiles,
	getProfilesByAccountId,
	getProfileById,
	getDiscoveryById,
	getDistinctFilterProperties,
	getDiscoveryByFilters,
	updateProfileByUUID
};
