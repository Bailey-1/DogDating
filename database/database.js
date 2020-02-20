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
	q = `SELECT DISTINCT pro_location FROM profiles WHERE pro_gender != '${userGender.rows[0].pro_gender}'`;
	//console.log(q);
	distinctItems.location = await sql.query(q);
	q = `SELECT DISTINCT pro_breed FROM profiles WHERE pro_gender != '${userGender.rows[0].pro_gender}'`;
	//console.log(q);
	distinctItems.breed = await sql.query(q);
	q = `SELECT unnest(enum_range(NULL::kennelclubmembership)) AS "membership_type"`;
	//console.log(q);
	distinctItems.kennelClubMembership = await sql.query(q);
	//console.log(distinctItems);
	return distinctItems;
}

module.exports = {
	listProfiles,
	getProfilesByAccountId,
	getProfileById,
	getDiscoveryById,
	getDistinctFilterProperties
};
